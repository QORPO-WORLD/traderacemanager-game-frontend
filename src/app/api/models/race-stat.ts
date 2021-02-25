/* tslint:disable */
import { RaceStatEntity } from './race-stat-entity';
import { CoinsPerformance } from './coins-performance';
export interface RaceStat {
  race_progress: number;
  me: RaceStatEntity;
  race: Array<RaceStatEntity>;
  cards: Array<RaceStatEntity>;
  coins_performance: Array<CoinsPerformance>;
}
