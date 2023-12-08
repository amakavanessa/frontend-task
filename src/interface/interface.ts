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

export interface HighChartOptionInterface {
  chart: {
    type: string;
  };
  title: {
    text: string | null;
  };
  xAxis: {
    categories: string[];
  };
  series: [
    {
      data: number[];
    }
  ];
  credits: {
    enabled: boolean;
  };
}

export interface FilterPropsInterface {
  sendFilterData: (
    txnType: string[] | null,
    txnStatus: string[] | null,
    startDate: string | null,
    endDate: string | null
  ) => void;
  clearFilter: () => void;
}

export interface DashboardPropsInterface {
  transactions: TransactionInterface[];
  activeFilterCount: number;
}

export interface TransactionPropsInterface {
  transactions: TransactionInterface[];
  activeFilterCount: number;
  clearFilter: () => void;
}
