// TODO
// En passant
// Castling
// check state of game from websocket
// move validator

let board = [];
let move = 0;

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
    }};

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

let blkPoints = 0;
let blkChk = false;
let blkLose = false;
let blkReserve = [];

let whtPoints = 0;
let whtChk = false;
let whtLose = false;
let whtReserve = [];

export function Main(newGame, from, to) {
    // if websocket is open and game is running we dont need to do this
    // reset board
    if (newGame) {
        board.length = [];
        initializeBoard(board);
    }

    Game(from, to);

    // while (!(whtLose && blkLose)) {
    //     checkGameState();  // Check for check/checkmate after each move
    //     move++;
    // }

    if (whtLose) {
        console.log("Black wins!");
    } else if (blkLose) {
        console.log("White wins!");
    }
}

export function initializeBoard(board) {
    // fill upper pieces blk
    board.push([ pieces.rook.letter.toLowerCase(), pieces.knight.letter.toLowerCase(), pieces.bishop.letter.toLowerCase(), pieces.queen.letter.toLowerCase(), pieces.king.letter.toLowerCase(), pieces.bishop.letter.toLowerCase(), pieces.knight.letter.toLowerCase(), pieces.rook.letter.toLowerCase()]);

    // fill pawns blk
    board.push([pieces.pawn.letter.toLowerCase(), pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase(),pieces.pawn.letter.toLowerCase()]);

    // fill empty
    for (let i = 0; i < 32; i++) {
        if (i % 8 == 0 ) {
            board.push(["", "", "", "", "", "", "", "",]);
        }
    }

    // fill lower white
    board.push([pieces.pawn.letter, pieces.pawn.letter,pieces.pawn.letter,pieces.pawn.letter,pieces.pawn.letter,pieces.pawn.letter,pieces.pawn.letter, pieces.pawn.letter]);
    
    // fill upper white
    board.push([
        pieces.rook.letter, pieces.knight.letter, pieces.bishop.letter, pieces.queen.letter,pieces.king.letter, pieces.bishop.letter, pieces.knight.letter, pieces.rook.letter]
    );

    return board;
}


function Game(from, to) {
    if (wht2Move) {
        whiteMove(from, to);
    }
    else {
        blackMove(from, to);
    }

    checkGameState();
}

function whiteMove(from, to) {
    console.log("White's Move");


}

function blackMove(from, to) {
    console.log("White's Move");


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