import { RouteRecordRaw } from 'vue-router';
import { Store, Dispatch, Commit, Module } from 'vuex';
import { IStore } from '../StoreInterface';
import { ADD_VISITED_VIEW, ADD_CACHED_VIEW, DEL_VISITED_VIEW, DEL_ALL_CACHED_VIEWS, DEL_ALL_VISITED_VIEWS, DEL_CACHED_VIEW, DEL_OTHERS_CACHED_VIEWS, DEL_OTHERS_VISITED_VIEWS, UPDATE_VISITED_VIEW } from '../MutationTypes'
import { ITagsView, IState, IMutations, IActions } from './TagsViewInterface';

const state: IState = {
   visitedViews: [],
   cachedViews: []
}

const mutations: IMutations = {
   [ADD_VISITED_VIEW]: (state: IState, view: any) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      
      state.visitedViews.push({
         fullPath: view.fullPath,
         hash: view.hash || '',
         meta: view.meta || {},
         name: view.name,
         path: view.path,
         params: view.params,
         query: view.query,
         title: view.meta ? view.meta.title || 'no-name' : ''
      })
   },
   [ADD_CACHED_VIEW]: (state: IState, view: RouteRecordRaw) => {
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
         state.cachedViews.push(view.name)
      }
   },

   [DEL_VISITED_VIEW]: (state: IState, view: RouteRecordRaw) => {
      for (const [i, v] of state.visitedViews.entries()) {
         if (v.path === view.path) {
            state.visitedViews.splice(i, 1)
            break
         }
      }
   },
   [DEL_CACHED_VIEW]: (state: IState, view: RouteRecordRaw) => {
      const index = state.cachedViews.indexOf(view.name)
      index > -1 && state.cachedViews.splice(index, 1)
   },

   [DEL_OTHERS_VISITED_VIEWS]: (state: IState, view: RouteRecordRaw) => {
      state.visitedViews = state.visitedViews.filter(v => {
         return v.meta.affix || v.path === view.path
      })
   },
   [DEL_OTHERS_CACHED_VIEWS]: (state: IState, view: RouteRecordRaw) => {
      const index = state.cachedViews.indexOf(view.name)
      if (index > -1) {
         state.cachedViews = state.cachedViews.slice(index, index + 1)
      } else {
         state.cachedViews = []
      }
   },

   [DEL_ALL_VISITED_VIEWS]: (state: IState) => {
      // keep affix tags
      const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
      state.visitedViews = affixTags
   },
   [DEL_ALL_CACHED_VIEWS]: (state: IState) => {
      state.cachedViews = []
   },

   [UPDATE_VISITED_VIEW]: (state: IState, view: RouteRecordRaw) => {
      for (let v of state.visitedViews) {
         if (v.path === view.path) {
            v = Object.assign(v, view)
            break
         }
      }
   }
}

const actions: IActions = {
   addView ({ dispatch }: Store<IState>, view: RouteRecordRaw) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
   },
   addVisitedView ({ commit }: Store<IState>, view: RouteRecordRaw) {
      commit(ADD_VISITED_VIEW, view)
   },
   addCachedView ({ commit }: Store<IState>, view: RouteRecordRaw) {
      commit(ADD_CACHED_VIEW, view)
   },

   delView ({ dispatch, state }: Store<IState>, view: RouteRecordRaw) {
      return new Promise(resolve => {
         dispatch('delVisitedView', view)
         dispatch('delCachedView', view)
         resolve({
            visitedViews: [...state.visitedViews],
            cachedViews: [...state.cachedViews]
         })
      })
   },
   delVisitedView ({ commit, state }: Store<IState>, view: RouteLocationNormalized) {
      return new Promise(resolve => {
         commit(DEL_VISITED_VIEW, view)
         resolve([...state.visitedViews])
      })
   },
   delCachedView ({ commit, state }: Store<IState>, view: RouteLocationNormalized) {
      return new Promise(resolve => {
         commit(DEL_CACHED_VIEW, view)
         resolve([...state.cachedViews])
      })
   },

   delOthersViews ({ dispatch, state }: Store<IState>, view: RouteLocationNormalized) {
      return new Promise(resolve => {
         dispatch('delOthersVisitedViews', view)
         dispatch('delOthersCachedViews', view)
         resolve({
            visitedViews: [...state.visitedViews],
            cachedViews: [...state.cachedViews]
         })
      })
   },
   delOthersVisitedViews ({ commit, state }: Store<IState>, view: RouteLocationNormalized) {
      return new Promise(resolve => {
         commit(DEL_OTHERS_VISITED_VIEWS, view)
         resolve([...state.visitedViews])
      })
   },
   delOthersCachedViews ({ commit, state }: Store<IState>, view: RouteLocationNormalized) {
      return new Promise(resolve => {
         commit(DEL_OTHERS_CACHED_VIEWS, view)
         resolve([...state.cachedViews])
      })
   },

   delAllViews ({ dispatch, state }: Store<IState>, view: RouteLocationNormalized) {
      return new Promise(resolve => {
         dispatch('delAllVisitedViews', view)
         dispatch('delAllCachedViews', view)
         resolve({
            visitedViews: [...state.visitedViews],
            cachedViews: [...state.cachedViews]
         })
      })
   },
   delAllVisitedViews ({ commit, state }: Store<IState>) {
      return new Promise(resolve => {
         commit(DEL_ALL_VISITED_VIEWS)
         resolve([...state.visitedViews])
      })
   },
   delAllCachedViews ({ commit, state }: Store<IState>) {
      return new Promise(resolve => {
         commit(DEL_ALL_CACHED_VIEWS)
         resolve([...state.cachedViews])
      })
   },

   updateVisitedView ({ commit }: Store<IState>, view: RouteRecordRaw) {
      commit(UPDATE_VISITED_VIEW, view)
   }
}

export const tagsView: ITagsView = {
   state,
   mutations,
   actions
}
