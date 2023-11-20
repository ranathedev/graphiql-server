const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql-schema')
const resolvers = require('./resolvers')

const app = express()

app.get('/', (req, res) => {
  res.send('Server is running...')
})

const rootValue = resolvers

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
)

app.listen(4000, () =>
  console.log(`Server is running here: http://localhost:4000`)
)
