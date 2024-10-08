// server/routes/auth.js
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validateRegistration, validateLogin, checkValidationResult } = require('../middleware/validation');
const ExpressBrute = require('express-brute');

// Code Attribution:
// Authour:guriasoft
// Link: https://guriasoft.com/server-side/node-js/jwt-secret


const router = express.Router();

// Brute force middleware to protect against too many login/register attempts
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 5000,
    maxWait: 60000,
    lifetime: 300
});

// Registration endpoint
router.post('/register', (req, res, next) => {
    console.log("Received registration request:", req.body);
    next();
}, bruteforce.prevent, validateRegistration, checkValidationResult, async (req, res) => {
    const { username, password, fullName, idNumber, accountNumber } = req.body;

    console.log(`Registration attempt for username: ${username}`);

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ username, password, fullName, idNumber, accountNumber });
        await newUser.save();

        console.log(`User registered successfully: ${username}`);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Login endpoint
router.post('/login', bruteforce.prevent, validateLogin, checkValidationResult, async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            username : username,
            password : password
          };
       
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'  
          });
 
          res.status(200).json({ message: 'Login successful', token: token, name: req.body.name});
          return token;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;