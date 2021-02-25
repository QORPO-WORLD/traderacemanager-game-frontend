/* tslint:disable */
import { InvoicePayment } from './invoice-payment';
export interface Order {
  invoice_id: string;
  order_status: string;
  payment: InvoicePayment;
}
