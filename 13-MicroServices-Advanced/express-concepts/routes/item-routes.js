const express = require('express');
const { asyncErrorHandler, APIError } = require('../middleware/errorHandler');

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

router.post('/', asyncErrorHandler(async (req, res) => {
    if (!req.body.name || !req.body.price) {
        throw new APIError('name and price are required', 400);
    }
    req.body.id = items.length + 1;
    items.push(req.body);
    res.json(req.body);
}));

module.exports = router;