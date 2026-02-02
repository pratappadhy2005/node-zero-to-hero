const express = require('express');
const dotenv = require('dotenv');
const connectToMongoDB = require('./database/db');
const bookRoutes = require('./routes/book-routes');

dotenv.config();

connectToMongoDB();

const app = express();

//parse request body as a json
app.use(express.json());

//use book routes
app.use('/api/books', bookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
