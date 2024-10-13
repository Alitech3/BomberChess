// Todo
// Add resign Flag on right side somewhere
// display active board depending on what board that username is playing on

// find bored user is playing on and focus that one

"use client";
import {useState, useEffect, useRef} from "react";
import "./gameScreen.css";

import { db } from "../../../firebase.js"; // Import Firestore instance from your firebase config
import { doc, onSnapshot, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

import { drawBoard } from "../../../scripts/drawboard";
import Main from "../../../scripts/game";
import { useRouter } from "next/navigation";

import { useAtom } from "jotai";
import { Data, Active } from "@/atom";

export default function Game({searchParams}) {
    const router = useRouter();

    const [lobbyId] = useState(searchParams.id);
    const [gameData, setGameData] = useAtom(Data);
    const [user] = useState(searchParams.un);

    const [board, setBoard] = useState();
    const [activeUser, setActiveUser] = useAtom(Active);

    useEffect(() => {
        setActiveUser((prev) => ({
            ...prev,
            user: searchParams.un,
            lobbyId: searchParams.id
        }));

        // Initialize the board
        // setBoard(initializeBoard(document, drawBoard));
        const lobbyRef = doc(db, "lobbies", lobbyId);

        const unsubscribe = onSnapshot(lobbyRef, (doc) => {
            if (!doc.exists()) {
                window.alert("Invalid Lobby ID");
                return router.push("/");
            }
            let boardStates = [doc.data().board1.state, doc.data().board2.state];
            // UpdateBoard(Data);
            setBoard(boardStates);

            setGameData(doc.data());

            drawBoard(document, ["board1", "board2"], boardStates);

            // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            // if (source === "Server") {
            //     newData.current = true;
            //     
            // } else {
            //     newData.current = false;
            // }
        });

        // Cleanup function to unsubscribe from Firestore when component unmounts
        return () => unsubscribe();
    }, []);

    useEffect(() => {

        if (!gameData) {
            return;
        }

        // tailwind isnt designed for this method but i have no idea how else to do it
        const b1 = document.getElementById("board1-container");
        const b2 = document.getElementById("board2-container");
        switch (user) {
        case gameData.board1.white:
            console.log("user is white on board 1");
            b2.classList.add("pointer-events-none");
            setActiveUser((prev) => ({
                ...prev,
                board: "board1"
            }));
            break;
        case gameData.board1.black:
            console.log("user is black on board 1");
            b2.classList.add("pointer-events-none");
            setActiveUser((prev) => ({
                ...prev,
                board: "board1"
            }));
            // rotate main board
            b1.classList.add("rotate-180");
            b1.childNodes[0].classList.add("rotate-180");
            b1.childNodes[2].classList.add("rotate-180");
            b1.childNodes[1].childNodes.forEach((e) => {
                e.classList.add("rotate-180");
            });

            //rotate secondary board to match teammate view
            b2.classList.add("rotate-180");
            b2.childNodes[0].classList.add("rotate-180");
            b2.childNodes[2].classList.add("rotate-180");
            b2.childNodes[1].childNodes.forEach((e) => {
                e.classList.add("rotate-180");
            });
            break;
        case gameData.board2.white:
            console.log("user is white on board 2");
            b1.classList.add("pointer-events-none");
            setActiveUser((prev) => ({
                ...prev,
                board: "board2"
            }));            b2.classList.add("rotate-180");
            b2.childNodes[0].classList.add("rotate-180");
            b2.childNodes[2].classList.add("rotate-180");
            b2.childNodes[1].childNodes.forEach((e) => {
                e.classList.add("rotate-180");
            });
            break;
        case gameData.board2.black:
            console.log("user is black on board 2");
            b1.classList.add("select-none");
            setActiveUser((prev) => ({
                ...prev,
                board: "board2"
            }));
            break;
        default:
            console.log("Not a valid color");
        }
        Main(document, board, "board1");

    }, [gameData, board]);

    return(
        <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">
            <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">
                <div className="chess-game-container">
                    <div className="boards">
                        {/* <!-- Chess Board 1 --> */}
                        <div className="chess-board-container big-board" id="board1-container">
                            <div className="player" id="game1-white-label">
                                {(gameData) ? gameData.board1.black : "black"}
                            </div>
                            <div className="chess-board" id="board1">
                                {/* <!-- Chess Board 1 content goes here --> */}
                            </div>
                            <div className="player" id="game1-black-label">
                                {(gameData) ? gameData.board1.white : "white"}
                            </div>
                        </div>
                        {/* <!-- Chess Board 2 --> */}
                        <div className="chess-board-container" id="board2-container">
                            <div className="player" id="game2-black-label">
                                {(gameData) ? gameData.board2.white : "white"}
                            </div>
                            <div className="chess-board" id="board2">
                                {/* <!-- Chess Board 2 content goes here --> */}
                            </div>
                            <div className="player" id="game2-white-label">
                                {(gameData) ? gameData.board2.black : "black"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}