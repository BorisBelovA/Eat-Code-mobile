import { GlobalLocation } from 'models';
export interface Restaurant {
  id: number;
  name: string;
  isFranchise: boolean;
  // label:
  coordinates: GlobalLocation;
  address: string;
  franchiseId: number;
}

export interface Reservation {
  id: number;
  restaurant: {
    name: string;
    id: number;
    address: string;
  };
  tableId: number;
  date: string;
}
