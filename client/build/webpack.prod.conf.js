'use strict'
const path = require('path')
const utils = require('./utils')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

let otherPlugins = []

const webpackConfig = merge(baseWebpackConfig, {
   mode: 'production',
   devtool: 'hidden-source-map',
   output: {
      filename: utils.assetsPath('js/[name].[contenthash].js'),
      chunkFilename: utils.assetsPath('js/[id].[contenthash].js')
   },
   plugins: [
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
         cssProcessorOptions: { safe: true, map: { inline: false } }
      }),
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
         filename: path.resolve(__dirname, '../dist/webpackBundle.html'),
         minify: {
            removeComments: true, // 移除注释
            collapseWhitespace: true, // 消除空白空间/空格
            removeAttributeQuotes: true, // 移除属性的引号
            collapseBooleanAttributes: true, // 简写Boolean值属性，例如：disabled="true" => disabled
            removeScriptTypeAttributes: true // 去掉script标签的type属性
          }
      }),
      // keep module.id stable when vendor modules does not change
      // new webpack.HashedModuleIdsPlugin(),
      // enable scope hoisting
      // copy custom static assets
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, '../public'), // 文件夹不能为空，否则会报错
               to: 'static',
               globOptions: {
                  ignore: ['.*']
               }
            }
         ]
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

if (process.env.npm_config_report) {
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
   webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
