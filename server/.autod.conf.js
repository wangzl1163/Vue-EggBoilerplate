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
    'egg-history-api-fallback',
    'egg-logrotator'
  ],
  devdep: [
    'egg-ci',
    'egg-bin',
    'egg-mock',
    'acorn',
    'autod',
    'autod-egg',
    'eslint',
    'eslint-config-egg',
    'mocha',
    'webpack',
    'koa-webpack'
  ],
  keep: [
    'webpack'
  ],
  exclude: ['./test', './app/public', './siteFile']
}
