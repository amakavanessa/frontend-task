import React from "react";
import "./navigation.css";
import Logo from "../../assets/mainstack-logo.png";
import { GoHome } from "react-icons/go";
import {
  MdOutlineInsertChartOutlined,
  MdOutlineWidgets,
  MdOutlinePayments,
  MdOutlineGroup,
  MdNotificationsNone,
  MdMenu,
  MdOutlineChat,
} from "react-icons/md";

const NavigationComponent: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <span>
          <img src={Logo} alt="mainstack-logo" />
        </span>
      </div>
      <div className="nav-menu">
        <div>
          <span>
            <GoHome className="icon" />
          </span>
          Home
        </div>
        <div>
          <span>
            <MdOutlineInsertChartOutlined className="icon" />
          </span>
          Analytics
        </div>
        <div className="active">
          <span>
            <MdOutlinePayments className="icon" />
          </span>
          Revenue
        </div>
        <div>
          <span>
            <MdOutlineGroup className="icon" />
          </span>
          CRM
        </div>
        <div>
          <span>
            <MdOutlineWidgets className="icon" />
          </span>
          Apps
        </div>
      </div>
      <div className="nav-panel">
        <div>
          <span>
            <MdNotificationsNone className="icon" />
          </span>
        </div>
        <div>
          <span>
            <MdOutlineChat className="icon" />
          </span>
        </div>
        <div>
          <div>OJ</div>
          <span>
            <MdMenu className="icon" />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavigationComponent;
