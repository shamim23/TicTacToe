import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/auth.css'; 

const Auth = ({ setIsAuthenticated, setUserId, setUsername }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', formData.username);
      
      setUserId(response.data.userId);
      setUsername(formData.username);
      setIsAuthenticated(true);
      setError('');
      setSuccessMessage('Login Successful');
      setTimeout(() => setSuccessMessage(''), 3000);
      navigate('/game');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setIsLogin(true);
      setSuccessMessage('Registration Successful');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={isLogin ? handleUserLogin : handleUserRegistration} className="auth-form">
        <h2>TicTacToe</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p className="toggle-link">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setError('');
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;