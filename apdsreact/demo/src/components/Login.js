import { useState } from 'react';
import axios from 'axios';
import './Views/Login.css';

function Login() {
  const [accountNumber, setAccountNumber] = useState('');
  const [username, setUsername] = useState(''); // Added username state
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { accountNumber, username, password });
      alert(response.data.message);
    } catch (error) {
      alert('Login failed');
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
      </div>
    </div>
  );
}

export default Login;
