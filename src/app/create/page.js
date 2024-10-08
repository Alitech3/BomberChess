//Todo
//get rid of the link

"use client";
import { useState, useEffect, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase.js"; // Import your Firestore instance
import Link from "next/link.js";
import { useRouter } from "next/navigation";


export default function Create() {
    const router = useRouter();
    const hasNavigated = useRef(false);
    const [docRefId, setDocRef] = useState(); // Use the atom for docRefId
    const [user, setUser] = useState("");

    // useEffect to trigger Nav when docRefId is updated
    useEffect(() => {
        if (docRefId && !hasNavigated.current) {
            hasNavigated.current = true;  // Mark as navigated to avoid running again
            Nav(docRefId);
        }
    }, [docRefId]);  // Runs whenever docRefId changes

    const Nav = (fulfilledID) => {
        if (fulfilledID) {
            console.log(setUser);
            router.push(`/lobby?id=${fulfilledID}&un=${user}`);
        }
    };

    const createLobby = async (lobbyName, hostId) => {
        try {
            const docRef = await addDoc(collection(db, "lobbies"), {
                board2: {
                    turn: "white",
                    white: null,
                    black: null,
                    reserve: [],
                    moves: 0,
                    lastMove: ""
                },
                board1: {
                    turn: "white",
                    white: null,
                    black: null,
                    reserve: [],
                    moves: 0,
                    lastMove: ""
                },
                participants: [],
                createdAt: new Date(),
            });
            setDocRef(await docRef.id);
        } catch (error) {
            console.error("Error creating lobby: ", error);
        }
    };

    return (
        <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">
            <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">
                <div className="flex flec-col justify-center items-center bg-gradient-to-r from-transparent via-green-700 to-transparent rounded-lg">
                    <div className="flex flex-col justify-center items-center bg-center avatar aspect-square overflow-visible h-screen bg-explosion bg-no-repeat bg-[length:950px]">
                        <div className="flex flex-col justify-center items-center mt-20 mx-10 w-1/2 text-center">
                            <h1 className="text-6xl font-bold tracking-wide my-5">Create Lobby</h1>
                        </div>

                        <div className="flex flex-col justify-center mt-4 space-y-12">
                            <form onSubmit={(e) => e.preventDefault()} className="flex">
                                <input
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    className="outline-none bg-red-500 border-4 border-red-800 text-center text-white rounded-full shadow-md text-xl font-bold tracking-widest px-8 py-5 focus:ring-yellow-100 focus:border-yellow-100"
                                />
                                <button
                                    className="opacity-0"
                                    onClick={() => user}
                                >
                                    {" "}
                                </button>
                            </form>

                            <div className="flex flex-col justify-center space-y-12 mt-4">
                                <button
                                    className="px-8 py-5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200 outline-none bg-red-500 border-4 border-red-800"
                                    onClick={() => createLobby(user, user)}
                                >
                                    <Link className = "text-xl font-bold tracking-widest px-5 w-5 h-5" 
                                        href={""}
                                        id="lobby">
                                        CREATE CODE
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}