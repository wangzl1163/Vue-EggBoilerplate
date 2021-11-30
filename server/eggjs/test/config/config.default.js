'use strict'
const path = require(`path`)

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1623503412105_8112`

  // add your config here
  config.middleware = [`errorhandler`, `accesslog`]

  config.customLogger = {
    accessLogger: {
      file: path.join(appInfo.root, `logs/${appInfo.name}/access.log`)
    }
  }

  config.bodyParser = {
    ignore: `/bizApi`
  }

  config.logger = {
    level: `INFO`
  }

  config.bizUrl = {}

  config.cluster = {
    listen: {
      port: 8866,
      hostname: `127.0.0.1`
    }
  }

  return config
}
