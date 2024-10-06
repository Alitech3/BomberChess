const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function () {
  console.log("Connected to WebSocket server");
};

socket.onmessage = function (event) {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case 'init':
      handleInit(data);
      break;
    case 'start':
      console.log('Game started:', data.message);
      break;
    case 'move':
      handleMove(data);
      break;
    case 'capture':
      handleCapture(data);
      break;
    case 'drop':
      handleDrop(data);
      break;
    case 'end':
      alert(data.message);
      break;
    default:
      console.error('Unknown message type:', data);
  }
};

function handleInit(data) {
  const { player, board } = data;

  // Set the current player's active board to be bigger
  setActiveBoard(board);
}

function setActiveBoard(activeBoard) {
  // Clear previous class states
  document.getElementById('board1-container').classList.remove('big-board', 'small-board');
  document.getElementById('board2-container').classList.remove('big-board', 'small-board');

  // Assign big and small classes based on active board
  if (activeBoard === 1) {
    document.getElementById('board1-container').classList.add('big-board');
    document.getElementById('board2-container').classList.add('small-board');
  } else {
    document.getElementById('board2-container').classList.add('big-board');
    document.getElementById('board1-container').classList.add('small-board');
  }

  // Store the active board in localStorage
  localStorage.setItem('activeBoard', activeBoard);
}

// Check for stored active board on page load
window.onload = function() {
  const activeBoard = localStorage.getItem('activeBoard');
  if (activeBoard) {
    setActiveBoard(parseInt(activeBoard, 10));
  }
};

socket.onclose = function () {
  console.log('Disconnected from WebSocket server');
};

socket.onerror = function (error) {
  console.error('WebSocket error:', error);
};
