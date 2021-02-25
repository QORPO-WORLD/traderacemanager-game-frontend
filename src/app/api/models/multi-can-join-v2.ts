/* tslint:disable */
import { AvailableCar } from './available-car';
export interface MultiCanJoinV2 {
  race_type?: string;
  race_hash?: string;
  race_identifier?: string;
  bet_amount?: number;
  available_cars?: Array<AvailableCar>;
}
