const cors = require('cors');

const corsOptions = {
    //which origin is allowed to access this server
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', 'https://yourcustomdomain.com'];
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    //which methods are allowed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //which headers are allowed to be sent with the request
    allowedHeaders: ['Content-Type', 'Authorization'],
    //which headers are exposed to the client
    exposedHeaders: ['Authorization'],
    //whether the request can include credentials like cookies
    credentials: true,
    //how long the response from the server should be cached
    maxAge: 600,
};

module.exports = corsOptions;