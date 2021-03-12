import { Dispatch, Commit } from 'vuex';

export interface IState {
	name: string
	avatar: string
	roles: Array<string>
	permissions: Array<string>
}

interface IMutations {
	SET_USER_NAME(state: IState, name: string): void
	SET_USER_AVATAR(state: IState, avatar: string): void
	SET_ROLES(state: IState, roles: Array<string>): void
	SET_PERMISSIONS(state: IState, permissions: Array<string>): void
}

interface IActions {
	// 登录
	Login ({ dispatch }: {dispatch: Dispatch}, userInfo: object): Promise<undefined>

	// 获取用户信息
	GetUserInfo ({ commit, state }: { commit: Commit, state: IState}): Promise<undefined>

	// 退出系统
	LogOut ({ state, commit, dispatch }: { commit: Commit, state: IState, dispatch: Dispatch }): Promise<undefined>

	// 前端 登出
	FedLogOut ({ dispatch }: {dispatch: Dispatch}): Promise<undefined>
}

interface IGetters {
	avatar(state: IState): string
}

export interface IUser {
	state: IState
	mutations: IMutations
	actions: IActions
	getters: IGetters
}