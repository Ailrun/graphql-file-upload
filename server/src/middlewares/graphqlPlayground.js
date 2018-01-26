module.exports = function (playgroundExpress) {
  const graphqlPlayground = playgroundExpress({ endpoint: '/graphql' })

  return graphqlPlayground
}
