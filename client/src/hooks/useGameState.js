import { useState, useEffect } from 'react';
import axios from 'axios';

const useGameState = (userId) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  useEffect(() => {
    const loadGameState = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/game/load-game', { userId });
        if (response.data.gameState) {
          setBoard(response.data.gameState);
        }
      } catch (error) {
        console.error('Error loading game state:', error);
      }
    };

    loadGameState();
  }, [userId]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningSquares([]);
  };

  return {
    board,
    isXNext,
    winner,
    winningSquares,
    setBoard, // Return the setBoard function
    setIsXNext, // Return the setIsXNext function
    setWinner, // Return the setWinner function
    setWinningSquares, // Return the setWinningSquares function
    resetGame,
  };
};

export default useGameState;