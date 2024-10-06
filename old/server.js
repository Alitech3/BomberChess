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

// To handle pausing and reconnection
let pausedGames = false;
let disconnectedPlayer = null;
let gameState = {}; // Store the state of the game for restoring upon reconnect

// Handle incoming WebSocket connections
wss.on("connection", (ws) => {
    // If a player reconnects after a game pause
    if (pausedGames && disconnectedPlayer) {
    // Restore the game state to the reconnected player
        ws.send(
            JSON.stringify({
                type: "restore",
                message: "Welcome back! Restoring your game state...",
                gameState: getStoredGameState(),
            })
        );

        // Clear the paused state and notify all players
        pausedGames = false;
        disconnectedPlayer = null;

        broadcast({
            type: "resume",
            message: "Player has reconnected. The game is resuming.",
        });
        return;
    }

    if (players.length < 4) {
        players.push(ws);

        // Assign players to their respective teams and roles
        let playerRole;
        if (players.length === 1) {
            teams.team1.player1 = ws;
            playerRole = { team: "team1", player: "player1", color: "white", board: 1 };
        } else if (players.length === 2) {
            teams.team1.player2 = ws;
            playerRole = { team: "team1", player: "player2", color: "black", board: 2 };
        } else if (players.length === 3) {
            teams.team2.player1 = ws;
            playerRole = { team: "team2", player: "player1", color: "black", board: 1 };
        } else if (players.length === 4) {
            teams.team2.player2 = ws;
            playerRole = { team: "team2", player: "player2", color: "white", board: 2 };
        }

        // Send the initial game setup info to the player
        ws.send(
            JSON.stringify({
                type: "init",
                ...playerRole,
                capturedPieces: capturedPieces[playerRole.team][playerRole.player],
            })
        );

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

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        // Handle player moves and dropping pieces
        handleGameActions(data, ws);

        // Handle player disconnect
        if (data.type === "disconnect") {
            handleDisconnect(ws);
        }
    });

    ws.on("close", () => {
        handleDisconnect(ws);
    });
});

// Handle incoming game actions
function handleGameActions(data, ws) {
    // Broadcast the received message to all players
    broadcast(data);

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
            currentTurn[board] =
        currentTurn[board] === "white" ? "black" : "white";
        }
    }

    // Handle dropping captured pieces
    if (data.type === "drop") {
        const board = data.board === 1 ? "board1" : "board2";
        const playerColor = data.color;

        // Determine the team and player
        const team = playerColor === "white" ? "team1" : "team2";
        const player = board === "board1" ? "player1" : "player2";

        // Check if the piece to drop is from the player's own captured pieces or their teammate's
        let capturedList = [];
        if (player === "player1") {
            capturedList = capturedPieces[team].player1.concat(
                capturedPieces[team].player2
            );
        } else {
            capturedList = capturedPieces[team].player2.concat(
                capturedPieces[team].player1
            );
        }

        // Check if the player has the piece they're trying to drop
        if (capturedList.includes(data.piece)) {
            // Ensure the move is legal (no check, no placing on an occupied square)
            const validDrop = validateDrop(board, data.piece, data.position);

            if (validDrop) {
                // If it's a teammate's piece, remove it from the teammate's captured list
                const teammate = player === "player1" ? "player2" : "player1";
                const teammateCapturedList = capturedPieces[team][teammate];
                const index = teammateCapturedList.indexOf(data.piece);
                if (index > -1) teammateCapturedList.splice(index, 1); // Remove from teammate's list

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
}

// Handle player disconnection
function handleDisconnect(ws) {
    // Identify which player disconnected
    if (ws === teams.team1.player1) disconnectedPlayer = "player1";
    else if (ws === teams.team1.player2) disconnectedPlayer = "player2";
    else if (ws === teams.team2.player1) disconnectedPlayer = "player3";
    else if (ws === teams.team2.player2) disconnectedPlayer = "player4";

    // Remove the player from the array
    players = players.filter(player => player !== ws);
    pausedGames = true;

    // Store current game state for reconnection
    storeGameState();

    // Notify remaining players that the game is paused
    broadcast({
        type: "pause",
        message: `${disconnectedPlayer} has disconnected. The game is paused.`,
    });
}

// Store game state for reconnection
function storeGameState() {
    gameState = {
        players: [...players],
        teams: { ...teams },
        capturedPieces: { ...capturedPieces },
        currentTurn: { ...currentTurn },
    };
}

// Retrieve stored game state for reconnection
function getStoredGameState() {
    return gameState;
}

// Broadcast to all players
function broadcast(message) {
    players.forEach((player) => {
        if (player && player.readyState === WebSocket.OPEN) {
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

// Utility function to send messages to specific players
function sendToPlayer(player, message) {
    if (player && player.readyState === WebSocket.OPEN) {
        player.send(JSON.stringify(message));
    }
}


// Notify that the WebSocket server is running
console.log("WebSocket server running on ws://localhost:8080");
