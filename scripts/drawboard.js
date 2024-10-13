const pieceImages = {
    white: {
        P: "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png",
        R: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
        N: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
        B: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
        Q: "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
        K: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png"
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

export function drawBoard(document, boardElements, board) {
    for (let i = 0; i < boardElements.length; i++) {
        let gameboard = document.getElementById(boardElements[i]);

        if (!gameboard) {
            return;
        }

        gameboard.innerHTML = "";

        board[i].forEach((e, i) => {
            const square = document.createElement("div");
            square.setAttribute("square-id", i);
            square.classList.add("square");

            if (e !== "") {
                const img = document.createElement("img");
                img.src = (e === e.toUpperCase()) ? pieceImages.white[e] : pieceImages.black[e];
                img.draggable = true;
                img.alt = e;

                square.appendChild(img);
            }
            const row = Math.floor(i / 8);
            if (row % 2 === 0) {
                square.classList.add(i % 2 === 0 ? "white-square" : "black-square");
            } else {
                square.classList.add(i % 2 === 0 ? "black-square" : "white-square");
            }

            gameboard.append(square);
        });
    }
}