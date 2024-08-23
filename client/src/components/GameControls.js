import React from 'react';

const GameControls = ({ resetGame, saveGameState }) => {
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