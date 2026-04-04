const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshToken = require('../models/RefreshToken');

const generateToken = async (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
    }

    const accessToken = jwt.sign({
        userId: user._id, username: user.username, email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const refreshToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await RefreshToken.create({
        user: user._id,
        token: refreshToken,
        expiresAt,
    });

    return {
        accessToken,
        refreshToken,
    };
};

module.exports = {
    generateToken,
};
