import request from '@/Utils/HttpRequest'

export default function getRouters (): Promise<object> {
   return request.$post('')
}
