import { Dispatch, Commit } from 'vuex';

export interface IStore {
	dispatch?: Dispatch
	commit?: Commit
}