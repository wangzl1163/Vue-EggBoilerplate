'use strict'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
   context: path.resolve(__dirname, '../'),
   entry: {
      app: ['./src/main.js']
   },
   output: {
      path: path.resolve(__dirname, '../../server/app/public'),
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/public/'
   },
   externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter'
   },
   resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
         '@views': path.resolve(__dirname, '../src/views'),
         '@': path.resolve(__dirname, '../src')
      }
   },
   module: {
      rules: [
         {
            test: /\.vue$/,
            loader: 'vue-loader'
         },
         {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
               cwd: path.resolve(__dirname, '../')
            }
         },
         {
            test: /\.(le|c)ss$/,
            use: [
               // 目前几个问题：
               // 1. 目前对于css提取时，会有个空的JS文件，这个webpack在处理，目前先加载个也不是大问题
               // https://github.com/webpack/webpack/issues/1967
               // 2. css提取时，希望只提取出一个css文件，等待插件支持。 https://github.com/webpack-contrib/mini-css-extract-plugin/pull/348
               devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
               'css-loader',
               'less-loader'
            ]
         },
         {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
         },
         {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
         },
         { // add sass
            test: /\.(sass|scss)$/,
            use: [
               'vue-style-loader',
               'css-loader',
               'sass-loader'
            ]
         },
         /* config.module.rule('icons') */
         {
            test: /\.svg$/,
            include: path.join(__dirname, '../src/Assets/Icons'),
            use: [
               {
                  loader: 'svg-sprite-loader',
                  options: {
                     symbolId: 'icon-[name]'
                  }
               }
            ]
         }
      ]
   },
   plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
         filename: utils.assetsPath('css/' + (devMode ? '[name].css' : '[name].[contenthash].css')),
         chunkFilename: utils.assetsPath(
            'css/' + (devMode ? '[id].css' : '[name].[id].[contenthash].css')
         )
      })
   ],
   optimization: {
      // extracting-boilerplate
      runtimeChunk: 'single',
      splitChunks: {
         cacheGroups: {
            vendors: {
               name: 'chunk-vendors',
               // test: /[\\\/]node_modules[\\\/]/,
               test: /[\\/]node_modules[\\/]/,
               priority: -10,
               chunks: 'initial'
            },
            common: {
               name: 'chunk-common',
               minChunks: 2,
               priority: -20,
               chunks: 'initial',
               reuseExistingChunk: true
            }
         }
      }
   }
}
