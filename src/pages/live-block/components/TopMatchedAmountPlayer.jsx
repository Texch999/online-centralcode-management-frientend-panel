import React from 'react'
import { BsEye } from "react-icons/bs";
import Table from "../../../components/Table";


const HIGH_PROFIT_PLAYERS_COLUMNS = [
    { header: "S.NO", field: "s_no" },
    { header: "U.ID", field: "name" },
    { header: "Exposure", field: "exposure" },
    { header: "Matched Amount", field: "matched_amount" },
  ];

  const HIGH_PROFIT_PLAYERS_DATA_1 = [
    {
      s_no: "1",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "2",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "3",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "4",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "5",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
  ];

  const HIGH_PROFIT_PLAYERS_DATA_2 = [
    {
      s_no: "6",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "7",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "8",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "9",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
    {
      s_no: "10",
      name: "Srinivas",
      exposure: <div className="red-font">571.19</div>,
      matched_amount: "541.00",
    },
  ];

  // Bottom table data details

  const live_data_details_columns = [
    { header: "Live / Open Date & Time", field: "dateTime", width: "13%" },
    { header: "Series Name", field: "seriesName", width: "15%" },
    { header: "Match ID", field: "matchID" },
    { header: "Match Name", field: "matchName" },
    { header: "Back", field: "back" },
    { header: "Lay", field: "lay" },
    { header: "Exposure", field: "exposure" },
    { header: "Declare Bets P/L", field: "declareBets" },
    { header: <div className="">Action</div>, field: "action", width: "10%" },
  ];

  const live_data_details = [
    {
      live: "Live",
      dateTime: (
        <>
        <div className="green-font">Live</div>
        <div className="">01-10-2024 16:11:00</div>
        </>
      ),
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
  ];

const TopMatchedAmountPlayer = () => {
  return (
    <div>
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

      <div className="mt-4">
        <Table
          data={live_data_details}
          columns={live_data_details_columns}
          itemsPerPage={6}
        />
      </div>
      </div>
    </div>
  )
}

export default TopMatchedAmountPlayer
