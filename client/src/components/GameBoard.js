import React from 'react';

const GameBoard = ({ board, winningSquares, handleClick }) => {
  const renderSquare = (index) => (
    <button
      className={`square ${winningSquares.includes(index) ? 'winner' : ''}`}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="board">
      {Array(3).fill(null).map((_, row) => (
        <div key={row} className="board-row">
          {Array(3).fill(null).map((_, col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;