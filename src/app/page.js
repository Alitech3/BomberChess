// Create the main container
const chessGameContainer = document.createElement('div');
chessGameContainer.className = 'chess-game-container';

// Create the boards container
const boardsContainer = document.createElement('div');
boardsContainer.className = 'boards';

// Function to create a chess board
function createChessBoard(boardId, whitePlayer, blackPlayer) {
  // Create chess board container
  const boardContainer = document.createElement('div');
  boardContainer.className = 'chess-board-container';
  boardContainer.id = `${boardId}-container`;

  // Create player labels
  const playerTop = document.createElement('div');
  playerTop.className = 'player-top';
  playerTop.id = `${boardId}-white-label`;
  playerTop.textContent = whitePlayer;

  const chessBoard = document.createElement('div');
  chessBoard.className = 'chess-board';
  chessBoard.id = boardId;

  const playerBottom = document.createElement('div');
  playerBottom.className = 'player-bottom';
  playerBottom.id = `${boardId}-black-label`;
  playerBottom.textContent = blackPlayer;

  // Append all elements to the board container
  boardContainer.appendChild(playerTop);
  boardContainer.appendChild(chessBoard);
  boardContainer.appendChild(playerBottom);

  return boardContainer;
}

// Create chess boards
const board1 = createChessBoard('board1', 'Player 1 (White)', 'Player 3 (Black)');
const board2 = createChessBoard('board2', 'Player 2 (Black)', 'Player 4 (White)');

// Append boards to boards container
boardsContainer.appendChild(board1);
boardsContainer.appendChild(board2);

// Append boards container to main container
chessGameContainer.appendChild(boardsContainer);

// Append the main container to the body
document.body.appendChild(chessGameContainer);

// Link to your CSS file
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'gameScreen.css';
document.head.appendChild(link);

// Link to your external JavaScript file (gameLogic.js)
const script = document.createElement('script');
script.src = 'gameLogic.js';
document.body.appendChild(script);
