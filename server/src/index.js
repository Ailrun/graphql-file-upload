/**
 * @file src/index.js
 * @license MIT
 * @copyright Junyoung Clare Jang 2018
 * @desc
 * File for resolving dependencies
 * and exports useful values
 */
// built-in modules

// npm modules
const { graphqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const graphql = require('graphql')
const multer = require('multer')
const playgroundExpress = require('graphql-playground-middleware-express').default

// in-package modules
// ./
const makeApp = require('./app')
// ./middlewares
const makeCorsHandler = require('./middlewares/corsHandler')
const makeGraphqlHandler = require('./middlewares/graphqlHandler')
const makeGraphqlPlayground = require('./middlewares/graphqlPlayground')
const makeJsonParser = require('./middlewares/jsonParser')
const makeMultipartParser = require('./middlewares/multipartParser')
// ./schema
const makeSchema = require('./schema')

// constants
const fileDirectory = 'uploaded'
const host = 'localhost'
const port = 3000
const afterListenCallback = () => {
  console.log(`server starts at ${host}:${port}`)
}

// resolved results
const corsHandler = makeCorsHandler(cors)
const jsonParser = makeJsonParser(bodyParser)
const multipartParser = makeMultipartParser(fileDirectory, multer)
const schema = makeSchema(graphql)
const graphqlHandler = makeGraphqlHandler(graphqlExpress, schema)
const graphqlPlayground = makeGraphqlPlayground(playgroundExpress)
const app = makeApp(
  corsHandler, express,
  graphqlHandler, graphqlPlayground,
  jsonParser, multipartParser,
)

module.exports = {
  afterListenCallback,
  app,
  host,
  port,
}
