const startCluster = require('egg').startCluster
startCluster(
  {
    baseDir: __dirname
  },
  () => {
    console.log('app started')
  }
)
