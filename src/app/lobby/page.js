"use client";
import Link from "next/link";
import { useState, useEffect} from "react";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/navigation.js";

import { db } from "../../../firebase.js"; // Import Firestore instance from your firebase config

export default function Home({searchParams}) {
    const router = useRouter();
    const [gameData, setGameData] = useState();
    const [lobbyId] = useState(searchParams.id);
    const [un] = useState(searchParams.un);
    const [lobby, setLobby] = useState();
    const [lobbyRef, setLobbyRef] = useState();

    useEffect(() => {
        (async ()=>{
            const lobbyRef = doc(db, "lobbies", lobbyId);
            setLobbyRef(lobbyRef);
            // setLobby(await getDoc(lobbyRef));
        })();

        const unsubscribe = onSnapshot(doc(db, "lobbies", lobbyId), (doc) => {

            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            // if (source === "Server") {
            //     console.log(gameData);
            // }
            setGameData(doc.data());
            console.log("Current data: ", doc.data());
            console.log(source, " data: ", doc.data());
        });

        return () => unsubscribe();
    }, []);

    // check if different user already occupies that slot
    const joinTeam = async (un, board, color) => {
        console.log(un + board + color);
        try {
            await updateDoc(lobbyRef, {
                participants: arrayUnion(un),
                [`${board}.${color}`]: un
            });
        }
        catch(e) {
            console.log(e);
        }
    };

    const startGame = async () => {
        try {
            router.push(`/game?id=${lobbyId}&un=${un}`);
        } catch (error) {
            console.error("Error querying lobby:", error);
            return null;
        }
    };

    return (
        <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">
            <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">
                <div className="flex flex-wrap h-screen items-center justify-center w-1/2 bg-green-600 rounded-lg m-0 p-0">
                    <button className="flex flex-wrap h-fit bg-[#56b0ce] text-white rounded-3xl outline-none text-4xl font-bold tracking-wide p-2 px-2 border-1 border-black border-2 select-text">
                        Lobby Id:<br/>
                        {lobbyId}
                    </button>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-around w-full">
                            <button className="mr-4 px-3 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200 w-1/3">  Team 1 </button>
                            <button className="ml-4 px-3 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200 w-1/3">  Team 2 </button>
                        </div>
                        <div className="flex justify-evenly items-center ">
                            <button className="m-3 px-2 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200"  onClick={() => joinTeam(un, "board1", "white")}>
                                {(gameData) ? gameData.board1.white : "white"}
                            </button>
                            <button className="m-3 px-2 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200"onClick={() => joinTeam(un, "board2", "black")}>
                                {(gameData) ? gameData.board2.black : "black"}
                            </button>
                            <button className="m-3 px-2 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200"onClick={() => joinTeam(un, "board2", "white")}>
                                {(gameData) ? gameData.board2.white : "white"}
                            </button>
                            <button className="m-3 px-2 py-1 bg-[#56b0ce] text-white shadow-md border-black border-2 text-3xl font-bold rounded-3xl hover:bg-red-600 transition hover:text-black duration-200"onClick={() => joinTeam(un, "board1", "black")}>
                                {(gameData) ? gameData.board1.black : "black"}
                            </button>
                        </div>
                        <button className="px-2 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200 outline-none bg-red-500 border-4 border-red-800 rounded-full text-3xl font-bold col-span-3" onClick={()=>{startGame();}}>
                            <Link className = "text-xl font-bold tracking-widest w-2 h-5" 
                                href={""}
                                id="game">
                                START
                            </Link></button>
                    </div>
                </div >
            </div>
        </main>
    );
}



