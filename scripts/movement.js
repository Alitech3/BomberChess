import validMove from "./valid";

let draggedPiece = undefined;
let startPOS = -1;

export function dragging(document, board, activeBoard){
    if (!activeBoard) {
        return;
    }

    let piece = document.getElementById(activeBoard);

    piece.childNodes.forEach((e) => {
        e.addEventListener("dragstart", dragStart);
        e.addEventListener("dragover", dragOver);
        e.addEventListener("drop", dragDrop);
    });
}

function dragStart(e) {
    draggedPiece = e.target;
    startPOS = draggedPiece.parentNode;
}

function dragDrop(e) {
    e.stopPropagation();
    let destination = e.target;

    validMove(startPOS, destination);
}

function dragOver(e) {
    e.preventDefault();
}
