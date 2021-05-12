export interface Meal {
  readonly id: number;
  readonly restaurantId: number;
  readonly nutrition: {
    readonly calories: number;
    readonly totalFat: number;
    readonly sugar: number;
    readonly sodium: number;
    readonly protein: number;
    readonly saturatedFat: number;
  };
  readonly categoryId: number;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly photo: string;
  readonly rating: number;
  readonly isFavorite: boolean;
}