const makeFile = require('./File')
const makeMutation = require('./mutation')
const makeQuery = require('./query')
const makeSchema = require('./schema')
const makeUser = require('./user')

module.exports = function ({
  GraphQLInt, GraphQLList,
  GraphQLObjectType, GraphQLScalarType, GraphQLString,
  GraphQLSchema,
}) {
  const File = makeFile(GraphQLScalarType)
  const user = makeUser(GraphQLInt, GraphQLObjectType, GraphQLString)

  const mutation = makeMutation(
    File,
    GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString,
    user
  )
  const query = makeQuery(GraphQLList, GraphQLObjectType, user)

  const schema = makeSchema(GraphQLSchema, mutation, query)

  return schema
}
