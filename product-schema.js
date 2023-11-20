const productSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'description', 'price', 'inventory', 'stores'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        description: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        price: {
          bsonType: 'double',
          minimum: 0,
          description: 'must be a double and is required (minimum value: 0)',
        },
        inventory: {
          bsonType: 'int',
          minimum: 0,
          description: 'must be an integer and is required (minimum value: 0)',
        },
        stores: {
          bsonType: 'array',
          description: 'must be an array of StoreInput objects',
          items: {
            bsonType: 'object',
            required: ['storeName', 'storePhone', 'availability'],
            properties: {
              storeName: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              storePhone: {
                bsonType: 'int',
                description: 'must be an integer and is required',
              },
              availability: {
                bsonType: 'string',
                enum: ['ONSALE', 'SOLDOUT'],
                description:
                  "must be a string with values 'ONSALE' or 'SOLDOUT' and is required",
              },
            },
          },
        },
      },
    },
  },
}

module.exports = productSchema
