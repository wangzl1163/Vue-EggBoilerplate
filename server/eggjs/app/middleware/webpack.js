let middleware = null

module.exports = (options, app) => {
  if (options.enable) {
    const webpackMiddleware = require('koa-webpack')
    const { enable, ...opts } = options

    middleware = webpackMiddleware(opts)

    return async (ctx, next) => {
      const trueWebpackMiddleware = await middleware
      
      return trueWebpackMiddleware(ctx, next)
    }
  }

  return function(ctx, next) {
    return next()
  }
}
