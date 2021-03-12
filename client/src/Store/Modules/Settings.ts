import variables from '@/Assets/Style/ElementVariables.less'
import { Module, Commit } from 'vuex';
import {ISettings, IState, IMutations, IActions, IGetters } from './SettingsInterface';

const state: IState = {
   theme: variables.theme
}

const mutations: IMutations = {
   CHANGE_SETTING: (state: IState, { key, value }) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
         state[key] = value
      }
   }
}

const actions: IActions = {
   changeSetting ({ commit }, data: object) {
      commit('CHANGE_SETTING', data)
   }
}

const getters: IGetters = {
   theme: (state: IState): string => state.theme
}

// export const settings: Module<ISettings, object> = {
//    state,
//    mutations,
//    actions,
//    getters
// }
export const settings: ISettings = {
   state,
   mutations,
   actions,
   getters
}
