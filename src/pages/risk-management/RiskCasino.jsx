import { FaSearch } from "react-icons/fa";
import ScrollTable from "../../components/ScrollTable";
import { BsEye } from "react-icons/bs";

function RiskCasino() {
  const HIGH_PROFIT_PLAYERS_COLUMNS = [
    { header: "S.NO", field: "s_no" },
    { header: "U.ID", field: "name" },
    { header: "Exposure", field: "exposure" },
    { header: "Exp Profit", field: "exp_profit" },
  ];
  const HIGH_PROFIT_PLAYERS_DATA = [
    {
      s_no: "1",
      name: "Srinivas",
      exposure: <div className="red-font">10000000</div>,
      exp_profit: "10000000",
    },
    {
      s_no: "2",
      name: "Srinivas",
      exposure: <div className="red-font">10000000</div>,
      exp_profit: "10000000",
    },
    {
      s_no: "3",
      name: "Srinivas",
      exposure: <div className="red-font">10000000</div>,
      exp_profit: "10000000",
    },
    {
      s_no: "4",
      name: "Srinivas",
      exposure: <div className="red-font">10000000</div>,
      exp_profit: "10000000",
    },
  ];

  //WEBSITE_WISE
  const WEBSITE_WISE_COLUMNS = [
    { header: "Market Date & Time", field: "dateTime", width: "15%" },
    { header: "Website", field: "website", width: "50%" },
    {
      header: (
        <div className="orange-bg text-center border-left border-right">
          <div>P/L</div>
          <div className="w-100 d-flex border-top">
            <span className="col">MAX-Limit</span>
            <span className="col">X</span>
            <span className="col">P/L</span>
          </div>
        </div>
      ),
      field: "profit_loss",
      width: "30%",
    },
    { header: "", field: "view", width: "5%" },
  ];
  const WEBSITE_WISE_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      website: "T Exchange",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      website: "T Exchange",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      website: "T Exchange",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
  ];

  // PROVIDER_WISE
  const PROVIDER_WISE_COLUMNS = [
    { header: "Market Date & Time", field: "dateTime", width: "15%" },
    { header: "Provider Name", field: "providerName", width: "15%" },
    { header: "Provider ID", field: "providerId", width: "35%" },
    {
      header: (
        <div className="orange-bg text-center border-left border-right">
          <div>P/L</div>
          <div className="w-100 d-flex border-top">
            <span className="col">MAX-Limit</span>
            <span className="col">X</span>
            <span className="col">P/L</span>
          </div>
        </div>
      ),
      field: "profit_loss",
      width: "30%",
    },
    { header: "", field: "view", width: "5%" },
  ];
  const PROVIDER_WISE_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      providerName: "Ezugi",
      providerId: "12345678912345",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      providerName: "Ezugi",
      providerId: "12345678912345",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      providerName: "Ezugi",
      providerId: "12345678912345",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
  ];

  //GAME_WISE
  const GAME_WISE_COLUMNS = [
    { header: "Market Date & Time", field: "dateTime", width: "15%" },
    { header: "Game Name", field: "gameName", width: "50%" },
    {
      header: (
        <div className="orange-bg text-center border-left border-right">
          <div>P/L</div>
          <div className="w-100 d-flex border-top">
            <span className="col">MAX-Limit</span>
            <span className="col">X</span>
            <span className="col">P/L</span>
          </div>
        </div>
      ),
      field: "profit_loss",
      width: "30%",
    },
    { header: "", field: "view", width: "5%" },
  ];
  const GAME_WISE_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      gameName: "Andar Bahar",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      gameName: "Andar Bahar",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      gameName: "Andar Bahar",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
  ];

  //TABLE_WISE
  const TABLE_WISE_COLUMNS = [
    { header: "Market Date & Time", field: "dateTime", width: "15%" },
    { header: "Table ID", field: "tableId", width: "15%" },
    {
      header: "Table Name(Game Name, Provider and Website)",
      field: "tableName",
      width: "35%",
    },
    {
      header: (
        <div className="orange-bg text-center border-left border-right">
          <div>P/L</div>
          <div className="w-100 d-flex border-top">
            <span className="col">MAX-Limit</span>
            <span className="col">X</span>
            <span className="col">P/L</span>
          </div>
        </div>
      ),
      field: "profit_loss",
      width: "30%",
    },
    { header: "", field: "view", width: "5%" },
  ];
  const TABLE_WISE_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      tableId: "12345678912345",
      tableName: "Benelux Singshot > Auto Roulette > Evolution > T Casino Park",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: "",
    },
    {
      dateTime: "01-10-2024  16:11:00",
      tableId: "12345678912345",
      tableName: "Benelux Singshot > Auto Roulette > Evolution > T Casino Park",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: "",
    },
    {
      dateTime: "01-10-2024  16:11:00",
      tableId: "12345678912345",
      tableName: "Benelux Singshot > Auto Roulette > Evolution > T Casino Park",
      profit_loss: (
        <div className="w-100 d-flex">
          <span className="red-font col text-center">10000000</span>
          <span className="col text-center">10000000</span>
          <span className="green-font col text-center">10000000</span>
        </div>
      ),
      view: "",
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Risk Management - Casino</h6>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 me-3">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <div className="small-font">
            P/L : <span className="white-btn2 green-font">10000000</span>
          </div>
        </div>
      </div>
      <div className="small-font pb-3 d-flex">
        <div className="saffron-btn2 me-3">Top - Exp High Profit Players</div>
        <div className="white-btn2 me-3">Top Last Minute Bet Players</div>
      </div>
      <div className="d-flex">
        <ScrollTable
          columns={HIGH_PROFIT_PLAYERS_COLUMNS}
          data={HIGH_PROFIT_PLAYERS_DATA}
        />
        <ScrollTable
          columns={HIGH_PROFIT_PLAYERS_COLUMNS}
          data={HIGH_PROFIT_PLAYERS_DATA}
        />
      </div>
      <>
        <h6 className="black-text mt-4 mb-3">
          Casino Websites (High Risk & Last Bet Players)
        </h6>
        <ScrollTable
          columns={WEBSITE_WISE_COLUMNS}
          data={WEBSITE_WISE_DATA}
          headerPadding="py-0"
        />
      </>
      <>
        <h6 className="black-text mt-4 mb-3">
          Casino Providers Wise (High Risk & Last Bet Players)
        </h6>
        <ScrollTable
          columns={PROVIDER_WISE_COLUMNS}
          data={PROVIDER_WISE_DATA}
          headerPadding="py-0"
        />
      </>
      <>
        <h6 className="black-text mt-4 mb-3">
          Game Wise (High Risk & Last Bet Players)
        </h6>
        <ScrollTable
          columns={GAME_WISE_COLUMNS}
          data={GAME_WISE_DATA}
          headerPadding="py-0"
        />
      </>
      <>
        <h6 className="black-text mt-4 mb-3">
          Table Wise (High Risk & Last Bet Players)
        </h6>
        <ScrollTable
          columns={TABLE_WISE_COLUMNS}
          data={TABLE_WISE_DATA}
          headerPadding="py-0"
        />
      </>
    </div>
  );
}

export default RiskCasino;
