import React from "react";
import "./menumodal.css";
import { UserInterface } from "../../interface/interface";
import {
  MdOutlineReceiptLong,
  MdOutlineSettings,
  MdOutlineCardGiftcard,
  MdOutlineWidgets,
  MdOutlineBugReport,
  MdOutlineSwitchAccount,
  MdOutlineLogout,
} from "react-icons/md";

const MenuModal: React.FC<{ user: UserInterface | null }> = (props: {
  user: UserInterface | null;
}) => {
  const user = props.user;

  return (
    <div className="menu-modal-container">
      <div className="menu-modal">
        <div className="user-data">
          <span className="user-initial">
            {user ? user.first_name.charAt(0) + user.last_name.charAt(0) : "NA"}
          </span>
          <div>
            <h3>{user ? user.first_name + " " + user.last_name : "NA"}</h3>
            <p>{user ? user.email : "NA"}</p>
          </div>
        </div>
        <div>
          <span>
            <MdOutlineSettings />
          </span>
          <h5>Settings</h5>
        </div>
        <div>
          <span>
            <MdOutlineReceiptLong />
          </span>
          <h5>Purchase History</h5>
        </div>
        <div>
          <span>
            <MdOutlineCardGiftcard />
          </span>
          <h5>Refer and Earn</h5>
        </div>
        <div>
          <span>
            <MdOutlineWidgets />
          </span>
          <h5>Integrations</h5>
        </div>
        <div>
          <span>
            <MdOutlineBugReport />
          </span>
          <h5>Report Bug</h5>
        </div>
        <div>
          <span>
            <MdOutlineSwitchAccount />
          </span>
          <h5>Switch Account</h5>
        </div>
        <div>
          <span>
            <MdOutlineLogout />
          </span>
          <h5>Sign Out</h5>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
