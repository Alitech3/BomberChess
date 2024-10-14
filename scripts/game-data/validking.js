import { getDefaultStore } from "jotai";
import { Data, Active } from "@/atom.js";

export default function validKingMove(current, destination) {
    const gameData = getDefaultStore().get(Data);
    const userInfo = getDefaultStore().get(Active);
    const gameState = gameData[userInfo.board].state;

    console.log(destination);
    
    let valid = false;

    const currentRow = current[0];
    const currentCol = current[1];
    const currentSquare = current[2];

    const destinationRow = destination[0];
    const destinationCol = destination[1];
    const destinationSquare = destination[2];

    const rowDiff = Math.abs(currentRow - destinationRow);
    const colDiff = Math.abs(currentCol - destinationCol);

    if (rowDiff <= 1 && colDiff <= 1 && gameState[destinationSquare] === "") {
        valid = true;
    }

    if (!valid) {
        // castle logic
    }

    return valid;
}


