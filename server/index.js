/**
 * @file src/index.js
 * @license MIT
 * @copyright Junyoung Clare Jang 2018
 * @desc
 * File for resolving dependencies
 * and exports useful values
 */
const {
  afterListenCallback,
  app,
  host,
  port
} = require('./src')

app.listen(port, host, afterListenCallback)
