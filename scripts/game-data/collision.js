import validPawnMove from "./ValidPawn";
import validRookMove from "./validrook";
import validKingMove from "./validking";
import validBishopMove from "./validbishop";
import validQueenMove from "./validqueen";
import validKnightMove from "./validknight";

export default function collision(touched, currentRow, currentColumn, currentSquare, destinationRow, destinationColumn, destinationSquare) {
    let collided = false;

    switch (touched.toLowerCase()) {
    case "p":
        console.log("pawn");
        collided = validPawnMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare]);
        break;
    case "r":
        console.log("rook");
        collided = validRookMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare]);
        break;
    case "n":
        console.log("Knight");
        collided = validKnightMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare]);
        break;
    case "b":
        console.log("bishop");
        collided = validBishopMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare]);
        break;
    case "q":
        console.log("queen");
        collided = validQueenMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare]);
        break;
    case "k":
        console.log("king");
        collided = validKingMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare]);
        break;
    default:
        console.log("default");
    }

    return collided;
}