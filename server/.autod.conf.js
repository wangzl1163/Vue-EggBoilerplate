'use strict'

module.exports = {
  write: true,
  prefix: '^',
  devprefix: '^',
  plugin: 'autod-egg',
  test: ['test'],
  dep: ['egg', 'egg-scripts', 'egg-view-nunjucks'],
  devdep: [
    'egg-ci',
    'egg-bin',
    'egg-mock',
    'autod',
    'autod-egg',
    'eslint',
    'eslint-config-egg',
    'webpack'
  ],
  exclude: ['./test', './dist']
}
