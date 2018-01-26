module.exports = function (
  File,
  GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString,
  user,
) {
  const addUserArgs = {
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    profile: {
      type: new GraphQLList(File),
    },
  }

  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addUser: {
        type: user,
        description: 'Example mutation for adding user',
        args: addUserArgs,
        resolve(src, args) {
          return {
            name: args.name,
            age: args.age,
            profile: args.profile[0].originalname,
          }
        },
      },
    },
  })

  return mutation
}
