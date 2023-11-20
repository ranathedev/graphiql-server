const { findAllDocs, findDoc, addDoc, updateDoc, deleteDoc } = require('./db')

class Product {
  constructor({ id, name, description, price, inventory, stores }) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.inventory = inventory
    this.stores = stores
  }
}

const resolvers = {
  getAllProducts: async () => {
    const res = await findAllDocs()
    let products = []
    res.forEach(item => {
      products.push(new Product({ id: item._id, ...item }))
    })
    return products
  },
  getProduct: async ({ id }) => {
    const res = await findDoc(id)
    if (res) {
      return new Product({ id: res._id, ...res })
    } else {
      return null
    }
  },
  createProduct: async ({ input }) => {
    let id = require('crypto').randomBytes(13).toString('hex')
    const data = { _id: id, ...input }
    const res = await addDoc(data)
    if (res) {
      return new Product({ id: res, ...input })
    } else {
      return null
    }
  },
  updateProduct: async ({ id, input }) => {
    const res = await updateDoc(id, input)
    if (res) {
      return new Product({ id: res._id, ...res })
    } else {
      return null
    }
  },
  deleteProduct: async ({ id }) => {
    return await deleteDoc(id)
  },
}

module.exports = resolvers
