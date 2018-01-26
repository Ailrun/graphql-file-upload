const process = require('process')

const gaze = require('gaze')

gaze('src/**/*.js', async (err, watcher) => {
  let app = await rerun()

  watcher.on('all', async (evt, filePath) => {
    console.log(`\n${filePath} is changed...`)
    console.log('restart server...')

    app = await rerun(app, filePath)
  })
})

async function rerun(preApp, filePath) {
  try {
    if (preApp) {
      await preApp.stop()
    }

    resetCache(filePath)

    let {
      afterListenCallback,
      app,
      host,
      port,
    } = require('../src')

    await app.run(port, host)
    afterListenCallback()

    return app
  } catch (err) {
    console.log(err)

    return preApp
  }
}

function resetCache(filePath) {
  if (filePath === undefined) return

  for (key in require.cache) {
    if (Object.prototype.hasOwnProperty.call(require.cache, key)) {
      delete require.cache[key]
    }
  }
}
