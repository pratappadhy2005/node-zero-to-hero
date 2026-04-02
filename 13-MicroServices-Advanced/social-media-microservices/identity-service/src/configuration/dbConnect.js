const mongoose = require('mongoose');
const logger = require('../utils/logger');
require('dotenv').config();
const mongoose = require('mongoose');

// connect to the database
const dbConnect = () => mongoose.connect(process.env.DB_URI).then(() => {
    logger.info('Connected to MongoDB');
}).catch((err) => {
    logger.error('DB connection error:', err.message);
    process.exit(1);
});

module.exports = dbConnect;