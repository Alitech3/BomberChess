// Todo
// Add resign Flag on right side somewhere

"use client";
import { useEffect, useRef} from "react";
import "./gameScreen.css";
import {initializeBoard, Main, createBoard, dragging} from "../../../scripts/game.js";

export default function Game() {
    initializeBoard([]);
    // eslint-disable-next-line no-unused-vars
    const canvasRef = useRef(null);
    // const [move, setMove] = useState("");

    useEffect(() => {
        createBoard(document, ["board1", "board2"]);
        dragging(document);
        Main(false, undefined, document);

    }, []);


    return(
        <main className="h-screen bg-center bg-gradient-to-tr from-green-700 to-green-400">
            <div className="flex flex-col items-center justify-start h-screen bg-repeat bg-[length:106px] bg-bomb-pattern">
                <div className="chess-game-container">
                    <div className="boards">
                        {/* <!-- Chess Board 1 --> */}
                        <div className="chess-board-container big-board" id="board1-container">
                            <div className="player-top" id="game1-white-label">
            Player 3 (Black)
                            </div>
                            <div className="chess-board" id="board1">
                                {/* <!-- Chess Board 1 content goes here --> */}
                            </div>
                            <div className="player-bottom" id="game1-black-label">
            Player 1 (White)
                            </div>
                        </div>
  
                        {/* <!-- Chess Board 2 --> */}
                        <div className="chess-board-container" id="board2-container">
                            <div className="player-top" id="game2-black-label">
            Player 4 (White)
                            </div>
                            <div className="chess-board" id="board2">
                                {/* <!-- Chess Board 2 content goes here --> */}
                            </div>
                            <div className="player-bottom" id="game2-white-label">
            Player 2 (Black)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

/*         <main id="main">
            <div id="gameboard"/>
            <form onSubmit={handleSubmit} class='hidden'>
                <div>
                    <label>From:</label>
                    <input
                        type="text"
                        name="from"
                        value={move.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>To:</label>
                    <input
                        type="text"
                        name="to"
                        value={move.name}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </main> */