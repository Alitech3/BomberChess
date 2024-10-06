"use client";
import { useState } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.js"; // Import your firestore instance
import { useRouter } from "next/navigation.js";

export default function Join() {
    const router = useRouter(); 
    const joinLobby = async (lobbyId, userId) => {
        const lobbyRef = doc(db, "lobbies", lobbyId);
        try {

          const lobbySnap = await getDoc(lobbyRef);

          if (lobbySnap.exists()) {
              const lobbyData = lobbySnap.data();
  
              // Check the current number of participants
              const participants = lobbyData.participants || [];
              let updatedBoard = {};
              let assignedRole = null;
  
              // Assign the user to either 'white' or 'black' if available
              if (!lobbyData.board1.white) {
                  updatedBoard = { 'board1.white': userId };
                  assignedRole = "white (Board 1)";
              } else if (!lobbyData.board1.black) {
                  updatedBoard = { 'board1.black': userId };
                  assignedRole = "black (Board 1)";
              } else if (!lobbyData.board2.white) {
                  updatedBoard = { 'board2.white': userId };
                  assignedRole = "white (Board 2)";
              } else if (!lobbyData.board2.black) {
                  updatedBoard = { 'board2.black': userId };
                  assignedRole = "black (Board 2)";
              } else {
                  console.log("All roles are filled, adding participant without assignment.");
              }
            }
            await updateDoc(lobbyRef, {
                participants: arrayUnion(userId),
            });
            console.log("User added to lobby");
        } catch (error) {
            console.error("Error joining lobby: ", error);
        }
        router.push('/game');
    };

    const [user, setUser] = useState("");
    const [submittedUser, setSubmittedUser] = useState("");
    const [code, setCode] = useState("");
    const [submittedCode, setSubmittedCode] = useState("");

    return (
        <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">

            <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">

                <div className= "flex flec-col justify-center items-center bg-gradient-to-r from-transparent via-green-700 to-transparent rounded-lg">
                    <div className = "flex flex-col justify-center items-center bg-center avatar aspect-square overflow-visible h-screen bg-explosion bg-no-repeat bg-[length:950px]" >
    
                        <div className = "flex flex-col justify-center items-center mt-20 mx-10 w-1/2 text-center">
      
                            <h1 className="text-6xl font-bold tracking-wide my-5">
                              Join Lobby
                            </h1>  
                        </div>

                        <div className="flex flex-col justify-center mt-4 space-y-12">

                            <form onSubmit={(e) => e.preventDefault()} className="flex">
                                <input value={user} onChange={(e) => setUser(e.target.value)} type="text" id="username" placeholder="Username"
                                    className="outline-none bg-red-500 border-4 border-red-800 text-center text-white rounded-full shadow-md text-xl font-bold tracking-widest px-8 py-5
                            focus:ring-yellow-100 focus:border-yellow-100"/>
                            </form>

                            <form onSubmit={(e) => e.preventDefault()} className="flex">
                                <input value={code} onChange={(e) => setCode(e.target.value)} type="text" id="code" placeholder="Enter Code"
                                    className="outline-none bg-red-500 border-4 border-red-800 text-center text-white rounded-full shadow-md text-xl font-bold tracking-widest px-8 py-5
                              focus:ring-yellow-100 focus:border-yellow-100"/>
                            </form>
                            <button className="outline-none bg-orange-600 border-4 border-red-800 text-center text-white rounded-full shadow-md text-xl font-bold tracking-widest px-8 py-5
                              focus:ring-yellow-100 focus:border-yellow-100" onClick={() => joinLobby(code, user)}>Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}