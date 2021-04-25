import * as dto from 'dto';

export interface OrderShort {
  id: number;
  clientId: number;
  mealIds: number[];
  totalPrice: number;
}

export interface OrderFull {
  id: number;
  clientId: number;
  meals: dto.Meal[];
  totalPrice: number;
}