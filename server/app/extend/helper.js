// 自定义helper方法
module.exports = {
  clientTokenKey: 'token',// 客户端 header中带过来token的 key
  getToken(cookies, param) {
    if (!cookies) return ''
    let target = ''
    cookies.split(';').forEach(v => {
      let arrKeyVal = v.split('=')
      if (arrKeyVal[0].trim() === param) {
        target = decodeURIComponent(arrKeyVal[1])
      }
    })
    return target
  }

}

