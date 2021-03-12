import { Module } from 'vuex';
import { SET_TOKEN } from '../MutationTypes'
import { IToken, IState } from './TokenInterface';

export const token: IToken = {
   state: {
      token: ''
   },
   mutations: {
      [SET_TOKEN] (state: IState, token: string): void {
         state.token = token
      }
   },
   actions: {
      storeToken ({ commit }: any, token: string): void {
         commit(SET_TOKEN, token)
      }
   },
   getters: {
      token: (state: IState): string => {
         return state.token
      }
   }
}
