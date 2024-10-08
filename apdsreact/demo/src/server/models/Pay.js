const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    recipient: { type: String, required: true },
    swiftCode: { type: String, required: true },
    paymentReference: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;