const { MongoClient } = require('mongodb')
require('dotenv').config()
const productSchema = require('./product-schema')

const client = new MongoClient(process.env.MONGO_URI)

const addDoc = async data => {
  try {
    await client.connect()
    const db = await client.db('test')
    const collection = await db.collection('products', productSchema)
    const res = await collection.insertOne(data)
    return res.insertedId
  } catch (err) {
    console.log('Error while adding Product:', err)
    return null
  } finally {
    client.close()
  }
}

const updateDoc = async (_id, data) => {
  try {
    await client.connect()
    const db = await client.db('test')
    const collection = await db.collection('products', productSchema)
    const updatedDoc = await collection.findOneAndUpdate(
      { _id },
      { $set: data },
      { returnDocument: 'after' }
    )
    return updatedDoc
  } catch (err) {
    console.log('Error while adding Product:', err)
    return null
  } finally {
    client.close()
  }
}

const findDoc = async _id => {
  try {
    await client.connect()
    const db = await client.db('test')
    const collection = await db.collection('products', productSchema)
    const product = await collection.findOne({ _id })
    return product
  } catch (err) {
    console.log('Error while adding Product:', err)
    return null
  } finally {
    client.close()
  }
}

const findAllDocs = async () => {
  try {
    await client.connect()
    const db = await client.db('test')
    const collection = await db.collection('products', productSchema)
    const products = await collection.find().toArray()
    return products
  } catch (err) {
    console.log('Error while adding Product:', err)
    return null
  } finally {
    client.close()
  }
}

const deleteDoc = async _id => {
  try {
    await client.connect()
    const db = await client.db('test')
    const collection = await db.collection('products', productSchema)
    const res = await collection.deleteOne({ _id })
    if (res.deletedCount > 0) {
      return `Product with id:${_id}, deleted successfully!`
    } else {
      return `No Product found with id:${_id}`
    }
  } catch (err) {
    console.log('Error while adding Product:', err)
    return null
  } finally {
    client.close()
  }
}

module.exports = { addDoc, updateDoc, findDoc, findAllDocs, deleteDoc }
