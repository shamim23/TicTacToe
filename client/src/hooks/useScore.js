import { useState } from 'react';
import axios from 'axios';

const useScore = (userId) => {
  const [scores, setScores] = useState({ wins: 0, losses: 0, ties: 0 });

  const updateScore = async (result) => {
    try {
      await axios.post('http://localhost:5000/api/game/update-score', { userId, result });
      setScores((prevScores) => ({
        ...prevScores,
        [result]: prevScores[result] + 1,
      }));
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  return { scores, updateScore };
};

export default useScore;