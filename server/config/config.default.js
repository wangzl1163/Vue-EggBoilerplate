const path = require('path')
const os = require('os');
const moment = require('moment')

module.exports = appInfo => {
   const config = {}

   // use for cookie sign key, should change to your own and keep security
   config.keys = `${appInfo.name}_1623503412105_8112`

   // 模块渲染配置，参考：https://eggjs.org/zh-cn/core/view.html
   config.view = {
      defaultViewEngine: 'nunjucks', // 配置后可以不配置mapping
      // 一般在调用 render 时的第一个参数需要包含文件后缀，如果配置了 defaultExtension 可以省略后缀
      defaultExtension: '.njk'
   }

   // 参数，参考：https://github.com/bripkens/connect-history-api-fallback
   config.historyApiFallback = {
      index: '/',
      disableDotRule: false,
      verbose: true // 控制该插件日志记录
   }

   // 对json和form格式数据进行解析，egg内置的解析器
   // 参考：https://eggjs.org/zh-cn/basics/controller.html#body
   //　　　 https://github.com/koajs/bodyparser
   config.bodyParser = {
      jsonLimit: '5mb',
      formLimit: '6mb'
   }

   // 获取上传的文件，multipart为内置插件
   // 参考：https://eggjs.org/zh-cn/basics/plugin.html#%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8
   //　　　 https://eggjs.org/zh-cn/basics/controller.html#%E8%8E%B7%E5%8F%96%E4%B8%8A%E4%BC%A0%E7%9A%84%E6%96%87%E4%BB%B6
   //　　　 https://github.com/eggjs/egg-multipart
   config.multipart = {
      fileSize: '100mb', // default 50mb
      mode: 'file', // 支持的文件类型  or  stream
      tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
      cleanSchedule: {
         // run tmpdir clean job on every day 04:30 am
         // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
         cron: '0 30 4 * * *',
      },
      // 覆盖整个egg支持的文件扩展名的白名单，当重写了 whitelist 时，fileExtensions 不生效。
      whitelist: () => true // 不限制文件扩展名
   }

   // 日志配置，参考：https://eggjs.org/zh-cn/core/logger.html
   config.logger = {
      dir: path.resolve(__dirname, `../logs/${appInfo.name}`), // 日志文件夹
      consoleLevel: 'DEBUG', // 输出到终端日志的级别
      level: `INFO` // 输出到文件日志的级别
   }

   // 项目特别配置
   config.appSelf = {
      title: '中间件资源管控平台',
      version: process.env.VERSION || 'VERSION' + new Date().getTime(),
      deployTime: moment(new Date().getTime()).format('YYYY-MM-DD')
   }

   // 后端配置
   // process.env可以获取到node.js运行的当前环境的环境变量
   config.backEnd = {
      // 如果环境变量中配置了地址，则使用环境变量配置的地址，否则使用指定的（写死的）地址
      url: process.env.GATEWAY_URL || 'http://172.20.60.23:8181',
      timeout: [15000, 30000],
      gitUrl: ''
   }

   console.log('环境变量配置的地址：' + process.env.GATEWAY_URL)
   console.log('固定配置的地址：' + config.backEnd.url)

   // 代理中间件代理地址配置，前提：plugin.js中代理插件的enable为true
   // 代理中间件可以代替封装的apiController
   // 如果开启代理，则删除路由（router.js）中的关于api的路由代码
   // 配置参考：https://github.com/chunkai1312/egg-http-proxy#readme
   config.httpProxy = {
      '/api': 'http://www.example.org'
   }

   config.login = {
      api: {
         login: '/ctfo-devplatform-server/sys/user/login', // 登录接口
         loginout: "/ctfo-devplatform-server/sys/user/logout", // 注销/登出接口
      },
      aesKey: {                                       // 两个加密的 key
         token: "ctfodevplatform0",
         password: "ctfodevplatform1"
      },
      header: {                                       // 调用接口的头信息
         loginType: "LOGIN-TYPE",                      // 登录类型
         loginPassword: "PASSWORD",                    // 登录密码
         loginTokenKey: 'CTFO-AUTH-TOKEN',             // 登录账号
      }

   }

   // 设置资源文件
   config.siteFile = {
      '/favicon.ico': require('fs').readFileSync(path.join(__dirname, '../favicon.ico')),
      '/site/vue.min.js': require('fs').readFileSync(path.join(__dirname, '../siteFile/vue.min.js')),
      '/site/vue.js': require('fs').readFileSync(path.join(__dirname, '../siteFile/vue.js')),
      '/site/vue-router.min.js': require('fs').readFileSync(path.join(__dirname, '../siteFile/vue-router.min.js'))
   }

   return config
}
