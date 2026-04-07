const express = require('express');
const identityServiceRouter = require('./routes/identity-service');
const logger = require('./utils/logger');
require('dotenv').config();
const dbConnect = require('./configuration/dbConnect');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const cors = require('cors');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');
const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const app = express();

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

//DDOS Attack Protection
const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 10,
    duration: 1,
});

app.use((req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => next())
        .catch((err) => {
            logger.error('Rate limiter error:', err.message);
            res.status(429).json({
                message: 'Too many requests from this IP',
                success: false,
            });
        });
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

//use the router    
app.use('/api/auth/register', sensitiveEndpointsLimiter);

// Routes
app.use('/api/auth', identityServiceRouter);

//use the error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    logger.info(`Identity Service is running on port ${process.env.PORT || 3000}`);
});

//unhandled promise rejection
process.on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Promise Rejection at:', p, 'reason:', reason);
});
