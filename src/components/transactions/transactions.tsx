import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  MdExpandMore,
  MdOutlineFileDownload,
  MdOutlineCallReceived,
  MdOutlineCallMade,
} from "react-icons/md";
import "./transactions.css";
import Filtermodal from "../filtermodal/filtermodal";
interface Transaction {
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

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState([]);
  const [txnType, setTxnType] = useState<string[] | null>([]);
  const [txnStatus, setTxnStatus] = useState<string[] | null>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  console.log(txnType, txnStatus, startDate, endDate);
  const fetchTransactions = async () => {
    try {
      await fetch("https://fe-task-api.mainstack.io/transactions")
        .then((res) => res.json())
        .then((txns) => setTransactions(txns));
    } catch (error) {
      console.error(error);
    }
  };

  const getTxnStatusClass = (status: string) => {
    if (status === "successful") {
      return "success";
    } else if (status === "pending") {
      return "pending";
    } else if (status === "failed") {
      return "failed";
    }
    return "";
  };

  function showFilterModal() {
    const container = document.getElementById("container");
    const filter = document.getElementById("filter");
    if (filter && container) {
      filter.style.width = "456px";
      filter.style.right = "0px";
      container.classList.add("overlay");
    }
  }

  const filterTransactions = (
    txnType: string[] | null,
    txnStatus: string[] | null,
    startDate: string | null,
    endDate: string | null
  ) => {
    let filteredData = transactions;

    if (startDate) {
      filteredData = filteredData.filter((txn: Transaction) => {
        return (
          dayjs(txn.date).isSame(dayjs(startDate)) ||
          dayjs(txn.date).isAfter(dayjs(startDate))
        );
      });
    }

    if (endDate) {
      filteredData = filteredData.filter((txn: Transaction) => {
        return (
          dayjs(txn.date).isSame(dayjs(endDate)) ||
          dayjs(txn.date).isBefore(dayjs(endDate))
        );
      });
    }

    if (txnType && txnType.length > 0) {
      filteredData = filteredData.filter((txn: Transaction) =>
        txnType.includes(txn.type)
      );
    }

    if (txnStatus && txnStatus.length > 0) {
      filteredData = filteredData.filter((txn: Transaction) => {
        return txnStatus.includes(txn.status.toLowerCase());
      });
    }
    setFilteredTransactions(filteredData);
  };

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

  useEffect(() => {
    fetchTransactions();

    filterTransactions(txnType, txnStatus, startDate, endDate);
    console.log(filteredTransactions);
  }, [txnType, txnStatus, startDate, endDate]);

  return (
    <div>
      <div className="transactions">
        <div>
          <div>
            <h3>
              {txnStatus || txnType || endDate || startDate
                ? filteredTransactions.length
                : transactions.length}{" "}
              Transactions
            </h3>
            <div>Your transaction for all time</div>
          </div>
          <div className="action">
            <div onClick={() => showFilterModal()}>
              <span>Filter </span>

              <span>
                <MdExpandMore className="icon" />
              </span>
            </div>
            <div>
              Export list{" "}
              <span>
                <MdOutlineFileDownload className="icon" />
              </span>
            </div>
          </div>
        </div>
        <div className="transaction-details">
          {" "}
          <div>
            {txnStatus || txnType || endDate || startDate ? (
              <div className="transaction-container">
                {filteredTransactions.map((txn: any) => (
                  <div className="transaction" key={txn.payment_reference}>
                    <div className="transaction-title">
                      <div>
                        {txn.type && txn.type === "deposit" && (
                          <span className="deposit-icon">
                            <MdOutlineCallReceived className="icon" />
                          </span>
                        )}
                        {txn.type && txn.type === "withdrawal" && (
                          <span className="withdrawal-icon">
                            <MdOutlineCallMade className="icon" />
                          </span>
                        )}
                      </div>
                      <div>
                        <div>
                          {txn.metadata &&
                            txn.metadata.product_name &&
                            txn.type === "deposit" && (
                              <div className="transaction-product">
                                {txn.metadata.product_name}
                              </div>
                            )}
                          {(!txn.metadata || !txn.metadata.product_name) &&
                            txn.type === "withdrawal" && (
                              <div className="transaction-product">
                                Cash withdrawal
                              </div>
                            )}
                          {(!txn.metadata || !txn.metadata.product_name) &&
                            txn.type !== "withdrawal" && (
                              <div className="transaction-product">-</div>
                            )}
                        </div>
                        <div>
                          {txn.metadata && txn.metadata.name && (
                            <div className="transaction-name">
                              {txn.metadata.name}
                            </div>
                          )}
                          {(!txn.metadata || !txn.metadata.name) &&
                            txn.status && (
                              <div className={getTxnStatusClass(txn.status)}>
                                {txn.status}
                              </div>
                            )}
                          {(!txn.metadata || !txn.metadata.name) &&
                            !txn.status && (
                              <div className="transaction-name">-</div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="right-align">
                      <div>
                        {txn.amount && (
                          <div className="transaction-amount">
                            USD {txn.amount}
                          </div>
                        )}
                        {!txn.amount && (
                          <div className="transaction-amount">-</div>
                        )}
                      </div>
                      <div>
                        {txn.date && (
                          <div className="transaction-date">{txn.date}</div>
                        )}
                        {!txn.date && <div className="transaction-date">-</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="transaction-container">
                {transactions.map((txn: any) => (
                  <div className="transaction" key={txn.payment_reference}>
                    <div className="transaction-title">
                      <div>
                        {txn.type && txn.type === "deposit" && (
                          <span className="deposit-icon">
                            <MdOutlineCallReceived className="icon" />
                          </span>
                        )}
                        {txn.type && txn.type === "withdrawal" && (
                          <span className="withdrawal-icon">
                            <MdOutlineCallMade className="icon" />
                          </span>
                        )}
                      </div>
                      <div>
                        <div>
                          {txn.metadata &&
                            txn.metadata.product_name &&
                            txn.type === "deposit" && (
                              <div className="transaction-product">
                                {txn.metadata.product_name}
                              </div>
                            )}
                          {(!txn.metadata || !txn.metadata.product_name) &&
                            txn.type === "withdrawal" && (
                              <div className="transaction-product">
                                Cash withdrawal
                              </div>
                            )}
                          {(!txn.metadata || !txn.metadata.product_name) &&
                            txn.type !== "withdrawal" && (
                              <div className="transaction-product">-</div>
                            )}
                        </div>
                        <div>
                          {txn.metadata && txn.metadata.name && (
                            <div className="transaction-name">
                              {txn.metadata.name}
                            </div>
                          )}
                          {(!txn.metadata || !txn.metadata.name) &&
                            txn.status && (
                              <div className={getTxnStatusClass(txn.status)}>
                                {txn.status}
                              </div>
                            )}
                          {(!txn.metadata || !txn.metadata.name) &&
                            !txn.status && (
                              <div className="transaction-name">-</div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="right-align">
                      <div>
                        {txn.amount && (
                          <div className="transaction-amount">
                            USD {txn.amount}
                          </div>
                        )}
                        {!txn.amount && (
                          <div className="transaction-amount">-</div>
                        )}
                      </div>
                      <div>
                        {txn.date && (
                          <div className="transaction-date">{txn.date}</div>
                        )}
                        {!txn.date && <div className="transaction-date">-</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Filtermodal sendFilterData={populateFilter} />
    </div>
  );
};
export default Transactions;
