module.exports = (options, app) => {
  const accessLogger = app.getLogger('accessLogger')
  function log(ctx) {
    setImmediate(() => {
      accessLogger.info(
        `${ctx.method} ${ctx.ip} ${ctx.url} ${ctx.host || 'host?'} ${ctx.status} ${ctx.length ||
          'length?'}
        ${ctx.header.referer || 'referer?'} ${Date.now() - ctx.starttime}`
      )
    })
  }

  return async function accessLogMiddleware(ctx, next) {
    try {
      await next()
      log(ctx)
    } catch (error) {
      log(ctx)
      throw error
    }
  }
}
