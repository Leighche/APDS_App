// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const https = require('https');
const helmet = require('helmet');
const ExpressBrute = require('express-brute');
const MemoryStore = require('express-brute').MemoryStore;
const fs = require('fs');
const path = require('path'); // Import path module

// Load environment variables
dotenv.config(); // Automatically loads from the root

// Resolve paths to SSL certificate and key files
const sslCrtFile = path.resolve(__dirname, process.env.SSL_CRT_FILE);
const sslKeyFile = path.resolve(__dirname, process.env.SSL_KEY_FILE);

// Log resolved paths for debugging
console.log("Resolved SSL_CRT_FILE:", sslCrtFile);
console.log("Resolved SSL_KEY_FILE:", sslKeyFile);

// Correct paths to routes
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const recipientRoutes = require('./routes/recipient');

const app = express();

// Create an HTTPS server
const server = https.createServer({
    key: fs.readFileSync(sslKeyFile), // Use resolved path
    cert: fs.readFileSync(sslCrtFile)  // Use resolved path
}, app);

// Middleware
app.use(cors({
    origin: 'https://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());

// Set up Express Brute for brute-force protection
const store = new MemoryStore();
const bruteforce = new ExpressBrute(store, {
    freeRetries: 100,
    minWait: 5000,
    maxWait: 60000,
    lifetime: 300,
});

// Use the routes
app.use('/api/auth', bruteforce.prevent, authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/recipient', recipientRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Start the HTTPS server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => console.log(`Server running on https://localhost:${PORT}`));
