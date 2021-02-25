/* tslint:disable */
export interface Car {
  pk?: number;
  car_id?: string;
  car_wins_count?: number;
  car_wins_roi_avg?: number;
  car_wins_total_points?: number;
  car_wins_total_amount?: string;
  bought?: string;
  is_owner?: boolean;
  rented_until?: null | string;
}
