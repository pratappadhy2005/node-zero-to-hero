const mongoose = require('mongoose');
const logger = require('../utils/logger');
require('dotenv').config();

// connect to the database
const dbConnect = () => {
    const dbUri = process.env.DB_URI || process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!dbUri) {
        logger.error('DB connection error: missing DB_URI (or MONGO_URI/MONGODB_URI)');
        process.exit(1);
    }

    return mongoose.connect(dbUri).then(() => {
        logger.info('Connected to MongoDB');
    }).catch((err) => {
        logger.error(`DB connection error: ${err.message}`);
        process.exit(1);
    });
};

module.exports = dbConnect;