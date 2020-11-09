let middleware = null

module.exports = (options, app) => {
  if (options.enable) {
    const webpackMiddleware = require('koa-webpack')
    let { enable, ...opts } = options
    middleware = webpackMiddleware(opts)
    return async (ctx, next) => {
      let trueWebpackMiddleware = await middleware
      return trueWebpackMiddleware(ctx, next)
    }
  }
  return function(ctx, next) {
    return next()
  }
}
