module.exports = {
  /**
   * 封装api请求
   * @param {*} path
   * @param {*} method
   * @param {*} params
   * @param {*} _headers
   */
  async apiRequest(path, method = 'GET', params = {}, _headers = {}) {
    const apiConfig = this.app.config.backEnd;
    // 封装Api的头信息
    const headers = {
      'Authorization': this.request.headers.authorization
    };

    for (let k in _headers) {
      headers[k] = _headers[k];
    }

    let url = apiConfig.url + path;

    const curlParam = {
      method: method,
      dataType: 'json',
      contentType: 'json',
      data: params,
      dataAsQueryString: method === 'GET',
      headers: headers,
      timeout: apiConfig.timeout
    }
    const result = await this.curl(url, curlParam);

    const logs = {
      url: url,
      headers: headers,
      params: curlParam.data,
      result: result.data
    };
    this.app.logger.info(url + '请求结果：', JSON.stringify(logs))
    
    // 返回原始的 response
    return result;
  },

  async apiRequestOther(path, method = 'GET', params = {}, _headers = {}, baseApi) {
    let apiConfig = this.app.config.backEnd;
     // 封装Api的头信息
    const headers = {
      'Cookie': params['x-Cookie'],
      'cookie': params['x-Cookie']
    };

    for (let k in _headers) {
      headers[k] = _headers[k];
    }

    const url = baseApi + path;
    const curlParam = {
      method: method,
      dataType: 'text/html; charset=utf-8',
      contentType: 'json',
      data: params,
      dataAsQueryString: method === 'GET',
      headers: headers,
      timeout: apiConfig.timeout
    }
    const result = await this.curl(url, curlParam);
    const logs = {
      url: url,
      headers: headers,
      params: curlParam.data,
      result: result.data
    };
    this.app.logger.info(url + '请求结果：', JSON.stringify(logs))
    
    // 返回原始的 response
    return result;
  }
}
