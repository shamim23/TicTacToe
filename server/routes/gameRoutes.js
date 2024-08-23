const express = require('express');
const User = require('../models/user');
const { updateEloRating } = require('../services/eloService'); // Move Elo logic to a service

const router = express.Router();

// Update score endpoint
router.post('/update-score', async (req, res) => {
  const { userId, result } = req.body;

  try {
    const player = await User.findById(userId);
    if (!player) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log( result);
    // Update scores
        switch (result) {
          case 'win':
            player.scores.wins += 1;
            break;
          case 'loss':
            player.scores.losses += 1;
            break;
          case 'draw':
            player.scores.draws += 1;
            break;
          default:
            break;
        }
    
    // Update Elo rating
    updateEloRating(player, result);
    await player.save();

    res.status(200).json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save game state
router.post('/save-game', async (req, res) => {
  const { userId, gameState } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { gameState });
    res.status(200).json({ message: 'Game state saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving game state' });
  }
});

// Retrieve game state
router.post('/load-game', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ gameState: user.gameState });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error loading game state' });
  }
});

// Endpoint to get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().select('username scores eloRating').sort({ eloRating: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;