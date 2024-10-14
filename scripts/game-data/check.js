import { getDefaultStore } from "jotai";
import { Data, Active, Threats } from "@/atom.js";

import collision from "./collision";

// flawed as we dont discriminate between where each piece actually is
// we need additional information
export default function Check(destination, touched) {
    console.log("~~~~~~~~~~~");
    const store = getDefaultStore();
    const clientInfo = store.get(Active);
    const gameData = store.get(Data);
    const activeThreats = store.get(Threats);
    let tempThreats = [];
    const gameState = gameData[clientInfo.board].state;
    const targetPiece = (destination) ? gameState[destination[2]] : undefined;

    const whiteSide = gameData[clientInfo.board].white === clientInfo.user;

    let kingIndex = whiteSide ? gameState.indexOf("K") : gameState.indexOf("k");
    const kingRow = Math.floor(kingIndex / 8);
    const kingColumn = kingIndex % 8;

    let check = false;
    let mate = false;

    //check if we are in check
    // check if a piece can block
    // check if king can move
    // if not mated

    // Loop through opponent's pieces to check for threats
    const opponentPieces = whiteSide ? gameState.filter(piece => piece === "p" || piece === "r" || piece === "n" || piece === "b" || piece === "q") : gameState.filter(piece => piece === "P" || piece === "R" || piece === "N" || piece === "B" || piece === "Q");

    const currentDestinationState = [...gameState];
    // if destination = threat
    // check = false

    console.log(targetPiece);
    console.log(tempThreats);

    // are we capturing the threat
    if (targetPiece && activeThreats.includes(targetPiece)) {
        check = false;
        return {check, mate};
    }

    // are we blockingt the check with a piece
    if (destination && touched) {
        console.log(destination, touched);

        let modifiedState = [...gameState];
        modifiedState[destination[2]] = touched;

        store.set(Data, {
            ...gameData, 
            [clientInfo.board]: {
                ...gameData[clientInfo.board],
                state: modifiedState
            }});

        for (let i = 0; i < opponentPieces.length; i++) {
            const currentPiece = opponentPieces[i];
            const pieceIndex = gameState.indexOf(opponentPieces[i]);
            let currentSquare = pieceIndex;
            let currentRow = Math.floor((currentSquare/8));
            let currentColumn = currentSquare % 8;
            // Check if the piece can move to the king's square
            // if (currentPiece === "q" || currentPiece === "Q") {
            if (collision(currentPiece, currentRow, currentColumn, currentSquare, kingRow, kingColumn, kingIndex, whiteSide)) {
                console.log("checked");
                check = true;
                break;
            }
            else if (!tempThreats) {
                console.log("not in check");
                check = false;
            }
            // }
        }
        store.set(Data, {
            ...gameData, 
            [clientInfo.board]: {
                ...gameData[clientInfo.board],
                state: currentDestinationState
            }});
    } else {
        // are we i ncheck?
        console.log(opponentPieces);
        for (let i = 0; i < opponentPieces.length; i++) {
            const currentPiece = opponentPieces[i];
            // pawns return same number each time
            const pieceIndex = gameState.indexOf(opponentPieces[i]);
            let currentSquare = pieceIndex;
            let currentRow = Math.floor((currentSquare/8));
            let currentColumn = currentSquare % 8;
            // Check if the piece can move to the king's square
            console.log(currentPiece);
            if (collision(currentPiece, currentRow, currentColumn, currentSquare, kingRow, kingColumn, kingIndex, !whiteSide)) {
                console.log("checked" + currentPiece);
                check = true;
                tempThreats.push(currentPiece);
            }
            else if (!tempThreats) {
                check = false;
            }
        // }
        }
    }
    // need to check for mate

    store.set(Threats, tempThreats);

    console.log("return check: "+check+" "+mate);
    return { check, mate };
}