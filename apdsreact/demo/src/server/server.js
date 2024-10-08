const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const https = require('https');
const helmet = require('helmet');
const ExpressBrute = require('express-brute');
const MemoryStore = require('express-brute').MemoryStore;
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

// Resolve paths to SSL certificate and key files
const sslCrtFile = path.resolve(__dirname, process.env.SSL_CRT_FILE);
const sslKeyFile = path.resolve(__dirname, process.env.SSL_KEY_FILE);

// Correct paths to routes
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const recipientRoutes = require('./routes/recipient');
const paymentRoutes = require('./routes/pay'); 

const app = express();

const JWT_SECRET = process.env.JWT_SECRET;

// Create an HTTPS server
const server = https.createServer({
    key: fs.readFileSync(sslKeyFile),
    cert: fs.readFileSync(sslCrtFile),
}, app);

// Middleware
app.use(cors({
    origin: 'https://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(helmet());
app.use(express.json());

// Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied: No Token Provided');
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).send('Invalid Token');
      
      req.user = decoded;  // Store decoded token data in request
      next();
    });
  }


// Set up Express Brute for brute-force protection
const store = new MemoryStore();
const bruteforce = new ExpressBrute(store, {
    freeRetries: 5, // 5 login attempts before reCAPTCHA is triggered
    minWait: 5000,
    maxWait: 60000,
    lifetime: 300,
});

// Function to verify reCAPTCHA
async function verifyCaptcha(captchaToken) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    const response = await fetch(verificationUrl, { method: 'POST' });
    const result = await response.json();
    return result.success;
}

// Define your login route with reCAPTCHA integration
authRoutes.post('/login', bruteforce.prevent, async (req, res) => {
    const { username, password, captchaToken } = req.body;

    // Verify reCAPTCHA token if it exists
    if (captchaToken) {
        const isCaptchaValid = await verifyCaptcha(captchaToken);
        if (!isCaptchaValid) {
            return res.status(400).json({ error: 'reCAPTCHA verification failed' });
        }
    }

    // Proceed with your login logic (authenticate user)
    if (username === 'test' && password === 'password') {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Generate JWT
app.post('/login', (req, res) => {
    const { username } = req.body;
    const payload = { username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ token });
  });


// Use the routes
app.use('/api/auth', bruteforce.prevent, authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/recipient', recipientRoutes);
app.use('/api/pay', paymentRoutes); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.get('/protected', authenticateToken, (req, res) => {
        res.send(`Hello ${req.user.username}, you accessed a protected route!`);
      });
// Start the HTTPS server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => console.log(`Server running on https://localhost:${PORT}`));