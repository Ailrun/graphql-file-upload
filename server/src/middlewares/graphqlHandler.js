module.exports = function (graphqlExpress, schema) {
  const graphqlHandler = graphqlExpress({
    schema,
  })

  return graphqlHandler
}
