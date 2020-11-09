const assert = require('assert')
module.exports = app => {
  const index = app.config.coreMiddleware.indexOf('static')
  if (app.plugins.historyApiFallback) {
    if (index === -1) {
      app.config.coreMiddleware.push('historyApiFallback')
    } else {
      app.config.coreMiddleware.splice(index, 0, 'historyApiFallback')
    }
  }

  // insert static middleware before bodyParser
  const _index = app.config.coreMiddleware.indexOf('bodyParser')
  assert(_index >= 0, 'bodyParser highly needed')
  if (app.config.coreMiddleware.indexOf('static') === -1) {
    app.config.coreMiddleware.splice(_index, 0, 'static')
  }
}
