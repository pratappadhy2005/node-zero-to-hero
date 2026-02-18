const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    instock: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('Product', ProductSchema)