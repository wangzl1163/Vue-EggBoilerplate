'use strict';

const Service = require('egg').Service;
const fs = require('fs');

class UploadService extends Service {
  /**
   * 处理文件上传
   * @param {*} ctx
   * @param {*} uploadUrl  文件上传的api
   * @param {*} uploadFileName 后端接收文件的文件名 默认 是file
   * @param {*} extraBodyData 额外的json数据
   */
  async upload(ctx, uploadUrl,uploadFileName='file', extraBodyData={}) {
    // console.log(ctx.request.files, '文件个数是'+ctx.request.files.length)
    if (ctx.request.files.length > 1) {
      uploadFileName = 'files'
    }
    const file = ctx.request.files[0];

    extraBodyData.fileName = file.filename;
    // 替换文件名
    let result = null;
    try {
      // 处理文件，比如上传到云端或后端
      result = await ctx.curl(uploadUrl, {
        uploadUrl,
        method: 'POST',
        dataType: 'json',
        data: extraBodyData,
        files: {
          [uploadFileName]: file.filepath
        },
        headers: {
          'CTFO-AUTH-TOKEN': this.ctx.helper.getToken(this.ctx.request.headers.cookie, this.ctx.helper.clientTokenKey),
          'Content-Type': 'multipart/form-data; charset=utf-8'
        }
      });
    } finally {
      fs.unlinkSync(file.filepath);
    }
    const log = {
      uploadUrl,
      method: 'POST',
      dataType: 'json',
      data: extraBodyData,
      files: {
        [uploadFileName]: file.filepath
      },
      headers: {
        'CTFO-AUTH-TOKEN': this.ctx.helper.getToken(this.ctx.request.headers.cookie, this.ctx.helper.clientTokenKey)
      },
      result: result.data
    }
    // this.app.logger.info('[====CURL UPLOAD API PARAMS IS:====]', JSON.stringify(log));
    return result.res.data;
  }
}

module.exports = UploadService;
