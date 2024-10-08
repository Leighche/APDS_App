import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Views/Recipient.css'; 

// Code Attribution:
// Authour:guriasoft
// Link: https://guriasoft.com/server-side/node-js/jwt-secret


const banks = [
  'First National Bank',
  'ABSA Group',
  'NedBank',
  'Capitec',
  'Standard Bank',
  'Discovery Bank',
  'Investec Bank',
  'Barclays Africa Group',
  'African Bank',
  'Other Banks',
];


function Recipient() {
  const [username, setusername] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setusername(storedUsername);
    } else {
      console.error('No username found in session storage.');
    }
  }, []);

  // Initialize useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const recipientData = {
      username,
      fullName,
      bank: selectedBank,
      branchAddress,
      accountNumber,
    };

    try {
      const response = await axios.post('/api/recipient', recipientData);
      console.log('Recipient added:', response.data);
      
      // Redirect to the home page after a successful submission
      navigate('/home'); 
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