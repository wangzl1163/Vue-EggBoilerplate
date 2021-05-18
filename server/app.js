module.exports = app => {
  // 在框架和插件中使用中间件
  // 参考：https://eggjs.org/zh-cn/basics/middleware.html#%E5%9C%A8%E6%A1%86%E6%9E%B6%E5%92%8C%E6%8F%92%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8%E4%B8%AD%E9%97%B4%E4%BB%B6
  // 插入自定义中间件
  // 参考：https://eggjs.org/zh-cn/advanced/plugin.html#%E6%8F%92%E5%85%A5%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%AD%E9%97%B4%E4%BB%B6
  const index = app.config.coreMiddleware.indexOf('static')
  if (app.plugins.historyApiFallback) {
    if (index === -1) {
      app.config.coreMiddleware.push('historyApiFallback')
    } else {
      app.config.coreMiddleware.splice(index, 0, 'historyApiFallback')
    }
  }
}
