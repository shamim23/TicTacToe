import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/leaderboard.css'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {

      try {
        
        const response = await axios.get('http://localhost:5000/api/game/leaderboard');
        setLeaderboard(response.data);
      } catch (err) {
        setError('Error fetching leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (

    <div className="leaderboard">
      <div className="head">
        <i className="fas fa-crown"></i>
        <h1>Leaderboard</h1>
      </div>
      <div className="body">
        <ol>
          {leaderboard.map((user, index) => (
            <li key={user.username}>
              <mark>{user.username}</mark>
              <small>{user.eloRating}</small>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );

 
};

export default Leaderboard;