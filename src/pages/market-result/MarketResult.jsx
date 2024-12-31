import { FaSearch } from "react-icons/fa";
import ScrollTable from "../../components/ScrollTable";
import Select from "react-select";
import { whiteReactSelect } from "../../components/ReactSelectStyles";

const MarketResult = () => {
  const selectSports = [
    { value: "cricket", label: "Cricket" },
    { value: "football", label: "Football" },
    { value: "tennis", label: "Tennis" },
  ];
  const selectMatch = [
    { value: "match1", label: "Match 1" },
    { value: "match2", label: "Match 2" },
  ];
  const selectWinner = [
    { value: "team1", label: "Team 1" },
    { value: "team2", label: "Team 2" },
  ];
  const selectMarket = [
    { value: "market1", label: "Market 1" },
    { value: "market2", label: "Market 2" },
  ];
  const sportcols = [
    {
      header: "Sport",
      field: "sport",
      width: "10%",
    },
    { header: "Date & Time", field: "date", width: "20%" },
    { header: "MatchName/Id", field: "match", width: "24%" },
    { header: "Market", field: "mar", width: "16%" },
    { header: "Winner", field: "winner", width: "10%" },
    {
      header: <div className="flex-center">IP</div>,
      field: "ip",
      width: "10%",
    },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = [
    {
      sport: <div>Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: (
        <div className="mb-1 flex-column">
          Evgeny Donskoy vs Omar Jasika
          <br />M ID: 1234567366
        </div>
      ),
      mar: <div>Book Maker 1</div>,
      winner: <div>South Africa</div>,
      ip: <div className="flex-center">23.434.56.239</div>,
      action: (
        <div className="d-flex flex-center pointer">
          <div className="flex-center me-2">
            <div className="red-btn">Rollback</div>
          </div>
          <div className="flex-center">
            <div className="green-btn">Active</div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <h6 className="my-3">Market Result</h6>
      <div className="row text-black small-font">
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">Select Sport</label>
          <Select
            className="small-font"
            options={selectSports}
            placeholder="Select"
            styles={whiteReactSelect}
            maxMenuHeight={120}
            menuPlacement="auto"
          />
        </div>
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">Select Match</label>
          <Select
            className="small-font"
            options={selectMatch}
            placeholder="Select"
            styles={whiteReactSelect}
            maxMenuHeight={120}
            menuPlacement="auto"
          />
        </div>
        <div className="col-3 d-flex flex-column">
          <label className="mb-1">Select Market</label>
          <Select
            className="small-font"
            options={selectMarket}
            placeholder="Select"
            styles={whiteReactSelect}
            maxMenuHeight={120}
            menuPlacement="auto"
          />
        </div>
        <div className="col-3 d-flex flex-column">
          <label className="mb-1">Select Winner</label>
          <Select
            className="small-font"
            options={selectWinner}
            placeholder="Select"
            styles={whiteReactSelect}
            maxMenuHeight={120}
            menuPlacement="auto"
          />
        </div>
        <div className="col-2 flex-end">
          <div className="w-100 saffron-btn br-5 small-font">Set Result</div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="row text-black small-font mb-3">
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">Select Sport</label>
          <Select
            className="small-font"
            options={selectSports}
            placeholder="Select"
            styles={whiteReactSelect}
            maxMenuHeight={120}
            menuPlacement="auto"
          />
        </div>
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-2 flex-end">
          <button className="w-100 saffron-btn br-5 small-font">Submit</button>
        </div>
        <div className="col-4 flex-end">
          <div className="d-flex align-items-center white-bg px-2 border py-1 rounded-pill">
            <FaSearch size={16} className="grey-clr me-2" />
            <input
              className="all-none small-font"
              placeholder="Search Match..."
            />
          </div>
        </div>
      </div>
      <ScrollTable columns={sportcols} data={data} tableHeight={"table-50vh"} />
    </div>
  );
};

export default MarketResult;
