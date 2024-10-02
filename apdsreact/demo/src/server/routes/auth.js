// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt'); // Make sure this is installed
const User = require('../models/User'); // Adjust the path according to your structure
const { validateRegistration, validateLogin, checkValidationResult } = require('../middleware/validation');

const router = express.Router();

// Registration endpoint
router.post('/register', validateRegistration, checkValidationResult, async (req, res) => {
    const { username, password, fullName, idNumber, accountNumber } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword, fullName, idNumber, accountNumber });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: 'Server error' });
    }
});

// Login endpoint
router.post('/login', validateLogin, checkValidationResult, async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Optionally, return user data or generate a token here
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
