const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = async (user) => {
    const accessToken = jwt.sign({
        userId: user._id, username: user.username, email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return accessToken;


    const refreshToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    await RefreshToken.create({
        userId: user._id,
        token: refreshToken,
        expiresAt,
    });

    return {
        accessToken,
        refreshToken,
    }
}

module.exports = {
    generateToken,
}
