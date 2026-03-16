const express = require('express')
const { insertSampleProducts, getProducts, getProductAnalytics } = require('../controllers/product-controller')

const productRouter = express.Router()

productRouter.post('/insert-sample-products', insertSampleProducts)
productRouter.get('/get-products', getProducts)
productRouter.get('/get-product-analytics', getProductAnalytics)

module.exports = productRouter