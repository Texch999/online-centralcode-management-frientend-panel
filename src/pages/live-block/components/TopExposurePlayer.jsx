import React from "react";
import { BsEye } from "react-icons/bs";
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";

function TopExposurePlayer() {
  const HIGH_PROFIT_PLAYERS_COLUMNS = [
    { header: "S.NO", field: "s_no" },
    { header: "U.ID", field: "name" },
    { header: "Exposure", field: "exposure" },
    { header: "Matched Amount", field: "matched_amount" },
  ];

  const HIGH_PROFIT_PLAYERS_DATA_1 = [
    {
      s_no: "1",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "2",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "3",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "4",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "5",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
  ];

  const HIGH_PROFIT_PLAYERS_DATA_2 = [
    {
      s_no: "6",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "7",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "8",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "9",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "10",
      name: "Jayanth",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
  ];

  return (
    <div className="top-ten-playes-list">
      <div className="d-flex table-parent-container">
        <div className="table-wrapper me-3 w-50 table-special-effect border-start">
          <Table
            columns={HIGH_PROFIT_PLAYERS_COLUMNS}
            data={HIGH_PROFIT_PLAYERS_DATA_1}
          />
        </div>
        <div className="table-wrapper w-50 table-special-effect border-start border-end">
          <Table
            columns={HIGH_PROFIT_PLAYERS_COLUMNS}
            data={HIGH_PROFIT_PLAYERS_DATA_2}
          />
        </div>
      </div>
    </div>
  );
}

export default TopExposurePlayer;
