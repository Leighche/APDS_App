const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
   username: { type: String, required: true },
    fullName: { type: String, required: true },
    bank: { type: String, required: true },
    branchAddress: { type: String, required: true },
    accountNumber: { type: String, required: true }, 
});

const Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;

