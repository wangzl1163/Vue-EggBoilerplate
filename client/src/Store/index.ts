import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { encryption, decryption } from '../Utils/AES'

import { app } from './Modules/App'
import { token } from './Modules/Token'
import { user } from './Modules/User'
import { permission } from './Modules/Permission'
import { tagsView } from './Modules/TagsView'
import { settings } from './Modules/Settings'


export default createStore({
   strict: process.env.NODE_ENV !== 'production',
   plugins: [
      createPersistedState({
         key: 'middleware-control',
         storage: {
            setItem: (key: string, value: any): void => window.sessionStorage.setItem(key, encryption(value)),
            getItem: (key: string): object => decryption(window.sessionStorage.getItem(key)),
            removeItem: (key: string): void => window.sessionStorage.removeItem(key)
         }
      })
   ],
   modules: {
      app,
      token,
      user,
      permission,
      tagsView,
      settings
   }
})
