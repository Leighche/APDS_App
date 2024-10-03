import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import the icon you want to use
import './Views/Login.css';

function Login() {
  const [accountNumber, setAccountNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:3002/api/auth/login', {
        accountNumber,
        username,
        password
      });
      alert(response.data.message);
      navigate('/Home'); // Navigate to /Home on successful login
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'An unexpected error occurred'));
    }
  };

  return (
    <div className="login-background">
      <div className="container">
        <h1>Welcome to Thyme Bank</h1>
        <h4>Please log in to continue</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <input 
              type="text" 
              id="accountNumber"
              value={accountNumber} 
              onChange={(e) => setAccountNumber(e.target.value)} 
              placeholder="Account Number" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
          </div>
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <a href="/register">Have an Account? Register?</a>
        <div className="separator">
          <span>OR</span>
        </div> {/* Horizontal line with OR text */}
        {/* Add a button to navigate to the registration page */}
        <button onClick={() => navigate('/admin')} className="btn-secondary">
          <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} /> {/* Icon with margin */}
          Admin Registration
        </button>
      </div>
    </div>
  );
}

export default Login;
