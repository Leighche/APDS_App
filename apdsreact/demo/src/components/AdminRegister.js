import React, { useState } from 'react';
import './Views/AdminRegister.css'; // Import the CSS file

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onLogin function to simulate authentication
        onLogin(); 
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Round image for the profile or logo */}
                                
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                    <img 
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" // Replace with your image URL
                    alt="Profile"
                    className="profile-image" 
                />
                    <h2 className="login-title">Welcome Back!</h2>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <div className="image-container"></div> {/* Image container */}
        </div>
    );
};

export default Login;
