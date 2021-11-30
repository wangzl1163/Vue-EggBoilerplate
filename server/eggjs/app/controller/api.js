'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  async api() {
    const { ctx } = this;
    
    const path = ctx.request.path.includes('/api/node') ? ctx.request.path.replace('/api/node', '') : ctx.request.path;
    
    const method = ctx.request.method;
    const params = method.toLocaleLowerCase() === 'get' ? ctx.query : ctx.request.body;
    
    const result = await ctx.apiRequest(path, method, params);

    if (result.status === 200) {
      ctx.body = result.data;
    } else {
      ctx.status = result.status;
      ctx.body = result.data;
    }
  }
}

module.exports = ApiController;
