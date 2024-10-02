// server.js (inside src/server/)

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet'); // Import Helmet
const ExpressBrute = require('express-brute'); // Import Express Brute
const MemoryStore = require('express-brute').MemoryStore; // In-memory store for brute-force protection

// Correct paths to routes
const authRoutes = require('./routes/auth'); 
const homeRoutes = require('./routes/home'); // Import the home route
const recipientRoutes = require('./routes/recipient');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet()); // Use Helmet to secure Express apps
app.use(express.json());

// Set up Express Brute for brute-force protection
const store = new MemoryStore();
const bruteforce = new ExpressBrute(store, {
    freeRetries: 5, // Allow 5 attempts
    minWait: 5000, // 5 seconds before allowing another attempt
    maxWait: 60000, // 60 seconds maximum wait time
    lifetime: 300, // Block for 5 minutes after the limit is reached
});

// Use the routes
app.use('/api/auth', bruteforce.prevent, authRoutes); // Protect authentication routes
app.use('/api/home', homeRoutes); // Home route
app.use('/api/recipient', recipientRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
