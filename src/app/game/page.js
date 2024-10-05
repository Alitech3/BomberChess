"use client";
import { useEffect, useRef, useState} from "react";
// import "./games.css";
import {initializeBoard, Main} from "../../../scripts/game.js";

export default function Game() {
    initializeBoard([]);
    const canvasRef = useRef(null);
    const [move, setMove] = useState("");

    useEffect(() => {
        let canvas = canvasRef.current;
        var ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Grid parameters
        const rows = 8;
        const cols = 8;
        const gridWidth = canvas.width;
        const gridHeight = canvas.height;

        // Calculate the size of each cell
        const cellWidth = gridWidth / cols;
        const cellHeight = gridHeight / rows;

        for (let i = 0; i <= rows; i++) {
            const y = i * cellHeight;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(gridWidth, y);
            ctx.strokeStyle = "#000";
            ctx.stroke();
        }
        // Draw vertical lines
        for (let i = 0; i <= cols; i++) {
            const x = i * cellWidth;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, gridHeight);
            ctx.strokeStyle = "#000";
            ctx.stroke();
        }
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setMove({
            ...setMove,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call your function and pass the form data here
        Main(false, move);
    };

    return(
        <main id="main">
            <canvas ref={canvasRef} id="board"/>
            <form onSubmit={handleSubmit}>
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
                        type="email"
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