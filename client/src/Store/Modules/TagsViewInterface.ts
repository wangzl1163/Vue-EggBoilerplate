import {Dispatch, Commit } from 'vuex';
import { RouteRecordRaw } from 'vue-router';

export interface IState {
   visitedViews: RouteRecordRaw[]
   cachedViews: RouteRecordRaw[]
}

export interface IMutations {
	ADD_VISITED_VIEW(state: IState, view: RouteRecordRaw): void
   ADD_CACHED_VIEW(state: IState, view: RouteRecordRaw): void
   DEL_VISITED_VIEW(state: IState, view: RouteRecordRaw): void
   DEL_CACHED_VIEW(state: IState, view: RouteRecordRaw): void
   DEL_OTHERS_VISITED_VIEWS(state: IState, view: RouteRecordRaw): void
   DEL_OTHERS_CACHED_VIEWS(state: IState, view: RouteRecordRaw): void
   DEL_ALL_VISITED_VIEWS(state: IState): void
   DEL_ALL_CACHED_VIEWS(state: IState): void
   UPDATE_VISITED_VIEW(state: IState, view: RouteRecordRaw): void
}

export interface IActions {
	addView ({ dispatch }: {dispatch:Dispatch}, view: RouteRecordRaw): void
   addVisitedView ({ commit }: {commit: Commit}, view: RouteRecordRaw): void
   addCachedView ({ commit }: {commit: Commit}, view: RouteRecordRaw): void

   delView ({ dispatch, state }: {dispatch:Dispatch, state: IState}, view: RouteRecordRaw): Promise<RouteRecordRaw[]>
   delVisitedView ({ commit, state }: {commit: Commit, state: IState}, view: RouteRecordRaw): Promise<RouteRecordRaw[]>
   delCachedView ({ commit, state }: {commit: Commit, state: IState}, view: RouteRecordRaw): Promise<RouteRecordRaw[]>

   delOthersViews ({ dispatch, state }: {dispatch: Dispatch, state: IState}, view: RouteRecordRaw): Promise<RouteRecordRaw[]>
   delOthersVisitedViews ({ commit, state }: {commit: Commit, state: IState}, view: RouteRecordRaw): Promise<RouteRecordRaw[]>
   delOthersCachedViews ({ commit, state }: {commit: Commit, state: IState}, view: RouteRecordRaw): Promise<RouteRecordRaw[]>

   delAllViews ({ dispatch, state }: {dispatch: Dispatch, state: IState}, view: RouteRecordRaw): Promise<RouteRecordRaw[]>
   delAllVisitedViews ({ commit, state }: {commit: Commit, state: IState}): Promise<RouteRecordRaw[]>
   delAllCachedViews ({ commit, state }: {commit: Commit, state: IState}): Promise<RouteRecordRaw[]>
   updateVisitedView ({ commit }: {commit: Commit}, view: RouteRecordRaw): void
}

export interface ITagsView {
	state: IState
	mutations: IMutations
	actions: IActions
}