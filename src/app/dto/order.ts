import * as dto from 'dto';

export interface OrderShort {
  id: number;
  clientId: number;
  meals: string;
  totalPrice: number;
  orderDate: string;
}

export interface OrderFull {
  id: number;
  clientId: number;
  meals: dto.Meal[];
  totalPrice: number;
}