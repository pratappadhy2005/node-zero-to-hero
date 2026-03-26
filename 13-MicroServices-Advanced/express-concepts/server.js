require('dotenv').config();
const express = require('express');
const { corsOptions } = require('./config/corsConfig');
const cors = require('cors');
const { asyncErrorHandler, globalErrorHandler } = require('./middleware/errorHandler');
const { addTimeStamp, requestLogger } = require('./middleware/customMiddleware');


const app = express();
const port = process.env.PORT || 3000;

// request logger middleware
app.use(requestLogger);
// add timestamp middleware
app.use(addTimeStamp);

// CORS middleware
app.use(cors(corsOptions));

// express json middleware
app.use(express.json());

// global error handler middleware
app.use(globalErrorHandler);

// async error handler middleware
app.use(asyncErrorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});