module.exports = function (GraphQLSchema, mutation, query) {
  const schema = new GraphQLSchema({
    mutation,
    query,
  })

  return schema
}
