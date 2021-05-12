import * as models from 'models';

export interface OrderShort {
  id: number;
  clientId: number;
  meals: number[];
  totalPrice: number;
  orderDate: string;
}

export interface OrderFull {
  id: number;
  clientId: number;
  meals: models.Meal[];
  totalPrice: number;
}