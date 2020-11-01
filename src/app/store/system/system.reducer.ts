import { createReducer, on, Action } from '@ngrx/store';
import { Pages } from 'models';
import * as SystemActions from './system.actions';


export interface SystemState {
    page: Pages;
}

export const initialState: SystemState = {
    page: 'Login'
}

const systemReducer = createReducer(
    initialState,
    on(SystemActions.testAction, state => ({...state}))
)

export function reducer(state: SystemState | undefined, action: Action) {
    return systemReducer(state, action);
}