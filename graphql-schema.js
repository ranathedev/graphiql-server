const { buildSchema } = require('graphql')

const schema = buildSchema(`
"""
The root query type for fetching data.
"""
type Query {
    """
    Returns a list of all products
    """
    getAllProducts : [Product]
    """
    Returns a Product with specified id
    """
    getProduct(id: ID): Product
}

"""
A Product
"""
type Product {
    """
    Unique Identifier for a Product
    """
    id: ID
    """
    Name of the Product
    """
    name: String
    """
    Decription of the Procduct
    """
    description: String
    """
    Price of the Product
    """
    price: Float
    """
    Number of items in stock
    """
    inventory: Int
    """
    Stores where it is available
    """
    stores: [Store]
}

"""
Store where the Product is available
"""
type Store {
    """
    Name of  the store
    """
    storeName: String
    """
    Contact Number of  the store
    """
    storePhone: Int
    """
    Is the product available or not
    """
    availability: Availability
}

"""
If the Product is in stock or not
"""
enum Availability {
    """
    The Product is sold out
    """
    SOLDOUT
    """
    The Product is currently in stock
    """
    ONSALE
}

"""
A Product
"""
input ProductInput {
    """
    Name of  the Product (required)
    """
    name: String!
    """
    Description of  the Product (required)
    """
    description: String!
    """
    Price of  the Product (required)
    """
    price: Float!
    """
    Number of items in stock (required)
    """
    inventory: Int!
    """
    Stores where it is available (required)
    """
    stores: [StoreInput]!
}

"""
Store where the Product is available
"""
input StoreInput {
    """
    Name of  the store (required)
    """
    storeName: String!
    """
    Contact Number of  the store (required)
    """
    storePhone: Int!
    """
    Is the product available or not (required)
    """
    availability: Availability!
}

"""
The root mutation type for modifying data.
"""
type Mutation {
    """
    Creates a Product
    """
    createProduct(input: ProductInput): Product
    """
    Updates the Product
    """
    updateProduct(id: ID!, input: ProductInput): Product
    """
    Deletes the Product
    """
    deleteProduct(id: ID!): String
}
`)

module.exports = schema
