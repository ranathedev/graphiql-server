const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql-schema')
const resolvers = require('./resolvers')

const app = express()

const rootValue = resolvers

app.use(
  '/',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
)

app.listen(4000, () =>
  console.log(`Server is running here: http://localhost:4000`)
)
