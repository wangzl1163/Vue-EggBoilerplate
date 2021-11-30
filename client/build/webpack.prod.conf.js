'use strict'

const utils = require('./utils')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const target = require("./targetOptions")[process.env.target];

const otherPlugins = []

const webpackConfig = merge(baseWebpackConfig, {
   mode: 'production',
   devtool: 'hidden-source-map',
   output: {
      filename: utils.assetsPath('js/[name].[contenthash].js'),
      chunkFilename: utils.assetsPath('js/[id].[contenthash].js')
   },
   plugins: [
      new HtmlWebpackPlugin({
         ...target.htmlWebpackPlugin,
         minify: {
            removeComments: true, // 移除注释
            collapseWhitespace: true, // 消除空白空间/空格
            removeAttributeQuotes: true, // 移除属性的引号
            collapseBooleanAttributes: true, // 简写Boolean值属性，例如：disabled="true" => disabled
            removeScriptTypeAttributes: true // 去掉script标签的type属性
          }
      }),
      new OptimizeCSSPlugin({
         cssProcessorOptions: { safe: true, map: { inline: false } }
      }),
      // keep module.id stable when vendor modules does not change
      new webpack.HashedModuleIdsPlugin({
         hashDigestLength: 20
      }),
      new CopyWebpackPlugin(target.copyWebpackPlugin),
      new CompressionWebpackPlugin({
         cache: true,
         threshold: 10 * 1024, // 超过10KB则被压缩
         exclude: [/node_modules/]
      })
   ].concat(otherPlugins),
   optimization: {
      // https://webpack.js.org/configuration/optimization/#optimizationnamedmodules
      // This is because each module.id is incremented based on resolving order by default.
      // Meaning when the order of resolving is changed, the IDs will be changed as well.
      moduleIds: 'hashed',
      chunkIds: 'named'
   }
})

if (process.env.analyzer === 'true') {
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
   webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
