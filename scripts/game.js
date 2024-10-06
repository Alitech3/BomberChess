// TODO

// 

// En passant
// Castling
// check state of game from websocket
// move validator

let doc;
let board = [];
let move = 0;
let draggedPiece = undefined;
let startPOS = -1;
let capturedByWht = [];
let capturedByBlk = [];

const pieces = {
    pawn: {
        points: 1,
        name: "pawn",
        letter: "P"
    },
    rook: {
        points: 5,
        name: "rook",
        letter: "R"
    },
    knight: {
        points: 3,
        name: "knight",
        letter: "N"
    },
    bishop: {
        points: 3,
        name: "bishop",
        letter: "B"
    },
    queen: {
        points: 9,
        name: "queen",
        letter: "Q"
    },
    king: {
        points: 0,
        name: "king",
        letter: "K"
    },
    ALL: ['p', 'r', 'n', 'b', 'q', 'k']
};

// squares to notation
const a = [1, 2, 3, 4, 5, 6, 7, 8];
const b = [1, 2, 3, 4, 5, 6, 7, 8];
const c = [1, 2, 3, 4, 5, 6, 7, 8];
const d = [1, 2, 3, 4, 5, 6, 7, 8];
const e = [1, 2, 3, 4, 5, 6, 7, 8];
const f = [1, 2, 3, 4, 5, 6, 7, 8];
const g = [1, 2, 3, 4, 5, 6, 7, 8];
const h = [1, 2, 3, 4, 5, 6, 7, 8];

let wht2Move = true;
let successfulMove = false;


let blkPoints = 0;
let blkChk = false;
let blkLose = false;
let blkReserve = [];

let whtPoints = 0;
let whtChk = false;
let whtLose = false;
let whtReserve = [];

export function Main(newGame, move, dom) {
    // if websocket is open and game is running we dont need to do this
    // reset board
    if (newGame) {
        initializeBoard();
    }

    doc = dom;
    // move is unused logic
    // this is a place holder for later implementation of notation
    move = {from: "a2", to: "a4"};
    Game(move);

    // while (!(whtLose && blkLose)) {
    //     checkGameState();  // Check for check/checkmate after each move
    //     move++;
    // }

    if (whtLose) {
        window.alert("Black wins!");
    } else if (blkLose) {
        window.alert("White wins!");
    }
}

export function createBoard(document, boards) {
    for(let i = 0; i < board.length; i++) {
        let gameboard = document.getElementById(boards[i]);
        if (!gameboard) {
            return;
        }

        if (i % 2 !== 0) {
            board.reverse();
        }

        board.forEach((startPiece, i) => {
        const square = document.createElement("div");
        square.setAttribute("square-id", i);

        // Determine if the piece is white (uppercase) or black (lowercase)
        const isWhite = startPiece === startPiece.toUpperCase();
        const pieceType = startPiece.toLowerCase();

        // Create an image element for the piece if it's a valid piece letter
        if (startPiece !== "") {
            const img = document.createElement("img");

            const pieceImages = {
                white: {
                    p: "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png",
                    r: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
                    n: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
                    b: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
                    q: "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
                    k: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png"
                },
                black: {
                    p: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png",
                    r: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
                    n: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
                    b: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
                    q: "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png",
                    k: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png"
                }
            };
            // Set the image source based on the piece type and color
            img.src = isWhite ? pieceImages.white[pieceType] : pieceImages.black[pieceType];
            img.className = "chess-piece";
            img.draggable = true;
            img.alt = pieceType;

            square.appendChild(img);  // Add the image to the square
        }

        // Set the square color based on its position
        square.classList.add("square");
        const row = Math.floor(i / 8);
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "white-square" : "black-square");
        } else {
            square.classList.add(i % 2 === 0 ? "black-square" : "white-square");
        }

        gameboard.append(square);  // Append the square to the gameboard
        });
    }
}

export function dragging(document){
    let piece = document.getElementsByClassName("square");

    console.log(piece.length);
    for (let i = 0; i < piece.length; i++) {
        piece[i].addEventListener("dragstart", dragStart);
        piece[i].addEventListener("dragover", dragOver);
        piece[i].addEventListener("drop", dragDrop);
    }
}

function dragStart(e) {
    draggedPiece = e.target;
    console.log(draggedPiece.parentNode);
    startPOS = draggedPiece.parentNode.getAttribute("square-id");
    //console.log(startPOS);
}

function dragDrop(e) {
    e.stopPropagation();
    let current = startPOS;
    let destination = e.target;
    console.log(destination);

    console.log("is White's turn? " + wht2Move);
    if (wht2Move) {
        if (destination.nodeName === "DIV"){
            destination.append(draggedPiece);
            if (validMove(pieces.ALL.includes(destination.alt), draggedPiece.alt, current, destination.getAttribute("square-id"), false)){
                console.log(777);
            }
            wht2Move = false;
        } else if (destination.nodeName === "IMG"){
            let parent = destination.parentNode;
            if (pieces.ALL.includes(destination.alt)) {
                capturedByWht.push(destination);
                if (validMove(pieces.ALL.includes(destination.alt), destination.alt, current, destination.getAttribute("square-id"), true)){
                    console.log(888);
                }
                destination.remove();
                parent.append(draggedPiece);
                wht2Move = false;
            } else if (!pieces.ALL.includes(destination.alt)){
                
                capturedByBlk.push(destination);
                if (validMove(pieces.ALL.includes(destination.alt), destination.alt, current, destination.getAttribute("square-id"), true)){
                    console.log(999);
                }
                destination.remove();
                parent.append(draggedPiece);
                wht2Move = false;
                
            }
        }
        return;
    } else {
        if (destination.nodeName === "DIV"){
            destination.append(draggedPiece);
            if (validMove(pieces.ALL.includes(destination.alt), draggedPiece.alt, current, destination.getAttribute("square-id"), false)){
                console.log(777);
            }
            wht2Move = true;
        } else if (destination.nodeName === "IMG"){
            let parent = destination.parentNode;
            if (pieces.ALL.includes(destination.alt)) {
                
                capturedByWht.push(destination);
                if (validMove(pieces.ALL.includes(destination.alt), destination.alt, current, destination.getAttribute("square-id"), true)){
                    console.log(888);
                }
                destination.remove();
                parent.append(draggedPiece);
                wht2Move = true;
                
            } else if (!pieces.ALL.includes(destination.alt)){
                capturedByBlk.push(destination);
                if (validMove(pieces.ALL.includes(destination.alt), destination.alt, current, destination.getAttribute("square-id"), true)){
                    console.log(999);
                }
                destination.remove();
                parent.append(draggedPiece);
                wht2Move = true;
            }
        }
    }
}

function dragOver(e) {
    e.preventDefault();
}

export function initializeBoard() {
    board = [];

    // fill upper pieces blk
    board.push( pieces.rook.letter.toLowerCase(), pieces.knight.letter.toLowerCase(), pieces.bishop.letter.toLowerCase(), pieces.queen.letter.toLowerCase(), pieces.king.letter.toLowerCase(), pieces.bishop.letter.toLowerCase(), pieces.knight.letter.toLowerCase(), pieces.rook.letter.toLowerCase());

    // fill pawns blk
    board.push(pieces.pawn.letter.toLowerCase(), pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase());

    // fill empty
    for (let i = 0; i < 32; i++) {

        board.push("");
    }

    // fill lower white
    board.push(pieces.pawn.letter, pieces.pawn.letter,pieces.pawn.letter,pieces.pawn.letter,pieces.pawn.letter,pieces.pawn.letter,pieces.pawn.letter, pieces.pawn.letter);
    
    // fill upper white
    board.push(
        pieces.rook.letter, pieces.knight.letter, pieces.bishop.letter, pieces.queen.letter,pieces.king.letter, pieces.bishop.letter, pieces.knight.letter, pieces.rook.letter
    );
}

function Game({from, to}) {
    if (wht2Move) {
        whiteMove(from, to);
    }
    else {
        blackMove(from, to);
    }

    // checkGameState();
}

function validMove(isWhite, pieceType, current, destination, takenPiece) {
    console.log("isWhite? " + isWhite);
    console.log("C " + current);
    console.log("D " + destination)
    if (isWhite){
        switch (pieceType) {
            case "p":
                if (takenPiece){
                    if (destination == (current - 9) || (destination == (current - 7))){
                        return true;
                    }
                } else {
                    if (destination == (current - 8) || (destination == current - 16)){
                        return true;
                    }
                }
                break;
            case "r":
                if (Math.abs(destination % 8 == 0)){
                        return true;
                    }
                if (Math.abs(destination - current <  8)){
                    return true;
                }
                break;
            case "n":
                if (destination == (current - 17) ||
                   (destination == (current - 15)) ||
                   (destination == (current + 17))  ||
                   (destination == (current + 15)) ||
                   (destination == (current - 10)) ||
                   (destination == (current + 10)) ||
                   (destination == (current - 6)) ||
                   (destination == (current + 6))){
                    return true;
                }
                break;
            case "b":
                if (Math.abs(destination % 7 == 0)){
                    return true;
                }
                break;
            case "q":
                if (Math.abs(destination % 8 == 0)){
                    return true;
                }
                if (Math.abs(destination - current <  8)){
                    return true;
                }
                if (Math.abs(destination % 7 == 0)){
                    return true;
                }
                break;
            case "k":
                if (destination == (current + 1) ||
                    (destination == (current - 1)) ||
                    (destination == (current + 8)) ||
                    (destination == (current - 8)) ||
                    (destination == (current + 7)) ||
                    (destination == (current - 7)) ||
                    (destination == (current + 9)) ||
                    (destination == (current - 9))){
                    return true;
                }
                break;
        }
    }
    return false;
}


// dont need anything below

const notation = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7
};

// not needed
function whiteMove(from, to) {

    console.log(board);

    console.log("White's Move");

    let fromX = notation[from[0]];
    let fromY = from[1];

    let toX = notation[to[0]];
    let toY = to[1];

    console.log(board[fromY][fromX]);
    // validate move and contiue below
    // board[toX][toY] = board[fromX][fromY];
    // board[fromX][fromY] = ''

    console.log(board);

    // let row = from[0]; // 'a', 'b', 'c', etc.
    // let col = from[1]; // '1', '2', '3', etc.

    // // Access notation dynamically using bracket notation
    // console.log(`Row: ${pos}, Col: ${col}`);
    // console.log(notation);
    // console.log(notation[row][col]); 
    wht2Move = false;
}

function blackMove(from, to) {
    console.log("White's Move");

    wht2Move = true;
}

// Function to simulate white's move
function whiteMovev1() {
    console.log("White's turn to move");

    // Get all possible white pieces and make a random move
    let pieceMoved = false;
    while (!pieceMoved) {
        let from = Math.floor(Math.random() * 64); // Randomly select a piece
        if (board[from] && board[from] === board[from]) {
            let to = Math.floor(Math.random() * 64); // Randomly select destination
            if (validateMove(from, to, "w")) {
                makeMove(from, to);
                pieceMoved = true;
                console.log("White moves from " + from + " to " + to);
            }
        }
    }

    wht2Move = false;
}

// Function to simulate black's move
function blackMovev1() {
    console.log("Black's turn to move");

    // Get all possible black pieces and make a random move
    let pieceMoved = false;
    while (!pieceMoved) {
        let from = Math.floor(Math.random() * 64); // Randomly select a piece
        if (board[from] && board[from] === board[from]) {
            let to = Math.floor(Math.random() * 64); // Randomly select destination
            if (validateMove(from, to, "b")) {
                makeMove(from, to);
                pieceMoved = true;
                console.log("Black moves from " + from + " to " + to);
            }
        }
    }

    wht2Move = true;
}

// Function to validate basic piece moves
function validateMove(from, to, player) {
    // For simplicity, allow any move if destination is empty or opponent's piece
    let piece = board[from];
    if (!piece || (player === "w" && piece !== piece) || (player === "b" && piece !== piece)) {
        return false;
    }
    
    console.log(board);
    // Make sure you are not moving to a square occupied by your own piece
    if (player === "w" && board[to] === board[to]) return false;
    if (player === "b" && board[to] === board[to]) return false;
    
    // You can add more specific move validation based on the piece type here (e.g., pawn, rook, etc.)
    
    return true;
}

// Function to make a move (move a piece from one square to another)
function makeMove(from, to) {
    board[to] = board[from];
    board[from] = "";
}

// Function to check game state (check, checkmate, etc.)
function checkGameState() {
    // Check for check/checkmate (very basic, can be expanded)
    whtChk = isKingInCheck("w");
    blkChk = isKingInCheck("b");
    
    if (whtChk && !canKingEscape("w")) {
        whtLose = true;
    }
    if (blkChk && !canKingEscape("b")) {
        blkLose = true;
    }
}

// Function to check if the king is in check
function isKingInCheck(player) {
    // For simplicity, assume the king is in check if any opponent's piece can move to the king's square
    let kingPosition = board.indexOf(player === "w" ? "K" : "k");
    for (let i = 0; i < 64; i++) {
        if (validateMove(i, kingPosition, player === "w" ? "b" : "w")) {
            return true;
        }
    }
    return false;
}

// Function to check if the king has any legal escape moves
function canKingEscape(player) {
    let kingPosition = board.indexOf(player === "w" ? "K" : "k");
    let possibleMoves = [kingPosition - 1, kingPosition + 1, kingPosition - 8, kingPosition + 8]; // Adjacent squares
    
    for (let move of possibleMoves) {
        if (move >= 0 && move < 64 && validateMove(kingPosition, move, player)) {
            return true;
        }
    }
    return false;
}