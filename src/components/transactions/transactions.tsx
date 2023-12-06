import React, { useState, useEffect } from "react";
import {
  MdExpandMore,
  MdOutlineFileDownload,
  MdOutlineCallReceived,
  MdOutlineCallMade,
} from "react-icons/md";
import "./transactions.css";

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState([]);

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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="transactions">
        <div>
          <div>
            <h3>{transactions.length} Transactions</h3>
            <div>Your transaction for all time</div>
          </div>
          <div className="action">
            <div>
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
            {
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
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default Transactions;
