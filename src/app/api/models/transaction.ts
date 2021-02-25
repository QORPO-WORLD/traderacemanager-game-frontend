/* tslint:disable */
import { Wallet } from './wallet';
import { ActionType } from './action-type';
export interface Transaction {
  wallet: Wallet;
  action_type: ActionType;
  wallet_type?: string;
  currency?: string;

  /**
   * Balance delta.
   */
  delta?: string;
  extras?: {};
  created?: string;
}
