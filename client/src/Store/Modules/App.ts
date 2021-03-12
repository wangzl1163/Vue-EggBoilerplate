import { Store } from 'vuex';
import { TOGGLE_SIDEBAR, CLOSE_SIDEBAR, TOGGLE_DEVICE } from '../MutationTypes'
import {IApp,IState, IMutations, IActions, IGetters} from './AppInterface';

const state: IState = {
   sidebar: {
      opened: true,
      withoutAnimation: false
   },
   device: 'desktop'
}

const mutations: IMutations = {
   [TOGGLE_SIDEBAR]: (state: IState): void => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
   },
   [CLOSE_SIDEBAR]: (state: IState, withoutAnimation: boolean): void => {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
   },
   [TOGGLE_DEVICE]: (state: IState, device: string): void => {
      state.device = device
   }
}

const actions: IActions = {
   toggleSideBar ({ commit }: Store<IState>): void {
      commit(TOGGLE_SIDEBAR)
   },
   closeSideBar ({ commit }: Store<IState>, { withoutAnimation }: any): void {
      commit(CLOSE_SIDEBAR, withoutAnimation)
   },
   toggleDevice ({ commit }: Store<IState>, device: string): void {
      commit(TOGGLE_DEVICE, device)
   }
}

const getters:IGetters = {
   sidebar: (state: IState) => state.sidebar,
   device: (state: IState) => state.device
}

export const app: IApp = {
   state: state,
   mutations,
   actions,
   getters
}
