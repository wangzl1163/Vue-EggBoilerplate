'use strict'

module.exports = {
  write: true,
  prefix: '^',
  devprefix: '^',
  plugin: 'autod-egg',
  test: ['test'],
  dep: [
    'egg',
    'egg-scripts',
    'egg-view-nunjucks',
    'egg-http-proxy',
    'egg-history-api-fallback'
  ],
  devdep: [
    'egg-bin',
    'egg-mock',
    'autod',
    'autod-egg',
    'eslint',
    'eslint-config-egg',
    'mocha',
    'webpack',
    'koa-webpack'
  ],
  keep: [
    'webpack',
    'mocha'
  ],
  exclude: ['node_modules','./test', './app/public', './siteFile']
}
