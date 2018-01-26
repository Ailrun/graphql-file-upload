module.exports = function (GraphQLList, GraphQLObjectType, user) {
  const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: new GraphQLList(user),
        description: 'Example query for fetching users',
        resolve(source, args, context) {
          return []
        },
      },
    },
  })

  return query
}
