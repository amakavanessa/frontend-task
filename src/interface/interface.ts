export interface TransactionInterface {
  amount: number;
  date: string;
  metadata?: {
    country?: string;
    email?: string;
    name?: string;
    product_name?: string;
    quantity?: number;
  };
  payment_reference?: string;
  status: string;
  type: string;
}
