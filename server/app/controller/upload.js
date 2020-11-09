'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async fileUpload() {
    const { ctx, service } = this;
    const basePath = ctx.app.config.backEnd.url;
    const apiPath = ctx.request.path.replace('/fileupload', '');
    const uploadApiUrl = basePath + apiPath; // 上传文件server端的api
    const result = await service.upload.upload(ctx, uploadApiUrl)
    // this.app.logger.info(`${uploadApiUrl} 返回结果是 result = ${JSON.stringify(result)}`);
    ctx.body = result;
  }
}

module.exports = UploadController;
