![Thyme Bank Logo](https://github.com/user-attachments/assets/c9777219-1cf4-4055-b7bb-cc4215733b66)

# Thyme Bank International Payment System


This is the **Thyme Bank International Payment System** that allows customers to make international payments via the online banking site. The system has two portals:
- **Customer Portal**: For customers to register, log in, and make international payments.
- **Employee Portal**: For bank employees to review and forward transactions via SWIFT.

<div align="right">
<img src ="https://media.lordicon.com/icons/wired/flat/2482-ssl-security.gif" width="150"/>
</div>

## Table of Contents

- [Features](#features)
  - [Customer Portal](#customer-portal)
  - [Employee Portal](#employee-portal)
- [Key Security Features](#key-security-features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
  - [Customer Portal Usage](#customer-portal-usage)
  - [Employee Portal Usage](#employee-portal-usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Security Considerations](#security-considerations)
- [License](#license)

   <img src="https://github.com/user-attachments/assets/b84f7ecf-e714-42e1-92da-5e56f49f1b7f" width="200"/>

---

## Features

### Customer Portal
- **Registration**: Customers register by providing full name, ID number, account number, and a secure password.
- **Login**: Registered customers log in using their username, account number, and password.
- **Make Payments**: 
  - Enter payment amount
  - Select currency
  - Choose payment provider (primarily SWIFT)
  - Enter payee’s account information and SWIFT code
  - Finalize the transaction by clicking "Pay Now"
- **Transaction Security**: Payments are securely stored in the database and displayed on the employee's international payments portal.

### Employee Portal
- **Login**: Pre-registered employees log in to access the payment portal.
- **Verify Transactions**: Employees verify payee account information and SWIFT codes before forwarding to SWIFT.
- **Finalize Transactions**: Employees complete the transaction by clicking the "Verified" button and submit the payment to SWIFT.

---

## Key Security Features

1. **Password Security**: 
   - Strong password policies implemented.
   - Secure password storage with hashing and salting using bcrypt.

2. **Input Whitelisting**:
   - All inputs are validated to prevent malicious data entries.

3. **Data Security**:
   - Sensitive data (ID number, account number, passwords) is encrypted in the database.
   - Data is transmitted over SSL to protect against eavesdropping and man-in-the-middle attacks.

4. **Protection Against Attacks**:
   - **Helmet** is used to secure HTTP headers.
   - **Express Brute** is used to prevent brute-force login attempts.
   - CSRF protection is implemented.

5. **DevSecOps Pipeline**:
   - Continuous Integration (CI) and Continuous Deployment (CD) pipeline ensures security checks are integrated into development.
   - Security vulnerabilities are checked before deployment using tools like `Snyk` or `npm audit`.

<div align="right">
     <img src="https://github.com/user-attachments/assets/c5217783-b592-4e16-90ab-e9691e62541d" width="260"/>
</div>

---

## Technologies Used

| Component         | Technology                                         |
|-------------------|----------------------------------------------------|
| **Frontend**       | React.js                                           |
| **Backend**        | Node.js (Express)                                  |
| **Database**       | MongoDB (for storing customer and transaction data securely) |
| **Authentication** | JWT (JSON Web Token for customer and employee login sessions) |
| **Security**       | bcrypt, Helmet, SSL, Express Brute, recaptcha, CSFR token                 |

---

## Setup and Installation

1. Clone the repository:
```
   git clone https://github.com/yourusername/thyme-bank.git
```
2. Install dependencies:

```
 cd thyme-bank
```

```
 npm install
```
```
 npm install -g nodemon
 ```
```
 npm install helmet
 ```
```
 npm install express-rate-limit
 ```
```
 npm list mongodb
 ```
```
 npm install express bcrypt express-validator
 ```
```
 npm install express-brute helmet
 ```
```
 npm install bcryptjs
 ```
```
npm install react-router-dom
```
```
npm install react-google-recaptcha
```
```
npm install axios
```
```
npm install node-fetch
```
```
npm install cross-env --save-dev
```
```
npm install express jsonwebtoken dotenv
```
```
npm i react-helmet-async
```

3. Set up environment variables: Add to the .env file in the root directory and add the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SSL_CERT=your_ssl_certificate_path
SSL_KEY=your_ssl_key_path
RECAPTCHA_SITE_KEY=your_site_key_from_google
RECAPTCHA_SECRET_KEY=your_secret_key_from_google
```
4. Run the app:
```
npm start
```

`Visit https://localhost:3000 to access the app.`


## APP UI

<table>
  <tr>
    <td>
      <img width="400" alt="Screenshot 2024-10-04 at 00 19 16" src="https://github.com/user-attachments/assets/60787b34-abc8-4a14-b764-2dd208c87be5">
      <p>Description for Image 1</p>
    </td>
    <td>
      <img width="400" src="https://github.com/user-attachments/assets/edb3bb85-2763-4ec3-86f7-52dbc8374ff8" alt="Screenshot 2024-10-02 at 05 40 25"/>
      <p>Description for Image 2</p>
    </td>
  </tr>
  <tr>
    <td>
      <img width="400" src="https://github.com/user-attachments/assets/0a0cadec-7e96-45bf-a01f-3c7f9cd9c5b1" alt="Screenshot 2024-10-02 at 05 40 44"/>
      <p>Description for Image 3</p>
    </td>
    <td>
      <img width="400" src="https://github.com/user-attachments/assets/de53e8fb-6844-4e91-9d62-467caee9e6ce" alt="Screenshot 2024-10-02 at 05 40 55"/>
      <p>Description for Image 4</p>
    </td>
  </tr>
  <tr>
    <td>
      <img width="400" src="https://github.com/user-attachments/assets/4dce745d-4942-4948-904d-52ae4b7cf912" alt="Screenshot 2024-10-02 at 05 41 09"/>
      <p>Description for Image 5</p>
    </td>
    <td>
      <img width="400" alt="Screenshot 2024-10-04 at 00 19 48" src="https://github.com/user-attachments/assets/accae0ee-2398-4e49-b664-39910a945719">
      <p>Description for Image 6</p>
    </td>
  </tr>
</table>

## Usage

### Customer Portal Usage
- Register a new account.
- Log in with your account credentials.
- Navigate to the payment section, enter the necessary payment details, and submit the payment.

### Employee Portal Usage
- Log in using your employee credentials.
- Verify transactions and forward them to SWIFT for payment processing.

<img src="https://i.pinimg.com/originals/5c/37/14/5c3714cba608140b1d6c15ce3f699068.gif" width="300"/>

---

## Roadmap

### v1.0
- [x] Login & Registration
- [x] API
- [x] Security Protocols

### v1.1
- [ ] Implement 2FA (Two-Factor Authentication) for customer and employee logins
- [ ] Introduce a multi-currency converter for customers

### v2.0
- [ ] Mobile-friendly interface for both portals
- [ ] Real-time transaction tracking and notification system
- [ ] Expanded support for alternative payment methods (e.g., cryptocurrency integration)
- [ ] Integration with additional third-party payment gateways

---

## Contributing

We welcome contributions to improve the Thyme Bank International Payment System! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes.
4. Push to your forked repository: `git push origin feature-branch-name`.
5. Open a Pull Request, explaining your changes and their benefits.

     <img src="https://github.com/user-attachments/assets/a8906186-cba0-4d44-ad5b-0ff46a89b34e" width="260"/>

---

## Security Considerations

- **Password Encryption**: Customer and employee passwords are hashed using bcrypt before being stored in the database.
- **SSL Encryption**: All data transmitted between the client and server is encrypted using SSL.
- **Rate Limiting**: Express Brute is implemented to protect against brute-force login attempts.
- **CSRF Protection**: CSRF tokens are used to secure form submissions.

<div align="right">
       <img src="https://github.com/user-attachments/assets/160fb321-8c18-473b-8962-63eefba43e6b" width="260"/>
</div>


## License

This project is licensed under the MIT License. See the LICENSE file for more details.

-by Leighché Jaikarran, Tanya Govender, Naiya Haribhai and Vikhayle Sewnundan
  
