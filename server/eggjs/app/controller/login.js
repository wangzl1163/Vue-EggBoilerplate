'use strict';
const crypto = require('../lib/crypto');


const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const loginConfig = ctx.app.config.login;
    const { email, password } = ctx.request.body;
    // 加密的key 暂时不要可配置
    const aesPassword = crypto.AES.en(password, 'ctfodevplatform1')
    const aesEmail = crypto.AES.en(email, 'ctfodevplatform0')
    const headers = { // 没必要写入配置了，需要与后端保持一致！
      'LOGIN-TYPE': 1,
      'PASSWORD': aesPassword,
      'CTFO-AUTH-TOKEN': aesEmail
    }
    const result = await ctx.apiRequest(
      loginConfig.api.login,
      'post',
      {email: aesEmail, password: aesPassword},
      headers
    )
    ctx.body = Object.assign({}, result.data, {aesPassword, aesEmail});
  }
}

module.exports = LoginController;
