"use client";
import Link from "next/link";
import { useAtom } from "jotai";
import { lobbyId } from "@/atom";
import { useState, useEffect} from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.js"; // Import Firestore instance from your firebase config

export default function Home() {
    const [Atomid] = useAtom(lobbyId);
    const [id, setId] = useState("");

    useEffect(() => {
        setId(Atomid);
        console.log(id);
    }, [Atomid, id]);
    const queryLobbyById = async (lobbyId) => {
        try {
            // Reference to the lobby document by ID
            const lobbyRef = doc(db, "lobbies", lobbyId);
          
            // Fetch the document from Firestore
            const docSnap = await getDoc(lobbyRef);
          
            if (docSnap.exists()) {
            // If the document exists, return the data
                console.log("Lobby data:", docSnap.data());
                return docSnap.data();
            } else {
            // If the document does not exist, return null
                console.log("No such lobby found");
                return null;
            }
        } catch (error) {
            console.error("Error querying lobby:", error);
            return null;
        }
    };
    return (
        <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">
            <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">
                <div className="flex flex-wrap h-screen items-center justify-center w-1/2 bg-green-600 rounded-lg m-0 p-0">
                    <button className="flex flex-wrap h-fit bg-[#56b0ce] text-white rounded-3xl outline-none text-4xl font-bold tracking-wide p-2 px-2 border-1 border-black border-2">
            Lobby Id:<br/> {id}
                    </button>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-around w-full">
                            <button className="mr-4 px-3 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200 w-1/3">  Team 1 </button>
                            <button className="ml-4 px-3 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200 w-1/3">  Team 2 </button>
                        </div>
                        <div className="flex justify-evenly items-center ">
                            <button className="m-3 px-2 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200"> 
                                Player 1 </button>
                            <button className="m-3 px-2 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200">  Player 2 </button>
                            <button className="px-3 py-1 bg-orange-600 text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200">  Rotate </button>
                            <button className="m-3 px-2 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200"> Player 3</button>
                            <button className="m-3 px-2 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200">Player 4 </button>
                        </div>
                        <button className="px-2 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200
        outline-none bg-red-500 border-4 border-red-800 rounded-full text-3xl font-bold col-span-3" onClick={()=>{queryLobbyById();}}>
                            <Link className = "text-xl font-bold tracking-widest w-2 h-5" 
                                href={"/game"}
                                id="game">
        START
                            </Link></button>
                    </div>
                </div >
            </div>
        </main>
    );
}



