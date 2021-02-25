/* tslint:disable */
import { Address } from './address';
export interface InvoicePayout {
  amount: string;
  currency: string;
  address: Address;
  transactionHash: string;
}
