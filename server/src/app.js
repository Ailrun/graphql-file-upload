module.exports = function (
  corsHandler, express,
  graphqlHandler, graphqlPlayground,
  jsonParser, multipartParser,
) {
  const app = express()
  app.use(corsHandler)
  app.use(jsonParser)
  app.get('/', function (req, res) {
    res.redirect('/playground')
  })
  app.use('/graphql', function (req, res, next) {
    if (!req.is('multipart/form-data')) {
      return next()
    }

    return multipartParser(req, res, function () {
      const operations = JSON.parse(req.body.operations)
      const map = JSON.parse(req.body.map)

      req.files.forEach((file) => {
        const { fieldname } = file
        const path = map[fieldname]

        let target = operations

        path.split('.').forEach((partialPath) => {
          if (target[partialPath]) {
            target = target[partialPath]
          } else {
            target[partialPath] = file
          }
        })
      })

      req.body = operations

      return next()
    })
  }, graphqlHandler)
  app.get('/playground', graphqlPlayground)

  let server
  let port
  let host

  return {
    run(p, h) {
      if (server !== undefined) {
        return Promise.reject('Server is already running')
      }

      return new Promise((resolve, reject) => {
        port = p
        host = h
        server = app.listen(port, host, (err) => {
          if (err) {
            reject(err.message)
          } else {
            resolve()
          }
        })
      })
    },

    stop() {
      if (server === undefined) {
        return Promise.resolve()
      }

      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            reject(err.message)
          } else {
            server = undefined
            resolve()
          }
        })
      })
    },
  }
}
