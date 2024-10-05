"use client";
import { useEffect, useRef, useState} from "react";
import WhiteRook from "../../../assets/white_rook.png";
import BlackRook from "../../../assets/black_rook.png";
import "./games.css";
import ChessGame from '../../../scripts/game.js';

export default function Game() {
    const canvasRef = useRef(null);

    ChessGame();
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

    return(
        <main id="main">
            <canvas ref={canvasRef} id="board"/>
        </main>
    );
}