module.exports = function (GraphQLScalarType) {
  const File = new GraphQLScalarType({
    name: 'File',
    description: 'Uploaded file',
    parseValue(value) {
      return value
    },
    parseLiteral() {
      throw new Error('Upload scalar literal unsupported')
    },
    serialize() {
      throw new Error('Upload scalar serialization unsupported')
    },
  })

  return File
}
