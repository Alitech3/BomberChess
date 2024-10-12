// TODO

// En passant
// Castling
// move validator

import { dragging } from "./movement";

export default function Main(document, board, activeBoard) {
    console.log(board);
    dragging(document, board, activeBoard);
}
