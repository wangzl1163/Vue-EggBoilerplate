'use strict';

const crypto = require('crypto');

class AES {
  constructor() {
    this.keySize = 128;
    this.encoding = 'utf8';
    this.algorithm = 'aes-128-ecb';
    this.iv = '';
    this.cipherEncoding = 'base64';
  }

  en(target, key, replaceChar = false) {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.initKey(key),
      this.iv
    );
    let crypted = cipher.update(target, this.encoding, this.cipherEncoding);
    crypted += cipher.final(this.cipherEncoding);
    if (replaceChar) {
      return crypted.replace(/\+/g, '-').replace(/\//g, '_');
    }
    return crypted;
  }

  de(target, key, replaceChar = false) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.initKey(key),
      this.iv
    );
    if (replaceChar) {
      target = target.replace(/-/g, '+').replace(/_/g, '/');
    }
    let dec = decipher.update(target, this.cipherEncoding, this.encoding);
    dec += decipher.final(this.encoding);
    return dec;
  }

  initKey(key) {
    const keys = new Buffer(key),
      bytes = new Buffer(this.keySize / 8);
    for (let i = 0; i < bytes.length; i++) {
      if (keys.length > i) {
        bytes[i] = keys[i];
      } else {
        bytes[i] = 0;
      }
    }
    return bytes;
  }
}

class SHA {
  sha256(str) {
    console.log(
      crypto
        .createHash('HMAC-SHA256')
        .update('Message')
        .digest('base64')
    );

    const hmac = crypto.createHmac('sha256', 'secret');
    hmac.update(str);
    return hmac.digest('hex');
  }
}

function checkSha1(params, OA_Key) {
  // 没有关键参数，直接弹出
  if (!params || !params.token || !params.loginid || !params.stamp) {
    console.error('url缺少关键参数');
    return false;
  }
  const hash = crypto.createHash('sha1');
  hash.update(OA_Key);
  hash.update(params.loginid);
  hash.update(params.stamp);
  const token = hash.digest('hex');
  console.log('%c当前传入token:' + params.token + ';');
  console.log('%c计算得出token:' + token + ';');
  console.log(
    '%c校验' +
      (token === params.token ? '通过,可以正常访问' : '不通过,提示无权限')
  );
  return token === params.token;
}

module.exports = {
  AES: new AES(),
  SHA: new SHA(),
  checkSha1
};
