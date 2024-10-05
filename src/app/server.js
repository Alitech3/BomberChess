const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let players = [];
let teams = {
  team1: { player1: null, player2: null },
  team2: { player1: null, player2: null },
};

// Captured pieces storage (for each player to hold pieces captured by their teammate)
let capturedPieces = {
  team1: { player1: [], player2: [] },
  team2: { player1: [], player2: [] },
};

// Current turn for each board (Board 1 and Board 2)
let currentTurn = {
  board1: "white", // Board 1: T1-P1 vs T2-P1
  board2: "white", // Board 2: T1-P2 vs T2-P2
};

// Handle incoming WebSocket connections
wss.on("connection", (ws) => {
  if (players.length < 4) {
    players.push(ws);

    // Assign players to their respective teams and roles
    let team, player, board, color;
    if (players.length === 1) {
      team = "team1"; player = "player1"; color = "black"; board = 1;
      teams.team1.player1 = ws;
    } else if (players.length === 2) {
      team = "team1"; player = "player2"; color = "white"; board = 2;
      teams.team1.player2 = ws;
    } else if (players.length === 3) {
      team = "team2"; player = "player1"; color = "white"; board = 1;
      teams.team2.player1 = ws;
    } else if (players.length === 4) {
      team = "team2"; player = "player2"; color = "black"; board = 2;
      teams.team2.player2 = ws;
    }

    // Send the initial game setup info to the player
    ws.send(JSON.stringify({
      type: "init",
      team,
      player,
      color,
      board,
      capturedPieces: capturedPieces[team][player], // Send their captured pieces if any
    }));

    // Notify all players once the game is ready
    if (players.length === 4) {
      broadcast({
        type: "start",
        message: "Game started. White to move on both boards.",
      });
    }
  } else {
    ws.send(JSON.stringify({ type: "error", message: "Game is full" }));
    ws.close();
  }

  // Handle incoming moves
  ws.on("message", (message) => {
    const data = JSON.parse(message);

    // Handle player moves on a specific board
    if (data.type === "move") {
      const board = data.board === 1 ? "board1" : "board2";
      const playerColor = data.color;

      // Ensure it's the correct player's turn
      if (playerColor === currentTurn[board]) {
        // Notify both players on the board about the move
        broadcastToBoard(board, {
          type: "move",
          move: data.move,
          color: playerColor,
          turn: currentTurn[board],
        });

        // Check if a piece was captured
        if (data.capturedPiece) {
          const capturingTeam = playerColor === "white" ? "team1" : "team2";
          const capturingPlayer = board === "board1" ? "player1" : "player2";

          // Store the captured piece for the teammate
          capturedPieces[capturingTeam][capturingPlayer].push(data.capturedPiece);

          // Notify the capturing team about the captured piece
          broadcastToTeam(capturingTeam, {
            type: "capture",
            message: `${playerColor} captured a piece: ${data.capturedPiece}`,
            capturedPiece: data.capturedPiece,
            board: board === "board1" ? 1 : 2,
            player: capturingPlayer,
          });
        }

        // Switch turn
        currentTurn[board] = currentTurn[board] === "white" ? "black" : "white";
      }
    }

    // Handle dropping captured pieces
    if (data.type === "drop") {
      const board = data.board === 1 ? "board1" : "board2";
      const playerColor = data.color;

      // Check if the player has the piece they're trying to drop
      const team = playerColor === "white" ? "team1" : "team2";
      const player = board === "board1" ? "player1" : "player2";
      const capturedList = capturedPieces[team][player];

      if (capturedList.includes(data.piece)) {
        // Ensure the move is legal (no check, no placing on an occupied square)
        const validDrop = validateDrop(board, data.piece, data.position);

        if (validDrop) {
          // Remove the dropped piece from the player's captured list
          const index = capturedList.indexOf(data.piece);
          if (index > -1) capturedList.splice(index, 1);

          // Notify players about the dropped piece
          broadcastToBoard(board, {
            type: "drop",
            message: `${playerColor} dropped a ${data.piece} on the board.`,
            piece: data.piece,
            position: data.position,
          });

          // Check for checkmate after the drop (if applicable)
          checkForCheckmate(board);
        }
      }
    }
  });

  // Handle player disconnect
  ws.on("close", () => {
    players = players.filter(player => player !== ws);
    broadcast({ type: "end", message: "A player has disconnected. Game over." });
  });
});

// Broadcast to all players
function broadcast(message) {
  players.forEach(player => {
    if (player.readyState === WebSocket.OPEN) {
      player.send(JSON.stringify(message));
    }
  });
}

// Broadcast to players on a specific board
function broadcastToBoard(board, message) {
  if (board === "board1") {
    sendToPlayer(teams.team1.player1, message);
    sendToPlayer(teams.team2.player1, message);
  } else if (board === "board2") {
    sendToPlayer(teams.team1.player2, message);
    sendToPlayer(teams.team2.player2, message);
  }
}

// Broadcast to a specific team (both players on that team)
function broadcastToTeam(team, message) {
  sendToPlayer(teams[team].player1, message);
  sendToPlayer(teams[team].player2, message);
}

// Helper to send a message to an individual player
function sendToPlayer(player, message) {
  if (player && player.readyState === WebSocket.OPEN) {
    player.send(JSON.stringify(message));
  }
}

// // Placeholder for drop validation logic (implement based on your UI logic)
// function validateDrop(board, piece, position) {
//   // UI will handle the actual validation of legal drops (e.g., no check, no overlap)
//   // Return true for now
//   return true;
// }

// // Placeholder for checkmate detection logic (implement based on UI feedback)
// function checkForCheckmate(board) {
//   // UI will handle checkmate detection and notify the server
// }

console.log("WebSocket server running on ws://localhost:8080");
