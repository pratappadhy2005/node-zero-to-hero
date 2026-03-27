const express = require('express');
const { asyncErrorHandler } = require('../middleware/errorHandler');



const router = express.Router();

const items = [
    {
        id: 1,
        name: 'Item 1',
        price: 100,
    },
    {
        id: 2,
        name: 'Item 2',
        price: 200,
    },
    {
        id: 3,
        name: 'Item 3',
        price: 300,
    },
    {
        id: 4,
        name: 'Item 4',
        price: 400,
    },
    {
        id: 5,
        name: 'Item 5',
        price: 500,
    },
]

router.get('/', asyncErrorHandler(async (req, res) => {
    res.json(items);
}));

module.exports = router;