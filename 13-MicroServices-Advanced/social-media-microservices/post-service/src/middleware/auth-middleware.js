const logger = require('../utils/logger');

const authenticateRequest = (req, res, next) => {
    logger.info('authenticateRequest middleware received:', req.body);
    const userId = req.headers['x-user-id'];
    if (!userId) {
        logger.warn('Access attempt without user ID:');
        res.status(400).json({ error: 'User ID not provided' });
        return;
    }
    req.user = { userId };
    next();
}

module.exports = authenticateRequest;