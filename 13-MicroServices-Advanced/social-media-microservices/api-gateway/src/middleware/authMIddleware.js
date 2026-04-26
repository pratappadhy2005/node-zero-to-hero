const logger = require("../utils/logger");
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        logger.warn('Access attempt without token provided');
        return res.status(401).json({
            message: 'Authentication is required',
            success: false,
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            logger.error('Token verification failed: ' + err.message);
            return res.status(429).json({
                message: 'Token verification failed: Invalid token',
                success: false,
            });
        }
        req.user = user;
        next();
    });
}

module.exports = validateToken;