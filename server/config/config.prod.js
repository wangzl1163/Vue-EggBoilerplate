module.exports = () => {
  const config = {}

  // 日志切割器
  // 参考：https://eggjs.org/zh-cn/core/logger.html#%E6%97%A5%E5%BF%97%E5%88%87%E5%89%B2
  //　　　 https://github.com/eggjs/egg-logrotator
  config.logrotator = {
    maxDays: 7
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

  return config
}
