const Controller = require('egg').Controller

class IndexController extends Controller {
  async index(ctx) {
    let config = ctx.app.config
    let pickList
    try {
      pickList = Array.from(config.webpackConfigAlias.keys)
    } catch (e) {
      pickList = []
    }
    let serverConfig = {}
    for (const key of pickList) {
      serverConfig[key] = config[key]
    }
    serverConfig.devops = config.devops
    return ctx.render('index.njk', {
      normalizeAssets: function normalizeAssets(assets) {
        return Array.isArray(assets) ? assets : [assets]
      },
      serverConfig: JSON.stringify(serverConfig)
    })
  }
}

module.exports = IndexController
