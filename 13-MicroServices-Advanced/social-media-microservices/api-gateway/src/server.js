require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const app = express();
const logger = require('./utils/logger');
const proxy = require('express-http-proxy');
const errorHandler = require('./middleware/errorHandler');
const validateToken = require('./middleware/authMIddleware');

const PORT = process.env.PORT || 3000;

//connect to the redis
const redisClient = new Redis(process.env.REDIS_URL);

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

//rate limit
const endpointRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn(`Sensitive endpoints too many requests from ${req.ip}`);
        res.status(429).json({
            message: 'Too many requests from this IP',
            success: false,
        });
    },
    store: new RedisStore({
        sendCommand: (...args) => redisClient.call(...args),
    }),
});

app.use(endpointRateLimit);

// logging
app.use((req, res, next) => {
    logger.info(`Request received at ${new Date().toISOString()} with ${req.method} ${req.url} and body ${JSON.stringify(req.body)}`);
    next();
});

//proxy to redirect requests to identity service
const proxyOptions = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl.replace(/^\/v1/, '/api');
    },
    proxyErrorHandler: (err, res, next) => {
        logger.error(`Proxy error: ${err.message}`);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
        });
    },
};

//setting proxy for our identity service
app.use('/v1/auth', proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts) => {
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Identity Service response status: ${proxyRes.statusCode}`);
        return proxyResData;
    },
}));

// setting up proxy for post service
app.use('/v1/posts', validateToken, proxy(process.env.POST_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, req) => {
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['x-user-id'] = req.user.userId;
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Post Service response status: ${proxyRes.statusCode}`);
        return proxyResData;
    },
}));

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`API Gateway is running on port ${PORT}`);
    logger.info(`Identity Service URL: ${process.env.IDENTITY_SERVICE_URL}`);
    logger.info(`Post Service URL: ${process.env.POST_SERVICE_URL}`);
    logger.info(`Redis URL: ${process.env.REDIS_URL}`);
});
