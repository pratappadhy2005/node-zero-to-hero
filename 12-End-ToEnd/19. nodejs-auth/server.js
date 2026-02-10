const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./database/db');
const authRoute = require('./routes/auth-route');
const homeRoute = require('./routes/home-routes');
const adminRoute = require('./routes/admin-routes');
const authMiddleware = require('./middleware/auth-middleware');
const imageRoute = require('./routes/image-routes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/auth', authRoute);
app.use('/api/home', authMiddleware, homeRoute);
app.use('/api/admin', authMiddleware, adminRoute);
app.use('/api/images', imageRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});