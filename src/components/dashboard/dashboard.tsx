import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./dashboard.css";
import Producticon1 from "../../assets/ProductIcons.svg";
import icon2 from "../../assets/ProductIcons5).svg";
import icon3 from "../../assets/ProductIcons(3).svg";
import icon4 from "../../assets/ProductIcons(4).svg";
import { MdInfoOutline } from "react-icons/md";
const options = {
  chart: {
    type: "spline",
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: ["a", "b", "c", "d"],
  },
  series: [
    {
      data: [1, 10, 3, 10],
    },
  ],
  credits: {
    enabled: false,
  },
};

const Dashboard: React.FC = () => {
  return (
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
              <div>USD 120,500.00</div>
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
            <span>USD 0.00</span>
          </div>
          <div>
            <h5>
              Total Payout{" "}
              <span>
                <MdInfoOutline className="icons" />
              </span>
            </h5>
            <span>USD 55,080.00</span>
          </div>
          <div>
            <h5>
              Total Revenue{" "}
              <span>
                <MdInfoOutline className="icons" />
              </span>
            </h5>
            <span>USD 175,580</span>
          </div>
          <div>
            <h5>
              Pending Payout{" "}
              <span>
                <MdInfoOutline className="icons" />
              </span>
            </h5>
            <span>USD 0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
