import { createAction, props } from '@ngrx/store';
import * as models from 'models';

export const findNearest = createAction(
  '[restaurants] find nearest',
  props<{ location: models.GlobalLocation }>()
);

