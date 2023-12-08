import React from "react";
import "./navAppmodal.css";
import link from "../../assets/link.svg";
import store from "../../assets/store.svg";
import media from "../../assets/media.svg";
import invoicing from "../../assets/invoice.svg";
const NavAppModal: React.FC = () => {
  return (
    <div className="modal-container">
      <div className="nav-app-modal">
        <div>
          <span>
            <img src={link} alt="link" />
          </span>
          <div>
            <h5>Link in Bio</h5>
            <p>Manage your Link in Bio</p>
          </div>
        </div>
        <div>
          <span>
            <img src={store} alt="Store" />
          </span>
          <div>
            <h5>Store</h5>
            <p>Manage your Store activities</p>
          </div>
        </div>
        <div>
          <span>
            <img src={media} alt="Media kit" />
          </span>
          <div>
            <h5>Media Kit</h5>
            <p>Manage your Media Kit</p>
          </div>
        </div>
        <div>
          <span>
            <img src={invoicing} alt="invoice" />
          </span>
          <div>
            <h5>Invoicing</h5>
            <p>Manage your Invoices</p>
          </div>
        </div>
        <div>
          <span>
            <img src={media} alt="Bookings" />
          </span>
          <div>
            <h5>Bookings</h5>
            <p>Manage your Bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavAppModal;
