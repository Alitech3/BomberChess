let board = [];
let turns = 0;

const pieces = {
    pawn: {
        points: 1,
        name: 'pawn',
        letter: 'p'
    },
    rook: {
        points: 5,
        name: 'rook',
        letter: 'R'
    },
    knight: {
        points: 3,
        name: 'knight',
        letter: 'N'
    },
    bishop: {
        points: 3,
        name: 'bishop',
        letter: 'B'
    },
    queen: {
        points: 9,
        name: 'queen',
        letter: 'Q'
    },
    king: {
        points: 0,
        name: 'king',
        letter: 'K'
}};



let wht2Move = true;
let blkChk = false;
let blkLose = false;

let whtChk = false;
let whtLose = false;

export default function ChessGame() {
    // reset board
    board = [];
    initializeBoard(board);

    while (!(whtLose && blkLose)) {
        checkGameState();  // Check for check/checkmate after each move
        turns++;
    }

    if (whtLose) {
        console.log("Black wins!");
    } else if (blkLose) {
        console.log("White wins!");
    }
}

function initializeBoard(board) {
    // fill black
    board.push(
        'Blk'+pieces.rook.letter, 'Blk'+pieces.knight.letter, 'Blk'+pieces.bishop.letter, 'Blk'+pieces.queen.letter, 'Blk'+pieces.king.letter, 'Blk'+pieces.bishop.letter, 'Blk'+pieces.knight.letter, 'Blk'+pieces.rook.letter
    );
    for (let i = 0; i < 8; i++) {
        board.push(pieces.pawn.letter);
    }

    for (let i = 0; i < 32; i++) {
        board.push(''); // 32 empty squares
    }

        // Fill white pawns
        for (let i = 0; i < 8; i++) {
            board.push(pieces.pawn.letter); // Uppercase for white pieces
        }
    
        // Fill white pieces
        board.push(
            'Wht'+pieces.rook.letter, 'Wht'+pieces.knight.letter, 'Wht'+pieces.bishop.letter, 'Wht'+pieces.queen.letter,'Wht'+pieces.king.letter, 'Wht'+pieces.bishop.letter, 'Wht'+pieces.knight.letter, 'Wht'+pieces.rook.letter
        );
    
        return board;
}

// Function to simulate white's move
function whiteMove() {
    console.log("White's turn to move");

    // Get all possible white pieces and make a random move
    let pieceMoved = false;
    while (!pieceMoved) {
        let from = Math.floor(Math.random() * 64); // Randomly select a piece
        if (board[from] && board[from] === board[from]) {
            let to = Math.floor(Math.random() * 64); // Randomly select destination
            if (validateMove(from, to, 'w')) {
                makeMove(from, to);
                pieceMoved = true;
                console.log("White moves from " + from + " to " + to);
            }
        }
    }

    wht2Move = false;
}

// Function to simulate black's move
function blackMove() {
    console.log("Black's turn to move");

    // Get all possible black pieces and make a random move
    let pieceMoved = false;
    while (!pieceMoved) {
        let from = Math.floor(Math.random() * 64); // Randomly select a piece
        if (board[from] && board[from] === board[from]) {
            let to = Math.floor(Math.random() * 64); // Randomly select destination
            if (validateMove(from, to, 'b')) {
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
    if (!piece || (player === 'w' && piece !== piece) || (player === 'b' && piece !== piece)) {
        return false;
    }
    
    console.log(board);
    // Make sure you are not moving to a square occupied by your own piece
    if (player === 'w' && board[to] === board[to]) return false;
    if (player === 'b' && board[to] === board[to]) return false;
    
    // You can add more specific move validation based on the piece type here (e.g., pawn, rook, etc.)
    
    return true;
}

// Function to make a move (move a piece from one square to another)
function makeMove(from, to) {
    board[to] = board[from];
    board[from] = '';
}

// Function to check game state (check, checkmate, etc.)
function checkGameState() {
    // Check for check/checkmate (very basic, can be expanded)
    whtChk = isKingInCheck('w');
    blkChk = isKingInCheck('b');
    
    if (whtChk && !canKingEscape('w')) {
        whtLose = true;
    }
    if (blkChk && !canKingEscape('b')) {
        blkLose = true;
    }
}

// Function to check if the king is in check
function isKingInCheck(player) {
    // For simplicity, assume the king is in check if any opponent's piece can move to the king's square
    let kingPosition = board.indexOf(player === 'w' ? 'K' : 'k');
    for (let i = 0; i < 64; i++) {
        if (validateMove(i, kingPosition, player === 'w' ? 'b' : 'w')) {
            return true;
        }
    }
    return false;
}

// Function to check if the king has any legal escape moves
function canKingEscape(player) {
    let kingPosition = board.indexOf(player === 'w' ? 'K' : 'k');
    let possibleMoves = [kingPosition - 1, kingPosition + 1, kingPosition - 8, kingPosition + 8]; // Adjacent squares
    
    for (let move of possibleMoves) {
        if (move >= 0 && move < 64 && validateMove(kingPosition, move, player)) {
            return true;
        }
    }
    return false;
}