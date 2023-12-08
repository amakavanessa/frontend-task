import React, { useState } from "react";
import { MdExpandMore, MdOutlineClose, MdExpandLess } from "react-icons/md";
import "./filtermodal.css";
const FiltermodalComponent: React.FC<{
  sendFilterData: (
    txnType: string[] | null,
    txnStatus: string[] | null,
    startDate: string | null,
    endDate: string | null
  ) => void;
  clearFilter: () => void;
}> = (props: {
  sendFilterData: (
    txnType: string[] | null,
    txnStatus: string[] | null,
    startDate: string | null,
    endDate: string | null
  ) => void;
  clearFilter: () => void;
}) => {
  const [txnType, setTxnType] = useState<string[]>([]);
  const [txnStatus, setTxnStatus] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  function closeFilterModal() {
    const container = document.getElementById("container");
    const filter = document.getElementById("filter");
    if (filter && container) {
      filter.style.width = "0px";
      container.classList.remove("overlay");
    }
  }
  function showTxnTypeDropdown() {
    const txnTypeDropdown = document.getElementById("txnTypeDropdown");

    const expandIcon = document.getElementById("expand-more-icon");
    const lessIcon = document.getElementById("expand-less-icon");

    hideTxnStatusDropdown();

    if (txnTypeDropdown && expandIcon && lessIcon) {
      txnTypeDropdown.style.display = "block";
      expandIcon.style.visibility = "hidden";
      lessIcon.style.visibility = "visible";
    }
  }

  function hideTxnTypeDropdown() {
    const txnTypeDropdown = document.getElementById("txnTypeDropdown");

    const expandIcon = document.getElementById("expand-more-icon");
    const lessIcon = document.getElementById("expand-less-icon");

    if (txnTypeDropdown && expandIcon && lessIcon) {
      txnTypeDropdown.style.display = "none";
      expandIcon.style.visibility = "visible";
      lessIcon.style.visibility = "hidden";
    }
  }
  function showTxnStatusDropdown() {
    const txnStatusDropdown = document.getElementById("txnStatusDropdown");
    const expandIcon = document.getElementById("expand-more-icon2");
    const lessIcon = document.getElementById("expand-less-icon2");

    hideTxnTypeDropdown();

    if (txnStatusDropdown && expandIcon && lessIcon) {
      txnStatusDropdown.style.display = "block";
      expandIcon.style.visibility = "hidden";
      lessIcon.style.visibility = "visible";
    }
  }

  function hideTxnStatusDropdown() {
    const txnStatusDropdown = document.getElementById("txnStatusDropdown");
    const expandIcon = document.getElementById("expand-more-icon2");
    const lessIcon = document.getElementById("expand-less-icon2");

    if (txnStatusDropdown && expandIcon && lessIcon) {
      txnStatusDropdown.style.display = "none";
      expandIcon.style.visibility = "visible";
      lessIcon.style.visibility = "hidden";
    }
  }
  const updateTxnTypeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setTxnType((prevValues) => [...prevValues, value]);
    } else {
      setTxnType((prevValues) => prevValues.filter((val) => val !== value));
    }
  };

  const updateTxnStatusValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setTxnStatus((prevValues) => [...prevValues, value]);
    } else {
      setTxnStatus((prevValues) => prevValues.filter((val) => val !== value));
    }
  };

  const updateStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const updateEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const clearFilter = () => {
    props.clearFilter();
    closeFilterModal();
  };

  const applyFilter = () => {
    props.sendFilterData(txnType, txnStatus, startDate, endDate);
    closeFilterModal();
  };

  return (
    <div>
      <div className="filter-modal" id="filter">
        <div>
          <div className="modal-top">
            Filter
            <span onClick={() => closeFilterModal()}>
              <MdOutlineClose className="icon" />
            </span>
          </div>
          <div className="modal-body">
            <div className="date-container">
              <ul>
                <li>Today</li>
                <li>Last 7 days</li>
                <li>This month</li>
                <li>Last 3 months</li>
              </ul>
            </div>
            <div className="range-container">
              <h5>Date Range</h5>
              <div>
                <div>
                  <span>
                    <input
                      type="date"
                      className="startDate"
                      onChange={updateStartDate}
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <input
                      type="date"
                      className="endDate"
                      onChange={updateEndDate}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <h5>Transaction Type</h5>
              <div className="txn-type-container">
                <div className="txnType">
                  <div>
                    <input type="text" value={txnType.join(", ")} readOnly />
                  </div>
                  <span
                    onClick={() => showTxnTypeDropdown()}
                    id="expand-more-icon"
                  >
                    <MdExpandMore />
                  </span>
                  <span
                    onClick={() => hideTxnTypeDropdown()}
                    id="expand-less-icon"
                  >
                    <MdExpandLess />
                  </span>
                </div>
                <div className="txnTypeDropdown" id="txnTypeDropdown">
                  <div>
                    <input
                      type="checkbox"
                      value="Store Transactions"
                      name="storeTransaction"
                      id="storeTransaction"
                      onChange={updateTxnTypeValue}
                    />
                    <label htmlFor="storeTransaction">Store Transactions</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="Get Tipped"
                      name="getTipped"
                      id="getTipped"
                      onChange={updateTxnTypeValue}
                    />
                    <label htmlFor="getTipped">Get Tipped</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="Withdrawals"
                      name="withdrawals"
                      id="withdrawals"
                      onChange={updateTxnTypeValue}
                    />
                    <label htmlFor="withdrawals">Withdrawals</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="Chargebacks"
                      name="chargebacks"
                      id="chargebacks"
                      onChange={updateTxnTypeValue}
                    />
                    <label htmlFor="chargebacks">Chargebacks</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="Cashbacks"
                      name="cashbacks"
                      id="cashbacks"
                      onChange={updateTxnTypeValue}
                    />
                    <label htmlFor="cashbacks">Cashbacks</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="Refer & Earn"
                      name="referEarn"
                      id="referEarn"
                      onChange={updateTxnTypeValue}
                    />
                    <label htmlFor="referEarn">Refer & Earn</label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <h5>Transaction Status</h5>
              <div className="txn-type-container">
                <div className="txnStatus">
                  <div>
                    <input
                      type="text"
                      value={txnStatus
                        .map(
                          (status) =>
                            status.charAt(0).toUpperCase() + status.slice(1)
                        )
                        .join(", ")}
                      readOnly
                    />
                  </div>
                  <span
                    onClick={() => showTxnStatusDropdown()}
                    id="expand-more-icon2"
                  >
                    <MdExpandMore />
                  </span>
                  <span
                    onClick={() => hideTxnStatusDropdown()}
                    id="expand-less-icon2"
                  >
                    <MdExpandLess />
                  </span>
                </div>

                <div className="txnStatusDropdown" id="txnStatusDropdown">
                  <div>
                    <input
                      type="checkbox"
                      value="successful"
                      name="successful"
                      id="successful"
                      onChange={updateTxnStatusValue}
                    />
                    <label htmlFor="successful">Successful</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="pending"
                      name="pending"
                      id="pending"
                      onChange={updateTxnStatusValue}
                    />
                    <label htmlFor="pending">Pending</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="failed"
                      name="failed"
                      id="failed"
                      onChange={updateTxnStatusValue}
                    />
                    <label htmlFor="failed">Failed</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div> */}
        <div className="filter-actions">
          <span onClick={clearFilter}>Clear</span>
          <span onClick={applyFilter}>Apply</span>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
export default FiltermodalComponent;
