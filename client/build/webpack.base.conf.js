'use strict'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')

const target = require("./targetOptions")[process.env.target];
const devMode = process.env.NODE_ENV !== 'production'
const cssLoaders = devMode
   ? [
      'vue-style-loader',
      'css-loader',
      'less-loader'
   ]
   : [
      {
         loader: MiniCssExtractPlugin.loader,
         options: {
            // less中使用了export需要置为false，否则export编译不通过
            esModule: false
         }
      },
      'css-loader',
      'postcss-loader',
      'less-loader'
   ] 

module.exports = {
   context: utils.resolvePath("../"),
   entry: {
      app: ['./src/main.js']
   },
   output: {
      path: target.outputPath,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      publicPath: target.publicPath
   },
   externals: target.externals,
   resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
         "@static": path.resolve(__dirname, "../static"),
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
               cwd: path.resolve(__dirname, '../'),
               cacheDirectory: true // babel转译缓存，提升编译性能
            }
         },
         {
            test: /\.(le|c)ss$/,
            use: cssLoaders
         },
         {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10 * 1024, // 上限为10KB
               name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
         },
         {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10 * 1024, // 上限为10KB
               name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
         },
         {
            test: /\.(sass|scss)$/,
            use: cssLoaders
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
         },
         // 使用element-plus时需要此配置
         {
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto"
         }
      ]
   },
   plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
         ignoreOrder: true,
         filename: utils.assetsPath('css/' + (devMode ? '[name].css' : '[name].[contenthash].css')),
         chunkFilename: utils.assetsPath(
            'css/' + (devMode ? '[id].css' : '[name].[id].[contenthash].css')
         )
      })
   ],
   optimization: {
      runtimeChunk: 'single',
      splitChunks: {
         cacheGroups: {
            vendors: {
               name: 'chunk-vendors',
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
