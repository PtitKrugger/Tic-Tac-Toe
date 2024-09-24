'use client';

import Grid from './components/Grid.jsx';
import { useState } from 'react';

export default function Game() {
    const Player1 = 'X';
    const Player2 = 'O';
    const [currentSquares, setCurrentSquares] = useState(Array(9).fill(null));
    const [squaresColor, setSquaresColor] = useState(Array(9).fill('bg-gray-200'));
    const [currentPlayer, setCurrentPlayer] = useState(Player1);
    const [winner, setWinner] = useState(null);

    const playCrossSound = () => {
        const crossSound = new Audio('/assets/sounds/pop-cross.wav');
        crossSound.volume = 0.5;
        crossSound.play();
    };

    const playCircleSound = () => {
        const circleSound = new Audio('/assets/sounds/pop-circle.wav');
        circleSound.volume = 0.5
        circleSound.play();
    };

    const checkWinner = (newSquares) => {
        const winCoordinates = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
            [0, 4, 8], [2, 4, 6] // Diagonales
        ]

        for (let [a, b, c] of winCoordinates) {
            // Si le 1er symbole est le même sur les 3 coordonnées
            if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
                // Cases gagnantes deviennent vertes
                const newColors = squaresColor.slice();
                [a, b, c].forEach(index => newColors[index] = 'bg-emerald-400');

                setSquaresColor(newColors);
                setWinner(currentPlayer);
                return;
            }
        }

        // Si toutes les cases sont remplies
        if (newSquares.every(square => square)) {
            setWinner('None');
            return;
        }
    }

    const handleSquareClick = (index) => {
        // Si déjà un symbole sur la case ou un gagnant
        if (currentSquares[index] || winner) {
            return;
        }
        else {
            const newSquares = currentSquares.slice();

            if (currentPlayer === 'X') {
                playCrossSound();
                newSquares[index] = 'assets/images/cross.svg';
                checkWinner(newSquares);
                setCurrentPlayer(Player2);
            }
            else if (currentPlayer === 'O') {
                playCircleSound();
                newSquares[index] = 'assets/images/circle.svg';
                checkWinner(newSquares);
                setCurrentPlayer(Player1);
            }
            setCurrentSquares(newSquares);
        }
    }

    const handleResetClick = () => {
        setCurrentSquares(Array(9).fill(null));
        setSquaresColor(Array(9).fill('bg-gray-200'));
        setCurrentPlayer(Player1);
        setWinner(null);
    }

    return (
        <div>
            <header className="flex justify-center items-center h-36 text-white text-6xl roboto-bold">Tic Tac Toe</header>
            <div className='flex justify-center items-center h-10 text-slate-100'>
                <h1 className='roboto-medium text-xl'>
                    {!winner ? `Au tour du ${currentPlayer === 'X' ? 'Joueur 1' : 'Joueur 2'}` :
                        winner === 'X' ? '✅ Joueur 1 a gagné !' :
                            winner === 'O' ? '✅ Joueur 2 a gagné !' :
                                'Aucun joueur n\'a gagné !'
                    }
                </h1>
            </div>

            <div id="main" className="flex justify-center items-center h-[30rem]">
                <Grid currentSquares={currentSquares} onSquareClick={handleSquareClick} squaresColor={squaresColor} />
            </div>

            <div className='flex justify-center items-center h-10'>
                <button onClick={handleResetClick} className='bg-green-600 rounded-xl w-32 h-10 roboto-medium shrink hvr-push'>Relancer</button>
            </div>
        </div>
    );
}
