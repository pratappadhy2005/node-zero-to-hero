require('dotenv').config();
const express = require('express');
const { corsOptions } = require('./config/corsConfig');
const cors = require('cors');
const requestLogger = require('./middleware/errorHandler');


const app = express();
const port = process.env.PORT || 3000;

// request logger middleware
app.use(requestLogger);

// add timestamp middleware
app.use(requestLogger.addTimeStamp);

app.use(cors(corsOptions));

// express json middleware
app.use(express.json());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});