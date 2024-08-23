import React from 'react';

type GameStatusProps = {
  winner: any;
  isXNext: boolean;
  username: string
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, isXNext, username }) => {
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