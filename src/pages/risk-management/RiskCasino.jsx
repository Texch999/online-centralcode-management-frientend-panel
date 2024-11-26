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
    { header: "Market Date & Time", field: "dateTime" },
    { header: "Website", field: "website" },
    {
      header: (
        <div className="orange-bg text-center border">
          <div>P/L</div>
          <div className="w-100  flex-around border-top">
            <span>1</span>
            <span>X</span>
            <span>2</span>
          </div>
        </div>
      ),
      field: "profit_loss",
    },
    { header: "", field: "view" },
  ];
  const WEBSITE_WISE_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      website: "T Exchange",
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">10000000</span>
          <span>10000000</span>
          <span className="green-font">10000000</span>
        </div>
      ),
      view: <BsEye size={18} className="black-text" />,
    },
  ];

  // PROVIDER_WISE
  const PROVIDER_WISE_COLUMNS = [
    { header: "Market Date & Time", field: "dateTime" },
    { header: "Provider Name", field: "providerName" },
    { header: "Provider ID", field: "providerId" },
    {
      header: (
        <div className="orange-bg text-center border">
          <div>P/L</div>
          <div className="w-100  flex-around border-top">
            <span>1</span>
            <span>X</span>
            <span>2</span>
          </div>
        </div>
      ),
      field: "profit_loss",
    },
    { header: "", field: "view" },
  ];
  const PROVIDER_WISE_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      providerName: "Ezugi",
      providerId: "12345678912345",
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">10000000</span>
          <span>10000000</span>
          <span className="green-font">10000000</span>
        </div>
      ),
      view: <BsEye size={18} className="black-text" />,
    },
  ];

  //GAME_WISE
  const GAME_WISE_COLUMNS = [
    { header: "Market Date & Time", field: "dateTime" },
    { header: "Game Name", field: "gameName" },
    {
      header: (
        <div className="orange-bg text-center border">
          <div>P/L</div>
          <div className="w-100  flex-around border-top">
            <span>1</span>
            <span>X</span>
            <span>2</span>
          </div>
        </div>
      ),
      field: "profit_loss",
    },
    { header: "", field: "view" },
  ];
  const GAME_WISE_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      gameName: "Andar Bahar",
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">10000000</span>
          <span>10000000</span>
          <span className="green-font">10000000</span>
        </div>
      ),
      view: <BsEye size={18} className="black-text" />,
    },
  ];

  //TABLE_WISE
  const TABLE_WISE_COLUMNS = [
    { header: "Market Date & Time", field: "dateTime" },
    { header: "Table ID", field: "tableId" },
    {
      header: "Table Name(Game Name, Provider and Website)",
      field: "tableName",
    },
    {
      header: (
        <div className="orange-bg text-center border">
          <div>P/L</div>
          <div className="w-100  flex-around border-top">
            <span>1</span>
            <span>X</span>
            <span>2</span>
          </div>
        </div>
      ),
      field: "profit_loss",
    },
    { header: "", field: "view" },
  ];
  const TABLE_WISE_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      tableId: "12345678912345",
      tableName: "Benelux Singshot > Auto Roulette > Evolution > T Casino Park",
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">10000000</span>
          <span>10000000</span>
          <span className="green-font">10000000</span>
        </div>
      ),
      view: "",
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Risk Management - Casino</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
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
        <h6 className="black-text my-3">
          Casino Websites (High Risk & Last Bet Players)
        </h6>
        <div className="rounded">
          <ScrollTable
            columns={WEBSITE_WISE_COLUMNS}
            data={WEBSITE_WISE_DATA}
            headerPadding="py-0"
          />
        </div>
      </>
      <>
        <h6 className="black-text my-3">
          Casino Providers Wise (High Risk & Last Bet Players)
        </h6>
        <div className="rounded">
          <ScrollTable
            columns={PROVIDER_WISE_COLUMNS}
            data={PROVIDER_WISE_DATA}
            headerPadding="py-0"
          />
        </div>
      </>
      <>
        <h6 className="black-text my-3">
          Game Wise (High Risk & Last Bet Players)
        </h6>
        <div className="rounded">
          <ScrollTable
            columns={GAME_WISE_COLUMNS}
            data={GAME_WISE_DATA}
            headerPadding="py-0"
          />
        </div>
      </>
      <>
        <h6 className="black-text my-3">
          Table Wise (High Risk & Last Bet Players)
        </h6>
        <div className="rounded">
          <ScrollTable
            columns={TABLE_WISE_COLUMNS}
            data={TABLE_WISE_DATA}
            headerPadding="py-0"
          />
        </div>
      </>
    </div>
  );
}

export default RiskCasino;
