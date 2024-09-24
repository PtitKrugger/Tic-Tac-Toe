'use client';

import Square from './Square.jsx';

/**
 * @param {String[]} currentSquares
 * @param {(i: number) => void} onSquareClick
 * @param {String[]} squaresColor
 * @returns {JSX.Element}
 */
export default function Grid({ currentSquares, onSquareClick, squaresColor }) {
    return (
        <div className='grid grid-cols-3 grid-rows-3 gap-2 w-80 h-80'>
            {currentSquares.map((symbol, index) => (
                <Square 
                    key={index} 
                    symbol={symbol} 
                    onClick={() => onSquareClick(index)} 
                    color={squaresColor[index]} 
                />
            ))}
        </div>
    );
}