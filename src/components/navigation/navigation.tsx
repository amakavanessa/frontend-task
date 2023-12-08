import React, { useState, useEffect } from "react";
import "./navigation.css";
import MenuModal from "../menumodal/menumodal";
import NavAppModal from "../navAppmodal/navAppmodal";
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
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { UserInterface } from "../../interface/interface";

const NavigationComponent: React.FC = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isNavAppModalVisible, setNavAppModalVisible] = useState(false);
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);

  const toggleNavAppModal = () => {
    setNavAppModalVisible(!isNavAppModalVisible);
    setMenuModalVisible(false);
  };

  const toggleMenuModal = () => {
    setMenuModalVisible(!isMenuModalVisible);
    setNavAppModalVisible(false);
  };
  function showSmallScreenNav() {
    const navMenu = document.querySelector(".nav-menu");
    const navPanel = document.querySelector(".nav-panel");

    if (navMenu && navPanel) {
      navMenu.classList.toggle("hide");
      navPanel.classList.toggle("hide");
    }
  }

  const fetchUserData = async () => {
    try {
      await fetch("https://fe-task-api.mainstack.io/user")
        .then((res) => res.json())
        .then((user) => setUser(user));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      {" "}
      <nav className="nav">
        <div className="small-menu">
          <div className="nav-logo">
            <span>
              <img src={Logo} alt="mainstack-logo-small" />
            </span>
          </div>
          <span onClick={showSmallScreenNav}>
            {" "}
            <MdMenu
              className="icon"
              style={{ width: "30px", height: "30px" }}
            />
          </span>
        </div>
        <div className="nav-logo">
          <span>
            <img src={Logo} alt="mainstack-logo" />
          </span>
        </div>
        <div className="nav-menu hide">
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
          <div
            className={`nav-app ${isNavAppModalVisible ? "active" : ""}`}
            style={{ position: "relative", borderRadius: "100px " }}
            onClick={toggleNavAppModal}
            data-testid="nav-app-trigger"
          >
            <div className="app">
              <div>
                <span>
                  <MdOutlineWidgets className="icon" />
                </span>
                Apps
              </div>{" "}
              {isNavAppModalVisible && (
                <div
                  style={{
                    borderLeft: "1px solid #ffffff",
                    paddingLeft: "5px",
                  }}
                >
                  {" "}
                  Link in Bio
                  <span>
                    <MdOutlineKeyboardArrowDown className="icon" />
                  </span>
                </div>
              )}
            </div>
            {isNavAppModalVisible && (
              <div data-testid="nav-app-modal">
                <NavAppModal />
              </div>
            )}
          </div>
        </div>
        <div className="nav-panel hide " data-testid="nav-panel">
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
          <div
            style={{ position: "relative" }}
            onClick={toggleMenuModal}
            data-testid="nav-menu-trigger"
          >
            <div className="menu">
              <div className="user-inits">
                {" "}
                {user
                  ? user.first_name.charAt(0) + user.last_name.charAt(0)
                  : "NA"}
              </div>
              <span>
                {" "}
                <MdMenu className="icon" />
              </span>
            </div>
            {isMenuModalVisible && (
              <div data-testid="nav-menu-modal">
                <MenuModal user={user} />
              </div>
            )}
          </div>
        </div>{" "}
      </nav>{" "}
    </>
  );
};

export default NavigationComponent;
