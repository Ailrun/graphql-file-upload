module.exports = function (GraphQLInt, GraphQLObjectType, GraphQLString) {
  const user = new GraphQLObjectType({
    name: 'User',
    description: 'Example user',
    fields: {
      name: {
        type: GraphQLString,
      },
      profile: {
        type: GraphQLString,
      },
      age: {
        type: GraphQLInt,
      },
    },
  })

  return user
}
