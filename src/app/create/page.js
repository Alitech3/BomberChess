/* eslint-disable no-unused-vars */
"use client";
import { useAtom } from "jotai";
import { lobbyId } from "../../atom.js";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase.js"; // Import your Firestore instance
import Link from "next/link.js";  

export default function Create() {
    const [docRefId, setDocRef] = useAtom(lobbyId); // Use the atom for docRefId
    const [user, setUser] = useState("");
    const [submittedUser, setSubmittedUser] = useState("");
    const [loading, setLoading] = useState(false); // For button disabling/loading state

    const createLobby = async (lobbyName, hostId) => {
        setLoading(true); // Start loading
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
            console.log("id created: "+ docRef.id);
            setDocRef(docRef.id); // Set docRefId using the Jotai atom
        } catch (error) {
            console.error("Error creating lobby: ", error);
        } finally {
            setLoading(false); // Stop loading after lobby creation
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
                                    onClick={() => setSubmittedUser(user)}
                                >
                                    {" "}
                                </button>
                            </form>

                            <div className="flex flex-col justify-center space-y-12 mt-4">
                                <button
                                    className="px-8 py-5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition hover:text-black duration-200 outline-none bg-red-500 border-4 border-red-800"
                                    disabled={loading} // Disable button while loading
                                    onClick={() => createLobby(submittedUser, submittedUser)}
                                >
                                    <Link className = "text-xl font-bold tracking-widest px-5 w-5 h-5" 
                                        href={"/lobby"}
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