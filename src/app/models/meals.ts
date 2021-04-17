export interface Meal {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  nutrition: number[];
  restaurantId: number;
  categoryId: number;
}