import { Commit } from 'vuex';

interface IState {
	// theme: string
	[key:string]: string
}

export {IState}

export interface IMutations {
	CHANGE_SETTING(state: IState, { key, value }: {key:string,value: any}): void
}

export interface IActions {
	changeSetting ({ commit }: { commit: Commit}, data: object): void
}

export interface IGetters{
	theme(state: IState): string
}

export interface ISettings {
	state: IState
	mutations: IMutations
	actions: IActions
	getters: IGetters
}