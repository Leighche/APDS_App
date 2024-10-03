import React, { useState } from 'react';
import axios from 'axios'; // or import your configured axios instance
import { useNavigate } from 'react-router-dom';
import './Views/Register.css'; // Import your CSS file

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/api/auth', // Base URL for the auth API
});

const Register = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [idNumberError, setIdNumberError] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Reset error messages
    setUsernameError('');
    setFullNameError('');
    setIdNumberError('');
    setAccountNumberError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate inputs
    let hasError = false;

    if (!username) {
        setUsernameError('Username is required');
        hasError = true;
    }

    if (!fullName) {
        setFullNameError('Full name is required');
        hasError = true;
    }

    if (!/^\d{13}$/.test(idNumber)) { // ID number must be 13 digits
        setIdNumberError('ID number must be 13 digits');
        hasError = true;
    }

    if (!/^\d+$/.test(accountNumber)) { // Account number must be numeric
        setAccountNumberError('Account number must be numeric');
        hasError = true;
    }

    if (password.length < 6) { // Example: Minimum password length
        setPasswordError('Password must be at least 6 characters long');
        hasError = true;
    }

    if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        hasError = true;
    }

    if (hasError) return; // Stop if there are validation errors

    // Log registration data
    console.log({ username, fullName, idNumber, accountNumber, password });

    try {
      const response = await axiosInstance.post('/register', { 
        username, // Include the username in the request
        fullName, 
        idNumber, 
        accountNumber, 
        password 
      });
      if (response.data.message) {
          navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (err) {
        console.error('Registration error:', err);
        setUsernameError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-background">
      <div className="container">
        <h1>Grow with Thyme</h1>
        <h4>Please create an account</h4>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName"
              placeholder="Full Name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
            {fullNameError && <p className="error-message">{fullNameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="idNumber">ID Number</label>
            <input 
              type="text" 
              id="idNumber"
              placeholder="ID Number (13 digits)" 
              value={idNumber} 
              onChange={(e) => setIdNumber(e.target.value)} 
              required 
            />
            {idNumberError && <p className="error-message">{idNumberError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <input 
              type="text" 
              id="accountNumber"
              placeholder="Account Number" 
              value={accountNumber} 
              onChange={(e) => setAccountNumber(e.target.value)} 
              required 
            />
            {accountNumberError && <p className="error-message">{accountNumberError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
          </div>
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <a href="/login">Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Register;
