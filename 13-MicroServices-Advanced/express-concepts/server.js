require('dotenv').config();
const express = require('express');
const { corsOptions } = require('./config/corsConfig');
const cors = require('cors');
const { asyncErrorHandler, globalErrorHandler } = require('./middleware/errorHandler');
const { addTimeStamp, requestLogger } = require('./middleware/customMiddleware');
const { urlVersioning, headerUrlVersioning, contentTypeVersioning, queryVersioning } = require('./middleware/apiVersioning');



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

// url versioning middleware
app.use(urlVersioning('v1'));
// header url versioning middleware
app.use(headerUrlVersioning('v1'));
// content type versioning middleware
app.use(contentTypeVersioning('application/v1'));
// query versioning middleware
app.use(queryVersioning('v1'));
// response versioning middleware
app.use(responseVersioning('v1'));



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});