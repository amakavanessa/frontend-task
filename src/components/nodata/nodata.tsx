import React from "react";
import "./nodata.css";
import { MdOutlineReceiptLong } from "react-icons/md";

const NoDataComponent: React.FC<{ clearFilter: () => void }> = (props: {
  clearFilter: () => void;
}) => {
  return (
    <div className="no-data">
      <div>
        <span>
          <MdOutlineReceiptLong className="icon" />
        </span>

        <h5>No matching transaction found for the selected filter</h5>

        <p>Change your filters to see more results, or add a new product.</p>

        <button onClick={props.clearFilter}>Clear Filter</button>
      </div>
    </div>
  );
};

export default NoDataComponent;
