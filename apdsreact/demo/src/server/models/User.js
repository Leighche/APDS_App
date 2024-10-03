const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Define the user schema
const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: 6, // Minimum username length
        maxlength: 20, // Maximum username length
        validate: {
            validator: (v) => /^[a-zA-Z0-9]+$/.test(v), // Allow only alphanumeric characters
            message: props => `${props.value} is not a valid username!`
        },
    },
    fullName: { 
        type: String, 
        required: true,
        validate: {
            validator: (v) => v.length <= 100, // Limit full name length
            message: props => `${props.value} is too long for a full name!`
        },
    },
    idNumber: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: (v) => /^\d{13}$/.test(v), // 13 digits for ID number
            message: props => `${props.value} is not a valid ID number!`
        },
    },
    accountNumber: { 
        type: String, 
        required: true,
        unique: true, // Ensure account numbers are unique
        validate: {
            validator: (v) => /^\d+$/.test(v), // Must be numeric
            message: props => `${props.value} is not a valid account number!`
        },
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6, // Minimum password length
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Hash the password before saving the user
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Skip if the password isn't modified

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next(); // Proceed to save the user
    } catch (error) {
        next(error); // Pass error to next middleware
    }
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password); // Compare hashed password
};

// Create the User model
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
