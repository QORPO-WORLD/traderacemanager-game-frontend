/* tslint:disable */
import { PlayerLeaderboard } from './player-leaderboard';
export interface InternalTeamLeaderboard {
  top10?: Array<PlayerLeaderboard>;
  me?: PlayerLeaderboard;
  team_bonus?: number;
  applicable_team_bonuses?: Array<number>;
}
