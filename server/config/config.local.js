const webpackConfig = require('../../client/build/webpack.dev.conf')

module.exports = () => {
  const config = {}

  config.middleware = ['webpack']

  config.view = {
    cache: false
  }

  config.webpack = {
    enable: true,
    config: webpackConfig,
    devMiddleware: {
      publicPath: '/public/',
      serverSideRender: true
    },
    hotClient: {}
  }

  return config
}
