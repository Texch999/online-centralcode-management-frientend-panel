import React from "react";
import Table from "../../../components/Table";
import "../../home/style.css";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import "../../add-team/style.css";

const MatchWisePl = () => {
  const navigate = useNavigate();
  const handleMatchPlPage = (matchName) => {
    navigate(`/match-wise-pl/${matchName}`);
  };
  const sportOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const seriesOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const matchOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const cols = [
    { header: "Date & Time", field: "date" },
    { header: "Series Name", field: "series" },
    { header: "Match Name", field: "match" },
    { header: "Game Name", field: "game" },
    { header: "Result", field: "result" },
    { header: "P/L", field: "pl" },
    { header: <div className="flex-center">Status</div>, field: "status" },
  ];
  const data = [
    {
      date: (
        <div className="d-flex flex-column">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>T20 Women's World Cup 2024 </div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>Match: South Africa Women's vs New Zealand Women's</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      game: <div>Cricket</div>,
      result: (
        <div className="d-flex flex-column">
          <div>South Africa Women's</div>
          <div>Result ID: 11023843754858</div>
        </div>
      ),
      pl: <div className="green-clr">10000000</div>,
      status: (
        <div className="d-flex flex-between flex-center ">
          <BsEye
            className="text-black font-20 me-3 pointer"
            onClick={() =>
              handleMatchPlPage("South Africa Women's vs New Zealand Women's")
            }
          />
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
    {
      date: (
        <div className="d-flex flex-column">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>T20 Women's World Cup 2024 </div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>Match: Santos vs Cruzeiro MG</div>
          <div>Match ID: 11023843754898</div>
        </div>
      ),
      game: <div>Football</div>,
      result: (
        <div className="d-flex flex-column">
          <div>South Africa Women's</div>
          <div>Result ID: 11023843754858</div>
        </div>
      ),
      pl: <div className="green-clr">10000000</div>,
      status: (
        <div className="d-flex flex-between flex-center ">
          <BsEye
            className="text-black font-20 me-3 pointer"
            onClick={() => handleMatchPlPage("Santos vs Cruzeiro MG")}
          />
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
    {
      date: (
        <div className="d-flex flex-column">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>T20 Women's World Cup 2024 </div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>Match: South Africa Women's vs New Zealand Women's</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      game: <div>Cricket</div>,
      result: (
        <div className="d-flex flex-column">
          <div>South Africa Women's</div>
          <div>Result ID: 11023843754858</div>
        </div>
      ),
      pl: <div className="green-clr">10000000</div>,
      status: (
        <div className="d-flex flex-between flex-center ">
          <BsEye className="text-black font-20 me-3 pointer" />
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
    {
      date: (
        <div className="d-flex flex-column">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>T20 Women's World Cup 2024 </div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>Match: South Africa Women's vs New Zealand Women's</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      game: <div>Cricket</div>,
      result: (
        <div className="d-flex flex-column">
          <div>South Africa Women's</div>
          <div>Result ID: 11023843754858</div>
        </div>
      ),
      Pl: <div className="green-clr">10000000</div>,
      status: (
        <div className="d-flex flex-between flex-center ">
          <BsEye className="text-black font-20 me-3 pointer" />
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
    {
      date: (
        <div className="d-flex flex-column">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>T20 Women's World Cup 2024 </div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>Match: South Africa Women's vs New Zealand Women's</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      game: <div>Cricket</div>,
      result: (
        <div className="d-flex flex-column">
          <div>South Africa Women's</div>
          <div>Result ID: 11023843754858</div>
        </div>
      ),
      pl: <div className="green-clr">10000000</div>,
      status: (
        <div className="d-flex flex-between flex-center ">
          <BsEye className="text-black font-20 me-3 pointer" />
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
    {
      date: (
        <div className="d-flex flex-column">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>T20 Women's World Cup 2024 </div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>Match: South Africa Women's vs New Zealand Women's</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      game: <div>Cricket</div>,
      result: (
        <div className="d-flex flex-column">
          <div>South Africa Women's</div>
          <div>Result ID: 11023843754858</div>
        </div>
      ),
      Pl: <div className="red-clr">10000000</div>,
      status: (
        <div className="d-flex flex-between flex-center ">
          <BsEye className="text-black font-20 me-3 pointer" />
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
  ];

  const MATCHWISE_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="clr-green">1500000</div> },
    { header: "" },
  ];
  return (
    <div className="d-flex flex-column p-1">
      <h6 className="mb-3">Match Wise P/L</h6>

      <div className="white-bg col-4 radius-10 py-2 px-2 border-grey flex-between small-font">
        Total Admins Sports P/L
        <span className="green-clr">500000</span>
      </div>

      <div className="d-flex w-100 my-2 align-items-center">
        <div className="flex-column small-font col-2">
          <label className="mb-1">From</label>
          <input type="date" placeholder="" className="input-css2" />
        </div>
        <div className="flex-column px-2 small-font col-2">
          <label className="mb-1">To</label>
          <input type="date" placeholder="" className="input-css2" />
        </div>
        <div className="flex-column pe-2 small-font col-2">
          <label className="mb-1">Select Sport</label>
          <Select
            className="small-font"
            options={sportOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="flex-column pe-2 small-font col-2">
          <label className="mb-1">Select Series</label>
          <Select
            className="small-font"
            options={seriesOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="flex-column pe-2 small-font col-2">
          <label className="mb-1">Select Match</label>
          <Select
            className="small-font"
            options={matchOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="col align-self-end ms-2">
          <button className="saffron-btn2 small-font w-50">Submit</button>
        </div>
      </div>

      <div>
        <Table
          columns={cols}
          data={data}
          itemsPerPage={5}
          footer={MATCHWISE_FOOTER}
        />
      </div>
    </div>
  );
};

export default MatchWisePl;
