import { getDefaultStore } from "jotai";
import { Data, Active } from "@/atom.js";

export default function validQueenMove(current, destination) {
    console.log("sadasd");
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
        const colStart = Math.min(currentSquare, destinationSquare)+1;
        const colEnd = Math.max(currentSquare, destinationSquare);
        for (let i = colStart; i <= colEnd; i++) {
            if (gameState[i] === "") {
                valid = true;
                break;
            }
        }
    }
    else if (currentCol === destinationCol) {
        const rowStart = Math.min(currentSquare, destinationSquare)+1;
        const rowEnd = Math.max(currentSquare, destinationSquare);

        for (let i = rowStart; i < rowEnd; i+=7) {
            if (gameState[i] === "") {
                valid = true;
            } else {
                valid = false;
                break;
            }
        }
    }
    else if (rowDiff === colDiff) {
        const start = Math.min(currentSquare, destinationSquare)+1;
        const end = Math.max(currentSquare, destinationSquare);

        for (let i = start; i < end; i+=7) {
            if (gameState[i] === "") {
                valid = true;
            } else {
                valid = false;
                break;
            }
        }
    }

    return valid;
}