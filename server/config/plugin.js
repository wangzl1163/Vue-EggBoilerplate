exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}

// 该插件用于支持vue-router的采用history模式时刷新页面后能正常显示
// 采用history时设置enable为true
exports.historyApiFallback = {
  enable: false,
  package: 'egg-history-api-fallback'
}

// 开启代理中间件时设置enable为true
exports.httpProxy = {
  enable: false,
  package: 'egg-http-proxy'
}
