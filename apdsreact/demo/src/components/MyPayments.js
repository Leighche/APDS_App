// MyPayments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Views/MyPayments.css'; 

const axiosInstance = axios.create({
  baseURL: '/api',
});

function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch payments from the API when the component mounts
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get('/pay'); 
        const loggedInUsername = localStorage.getItem('username'); 
        const filteredPayments = response.data.filter(pay => pay.username === loggedInUsername);
        setPayments(filteredPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Error fetching payments'); 
      }
    };

    fetchPayments();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="payments-list-container">
      <h1>Your Payments</h1>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}

      <ul className="payments-list">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <li key={payment._id}>
              <strong>Amount:</strong> {payment.amount} {payment.currency} <br />
              <strong>Recipient:</strong> {payment.recipient} <br />
              <strong>SWIFT Code:</strong> {payment.swiftCode} <br />
              <strong>Reference:</strong> {payment.paymentReference} <br />
            </li>
          ))
        ) : (
          <li>No payments found.</li>
        )}
      </ul>
    </div>
  );
}

export default MyPayments;
