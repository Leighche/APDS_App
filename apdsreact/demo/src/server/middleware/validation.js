const { body, validationResult } = require('express-validator');

// Registration validation middleware
const validateRegistration = [
    body('username')
        .isAlphanumeric()
        .isLength({ min: 6, max: 20 })
        .withMessage('Username must be alphanumeric and 6-20 characters long'),
    body('fullName')
        .isString()
        .isLength({ max: 100 })
        .withMessage('Full name is required and should not exceed 100 characters'),
    body('idNumber')
        .isNumeric()
        .isLength({ min: 13, max: 13 })
        .withMessage('ID number must be exactly 13 digits'),
    body('accountNumber')
        .isNumeric()
        .withMessage('Account number must be numeric'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// Login validation middleware
const validateLogin = [
    body('username')
        .exists()
        .withMessage('Username is required'),
    body('password')
        .exists()
        .withMessage('Password is required'),
    body('accountNumber')
        .exists()
        .withMessage('Account number is required') // Ensure accountNumber is required for login
];

// Middleware to check for validation errors
const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    checkValidationResult,
};
