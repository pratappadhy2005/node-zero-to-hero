const products = require('../data/products')

const resolvers = {
    Query: {
        products: () => products,
        product: (_, { id }) => products.find(product => product.id === parseInt(id)),
    }
}

module.exports = resolvers