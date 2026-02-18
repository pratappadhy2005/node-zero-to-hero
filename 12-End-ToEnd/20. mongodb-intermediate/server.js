const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRouter = require('./routes/product-routes')

dotenv.config();

mongoose.connect(process.env.DB)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter)

app.get('/', (req, res) => {
    res.send("Home Page")
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
