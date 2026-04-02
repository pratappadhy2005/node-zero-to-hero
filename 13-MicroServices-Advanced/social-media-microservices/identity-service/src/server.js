const express = require('express');
const identityServiceRouter = require('./routes/identity-service');
const logger = require('../utils/logger');
require('dotenv').config();
const { dbConnect } = require('./configuration/dbConnect');
const { errorHandler } = require('./middleware/errorHandler');
const helmet = require('helmet');
const cors = require('cors');
const { RateLImiterRedis } = require('express-rate-limit');
const Redis = require('ioredis');

const app = express();

//connect to the database
dbConnect();

//connect to the redis
const redisClient = new Redis(process.env.REDIS_URL);

//use the rate limiter
app.use(rateLimiter);

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
const rateLimiter = new RateLImiterRedis({
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

//use the router    
app.use('/api/identity', identityServiceRouter);

//use the error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    logger.info('Identity Service is running on port 3000');
});