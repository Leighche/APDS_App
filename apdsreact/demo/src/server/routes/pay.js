const express = require('express');
const router = express.Router();
const Payment = require('../models/Pay');

// POST endpoint to add new payment
router.post('/', async (req, res) => {
    const { username, amount, currency, recipient, swiftCode, paymentReference } = req.body;

    try {
        // Create a new payment instance
        const newPayment = new Payment({
            username,
            amount,
            currency,
            recipient,
            swiftCode,
            paymentReference,
        });

        // Save the payment to the database
        const savedPayment = await newPayment.save();

        // Respond with the saved payment data
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error('Error adding payment:', error);
        res.status(500).json({ message: 'Error adding payment' });
    }
});

// GET endpoint to retrieve all payments
router.get('/', async (req, res) => {
    try {
      const payments = await Payment.find(); // Fetch all payments from the database
      res.status(200).json(payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ message: 'Error fetching payments' });
    }
  });

module.exports = router;