export interface IState {
	token: string
}

interface IMutations {
	SET_TOKEN(state: IState, token: string): void
}

interface IActions {
	storeToken ({ commit }: any, token: string): void
}

interface IGetters {
	token (state: IState): string
}

export interface IToken {
	state: IState
   mutations: IMutations
   actions: IActions
   getters: IGetters
}