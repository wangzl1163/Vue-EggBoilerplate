'use strict';

const Controller = require('egg').Controller;

class DownloadController extends Controller {
  async index() {
    const url = this.ctx.query.fileUrl;
    const res = await this.ctx.curl(url, {
      streaming: true,
    });
    this.ctx.body = res.res;
  }
}

module.exports = DownloadController;
