const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
    console.log("Connected to the server");
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Handle game initialization
    if (data.type === "init") {
        document.getElementById("team1-player1-name").innerText = `Player 1 (White) - Time: ${formatTime(600)}`;
        document.getElementById("team1-player2-name").innerText = `Player 2 (Black) - Time: ${formatTime(600)}`;
        document.getElementById("team2-player1-name").innerText = `Player 3 (Black) - Time: ${formatTime(600)}`;
        document.getElementById("team2-player2-name").innerText = `Player 4 (White) - Time: ${formatTime(600)}`;
    }

    // Handle timer updates
    if (data.type === "timer") {
        updateTimers(data.timers);
    }

    // Handle game over
    if (data.type === "end") {
        alert(data.message);
    }
};

// Function to update the displayed timers
function updateTimers(timers) {
    document.getElementById("team1-player1-timer").innerText = formatTime(timers.team1.player1);
    document.getElementById("team1-player2-timer").innerText = formatTime(timers.team1.player2);
    document.getElementById("team2-player1-timer").innerText = formatTime(timers.team2.player1);
    document.getElementById("team2-player2-timer").innerText = formatTime(timers.team2.player2);
}

// Helper function to format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
