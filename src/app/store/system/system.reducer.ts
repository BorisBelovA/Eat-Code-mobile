import { createReducer, on, Action } from '@ngrx/store';
import { GlobalLocation, Pages } from 'models';
import * as SystemActions from './system.actions';
import * as models from 'models';

export interface SystemState {
  page: Pages;
  client: models.Client | null;
  globalLocation: GlobalLocation | null;
}

export const initialState: SystemState = {
  page: 'Login',
  client: null,
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
  ),
  on(
    SystemActions.setClient,
    (state, { client }) => ({
      ...state,
      client
    })
  )
)

export function reducer(state: SystemState | undefined, action: Action) {
  return systemReducer(state, action);
}