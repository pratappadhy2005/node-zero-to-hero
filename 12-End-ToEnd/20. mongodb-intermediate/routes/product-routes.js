const express = require('express')
const { insertSampleProducts } = require('../controllers/product-controller')

const productRouter = express.Router()

productRouter.post('/insert-sample-products', insertSampleProducts)

module.exports = productRouter