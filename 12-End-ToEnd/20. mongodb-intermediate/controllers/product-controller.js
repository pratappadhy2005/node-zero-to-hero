const Product = require('../models/Product')


const getProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            //stage 1
            {
                $match: {
                    instock: true,
                    price: { $gt: 50 }
                }
            },
            // stage2 group by category
            {
                $group: {
                    _id: "$category",
                    products: { $push: "$$ROOT" },
                    totalPrice: { $sum: "$price" }
                }
            }
        ])
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        res.json(error)
    }
}

const getProductAnalytics = async (req, res) => {
    try {
        const analytics = await Product.aggregate([
            //stage 1 average price
            {
                $group: {
                    _id: null,
                    averagePrice: { $avg: "$price" }
                }
            },
            // stag2 max price
            {
                $group: {
                    _id: null,
                    maxPrice: { $max: "$price" }
                }
            }
        ])
        res.status(200).json({ success: true, data: analytics })
    } catch (error) {
        res.json(error)
    }
}

const insertSampleProducts = async (req, res) => {
    try {
        const sampleProducts = await Product.insertMany([
            {
                name: "Product 1",
                price: 100,
                category: "Category 3",
                instock: true,
                tags: ["Tag 1", "Tag 2"]
            },
            {
                name: "Product 2",
                price: 200,
                category: "Category 3",
                instock: true,
                tags: ["Tag 3", "Tag 4"]
            }
        ])
        res.status(201).json({ success: true, data: sampleProducts })
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    insertSampleProducts,
    getProducts,
    getProductAnalytics
}
