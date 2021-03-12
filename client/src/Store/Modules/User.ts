import { Dispatch, Commit, Module } from 'vuex';
import { SET_USER_NAME, SET_USER_AVATAR, SET_ROLES, SET_PERMISSIONS } from '../MutationTypes'
import { login, logout, getUserInfo } from '@/Apis/Login'
import { IUser, IState } from './UserInterface';

const user: IUser = {
   state: {
      name: '',
      avatar: '',
      roles: [],
      permissions: []
   },

   mutations: {
      [SET_USER_NAME]: (state, name: string): void => {
         state.name = name
      },
      [SET_USER_AVATAR]: (state, avatar: string): void => {
         state.avatar = avatar
      },
      [SET_ROLES]: (state, roles: Array<string>): void => {
         state.roles = roles
      },
      [SET_PERMISSIONS]: (state, permissions: Array<string>): void => {
         state.permissions = permissions
      }
   },

   actions: {
      // 登录
      Login ({ dispatch }: {dispatch: Dispatch}, userInfo: {
         username: string,
         password: string,
         code: string | number,
         uuid: string
      }) {
         const username = userInfo.username.trim()
         const password = userInfo.password
         const code = userInfo.code
         const uuid = userInfo.uuid

         return new Promise((resolve, reject) => {
            login({username, password, code, uuid}).then(res => {
               dispatch('storeToken', res.token)
               resolve(res)
            }).catch(error => {
               reject(error)
            })
         })
      },

      // 获取用户信息
      GetUserInfo ({ commit }: { commit: Commit}) {
         return new Promise((resolve, reject) => {
            getUserInfo().then(res => {
               const user = res.user
               const avatar = user.avatar === '' ? require('@/Assets/Images/Profile.png') : process.env.VUE_APP_BASE_API + user.avatar

               if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                  commit(SET_ROLES, res.roles)
                  commit(SET_PERMISSIONS, res.permissions)
               } else {
                  commit(SET_ROLES, ['ROLE_DEFAULT'])
               }

               commit(SET_USER_NAME, user.userName)
               commit(SET_USER_AVATAR, avatar)
               resolve(res)
            }).catch(error => {
               reject(error)
            })
         })
      },

      // 退出系统
      LogOut ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) {
         return new Promise((resolve, reject) => {
            logout().then(() => {
               dispatch('storeToken', '')
               commit(SET_ROLES, [])
               commit(SET_PERMISSIONS, [])
               resolve(undefined)
            }).catch(error => {
               reject(error)
            })
         })
      },

      // 前端 登出
      FedLogOut ({ dispatch }: {dispatch: Dispatch}) {
         return new Promise((resolve) => {
            dispatch('storeToken', '')
            resolve(undefined)
         })
      }
   },

   getters: {
      avatar: (state): string => state.avatar
   }
}

export { user }
