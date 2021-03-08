export interface Restaurant {
  id: number;
  name: string;
  isFranchise: boolean;
  // label:
  coordinates: {
    x: number;
    y: number;
  };
  address: string;
  franchiseId: number;
}
