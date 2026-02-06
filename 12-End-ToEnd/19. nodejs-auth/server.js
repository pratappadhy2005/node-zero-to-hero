const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./database/db');
const authRoute = require('./routes/auth-route');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/auth', authRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});