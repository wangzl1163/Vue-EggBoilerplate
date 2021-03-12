import request from '@/Utils/HttpRequest'

function login (params: object): Promise<any> {
   return request.$post('', params)
}

function logout (): Promise<any> {
   return request.$get('')
}

function getUserInfo (): Promise<any> {
   return request.$post('', params)
}

function getCodeImg (params: object): Promise<any> {
   return request.$get('')
}

export {
   login,
   logout,
   getUserInfo,
   getCodeImg
}
