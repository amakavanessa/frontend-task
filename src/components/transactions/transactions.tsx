import React from "react";
import dayjs from "dayjs";
import {
  MdExpandMore,
  MdOutlineFileDownload,
  MdOutlineCallReceived,
  MdOutlineCallMade,
} from "react-icons/md";
import "./transactions.css";
import NoDataComponent from "../nodata/nodata";
import { TransactionInterface } from "../../interface/interface";

const TransactionsComponent: React.FC<{
  transactions: TransactionInterface[];
  activeFilterCount: number;
  clearFilter: () => void;
}> = (props: {
  transactions: TransactionInterface[];
  activeFilterCount: number;
  clearFilter: () => void;
}) => {
  const transactions = props.transactions;

  const activeFilterCount = props.activeFilterCount;

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
    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth;

    if (filter && container) {
      if (screenWidth < 500) {
        filter.style.width = screenWidth + "px";
        filter.style.right = "0";
      } else {
        filter.style.width = "456px";
        filter.style.right = "0";
      }
    }
  }

  const clearFilter = () => {
    props.clearFilter();
  };
  return (
    <div>
      <div className="transactions">
        <div>
          <div>
            <h3>{transactions.length} Transactions</h3>
            <div>Your transaction for all time</div>
          </div>
          <div className="action">
            <div onClick={() => showFilterModal()}>
              <span>Filter </span>
              {activeFilterCount ? (
                <span className="filtercount">{activeFilterCount}</span>
              ) : null}
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
          {activeFilterCount && !transactions.length ? (
            <NoDataComponent clearFilter={clearFilter} />
          ) : (
            <div>
              <div className="transaction-container">
                {transactions.map((txn: TransactionInterface) => (
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
                          <div className="transaction-date">
                            {dayjs(txn.date).format("MMM D, YYYY")}
                          </div>
                        )}
                        {!txn.date && <div className="transaction-date">-</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TransactionsComponent;
