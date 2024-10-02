import React, { useState } from 'react';
import axios from 'axios';
import './Views/Recipient.css'; // Optional: Add your CSS styles here

const banks = [
  'First National Bank',
  'ABSA Group',
  'NedBank',
  'Capitec',
  'NedBank',
  'Standard Bank',
  'Discovery Bank',
  'FNB',
  'Investec Bank',
  'Barclays Africa Group',
  'African Bank',
  'Other Banks',
];

function Recipient() {
  const [fullName, setFullName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const recipientData = {
      fullName,
      bank: selectedBank,
      branchAddress,
      accountNumber,
    };

    try {
      const response = await axios.post('/api/recipients', recipientData);
      console.log('Recipient added:', response.data);
      // Reset form fields or show a success message if needed
    } catch (error) {
      console.error('Error adding recipient:', error);
    }
  };

  return (
    <div className="recipient-background">
    <div className="recipient-container">
      <h1>Add Recipient</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Bank:</label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            required
          >
            <option value="">Select Bank</option>
            {banks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Branch Address:</label>
          <input
            type="text"
            value={branchAddress}
            onChange={(e) => setBranchAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Add Recipient</button>
        </form>
    </div>
    </div>
  );
}

export default Recipient;
