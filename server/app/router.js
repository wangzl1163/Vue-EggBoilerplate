'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  
  router.get(`/`, controller.index.index)

  // 处理 login
  router.post('/api/node/ctfo-devplatform-server/sys/user/login', controller.login.login)

  // 其他统一api处理
  router.all('/api/node/ctfo-devplatform-server/*', controller.api.api);

  // 文件上传处理
  router.post('/fileupload/*', controller.upload.fileUpload)

  // 文件下载处理
  router.get('/filedownload', controller.download.index)

}
