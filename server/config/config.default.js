const path = require('path')
const os = require('os');
const moment = require('moment')

module.exports = appInfo => {
   const config = {}
   // use for cookie sign key, should change to your own and keep security
   config.keys = `${appInfo.name}_1623503412105_8112`

   config.webpackConfigAlias = {
      keys: ['env']
   }

   config.view = {
      defaultViewEngine: 'nunjucks'
   }

   config.historyApiFallback = {
      index: '/',
      disableDotRule: false,
      verbose: true
   }

   config.bodyParser = {
      enable: true,
      jsonLimit: '5mb',
      formLimit: '6mb'
   }

   //config.middleware = [`accesslog`]

   config.customLogger = {
      accessLogger: {
         file: path.join(appInfo.root, `logs/${appInfo.name}/access.log`)
      }
   }

   // 日志配置
   config.logger = {
      file: path.join(appInfo.root, `logs/${appInfo.name}/access-api.log`),
      consoleLevel: 'DEBUG',
      level: `INFO`
   }


   // 后端配置
   config.backEnd = {
      // 如果环境变量中配置了地址，则使用环境变量配置的地址，否则使用指定的（写死的）地址
      url: process.env.GATEWAY_URL || 'http://172.20.60.23:8181',
      timeout: [15000, 30000],
      gitUrl: 'https://git.ctfo.com'
   }

   // process.env可以获取到node.js运行的当前环境的环境变量
   console.log('环境变量配置的地址：' + process.env.GATEWAY_URL)
   console.log('固定配置的地址：' + config.backEnd.url)

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
   // 文件上传  see https://github.com/eggjs/egg-multipart
   config.multipart = {
      fileSize: '100mb', // default 50mb
      mode: 'file', // 支持的文件类型  or  stream
      tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
      cleanSchedule: {
         // run tmpdir clean job on every day 04:30 am
         // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
         cron: '0 30 4 * * *',
      },
      whitelist: () => {
         return true;// 不限制文件扩展名
      }
   }


   // 项目特别配置
   config.appSelf = {
      version: process.env.VERSION || 'VERSION' + new Date().getTime(),
      deployTime: moment(new Date().getTime()).format('YYYY-MM-DD')
   }

   // 设置集群启动配置。
   // 参考：https://eggjs.org/zh-cn/core/cluster-and-ipc.html#mobileAside
   // 注意：egg-scripts在没有配置works参数时会默认启动与服务器CPU核数相匹配的进程数，此时不能配置cluster模块
   //       否则，无法启动。如果配置了cluster模块，要设置start命令的works为1，示例：
   //       eggctl start --title=egg-server-http-proxy --works=1
   //       另外，配置cluster模块时指定了端口，在不必在npm命令中设置端口，
   config.cluster = {
      listen: {
         port: 9001,
         hostname: '0.0.0.0',
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
