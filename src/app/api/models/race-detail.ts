/* tslint:disable */
import { Prices } from './prices';
import { MyCars } from './my-cars';
import { InitialCardsExtra } from './initial-cards-extra';
export interface RaceDetail {
  race_hash: string;
  race_type: string;
  new_race_type: string;
  race_identifier: string;
  bet_amount: number;
  tour_index: number;
  tournament_id: number;
  start_coins_price: Array<Prices>;
  price_pool: string;
  players_count: number;
  race_progress: number;
  my_cars: Array<MyCars>;
  is_cancelled: boolean;
  map_id: number;
  race: Array<InitialCardsExtra>;
  cards: Array<InitialCardsExtra>;
  starts_in: number;
  starts_at: number;
  ends_in: number;
  total_pages: number;
  applicable_payouts: Array<number>;
  applicable_points: Array<number>;
  high_score: any;
}
