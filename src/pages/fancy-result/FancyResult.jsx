import React from "react";
import ScrollTable from "./../../components/ScrollTable";
import { FaSearch } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { whiteReactSelect } from "../../components/ReactSelectStyles";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const FancyResult = () => {
  const navigate = useNavigate();
  const selectSports = [
    { value: "cricket", label: "Cricket" },
    { value: "football", label: "Football" },
    { value: "tennis", label: "Tennis" },
  ];
  const selectMatch = [
    { value: "match1", label: "Match 1" },
    { value: "match2", label: "Match 2" },
    { value: "match3", label: "Match 3" },
  ];
  const cols = [
    { header: "Sport", field: "sport" },
    { header: "Fancy ID", field: "fid" },
    { header: "Fancy Name", field: "fname" },
    { header: "Match Name", field: "match" },
  ];
  const data = [
    {
      sport: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">Cricket</div>
          <input
            type="text"
            placeholder="Enter Result"
            className="white-input w-fit "
          />
        </div>
      ),
      fid: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">2345632345-13FY</div>
          <div className="px-4 saffron-btn2 w-fit">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit px-4">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
    {
      sport: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">Cricket</div>
          <input
            type="text"
            placeholder="Enter Result"
            className="white-input w-fit"
          />
        </div>
      ),
      fid: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">2345632345-13FY</div>
          <div className="px-4 saffron-btn2 w-fit">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit px-4">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
  ];

  const sportcols = [
    {
      header: "Sport",
      field: "sport",
      width: "10%",
    },
    { header: "Date & Time", field: "date", width: "15%" },
    { header: "MatchName", field: "match", width: "45%" },
    {
      header: <div className="flex-center">Event Id</div>,
      field: "eid",
      width: "10%",
    },
    { header: "Market Id", field: "mid", width: "10%" },
    {
      header: <div className="flex-center">Result Status</div>,
      field: "resstatus",
      width: "10%",
    },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const sportData = [
    {
      sport: "Cricket",
      date: <div className="white-space">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div className="flex-center">12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: (
        <div className="flex-center">
          <div className="active-btn-table px-2">Open</div>
        </div>
      ),
      action: (
        <div className="flex-center">
          <BsEye
            size={18}
            onClick={() =>
              navigate("/central-sports/Ranjith/Fancy/Cricket/IndiavsAustralia")
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h6 className="my-3">Fancy Result</h6>
      <div className="my-3 row w-50 text-black small-font">
        <div className="col d-flex flex-column">
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
        <div className="col d-flex flex-column">
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
        <div className="col flex-end">
          <button className="w-100 saffron-btn2">Search</button>
        </div>
      </div>
      <ScrollTable columns={cols} data={data} tableHeight={"table-50vh"} />
      <div className="row mt-3 w-100 text-black small-font">
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
          <button className="w-100 saffron-btn2 br-5 small-font">Submit</button>
        </div>
        <div className="col-2"></div>
        <div className="col-2 flex-end flex-center">
          <div className="white-bg2 border px-2 py-1 rounded-pill w-100 white-space px-3">
            <FaSearch size={15} className="grey-clr me-2" />
            <input
              className="all-none small-font"
              placeholder="Search Match..."
            />
          </div>
        </div>
      </div>

      <div className="my-3">
        <ScrollTable
          columns={sportcols}
          data={sportData}
          tableHeight={"table-50vh"}
        />
      </div>
    </div>
  );
};

export default FancyResult;
