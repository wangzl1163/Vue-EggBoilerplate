'use strict'
require('./check-versions')()

const cheerio = require('cheerio')
const fs = require('fs')
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora(`build for env: NODE_ENV=${process.env.NODE_ENV}`)
spinner.start()

rm(path.resolve(__dirname, '../../server/app/public'), err => {
   if (err) throw err

   webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      
      // 编译生成的HTML模板文件输出到dist文件夹
      // 判断dist文件夹是否存在，不存在则创建
      const builtDir = path.resolve(__dirname, '../dist/')
      if (!fs.existsSync(builtDir)) {
         fs.mkdirSync(builtDir)
      }

      fs.writeFileSync(
         path.resolve(builtDir, 'webpack.stat.json'),
         JSON.stringify({
            hash: stats.hash,
            time: stats.time
         })
      )

      if (err) throw err

      process.stdout.write(
         stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
         }) + '\n\n'
      )

      if (stats.hasErrors()) {
         console.log(chalk.red('  Build failed with errors.\n'))
         process.exit(1)
      }

      console.log(chalk.cyan('  ---- Build completed ---.\n'))

      const $ = cheerio.load(fs.readFileSync('./dist/webpackBundle.html', 'utf8'))

      fs.writeFileSync(
         path.resolve(__dirname, '../../server/app/view/webpackBundle.script.html'),
         $.html('script')
      )
      
      fs.writeFileSync(
         path.resolve(__dirname, '../../server/app/view/webpackBundle.style.html'),
         $.html('link')
      )
   })
})
