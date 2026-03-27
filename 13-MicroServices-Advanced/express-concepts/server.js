require('dotenv').config();
const express = require('express');
const corsOptions = require('./config/corsConfig');
const cors = require('cors');
const { globalErrorHandler } = require('./middleware/errorHandler');
const { addTimeStamp, requestLogger } = require('./middleware/customMiddleware');
const { urlVersioning } = require('./middleware/apiVersioning');
const { createBasicRateLimit } = require('./middleware/rateLimiting');
const itemRoutes = require('./routes/item-routes');


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

// url versioning middleware
app.use(urlVersioning('v1'));

// rate limiting middleware
app.use(createBasicRateLimit(2, 15 * 60 * 1000));

// item routes
app.use("/api/v1/items", itemRoutes);

// global error handler middleware
app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
