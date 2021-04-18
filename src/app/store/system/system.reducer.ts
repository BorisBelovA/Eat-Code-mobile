import { createReducer, on, Action } from '@ngrx/store';
import { GlobalLocation, Pages } from 'models';
import * as SystemActions from './system.actions';


export interface SystemState {
  page: Pages;
  globalLocation: GlobalLocation | null;
  userId: number | null;
}

export const initialState: SystemState = {
  page: 'Login',
  globalLocation: null,
  userId: null
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
  ),
  on(
    SystemActions.setUderId,
    (state, { userId }) => ({
      ...state,
      userId
    })
  )
)

export function reducer(state: SystemState | undefined, action: Action) {
  return systemReducer(state, action);
}