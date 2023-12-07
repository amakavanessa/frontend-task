import React from "react";
import dayjs from "dayjs";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./dashboard.css";
import Producticon1 from "../../assets/ProductIcons.svg";
import icon2 from "../../assets/ProductIcons5).svg";
import icon3 from "../../assets/ProductIcons(3).svg";
import icon4 from "../../assets/ProductIcons(4).svg";
import { MdInfoOutline } from "react-icons/md";
import { TransactionInterface } from "../../interface/interface";

const DashboardComponent: React.FC<{
  transactions: any;

  activeFilterCount: any;
}> = (props: {
  transactions: any;

  activeFilterCount: any;
}) => {
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [],
    },
    series: [
      {
        data: [],
      },
    ],
    credits: {
      enabled: false,
    },
  };
  const transactions = props.transactions;

  const successDepositAmount = transactions
    .filter(
      (txn: TransactionInterface) =>
        txn.type === "deposit" && txn.status === "successful"
    )
    .reduce(
      (total: number, txn: TransactionInterface) => total + txn.amount,
      0
    );
  const pendingDepositAmount = transactions
    .filter(
      (txn: TransactionInterface) =>
        txn.type === "deposit" && txn.status === "pending"
    )
    .reduce(
      (total: number, txn: TransactionInterface) => total + txn.amount,
      0
    );

  const successDebitAmount = transactions
    .filter(
      (txn: TransactionInterface) =>
        txn.type === "withdrawal" && txn.status === "successful"
    )
    .reduce(
      (total: number, txn: TransactionInterface) => total + txn.amount,
      0
    );

  const pendingDebitAmount = transactions
    .filter(
      (txn: TransactionInterface) =>
        txn.type === "withdrawal" && txn.status === "pending"
    )
    .reduce(
      (total: number, txn: TransactionInterface) => total + txn.amount,
      0
    );

  options.xAxis.categories = transactions.map((txn: TransactionInterface) =>
    dayjs(txn.date).format("MMM D, YYYY")
  );
  options.series[0].data = transactions.map(
    (txn: TransactionInterface) => txn.amount
  );

  const availableBalance =
    successDepositAmount - (successDebitAmount + pendingDebitAmount);

  const ledgerBalance =
    successDepositAmount -
    (successDebitAmount - pendingDebitAmount + pendingDepositAmount);

  // console.log(transactions);
  // console.log(
  //   successDepositAmount,
  //   successDebitAmount,
  //   pendingDebitAmount,
  //   availableBalance
  // );

  return (
    <div>
      <div className="dashboard">
        <div className="app-bar">
          <span>
            <img src={Producticon1} alt="product-icon" />
          </span>

          <span>
            {" "}
            <img src={icon3} alt="product-icon" />
          </span>
          <span>
            {" "}
            <img src={icon4} alt="product-icon" />
          </span>
          <span>
            <img src={icon2} alt="product-icon" />
          </span>
        </div>
        <div className="chart-container">
          <div>
            <div className="dashboard-summary">
              <div>
                <h5>Available Balance</h5>
                <div>
                  USD {new Intl.NumberFormat().format(availableBalance)}
                </div>
              </div>
              <div className="btn">
                <span>Withdraw</span>{" "}
              </div>
            </div>
            <div className="chart">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </div>
          <div className="dashboard-details">
            <div>
              <h5>
                Ledger Balance{" "}
                <span>
                  <MdInfoOutline className="icons" />
                </span>
              </h5>
              <span>USD {new Intl.NumberFormat().format(ledgerBalance)}</span>
            </div>
            <div>
              <h5>
                Total Payout{" "}
                <span>
                  <MdInfoOutline className="icons" />
                </span>
              </h5>
              <span>
                USD {new Intl.NumberFormat().format(successDebitAmount)}
              </span>
            </div>
            <div>
              <h5>
                Total Revenue{" "}
                <span>
                  <MdInfoOutline className="icons" />
                </span>
              </h5>
              <span>
                USD {new Intl.NumberFormat().format(successDepositAmount)}
              </span>
            </div>
            <div>
              <h5>
                Pending Payout{" "}
                <span>
                  <MdInfoOutline className="icons" />
                </span>
              </h5>
              <span>
                USD {new Intl.NumberFormat().format(pendingDebitAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
