import { createReducer, on, Action } from '@ngrx/store';
import { GlobalLocation, Pages } from 'models';
import * as SystemActions from './system.actions';


export interface SystemState {
  page: Pages;
  globalLocation: GlobalLocation | null;
}

export const initialState: SystemState = {
  page: 'Login',
  globalLocation: null
}

const systemReducer = createReducer(
  initialState,
  on(SystemActions.testAction, state => ({ ...state })),
  on(
    SystemActions.setGlobalLocation,
    (state, { location }) => ({
      ...state,
      globalLocation: location
    })
  )
)

export function reducer(state: SystemState | undefined, action: Action) {
  return systemReducer(state, action);
}