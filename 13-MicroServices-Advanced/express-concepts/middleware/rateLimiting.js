const rateLimit = require('express-rate-limit');

const createBasicRateLimit = (maxReq, windowMs) => {
    return rateLimit({
        max: maxReq,
        windowMs,
        message: 'Too many requests from this IP, please try again later',
        standardHeaders: true,
        legacyHeaders: false,
    });
}


module.exports = { createBasicRateLimit };
