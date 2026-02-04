const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./database/db');

const app = express();

connectDB();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});