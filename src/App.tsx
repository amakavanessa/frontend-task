import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import NavigationComponent from "./components/navigation/navigation";
import DashboardComponent from "./components/dashboard/dashboard";
import TransactionsComponent from "./components/transactions/transactions";
import FiltermodalComponent from "./components/filtermodal/filtermodal";
import { TransactionInterface } from "./interface/interface";

const App: React.FC = () => {
  const [transactions, setTransactions] = useState([]);
  // const [txn, setTxn] = useState([]);
  const [txnType, setTxnType] = useState<string[] | null>([]);
  const [txnStatus, setTxnStatus] = useState<string[] | null>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const populateFilter = (
    txnType: string[] | null,
    txnStatus: string[] | null,
    startDate: string | null,
    endDate: string | null
  ) => {
    setTxnType(txnType);
    setTxnStatus(txnStatus);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const countActiveFilters = () => {
    let count = 0;
    if (txnType?.length) count++;
    if (txnStatus?.length) count++;
    if (startDate) count++;
    if (endDate) count++;
    return count;
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        "https://fe-task-api.mainstack.io/transactions"
      );
      const txns = await response.json();

      let filteredData: any = [...txns];

      if (startDate) {
        filteredData = filteredData.filter((txn: TransactionInterface) => {
          return (
            dayjs(txn.date).isSame(dayjs(startDate)) ||
            dayjs(txn.date).isAfter(dayjs(startDate))
          );
        });
      }

      if (endDate) {
        filteredData = filteredData.filter((txn: TransactionInterface) => {
          return (
            dayjs(txn.date).isSame(dayjs(endDate)) ||
            dayjs(txn.date).isBefore(dayjs(endDate))
          );
        });
      }

      if (txnType && txnType.length > 0) {
        filteredData = filteredData.filter((txn: TransactionInterface) =>
          txnType.includes(txn.type)
        );
      }

      if (txnStatus && txnStatus.length > 0) {
        filteredData = filteredData.filter((txn: TransactionInterface) => {
          return txnStatus.includes(txn.status.toLowerCase());
        });
      }

      setTransactions(filteredData);
      // setTxn(txns);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(transactions, activeFilterCount);

  useEffect(() => {
    fetchTransactions();
    setActiveFilterCount(countActiveFilters());
    // eslint-disable-next-line
  }, [activeFilterCount, txnType, txnStatus, startDate, endDate]);

  return (
    <div>
      <div className="container" id="container">
        <NavigationComponent />
        <DashboardComponent
          transactions={transactions}
          activeFilterCount={activeFilterCount}
        />
        <TransactionsComponent
          transactions={transactions}
          activeFilterCount={activeFilterCount}
        />
        <FiltermodalComponent sendFilterData={populateFilter} />
      </div>
    </div>
  );
};

export default App;
