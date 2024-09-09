'use client';

import Square from './square.jsx';
import React, { useEffect, useState } from 'react';

export default function Game() {
    const Player1 = 'X';
    const Player2 = 'O';
    const [currentSquares, setCurrentSquares] = useState(Array(9).fill(null));
    const [squaresColor, setSquaresColor] = useState(Array(9).fill('bg-gray-200'));
    const [currentPlayer, setCurrentPlayer] = useState(Player1);
    const [winner, setWinner] = useState(null);
    const [crossSound, setCrossSound] = useState(null);
    const [circleSound, setCircleSound] = useState(null);

    // Ajout de l'audio client side au premier affichage
    useEffect(() => {
        const crossAudio = new Audio('/assets/pop-cross.wav');
        crossAudio.volume = 0.5;
        setCrossSound(crossAudio);

        const circleAudio = new Audio('/assets/pop-circle.wav');
        circleAudio.volume = 0.5;
        setCircleSound(circleAudio);
    }, [])

    function checkWinner(newSquares) {
        const winCoordinates = [
            [0,1,2], [3,4,5], [6,7,8], // Lignes
            [0,3,6], [1,4,7], [2,5,8], // Colonnes
            [0,4,8], [2,4,6] // Diagonales
        ]

        for (let [a,b,c] of winCoordinates) {
            // Si le 1er symbole est le même sur les 3 coordonnées
            if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
                // Cases gagnantes deviennent vertes
                const newStyles = squaresColor.slice();
                newStyles[a] = 'bg-emerald-400'; 
                newStyles[b] = 'bg-emerald-400';
                newStyles[c] = 'bg-emerald-400';
                setSquaresColor(newStyles);

                setWinner(currentPlayer);
                return;
            }
        }

        // Si pas de gagnant et toutes les cases sont remplies
        if (newSquares.every(square => square)) {
            setWinner('None');
            return;
        }
    }

    function handleSquareClick(index) {
        // Si il y a déjà un symbole sur la case ou un gagnant
        if (currentSquares[index] || winner) {
            return;
        }
        else {
            const newSquares = currentSquares.slice();
        
            if (currentPlayer === 'X') {
                crossSound.play();
                newSquares[index] = 'assets/cross.svg';

                checkWinner(newSquares);
                setCurrentPlayer(Player2);
            } 
            else if (currentPlayer === 'O') {
                circleSound.play();
                newSquares[index] = 'assets/circle.svg';

                checkWinner(newSquares);
                setCurrentPlayer(Player1);
            }
        
            setCurrentSquares(newSquares);
        }
    }

    function reset() {
        setCurrentSquares(Array(9).fill(null));
        setSquaresColor(Array(9).fill('bg-gray-200'));
        setCurrentPlayer(Player1);
        setWinner(null);
    }

    return (
        <>
            <header className="flex justify-center items-center h-36 text-white text-6xl roboto-bold">Tic Tac Toe</header>
            <div className='flex justify-center items-center h-10 text-slate-100'>
                <h1 className='roboto-medium text-xl'> 
                    {!winner ? `Au tour du ${currentPlayer === 'X' ? 'Joueur 1' : 'Joueur 2'}` :
                      winner === 'X' ? '✅ Joueur 1 a gagné !' :
                      winner === 'O' ? '✅ Joueur 2 a gagné !' :
                      'Aucun joueur n\'a gagné !'}
                </h1>
            </div>
            
            <div id="main" className="flex justify-center items-center h-[30rem]">
                <div className='grid grid-cols-3 grid-rows-3 gap-2 w-80 h-80'>
                    <Square value={currentSquares[0]} onSquareClick={() => handleSquareClick(0)} color={squaresColor[0]}></Square>
                    <Square value={currentSquares[1]} onSquareClick={() => handleSquareClick(1)} color={squaresColor[1]}></Square>
                    <Square value={currentSquares[2]} onSquareClick={() => handleSquareClick(2)} color={squaresColor[2]}></Square>
                    <Square value={currentSquares[3]} onSquareClick={() => handleSquareClick(3)} color={squaresColor[3]}></Square>
                    <Square value={currentSquares[4]} onSquareClick={() => handleSquareClick(4)} color={squaresColor[4]}></Square>
                    <Square value={currentSquares[5]} onSquareClick={() => handleSquareClick(5)} color={squaresColor[5]}></Square>
                    <Square value={currentSquares[6]} onSquareClick={() => handleSquareClick(6)} color={squaresColor[6]}></Square>
                    <Square value={currentSquares[7]} onSquareClick={() => handleSquareClick(7)} color={squaresColor[7]}></Square>
                    <Square value={currentSquares[8]} onSquareClick={() => handleSquareClick(8)} color={squaresColor[8]}></Square>
                </div>
            </div>

            <div className='flex justify-center items-center h-10'>
                <button onClick={reset} className='bg-green-600 rounded-xl w-32 h-10 roboto-medium shrink hvr-push'>Relancer</button>
            </div>
        </>
    );
}
