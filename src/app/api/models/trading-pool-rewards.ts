/* tslint:disable */
import { TransactionMinimal } from './transaction-minimal';
export interface TradingPoolRewards {
  locked_amount: string;
  earned_amount: string;
  daily_reward: string;
  trading_level_interest: number;
  locked_until: string;
  total_trading_pool: string;
  latest_trading_locks: Array<TransactionMinimal>;
}
