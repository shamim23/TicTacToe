import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/auth';
import TicTacToe from './ticTacToe';
import NavBar from './components/navBar';
import Leaderboard from './components/leaderboard';
import ticTacToeImage from './images/tictactoe.webp';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // User is authenticated
      const storedUserId = localStorage.getItem('userId'); // Retrieve userId from local storage
      const storedUsername = localStorage.getItem('username'); // Retrieve username from local storage
      if (storedUserId) setUserId(storedUserId);
      if (storedUsername) setUsername(storedUsername);
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    localStorage.removeItem('userId'); // Clear userId from local storage
    localStorage.removeItem('username'); // Clear username from local storage
    setIsAuthenticated(false); // Reset authentication state
    setUserId(null);
    setUsername('');
  };

  // Show a loading message or spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>; 
  }


  return (
    <Router>
      <div className="App">
        {isAuthenticated && <NavBar onLogout={handleLogout} />}
        <Routes>
          <Route path="/game" element={isAuthenticated ?  
            <div className="game-and-leaderboard">
              <TicTacToe userId={userId} username={username} />
            </div> : <Navigate to="/" />} />
          <Route path="/leaderboard" element={isAuthenticated ?  
            <div className="game-and-leaderboard">
              <Leaderboard />
            </div> : <Navigate to="/" />} />
          <Route path="/" element={<div className="auth-container">
              <Auth setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} setUsername={setUsername} />
              <img src={ticTacToeImage} alt="Description" className="auth-image" />
            </div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;