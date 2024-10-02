const express = require('express');
const Recipient = require('../models/Recipient'); // Adjust the path according to your structure
const router = express.Router();

// GET all recipients
router.get('/', async (req, res) => {
    try {
        const recipients = await Recipient.find();
        res.json(recipients);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new recipient
router.post('/', async (req, res) => {
    const { fullName, bank, branchAddress, accountNumber } = req.body;

    const newRecipient = new Recipient({
        fullName,
        bank,
        branchAddress,
        accountNumber,
    });

    try {
        const savedRecipient = await newRecipient.save();
        res.status(201).json(savedRecipient);
    } catch (error) {
        res.status(400).json({ message: 'Error adding recipient' });
    }
});

module.exports = router;
