'use strict'

// 检查打包环境
require('./check-versions')()

const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio') // 专为服务器端设计的jQuery的核心实现
const ora = require('ora') // 终端加载动画
const rm = require('rimraf') // rm -rf命令的node端实现
const chalk = require('chalk') // 终端字符串样式设置器
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

const target = require('./targetOptions')[process.env.target]
const spinner = ora(`building for env: NODE_ENV = ${process.env.NODE_ENV}`)

spinner.start()

rm(target.outputPath, (err) => {
   if (err) throw err

   webpack(webpackConfig, (err, stats) => {
      spinner.stop()

      // 致命的 webpack 错误（配置出错等）
      if (err) {
         if (err.details) {
            throw new Error(err.details)
         }

         throw new Error(err.stack || err)
      }

      if (!fs.existsSync(path.resolve(__dirname, '../logs/'))) {
         fs.mkdirSync(path.resolve(__dirname, '../logs/'))
      }

      // 生成统计日志
      fs.writeFileSync(
         path.resolve(__dirname, '../logs/webpack.stats.log'),
         'fe-client built info: \n\n' + stats.toString()
      )

      // 输出统计信息到终端
      process.stdout.write(
         stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
         }) + '\n\n'
      )

      // 编译错误（缺失的 module，语法错误等）
      if (stats.hasErrors()) {
         console.log(chalk.red('  Build failed with errors.\n'))
         throw new Error(stats.toJson().errors)
      }

      if (process.env.target === target.egg) {
         const $ = cheerio.load(fs.readFileSync('./dist/webpackBundle.html', 'utf8'))

         fs.writeFileSync(
            path.resolve(__dirname, '../../server/eggjs/app/view/webpackBundle.script.html'),
            $.html('script')
         )

         fs.writeFileSync(
            path.resolve(__dirname, '../../server/eggjs/app/view/webpackBundle.style.html'),
            $.html('link')
         )
      }

      console.log(chalk.cyan('  ---- Build completed ---.\n'))
   })
})
