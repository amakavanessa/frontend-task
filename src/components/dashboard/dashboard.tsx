import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./dashboard.css";
import Producticon1 from "../../assets/ProductIcons.svg";
import icon2 from "../../assets/ProductIcons5).svg";
import icon3 from "../../assets/ProductIcons(3).svg";
import icon4 from "../../assets/ProductIcons(4).svg";
import { MdInfoOutline } from "react-icons/md";
import {
  TransactionInterface,
  WalletInterface,
} from "../../interface/interface";

const DashboardComponent: React.FC<{
  transactions: any;

  activeFilterCount: any;
}> = (props: {
  transactions: any;

  activeFilterCount: any;
}) => {
  const [wallet, setWallet] = useState<WalletInterface>();

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

  const fetchWalletData = async () => {
    try {
      await fetch("https://fe-task-api.mainstack.io/wallet")
        .then((res) => res.json())
        .then((wallet) => setWallet(wallet));
    } catch (error) {
      console.error(error);
    }
  };

  options.xAxis.categories = transactions.map((txn: TransactionInterface) =>
    dayjs(txn.date).format("MMM D, YYYY")
  );
  options.series[0].data = transactions.map(
    (txn: TransactionInterface) => txn.amount
  );

  useEffect(() => {
    fetchWalletData();
  }, []);

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
                  <span>
                    USD{" "}
                    {wallet
                      ? new Intl.NumberFormat().format(wallet.balance)
                      : 0.0}
                  </span>
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
              <span>
                USD{" "}
                {wallet
                  ? new Intl.NumberFormat().format(wallet.ledger_balance)
                  : 0.0}
              </span>
            </div>
            <div>
              <h5>
                Total Payout{" "}
                <span>
                  <MdInfoOutline className="icons" />
                </span>
              </h5>
              <span>
                USD{" "}
                {wallet
                  ? new Intl.NumberFormat().format(wallet.total_payout)
                  : 0.0}
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
                USD{" "}
                {wallet
                  ? new Intl.NumberFormat().format(wallet.total_revenue)
                  : 0.0}
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
                USD{" "}
                {wallet
                  ? new Intl.NumberFormat().format(wallet.pending_payout)
                  : 0.0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
