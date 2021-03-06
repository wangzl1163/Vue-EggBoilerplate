'use strict'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')
const devMode = process.env.NODE_ENV !== 'production'
const cssLoaders = devMode
   ? [
      'vue-style-loader',
      'css-loader',
      'less-loader'
   ]
   : [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'less-loader'
   ] 

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
