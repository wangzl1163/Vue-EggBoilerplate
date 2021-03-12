export interface IState {
   sidebar: {
      opened: boolean,
      withoutAnimation: boolean
	}
	
   device: string
}

export interface IMutations {
	TOGGLE_SIDEBAR(state: IState): void
	CLOSE_SIDEBAR(state: IState, withoutAnimation: boolean): void
	TOGGLE_DEVICE(state: IState, device: string): void
}

export interface IActions {
	toggleSideBar ({ commit }: any): void
   closeSideBar ({ commit }: any, { withoutAnimation }: any): void
   toggleDevice ({ commit }: any, device: string): void
}

export interface IGetters {
	sidebar (state: IState): object
   device (state: IState): string
}

export interface IApp {
	state: IState
	mutations: IMutations
	actions: IActions
	getters: IGetters
}