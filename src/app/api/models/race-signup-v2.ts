/* tslint:disable */
import { BetCoins } from './bet-coins';
export interface RaceSignupV2 {
  race_hash: string;
  car: number;
  bet_coins: Array<BetCoins>;
  use_ticket?: string;
}
