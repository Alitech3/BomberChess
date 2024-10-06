"use client";
import { useEffect, useRef, useState} from "react";
import "./games.css";
import "./gameScreen.css";
import {initializeBoard, Main, createBoard, dragging} from "../../../scripts/game.js";


export default function Game() {
    initializeBoard([]);
    // eslint-disable-next-line no-unused-vars
    const canvasRef = useRef(null);
    const [move, setMove] = useState("");

    useEffect(() => {
        createBoard(document);
        dragging(document);
        Main(false, undefined, document);

    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setMove((prevMove) => ({
            ...prevMove,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call your function and pass the form data here
        console.log(move);
        Main(false, move);
    };

    return(
        <div class="chess-game-container">
        <div class="boards">
          {/* <!-- Chess Board 1 --> */}
          <div class="chess-board-container" id="board1-container">
            <div class="player-top" id="game1-white-label">
              Player 1 (White)
            </div>
            <div class="chess-board" id="board1">
              {/* <!-- Chess Board 1 content goes here --> */}
            </div>
            <div class="player-bottom" id="game1-black-label">
              Player 3 (Black)
            </div>
          </div>
    
          {/* <!-- Chess Board 2 --> */}
          <div class="chess-board-container" id="board2-container">
            <div class="player-top" id="game2-black-label">
              Player 2 (Black)
            </div>
            <div class="chess-board" id="board2">
              {/* <!-- Chess Board 2 content goes here --> */}
            </div>
            <div class="player-bottom" id="game2-white-label">
              Player 4 (White)
            </div>
          </div>
        </div>
      </div>
    );
}