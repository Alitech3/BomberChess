import * as pieces from "./game-data/pieces.json";

import { getDefaultStore } from "jotai";
import { Data, Active } from "@/atom.js";

import collision from "./game-data/collision";
import submitMove from "./submitmove.js";
import Check from "./game-data/Check";

export default function validMove(current, destination) {
    console.log(current);
    console.log(destination);
    let valid = false;

    const touched = (current.firstChild) ? current.firstChild.alt : undefined;
    const touchedElement = current.firstChild;
    const currentSquare = current.getAttribute("square-id");

    const gameData = getDefaultStore().get(Data);
    const clientInfo = getDefaultStore().get(Active);
    const turn = gameData[clientInfo.board].wht2Move;

    const clientWhite = (clientInfo.user === gameData[clientInfo.board].white);

    const targetPiece = destination.alt;

    const currentRow = Math.floor((currentSquare/8));
    const currentColumn = currentSquare % 8;

    const destinationParent = destination.parentNode;
    const destinationSquare = (destination.nodeName === "IMG") ? destinationParent.getAttribute("square-id") : destination.getAttribute("square-id");
    let destinationRow = Math.floor((destinationSquare/8));
    let destinationColumn = destinationSquare % 8;

    let check = Check();

    if (touched.toLowerCase() === "k") {
        check = Check([destinationRow, destinationColumn, destinationSquare]);
    } else if (check.check){
        console.log("dest");
        console.log(touched);
        check = Check([destinationRow, destinationColumn, destinationSquare], touched);
    }

    if (check.check) {
        console.log("King is in Check rn " + check.check);
    }

    // capture
    // log piece taken and send it to teammate on opposite board
    // e.g board 1 black takes white N send it to teammate on b2 playing white
    const moveInfo = {
        touched: touched,
        captured: targetPiece,
        send2: undefined,
        whtWins: false,
        blkWins: false
    };

    // console.log(check);
    // if (check.check && touched.toLowerCase() !== "k") {
    //     return window.alert("Youre in Check.");
    // }

    // whites turn
    if (turn && clientWhite) {

        // console.log("whites move");
        if (pieces.ALL.includes(touched)) {
            return window.alert("You're playing as white");
        }

        if (destination.nodeName === "DIV") {
            // verify move
            valid = collision(touched, currentRow, currentColumn, currentSquare, destinationRow, destinationColumn, destinationSquare, clientWhite);

            if (valid && !check.check && !check.mate) {
                destination.append(touchedElement);
                submitMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], moveInfo);
            }
        }
        //capturing
        else if (destination.nodeName === "IMG") {
            if (!pieces.ALL.includes(destination.alt)) {
                return window.alert("you cant capture your own piece");
            }
            // capture
            valid = collision(touched, currentRow, currentColumn, currentSquare, destinationRow, destinationColumn, destinationSquare, clientWhite);

            if (valid && !check.check && !check.mate) {
                moveInfo.send2 = "blkReserve";
                destination.remove();
                destinationParent.append(touchedElement);
                submitMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], moveInfo);
            }
        }
    }
    //blacks turn
    else if (!turn && !clientWhite) {
        console.log("blacks move");
        console.log(destination.getAttribute("square-id"));
        if (!pieces.ALL.includes(touched)) {
            return window.alert("You're playing as black");
        }
        if (destination.nodeName === "DIV") {
            // verify move
            valid = collision(touched, currentRow, currentColumn, currentSquare, destinationRow, destinationColumn, destinationSquare, clientWhite); 

            if (valid && !check.check && !check.mate) {
                destination.append(touchedElement);
                submitMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], moveInfo);
            }
        }
        //capturing
        else if (destination.nodeName === "IMG") {
            if (pieces.ALL.includes(destination.alt)) {
                return window.alert("you cant capture your own piece");
            }

            valid = collision(touched, currentRow, currentColumn, currentSquare, destinationRow, destinationColumn, destinationSquare, clientWhite); 

            check = Check();
    
            if (valid && !check.check && !check.mate) {
                moveInfo.send2 = "whtReserve";
                destination.remove();
                destinationParent.append(touchedElement);
                // wht2move = false;
                submitMove([currentRow, currentColumn, currentSquare], [destinationRow, destinationColumn, destinationSquare], moveInfo);
            }
        }
    }
    else {
        return window.alert("wait your turn");
    }

    // console.log(pieceType);

    

    // console.log("isWhite? " + isWhite);
    // console.log("C " + current);
    // console.log("D " + destination);
    // if (isWhite){
    //     switch (pieceType) {
    //     case "p":
    //         if (takenPiece){
    //             if (destination == (current - 9) || (destination == (current - 7))){
    //                 return true;
    //             }
    //         } else {
    //             if (destination == (current - 8) || (destination == current - 16)){
    //                 return true;
    //             }
    //         }
    //         break;
    //     case "r":
    //         if (Math.abs(destination % 8 == 0)){
    //             return true;
    //         }
    //         if (Math.abs(destination - current <  8)){
    //             return true;
    //         }
    //         break;
    //     case "n":
    //         if (destination == (current - 17) ||
    //                (destination == (current - 15)) ||
    //                (destination == (current + 17))  ||
    //                (destination == (current + 15)) ||
    //                (destination == (current - 10)) ||
    //                (destination == (current + 10)) ||
    //                (destination == (current - 6)) ||
    //                (destination == (current + 6))){
    //             return true;
    //         }
    //         break;
    //     case "b":
    //         if (Math.abs(destination % 7 == 0)){
    //             return true;
    //         }
    //         break;
    //     case "q":
    //         if (Math.abs(destination % 8 == 0)){
    //             return true;
    //         }
    //         if (Math.abs(destination - current <  8)){
    //             return true;
    //         }
    //         if (Math.abs(destination % 7 == 0)){
    //             return true;
    //         }
    //         break;
    //     case "k":
    //         if (destination == (current + 1) ||
    //                 (destination == (current - 1)) ||
    //                 (destination == (current + 8)) ||
    //                 (destination == (current - 8)) ||
    //                 (destination == (current + 7)) ||
    //                 (destination == (current - 7)) ||
    //                 (destination == (current + 9)) ||
    //                 (destination == (current - 9))){
    //             return true;
    //         }
    //         break;
    //     }
    // }
    // return false;
}