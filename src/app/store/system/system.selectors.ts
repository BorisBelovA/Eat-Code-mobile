import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from '../reducer';
import { SystemState } from "./system.reducer";

export const selectSystemState = (state: AppState) => state.system;

export const selectGlobalPosition = createSelector(
  selectSystemState,
  (state: SystemState) => state.globalLocation
);

export const selectUserId = createSelector(
  selectSystemState,
  state => state.userId
);