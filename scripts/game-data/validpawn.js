import { getDefaultStore } from "jotai";
import { Data, Active } from "@/atom.js";

export default function validPawnMove(current, destination) {
    const gameData = getDefaultStore().get(Data);
    const userInfo = getDefaultStore().get(Active);
    const gameState = gameData[userInfo.board].state;

    console.log(gameData);
    const whiteSide = gameData[userInfo.board].white === userInfo.user;

    console.log(userInfo);

    let valid = false;

    const currentRow = current[0];
    const currentCol = current[1];
    const currentSquare = current[2];

    const destinationRow = destination[0];
    const destinationCol = destination[1];
    const destinationSquare = destination[2];

    const isForwardMove = whiteSide ? destinationRow < currentRow : destinationRow > currentRow; // white moves up, black moves down
    console.log(destinationSquare);

    // Diagonal capture move
    // if ((Math.abs(currentCol - destinationCol) === 1) && (Math.abs(currentRow - destinationRow) === 1) && isForwardMove) {
    //     // Capture opponent's piece
    //     if (gameState[destinationSquare] !== null && gameState[destinationSquare].color !== userInfo.user) {
    //         valid = true;
    //     }
    // }
    // // Single square forward move
    if ((currentCol === destinationCol) && isForwardMove && (Math.abs(currentRow - destinationRow) === 1)) {
        console.log(gameState[destinationSquare]);
        if (gameState[destinationSquare] === "") { // Square is empty
            valid = true;
        }
    }
    // Initial two-square move
    // need to raise this up and swap math.abs around so we exit sooner
    else if (currentCol === destinationCol && isForwardMove && Math.abs(currentRow - destinationRow) === 2) {
        const initialRow = whiteSide ? 6 : 1;
        const middleSquare = whiteSide ? currentSquare - 8 : currentSquare + 8; // Square in between
        if ((currentRow === initialRow) && gameState[destinationSquare] === "" && gameState[middleSquare] === "") {
            valid = true;
        }
    }

    // // En Passant logic
    // else if (Math.abs(currentCol - destinationCol) === 1 && Math.abs(currentRow - destinationRow) === 1 && isForwardMove) {
    //     const enPassantRow = whiteSide ? 3 : 4; // Row where en passant can occur
    //     const enPassantTarget = whiteSide ? currentSquare - 8 : currentSquare + 8; // The opponent's pawn that moved 2 squares forward

    //     if (currentRow === enPassantRow && gameState[enPassantTarget]?.enPassant) {
    //         valid = true; // En passant capture
    //     }
    // }

    return valid;
}