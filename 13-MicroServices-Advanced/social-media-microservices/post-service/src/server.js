require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const cors = require('cors');
const helmet = require('helmet');
const postRoutes = require('./routes/post-routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const dbConnect = require('./configuration/dbConnect');
const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');

const app = express();
const port = process.env.PORT || 3002;

//connect to the database
dbConnect();

//connect to the redis
const redisClient = new Redis(process.env.REDIS_URL);

//use the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
    logger.info(`Request received at ${new Date().toISOString()} with ${req.method} ${req.url} and body ${JSON.stringify(req.body)}`);
    next();
});

// IP based rate limiting for sensitive routes
const sensitiveEndpointsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
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

// Apply rate limiting to sensitive routes
app.use('/api/posts', sensitiveEndpointsLimiter);

app.use('/api/posts', (req, res, next) => {
    req.redisClient = redisClient
    next();
}, postRoutes);

// error handler middleware
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Post Service is running on port ${port}`);
});

//unhandled promise rejection
process.on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Promise Rejection at:', p, 'reason:', reason);
});