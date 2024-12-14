import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

function RiskLimitSet() {
  const roleOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const adminOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const [formData, setFormData] = useState({
    customerMaxProfitSports: "",
    customerMaxLossSports: "",
    customerMaxProfitCasino: "",
    customerMaxLossCasino: "",
    oddsRiskLoss: "",
    bookMaker1RiskLoss: "",
    bookMaker2RiskLoss: "",
    fancyPLRiskLoss: "",
    casinoRiskTableWiseLoss: "",
    casinoRiskGameWiseLoss: "",
    casinoRiskProviderWiseLoss: "",
    casinoRiskWebsiteWiseLoss: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fields = [
    { label: "Customer Max Profit Sports", name: "customerMaxProfitSports" },
    { label: "Customer Max Loss Sports", name: "customerMaxLossSports" },
    { label: "Customer Max Profit Casino", name: "customerMaxProfitCasino" },
    { label: "Customer Max Loss Casino", name: "customerMaxLossCasino" },
    { label: "Odds Risk Loss", name: "oddsRiskLoss" },
    { label: "Book Maker 1 Risk Loss", name: "bookMaker1RiskLoss" },
    { label: "Book Maker 2 Risk Loss", name: "bookMaker2RiskLoss" },
    { label: "Fancy P/L Risk Loss", name: "fancyPLRiskLoss" },
    { label: "Casino Risk Table Wise Loss", name: "casinoRiskTableWiseLoss" },
    { label: "Casino Risk Game Wise Loss", name: "casinoRiskGameWiseLoss" },
    {
      label: "Casino Risk Provider Wise Loss",
      name: "casinoRiskProviderWiseLoss",
    },
    {
      label: "Casino Risk Website Wise Loss",
      name: "casinoRiskWebsiteWiseLoss",
    },
  ];

  const RISK_COLUMNS = [
    { header: "Name & Role", field: "nameRole" },
    { header: "Cus Max Profit & Loss Sports", field: "cusMaxProfitLossSports" },
    { header: "Cus Max Profit & Loss Casino", field: "cusMaxProfitLossCasino" },
    { header: "Odds Risk Loss", field: "oddsRiskLoss" },
    { header: "Book Maker Risk Loss", field: "bookMakerRiskLoss" },
    { header: "Fancy P/L Risk Loss", field: "fancyPLRiskLoss" },
    {
      header: (
        <div>
          Casino Risk Loss
          <br />
          (Table, Game, Provider, Website Wise)
        </div>
      ),
      field: "casinoRiskLossDetails",
    },
  ];

  const RISK_DATA = [
    {
      nameRole: (
        <div>
          Srinivas
          <br />
          Super Admin
          <br />T Exchange
        </div>
      ),
      cusMaxProfitLossSports: (
        <div>
          P: 1000000000
          <br />
          L: 1000000000
        </div>
      ),
      cusMaxProfitLossCasino: (
        <div>
          P: 1000000000
          <br />
          L: 1000000000
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      bookMakerRiskLoss: (
        <div>
          BM1: 1000000000
          <br />
          BM2: 1000000000
        </div>
      ),
      fancyPLRiskLoss: <div>1000000000</div>,
      casinoRiskLossDetails: (
        <div>
          Table: 1000000000
          <br />
          Game: 1000000000
          <br />
          Provider: 1000000000
          <br />
          Website: 1000000000
        </div>
      ),
    },
    {
      nameRole: (
        <div>
          Srinivas
          <br />
          Super Admin
          <br />T Exchange
        </div>
      ),
      cusMaxProfitLossSports: (
        <div>
          P: 1000000000
          <br />
          L: 1000000000
        </div>
      ),
      cusMaxProfitLossCasino: (
        <div>
          P: 1000000000
          <br />
          L: 1000000000
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      bookMakerRiskLoss: (
        <div>
          BM1: 1000000000
          <br />
          BM2: 1000000000
        </div>
      ),
      fancyPLRiskLoss: <div>1000000000</div>,
      casinoRiskLossDetails: (
        <div>
          Table: 1000000000
          <br />
          Game: 1000000000
          <br />
          Provider: 1000000000
          <br />
          Website: 1000000000
        </div>
      ),
    },
    {
      nameRole: (
        <div>
          Srinivas
          <br />
          Super Admin
          <br />T Exchange
        </div>
      ),
      cusMaxProfitLossSports: (
        <div>
          P: 1000000000
          <br />
          L: 1000000000
        </div>
      ),
      cusMaxProfitLossCasino: (
        <div>
          P: 1000000000
          <br />
          L: 1000000000
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      bookMakerRiskLoss: (
        <div>
          BM1: 1000000000
          <br />
          BM2: 1000000000
        </div>
      ),
      fancyPLRiskLoss: <div>1000000000</div>,
      casinoRiskLossDetails: (
        <div>
          Table: 1000000000
          <br />
          Game: 1000000000
          <br />
          Provider: 1000000000
          <br />
          Website: 1000000000
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font medium-font mb-0">
          Sports & Casino High Risk Limit Set
        </h6>
        <div className="input-pill d-flex align-items-cente rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="row w-75">
        <div className="col-4 flex-column">
          <label className="black-text4 small-font mb-1">Role</label>
          <Select
            className="small-font"
            options={roleOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="col-4 flex-column">
          <label className="black-text4 small-font mb-1">Admin</label>
          <Select
            className="small-font"
            options={adminOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="col-2  flex-column d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2 small-font">Submit</button>
        </div>
      </div>
      <div className="white-bg login-box-shadow rounded-top mt-3 pb-3 mb-1rem">
        <div className="px-3">
          <div className="row">
            {fields?.map((field, index) => (
              <div className="col-3 flex-column mt-3" key={index}>
                <label className="black-text4 small-font mb-1">
                  {field.label}
                </label>
                <input
                  className="input-css2 small-font"
                  placeholder="Enter"
                  name={field.name}
                  value={formData[field.name]}
                  type="text"
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div className="row d-flex align-items-end justify-content-end">
            <div className="col-3 my-4">
              <button className="w-100 saffron-btn2 small-font">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <hr className="m-0" />
      <Table columns={RISK_COLUMNS} data={RISK_DATA} itemsPerPage={2} />
    </div>
  );
}

export default RiskLimitSet;
