import { getDefaultStore } from "jotai";
import { Data, Active } from "@/atom.js";

export default function validQueenMove(current, destination, whiteSide) {
    const gameData = getDefaultStore().get(Data);
    const userInfo = getDefaultStore().get(Active);
    const gameState = gameData[userInfo.board].state;

    let valid = false;

    const currentRow = current[0];
    const currentCol = current[1];
    const currentSquare = current[2];

    const destinationRow = destination[0];
    const destinationCol = destination[1];
    const destinationSquare = destination[2];

    const rowDiff = Math.abs(currentRow - destinationRow);
    const colDiff = Math.abs(currentCol - destinationCol);

    if (currentRow === destinationRow) {
        const colStart = Math.min(currentSquare, destinationSquare);
        const colEnd = Math.max(currentSquare, destinationSquare);

        for (let i = colEnd; i >= colStart; i--) {
            // let IFF = whiteSide ? gameState[i] !== gameState[i].toUpperCase() : gameState[i] !== gameState[i].toLowerCase();
            if (i == currentSquare || i == destinationSquare) {
                continue;
            }
            if (gameState[i] === "" || i == destinationSquare) {
                console.log("valid");
                valid = true;
            } else {
                console.log("invalid");
                valid = false;
                break;
            }
        }
    }
    else if (currentCol === destinationCol) {
        const rowStart = Math.min(currentSquare, destinationSquare);
        const rowEnd = Math.max(currentSquare, destinationSquare);

        for (let i = rowEnd; i >= rowStart ; i-=8) {
            // let IFF = whiteSide ? gameState[i] !== gameState[i].toUpperCase() : gameState[i] !== gameState[i].toLowerCase();
            if (i == currentSquare || i == destinationSquare) {
                continue;
            }
            if (gameState[i] === "" || i == destinationSquare) {
                console.log("valid");
                valid = true;
            } else {
                console.log("invalid");
                valid = false;
                break;
            }
        }
    }
    else if (rowDiff === colDiff) {
        const start = Math.min(currentSquare, destinationSquare);
        const end = Math.max(currentSquare, destinationSquare);
        let step;

        if ((destinationSquare-currentSquare) % 9 === 0) {
            step = 9;
        } else {
            step = 7;
        }
        for (let i = end; i >= start; i-=step) {
            // let IFF = whiteSide ? gameState[i] !== gameState[i].toUpperCase() : gameState[i] !== gameState[i].toLowerCase();
            if (i == currentSquare) {
                continue;
            }
            if (gameState[i] === "" || i == destinationSquare) {
                console.log("valid");
                valid = true;
            } else {
                console.log("invalid");
                valid = false;
                break;
            }
        }
    }

    return valid;
}