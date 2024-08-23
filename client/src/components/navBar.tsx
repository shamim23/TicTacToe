import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/NavBar.css'; // Import the CSS for styling

type NavBarProps = {
  onLogout: () => any
  onShowLeaderboard: () => any
}

const NavBar: React.FC<NavBarProps> = ({ onLogout, onShowLeaderboard }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleGameClick = () => {
    navigate('/game'); // Navigate to the game route
  };

  const handleLeaderboardClick = () => {
    navigate('/leaderboard'); // Call the function to show the leaderboard
  };

  return (
    <nav>
      {location.pathname !== '/' && (
        <div className="navbar">
          <h1 className="navbar-title">Tic Tac Toe</h1>
          <div className="navbar-links">
            <button className="navbar-button" onClick={handleGameClick}>Game</button>
            <button className="navbar-button" onClick={handleLeaderboardClick}>Leaderboard</button>
            <button className="navbar-button" onClick={onLogout}>Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;