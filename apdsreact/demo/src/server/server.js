// server.js (inside src/server/)

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const https = require('https');
const helmet = require('helmet'); // Import Helmet
const ExpressBrute = require('express-brute'); // Import Express Brute
const MemoryStore = require('express-brute').MemoryStore; // In-memory store for brute-force protection

const fs = require('fs');
// Correct paths to routes
const authRoutes = require('./routes/auth'); 
const homeRoutes = require('./routes/home'); // Import the home route
const recipientRoutes = require('./routes/recipient');

dotenv.config();

const app = express();

const server = https.createServer({
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
  },app);

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust the origin as needed for your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet()); // Use Helmet to secure Express apps
app.use(express.json()); // Parse JSON request bodies

// Set up Express Brute for brute-force protection
const store = new MemoryStore();
const bruteforce = new ExpressBrute(store, {
    freeRetries: 100, // Allow 5 attempts
    minWait: 5000, // 5 seconds before allowing another attempt
    maxWait: 60000, // 60 seconds maximum wait time
    lifetime: 300, // Block for 5 minutes after the limit is reached
});

// Use the routes
app.use('/api/auth', bruteforce.prevent, authRoutes); // Apply brute-force protection to auth routes
app.use('/api/home', homeRoutes); // Home route
app.use('/api/recipient', recipientRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
