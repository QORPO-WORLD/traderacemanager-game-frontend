/* tslint:disable */
import { Wallet } from './wallet';
import { ActionType } from './action-type';
export interface Transaction {
  wallet: Wallet;
  history_type: string;
  currency?: string;

  /**
   * Balance delta.
   */
  delta?: string;
  extras?: any;
  created_at?: string;
  history_id?: number;
}
