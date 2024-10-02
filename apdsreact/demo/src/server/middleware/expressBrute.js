// server/middleware/expressBrute.js
const ExpressBrute = require('express-brute');
const MemoryStore = require('express-brute').MemoryStore; // In-memory store; consider using a persistent store for production

const store = new MemoryStore();
const bruteforce = new ExpressBrute(store, {
    freeRetries: 5, // Allow 5 attempts
    minWait: 5000, // 5 seconds before allowing another attempt
    maxWait: 60000, // 60 seconds maximum wait time
    lifetime: 300, // Block for 5 minutes after the limit is reached
});

const setupBruteForce = (app) => {
    app.use(bruteforce.prevent); // Apply the brute-force protection globally or to specific routes
};

module.exports = setupBruteForce;
