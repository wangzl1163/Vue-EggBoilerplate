

module.exports = {
  /**
   * 封装api请求
   * @param {*} path
   * @param {*} method
   * @param {*} params
   * @param {*} _headers
   */
  async apiRequest(path, method = 'GET', params = {}, _headers = {}) {
    let apiConfig = this.app.config.backEnd;
     // 封装Api的头信息
    const headers = {
      'CTFO-AUTH-TOKEN': this.helper.getToken(this.request.headers.cookie, this.helper.clientTokenKey)
    };

    for (let k in _headers) {
      headers[k] = _headers[k];
    }

    // 这里还可以加一些统一的 header信息
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

    // 这里还可以加一些统一的 header信息
    const url = baseApi + path;
    const curlParam = {
      method: method,
      // dataType: 'json',
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
    
    // 返回原始的 response
    return result;
  }
}
