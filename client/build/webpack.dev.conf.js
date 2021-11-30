'use strict'
const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
   // cheap-module-eval-source-map is faster for development
   devtool: 'cheap-module-eval-source-map',
   mode: 'development',
   plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, '../public'),
               globOptions: {
                  ignore: ['.*']
               }
            }
         ]
      })
   ]
})

module.exports = devWebpackConfig
