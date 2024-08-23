const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gameState: {
    type: Array, 
    default: null,
  },
  scores: {
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
  },
  eloRating: { type: Number, default: 1200 } // Add Elo rating

});

module.exports = mongoose.model('User', UserSchema);