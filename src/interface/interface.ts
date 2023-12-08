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

export interface WalletInterface {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

export interface UserInterface {
  first_name: string;
  last_name: string;
  email: string;
}
