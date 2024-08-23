import React from 'react';

const GameStatus = ({ winner, isXNext, username }) => {
  return (
    <div className="status">
      {winner
        ? winner === 'Draw'
          ? 'It\'s a Draw!'
          : winner === 'X'
          ? `Winner: ${username}`
          : `Winner: Computer`
        : `${isXNext ? username : 'Computer'}'s turn`}
    </div>
  );
};

export default GameStatus;