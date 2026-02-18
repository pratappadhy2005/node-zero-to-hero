const Product = require('../models/Product')

const insertSampleProducts = async (req, res) => {
    try {
        const sampleProducts = await Product.insertMany([
            {
                name: "Product 1",
                price: 100,
                category: "Category 1",
                instock: true,
                tags: ["Tag 1", "Tag 2"]
            },
            {
                name: "Product 2",
                price: 200,
                category: "Category 2",
                instock: false,
                tags: ["Tag 3", "Tag 4"]
            }
        ])
        res.status(201).json({ success: true, data: sampleProducts })
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    insertSampleProducts
}
