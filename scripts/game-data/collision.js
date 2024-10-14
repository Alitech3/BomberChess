import validPawnMove from "./validpawn";
import validRookMove from "./validrook";
import validKingMove from "./validking";
import validBishopMove from "./validbishop";
import validQueenMove from "./validqueen";
import validKnightMove from "./validknight";

export default function collision(touched, currentRow, currentColumn, currentSquare, destinationRow, destinationColumn, destinationSquare, whiteSide) {
    let valid = false;

    switch (touched.toLowerCase()) {
    case "p":
        valid = validPawnMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], whiteSide);
        break;
    case "r":
        valid = validRookMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], whiteSide);;
        break;
    case "n":
        valid = validKnightMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], whiteSide);;
        break;
    case "b":
        valid = validBishopMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], whiteSide);;
        break;
    case "q":
        valid = validQueenMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], whiteSide);;
        break;
    case "k":
        valid = validKingMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], whiteSide);;
        break;
    default:
        console.log("default");
    }

    return valid;
}