import * as models from 'models';

export interface OrderShort {
  id: number;
  clientId: number;
  mealIds: number[];
  totalPrice: number;
}

export interface OrderFull {
  id: number;
  clientId: number;
  meals: models.Meal[];
  totalPrice: number;
}