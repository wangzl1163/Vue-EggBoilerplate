import { Commit } from 'vuex';

export interface IState {
	routes: any[]
   addRoutes: any[]
}

export interface IMutations {
	SET_ROUTES(state: IState, routes: any[]): void
}

export interface IActions {
	GenerateRoutes ({ commit }: { commit: Commit}): Promise<any[]>
}

export interface IGetters{
	permissionRoutes(state: IState): any[]
   addRoutes(state: IState): any[]
}

export interface IPermission{
	state: IState
	mutations: IMutations
	actions: IActions
	getters: IGetters
}