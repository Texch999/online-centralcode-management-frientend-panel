import React from "react";
import { useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

function Userslist() {
  const { matchName } = useParams();
  console.log(matchName, "==>userDetails");
  return (
    <div>
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex  mb-0">
          <div>
            P/L Reports Downline Admins
            <span>
              <FiChevronRight />
              Owner - Jayanta (Director)
            </span>
            <span className="yellow-font">
              <FiChevronRight />
              {matchName}
            </span>
          </div>
        </h6>
      </div>
    </div>
  );
}

export default Userslist;
