import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/auth';
import TicTacToe from './ticTacToe';
import NavBar from './components/navBar';
import Leaderboard from './components/Leaderboard';

const App: React.FC = () => {

  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const storedUserId = localStorage.getItem('userId');
      const storedUsername = localStorage.getItem('username');
      if (storedUserId) setUserId(storedUserId);
      if (storedUsername) setUsername(storedUsername);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUserId(null);
    setUsername('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <NavBar onLogout={handleLogout} onShowLeaderboard={() => null} />}
        <Routes>
          <Route
            path="/game"
            element={
              isAuthenticated ? (
                <div className="game-and-leaderboard">
                  <TicTacToe userId={userId} username={username} />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/leaderboard"
            element={
              isAuthenticated ? (
                <div className="game-and-leaderboard">
                  <Leaderboard />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={
              <div className="auth-container">
                <Auth
                  setIsAuthenticated={setIsAuthenticated}
                  setUserId={setUserId}
                  setUsername={setUsername}
                />
                <img src={'http://localhost:3001/tictactoe.png'} alt="Description" className="auth-image" />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
