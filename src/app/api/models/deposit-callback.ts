/* tslint:disable */
import { InvoicePayout } from './invoice-payout';
export interface DepositCallback {
  invoiceId: string;
  status: string;
  payout: InvoicePayout;
}
