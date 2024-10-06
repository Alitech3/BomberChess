"use client";
import { useEffect, useRef, useState} from "react";
import "./games.css";
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
        <main id="main">
            <div id="gameboard"/>
            {/* <canvas ref={canvasRef} id="board"/> */}
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
        </main>
    );
}