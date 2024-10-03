// server/middleware/helmet.js
const helmet = require('helmet');

const setupHelmet = (app) => {
    app.use(helmet());
};

module.exports = setupHelmet;
