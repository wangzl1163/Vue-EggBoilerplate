/**
 * 操作权限处理
 */

import store from '@/Store'

export default {
   mounted (el: any, binding: any) {
      const { value } = binding
      const allPermission = '*:*:*'
      const permissions = store.getters && store.getters.permissions

      if (value && value instanceof Array && value.length > 0) {
         const permissionFlag = value

         const hasPermissions = permissions.some((permission: string) => {
            return allPermission === permission || permissionFlag.includes(permission)
         })

         if (!hasPermissions) {
            el.parentNode && el.parentNode.removeChild(el)
         }
      } else {
         throw new Error(`请设置操作权限标签值`)
      }
   }
}
