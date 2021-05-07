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

//process是一个全局对象，argv返回的是一组包含命令行参数的数组。
//第一项为”node”，第二项为执行的js的完整路径，后面是附加在命令行后的参数
const args = process.argv.splice(2).reduce((pre, cur) => {
   const arr = cur.split('=')
   pre[arr[0]] = arr[1]
   return pre
}, {})

const spinner = ora(`building for mod: ${args.mod}`)

spinner.start()

rm(path.resolve(__dirname, '../../server/app/public'), err => {
   if (err) throw err

   webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      
      // 判断统计信息stats文件夹是否存在，不存在则创建
      const builtDir = path.resolve(__dirname, '../stats/')
      if (!fs.existsSync(builtDir)) {
         fs.mkdirSync(builtDir)
      }

      fs.writeFileSync(
         path.resolve(builtDir, 'webpack.stats.txt'),
         // webpack构建产生的统计信息
         stats.toString({
            all: false,
            modules: true,
            errors: true,

            // 添加构建日期和构建时间信息
            builtAt: true,

            // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
            chunks: true,

            // 将构建模块信息添加到 chunk 信息
            chunkModules: false,

            // 添加 chunk 和 chunk merge 来源的信息
            chunkOrigins: false,

            // 按指定的字段，对 chunk 进行排序
            // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
            // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
            // For a complete list of fields see the bottom of the page
            chunksSort: "name",

            // 用于缩短 request 的上下文目录
            context: "../src/",

            // 添加 --env information
            env: true,

            // 添加错误的详细信息（就像解析日志一样）
            errorDetails: true,

            // 添加 compilation 的哈希值
            hash: true,

            // 设置要显示的模块的最大数量
            maxModules: 20,

            // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
            moduleTrace: true,

            // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
            performance: true,

            // 添加 public path 的信息
            publicPath: true,

            // 添加时间信息
            timings: true,

            // 添加 webpack 版本信息
            version: true,

            // 添加警告
            warnings: true
         })
      )

      if (err) throw err

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
