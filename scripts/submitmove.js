import { getDefaultStore } from "jotai";
import { Data, Active } from "@/atom.js";

import { db } from "../firebase.js"; // Import Firestore instance from your firebase config
import { doc, onSnapshot, updateDoc, arrayUnion, getDoc, increment } from "firebase/firestore";

export default function submitMove(current, destination, moveInfo) {
    console.log("Submitted");
    const clientInfo = getDefaultStore().get(Active);
    const currentGameData = getDefaultStore().get(Data);
    const clientBoard = clientInfo.board;
    const oppBoard = clientBoard === "board1" ? "board2" : "board1";
    let modifiedGameBoard = currentGameData[clientBoard].state;

    const currentSquare = current[2];
    const destinationSquare = destination[2];

    modifiedGameBoard[currentSquare] = "";
    modifiedGameBoard[destinationSquare] = moveInfo.touched;

    const lobbyRef = doc(db, "lobbies", clientInfo.lobbyId);

    // need to add points
    if (moveInfo.captured && moveInfo.send2) {

        updateDoc (lobbyRef, {
        // end turn
            [`${clientBoard}.wht2Move`]: !currentGameData[clientInfo.board].wht2Move,
            [`${clientBoard}.state`]: modifiedGameBoard,
            [`${clientBoard}.moveCount`]: increment(1),
            [`${oppBoard}.${moveInfo.send2}`]: arrayUnion(moveInfo.captured),
        });
    } else {
        updateDoc (lobbyRef, {
        // end turn
            [`${clientBoard}.wht2Move`]: !currentGameData[clientInfo.board].wht2Move,
            [`${clientBoard}.state`]: modifiedGameBoard,
            [`${clientBoard}.moveCount`]: increment(1)
        });
    }

    // console.log(currentGameData[clientBoard].state);

    // console.log(modifiedGameBoard);

    // console.log(moveInfo);

    // const lobbyRef = doc(db, "lobbies", clientInfo.lobbyId);

    // console.log(clientInfo.board);

    // updateDoc (lobbyRef, {
    //     // end turn
    //     [`${clientBoard}.wht2Move`]: !currentGameData[clientInfo.board].wht2Move,
    //     // [`${clientBoard}.state`]:
    // });
}