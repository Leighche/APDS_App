import React, { useState, useEffect } from 'react';
import './Views/Pay.css'; // Ensure you import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const axiosInstance = axios.create({
  baseURL: '/api',
});

function Pay() {
    const [username, setusername] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('$');
    const [recipients, setRecipients] = useState([]); // State to hold recipients
    const [recipient, setRecipient] = useState('');
    const [swiftCode, setSwiftCode] = useState('');
    const [paymentReference, setPaymentReference] = useState('');
    const [error, setError] = useState(''); // State to hold error message

    const navigate = useNavigate(); 

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setusername(storedUsername);
        } else {
            console.error('No username found in session storage.');
        }

        const fetchRecipients = async () => {
            try {
                const response = await axiosInstance.get('/recipient');
                const filteredRecipients = response.data.filter(rec => rec.username === storedUsername);
                setRecipients(filteredRecipients);
            } catch (error) {
                console.error('Error fetching recipients:', error);
            }
        };

        fetchRecipients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the amount
        if (amount < 0) {
            setError('Amount to Pay cannot be negative');
            return;
        }

        setError(''); // Clear error message if valid

        // Prepare payment data
        const paymentData = {
            username,
            amount: parseFloat(amount), // Ensure amount is a number
            currency,
            recipient,
            swiftCode,
            paymentReference,
        };

        try {
            // Send payment data to the backend
            await axiosInstance.post('/pay', paymentData);
            // Redirect to home page after successful submission
            navigate('/home'); // Adjust the path as per your routing
        } catch (error) {
            console.error('Error submitting payment:', error);
            setError('Error submitting payment'); // Set error message if submission fails
        }
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
                        <select
                            id="recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            required
                        >
                            <option value="">Select Recipient</option>
                            {recipients.map((rec) => (
                                <option key={rec._id} value={rec.fullName}>
                                    {rec.fullName}
                                </option>
                            ))}
                        </select>
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