const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Recipient schema and model (if not defined elsewhere)
const recipientSchema = new mongoose.Schema({
    username:{type: String, required: true},
    fullName: { type: String, required: true },
    bank: { type: String, required: true },
    branchAddress: { type: String, required: true },
    accountNumber: { type: String, required: true },
});

const Recipient = mongoose.model('Recipient', recipientSchema);

// POST endpoint to add new recipient
router.post('/', async (req, res) => {
    const {username, fullName, bank, branchAddress, accountNumber } = req.body;
   
    try {
        // Create a new recipient instance
        const newRecipient = new Recipient({
            username,
            fullName,
            bank,
            branchAddress,
            accountNumber,
        });

        // Save the recipient to the database
        const savedRecipient = await newRecipient.save();

        // Respond with the saved recipient data
        res.status(201).json(savedRecipient);
    } catch (error) {
        console.error('Error adding recipient:', error);
        res.status(500).json({ message: 'Error adding recipient' });
    }
});

// GET endpoint to fetch all recipients
router.get('/', async (req, res) => {
    try {
        const recipients = await Recipient.find();
        res.status(200).json(recipients);
    } catch (error) {
        console.error('Error fetching recipients:', error);
        res.status(500).json({ message: 'Error fetching recipients' });
    }
});

module.exports = router;