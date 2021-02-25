/* tslint:disable */
export interface TournamentLeaderboard {
  user_id?: string;
  car_id?: number;
  user_nickname?: string;
  points?: number;
  avg_roi?: number;
  still_in_game?: boolean;
  finished_at?: number;
  position?: number;
  applicable_payout?: number;
  applicable_points?: number;
  me?: boolean;
}
