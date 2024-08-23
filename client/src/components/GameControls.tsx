import React from 'react';

type GameControlsProps = {
  resetGame: (args: any) => void;
  saveGameState: (args: any) => void;
}

const GameControls: React.FC<GameControlsProps> = ({ resetGame, saveGameState }) => {
  return (
    <div className="game-controls">
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
      <button className="save" onClick={saveGameState}>
        Save Game
      </button>
    </div>
  );
};

export default GameControls;