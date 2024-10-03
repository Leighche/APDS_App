import React, { useState } from 'react';
import './Views/Pay.css'; // Ensure you import the CSS file

function Pay() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('$');
  const [recipient, setRecipient] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [error, setError] = useState(''); // State to hold error message

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the amount
    if (amount < 0) {
      setError('Amount to Pay cannot be negative');
      return;
    }

    setError(''); // Clear error message if valid
    // Here you can handle the submission to your MongoDB or perform any action
    console.log({
      amount,
      currency,
      recipient,
      swiftCode,
      paymentReference,
    });
  };

  return (
    <div className="Pay-background">
      <div className="pay-container">
        <h1>Payment Details</h1>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount to Pay</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0" // Prevents negative numbers in input
            />
          </div>

          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="¥">JPY (¥)</option>
              <option value="₹">INR (₹)</option>
              <option value="R">ZAR (R)</option>
              {/* Add more currency options as needed */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="recipient">Recipient</label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="swiftCode">SWIFT Code</label>
            <input
              type="text"
              id="swiftCode"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentReference">Payment Reference</label>
            <input
              type="text"
              id="paymentReference"
              value={paymentReference}
              onChange={(e) => setPaymentReference(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">Submit Payment</button>
        </form>
      </div>
    </div>
  );
}

export default Pay;
