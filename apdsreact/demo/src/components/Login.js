import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA
import './Views/Login.css';
 
function Login() {
  const [accountNumber, setAccountNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0); // Track login attempts
  const [showCaptcha, setShowCaptcha] = useState(false); // To show reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState(null); // Store reCAPTCHA token
  const navigate = useNavigate();
 
  // Google reCAPTCHA site key
  const recaptchaSiteKey = '6LchiFgqAAAAAOS57cFPD81caw_Q3We9Hacy6kjL';
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Check if captcha is required and not solved
    if (showCaptcha && !captchaToken) {
      alert('Please complete the CAPTCHA');
      return;
    }
 
    try {
      const response = await axios.post('/api/auth/login', {
        accountNumber,
        username,
        password,
        captchaToken, // Send captcha token to the backend if it exists
      });
 
      sessionStorage.setItem("username", username);
      localStorage.setItem('username', username);

      localStorage.setItem('accountNumber', accountNumber);
      
      const uns = sessionStorage.getItem("username");

      // Reset captcha and login attempts on success
      const un = localStorage.getItem('username');

      alert(response.data.message + ": " + uns);
      setLoginAttempts(0);
      setCaptchaToken(null);
      setShowCaptcha(false);
 
      navigate('/Home');
    } catch (error) {
      console.error('Login error:', error);
 
      // Increment login attempts on failure
      setLoginAttempts(prevAttempts => prevAttempts + 1);
 
      if (loginAttempts + 1 >= 5) {
        // Show CAPTCHA if there are 5 or more failed attempts
        setShowCaptcha(true);
      }
 
      alert('Login failed: ' + (error.response?.data?.message || 'An unexpected error occurred'));
    }
  };
 
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Set reCAPTCHA token
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
          {/* Show CAPTCHA only after 5 failed login attempts */}
          {showCaptcha && (
<ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={handleCaptchaChange}
            />
          )}
<button type="submit" className="btn-primary">Login</button>
</form>
<a href="/register">Have an Account? Register?</a>
<div className="separator">
<span>OR</span>
</div>
<button onClick={() => navigate('/admin')} className="btn-secondary">
<FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} />
          Admin Registration
</button>
</div>
</div>
  );
}
 
export default Login;