// routes/home.js
const express = require('express');
const router = express.Router();

// Home endpoint
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Thyme Bank Home!' });
});

module.exports = router;
