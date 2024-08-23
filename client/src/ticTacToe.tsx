import React, { useState } from 'react';
import useGameState from './hooks/useGameState';
import useScore from './hooks/useScore';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import GameControls from './components/GameControls';
import axios from 'axios';
import './components/styles/ticTacToe.css'

const TicTacToe: React.FC<any> = ({ userId, username }) => {
  const {
    board,
    isXNext,
    winner,
    winningSquares,
    setBoard,
    setIsXNext,
    setWinner,
    setWinningSquares,
    resetGame,
  } = useGameState(userId);
  
  const { scores, updateScore } = useScore(userId);


  const handleClick = async (index: number) => {
    if (board[index] || winner) return;
    await updateGameState(index);
  };

  const updateGameState = async (index: number) => {
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      setWinningSquares(calculateWinningSquares(newBoard));
      await updateScore(currentWinner === 'X' ? 'win' : 'loss');
    } else if (newBoard.every((square) => square !== null)) {
      setWinner('Draw');
      await updateScore('draw');
    } else {
      setTimeout(() => {
        computerMove(newBoard);
      }, 500);
    }
  };

  const computerMove = (currentBoard: any) => {
    // Check for a winning move for the computer
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        const currentWinner = calculateWinner(currentBoard);
        if (currentWinner) {
          setBoard(currentBoard);
          setWinner(currentWinner);
          setWinningSquares(calculateWinningSquares(currentBoard)); // Set winning squares for animation

          if (currentWinner === 'O') {
            updateScore('loss'); // Update score for loss
            return;
          }
        }
        currentBoard[i] = null; // Reset the move
      }
    }

    // Check for a blocking move against the player
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'X';
        if (calculateWinner(currentBoard) === 'X') {
          currentBoard[i] = 'O';
          setBoard(currentBoard);
          setIsXNext(true);
          return;
        }
        currentBoard[i] = null; // Reset the move
      }
    }

    // If no winning or blocking move, make a random move
    const emptyIndices = currentBoard.map((val: any, index: number) => (val === null ? index : null)).filter((val: any) => val !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    currentBoard[randomIndex] = 'O';
    setBoard(currentBoard);
    setIsXNext(true);
  };

  const saveGameState = async () => {
    try {
      await axios.post('http://localhost:3001/api/game/save-game', { userId, gameState: board });
      alert('Game state saved successfully!');
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  const calculateWinningSquares = (squares: any) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c];
      }
    }
    return [];
  };

  const calculateWinner = (squares: any) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="tic-tac-toe">
      <div className="game-container">
        <div className="game">
          <GameStatus winner={winner} isXNext={isXNext} username={username} />
          <GameBoard board={board} winningSquares={winningSquares} handleClick={handleClick} />
          <GameControls resetGame={resetGame} saveGameState={saveGameState} />
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;