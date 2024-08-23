// services/eloService.js
const updateEloRating = (player, result) => {
    const K = 32; // K-factor
    const opponentRating = 1200; // Assume a fixed opponent rating for a single player game
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - player.eloRating) / 400));
  
    let actualScore;
    switch (result) {
      case 'win':
        actualScore = 1;
        break;
      case 'draw':
        actualScore = 0.5;
        break;
      case 'loss':
        actualScore = 0;
        break;
      default:
        actualScore = 0;
    }
  
    player.eloRating += K * (actualScore - expectedScore);
    player.eloRating = Math.round(player.eloRating);
  
    return player;
  };
  
  module.exports = { updateEloRating };