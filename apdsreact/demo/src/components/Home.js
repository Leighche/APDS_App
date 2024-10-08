import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Views/Home.css'; // Ensure you import the CSS file

function Home() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    sessionStorage.removeItem('username');
     navigate('/login');
  }

  return (
    <div className="Home-background">
      <div className="home-container">
        <h1>Thyme Home</h1>
        <div className="button-container">
          <button 
            className="big-button" 
            style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/419466/screenshots/7187243/media/993dc71269f5ab2a9faff9fe9db69a60.gif)' }} 
            onClick={() => navigate('/recipients')} // Navigate to the Recipients page
          >
            <span>RECIPIENTS</span>
          </button>
          <button 
            className="big-button" 
            style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/1523313/screenshots/13591454/media/b5c05bf8f1512759f199bdf613995297.gif)' }} 
            onClick={() => navigate('/pay-portal')} // Navigate to the Pay Portal page
          >
            <span>PAY PORTAL</span>
          </button>
          <button 
            className="big-button" 
            style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/419466/screenshots/7187243/media/993dc71269f5ab2a9faff9fe9db69a60.gif)' }} 
            onClick={() => navigate('/my-payments')} // Navigate to the Recipients page
          >
            <span>MY PAYMENTS</span>
          </button>
        </div>
       <button onClick={handleLogout} className="btn btn-danger">
Logout
       </button>
      </div>
    </div>
  );
}

export default Home;
