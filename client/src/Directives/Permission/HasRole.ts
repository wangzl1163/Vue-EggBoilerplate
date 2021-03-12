/**
 * 角色权限处理
 */

import store from '@/Store'

export default {
   mounted (el: any, binding: any) {
      const { value } = binding
      const superAdmin = 'admin'
      const roles = store.getters && store.getters.roles

      if (value && value instanceof Array && value.length > 0) {
         const roleFlag = value

         const hasRole = roles.some((role:string) => {
            return superAdmin === role || roleFlag.includes(role)
         })

         if (!hasRole) {
            el.parentNode && el.parentNode.removeChild(el)
         }
      } else {
         throw new Error(`请设置角色权限标签值"`)
      }
   }
}
