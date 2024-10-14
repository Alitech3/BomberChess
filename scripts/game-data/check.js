import { getDefaultStore } from "jotai";
import { Data, Active } from "@/atom.js";

import collision from "./collision";

export default function Check(destination, touched) {
    const clientInfo = getDefaultStore().get(Active);
    const gameData = getDefaultStore().get(Data);
    const gameState = gameData[clientInfo.board].state;

    const whiteSide = gameData[clientInfo.board].white === clientInfo.user;

    let kingIndex = whiteSide ? gameState.indexOf("K") : gameState.indexOf("k");
    const kingRow = Math.floor(kingIndex / 8);
    const kingColumn = kingIndex % 8;

    let check = false;
    let mate = false;

    // Loop through opponent's pieces to check for threats
    const opponentPieces = whiteSide ? gameState.filter(piece => piece === "p" || piece === "r" || piece === "n" || piece === "b" || piece === "q") : gameState.filter(piece => piece === "P" || piece === "R" || piece === "N" || piece === "B" || piece === "Q");

    let currentDestinationState;

    // console.log(gameState[destination[2]]);

    console.log(touched);

    if (destination && touched) {
        currentDestinationState = gameState[destination[2]];
        console.log(destination[2]);
        console.log(touched);
        // console.log(currentDestination)
        gameState[destination[2]] = touched;

        //     destination[2] === touched;
    }
    if (destination) {
        console.log(gameState);
        console.log(currentDestinationState);
        for (let i = 0; i < opponentPieces.length; i++) {
            const currentPiece = opponentPieces[i];
            const pieceIndex = gameState.indexOf(opponentPieces[i]);
            let currentSquare = pieceIndex;
            let currentRow = Math.floor((currentSquare/8));
            let currentColumn = currentSquare % 8;
            // Check if the piece can move to the king's square
            if (collision(currentPiece, currentRow, currentColumn, currentSquare, destination[0], destination[1], destination[2], !whiteSide)) {
                console.log("checked" + currentPiece, pieceIndex);
                check = true;
                break;
            }
            else {
                console.log("moving out of check");
                check = false;
            }
        }

        // gameState[destination[2]] = currentDestinationState;
    }else {
        // this checks to see if we are currently in check
        for (let i = 0; i < opponentPieces.length; i++) {
            const currentPiece = opponentPieces[i];
            const pieceIndex = gameState.indexOf(opponentPieces[i]);
            let currentSquare = pieceIndex;
            let currentRow = Math.floor((currentSquare/8));
            let currentColumn = currentSquare % 8;
            // Check if the piece can move to the king's square
            if (currentPiece === "q" || currentPiece === "Q") {
                console.log(currentPiece);
                console.log(pieceIndex);
                console.log(currentRow);
                console.log(currentColumn);
                console.log(currentSquare);
                console.log(kingIndex);
            }
            if (collision(currentPiece, currentRow, currentColumn, currentSquare, kingRow, kingColumn, kingIndex, !whiteSide)) {
                console.log("checked");
                check = true;
                break;
            }
            else {
                check = false;
            }
        }
    }

    // need to check for mate

    console.log("return check: "+check+" "+mate);
    return { check, mate };
}

// function canPieceAttack(pieceIndex, kingRow, kingColumn, gameState) {
//     const piece = gameState[pieceIndex];
//     const pieceRow = Math.floor(pieceIndex / 8);
//     const pieceColumn = pieceIndex % 8;

//     // Implement movement logic for each piece type
//     switch (piece) {
//     case "P": // White pawn
//         return (kingRow === pieceRow - 1 && Math.abs(kingColumn - pieceColumn) === 1);
//     case "R": // Rook
//         return (kingRow === pieceRow || kingColumn === pieceColumn) && !isPathBlocked(pieceIndex, kingRow, kingColumn, gameState);
//     case "N": // Knight
//         return (Math.abs(kingRow - pieceRow) === 2 && Math.abs(kingColumn - pieceColumn) === 1) ||
//                    (Math.abs(kingRow - pieceRow) === 1 && Math.abs(kingColumn - pieceColumn) === 2);
//     case "B": // Bishop
//         return Math.abs(kingRow - pieceRow) === Math.abs(kingColumn - pieceColumn) && !isPathBlocked(pieceIndex, kingRow, kingColumn, gameState);
//     case "Q": // Queen
//         return (kingRow === pieceRow || kingColumn === pieceColumn || Math.abs(kingRow - pieceRow) === Math.abs(kingColumn - pieceColumn)) && !isPathBlocked(pieceIndex, kingRow, kingColumn, gameState);
//     case "K": // King
//         // Normally, kings can't move to a square that's attacked, but we won't check that here
//         return false;
//         // Handle black pieces similarly
//     default:
//         return false;
//     }
// }
