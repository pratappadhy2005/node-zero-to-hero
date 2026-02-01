const express = require('express');
const dotenv = require('dotenv');
const connectToMongoDB = require('./database/db');

dotenv.config();

connectToMongoDB();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
