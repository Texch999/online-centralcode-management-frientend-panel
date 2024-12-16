import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

const Result = () => {
  const [activeBtn, setActiveBtn] = useState("Sports");
  const ACTIVE_BTNS = ["Sports", "Casino"];
  const navigation = useNavigate();
  const handleMatchClick = (matchName) => {
    navigation(`/results/${encodeURIComponent(matchName)}`);
  };

  const handleSportClick = (item) => {
    setActiveBtn(item);
  };

  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const CASINO_COLUMNS = [
    { header: "Date & Time", field: "dateTime" },
    { header: "Provider", field: "provider" },
    { header: "Game Name", field: "gamename" },
    { header: "Result", field: "result" },
    { header: "Table Number", field: "tableNumber" },
    { header: "Result Date & Time", field: "resultDateTime" },
  ];
  const CASINO_DATA = [
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      provider: (
        <div>
          Ezugi
          <br />
          P. ID: 1.11045677544
        </div>
      ),

      gamename: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          Andar Bahar
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> Bahar</span>
          <br />R ID: 12345678943323
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      provider: (
        <div>
          Ezugi
          <br />
          P. ID: 1.11045677544
        </div>
      ),

      gamename: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          Andar Bahar
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> Bahar</span>
          <br />R ID: 12345678943323
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      provider: (
        <div>
          Ezugi
          <br />
          P. ID: 1.11045677544
        </div>
      ),

      gamename: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          Andar Bahar
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> Bahar</span>
          <br />R ID: 12345678943323
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },

    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      provider: (
        <div>
          Ezugi
          <br />
          P. ID: 1.11045677544
        </div>
      ),

      gamename: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          Andar Bahar
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> Bahar</span>
          <br />R ID: 12345678943323
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      provider: (
        <div>
          Ezugi
          <br />
          P. ID: 1.11045677544
        </div>
      ),

      gamename: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          Andar Bahar
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> Bahar</span>
          <br />R ID: 12345678943323
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
  ];
  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Sports", field: "sports", width: "10%" },
    { header: "Series Name", field: "seriesName", width: "15%" },
    { header: "Match Name", field: "matchName", width: "15%" },
    { header: "Result", field: "result", width: "10%" },
    { header: "Runs", field: "runs", width: "10%" },
    { header: "Result Date & Time", field: "resultDateTime", width: "12%" },
    { header: "View Fancy", field: "viewFancy", width: "8%" },
  ];

  const CRICKET_DATA = [
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),

      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: (
        <div className="green-font">
          Balls: 17.2
          <br />
          Runs: 220
        </div>
      ),
      resultDateTime: <div>02-10-2024 10:34:00</div>,
      viewFancy: (
        <div className="  w-60  flex-center">
          <BsEye
            size={18}
            onClick={() =>
              handleMatchClick("New Zealand Wo vs South Africa Wo")
            }
            className="pointer"
          />
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),

      matchName: (
        <div>
          New Zealand Wo vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: (
        <div className="green-font">
          Balls: 17.2
          <br />
          Runs: 220
        </div>
      ),
      resultDateTime: <div>02-10-2024 10:34:00</div>,
      viewFancy: (
        <div className="  w-60  flex-center">
          <BsEye
            size={18}
            onClick={() =>
              handleMatchClick("New Zealand Wo vs South Africa Wo")
            }
            className="pointer"
          />
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),

      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: (
        <div className="green-font">
          Balls: 17.2
          <br />
          Runs: 220
        </div>
      ),
      resultDateTime: <div>02-10-2024 10:34:00</div>,
      viewFancy: (
        <div className="  w-60  flex-center">
          <BsEye
            size={18}
            onClick={() =>
              handleMatchClick("New Zealand Wo vs South Africa Wo")
            }
            className="pointer"
          />
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),

      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: (
        <div className="green-font">
          Balls: 17.2
          <br />
          Runs: 220
        </div>
      ),
      resultDateTime: <div>02-10-2024 10:34:00</div>,
      viewFancy: (
        <div className="  w-60  flex-center">
          <BsEye
            size={18}
            onClick={() =>
              handleMatchClick("New Zealand Wo vs South Africa Wo")
            }
            className="pointer"
          />
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),

      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: (
        <div className="green-font">
          Balls: 17.2
          <br />
          Runs: 220
        </div>
      ),
      resultDateTime: <div>02-10-2024 10:34:00</div>,
      viewFancy: (
        <div className="  w-60  flex-center">
          <BsEye
            size={18}
            onClick={() =>
              handleMatchClick("New Zealand Wo vs South Africa Wo")
            }
            className="pointer"
          />
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),

      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: (
        <div className="green-font">
          Balls: 17.2
          <br />
          Runs: 220
        </div>
      ),
      resultDateTime: <div>02-10-2024 10:34:00</div>,
      viewFancy: (
        <div className="  w-60  flex-center">
          <BsEye
            size={18}
            onClick={() =>
              handleMatchClick("New Zealand Wo vs South Africa Wo")
            }
            className="pointer"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font medium-font mb-0">Results</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      <div className="d-flex small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item
                ? "saffron-btn2  px-3"
                : "white-btn2 pointer px-3"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="col-8 col-lg-7 d-flex flex-between my-3">
        <div className="col-3 flex-column ">
          <label className="black-text4 small-font mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-3 flex-column mx-2">
          <label className="black-text4 small-font mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>

        {activeBtn !== "Casino" && (
          <div className="col-3 flex-column me-3">
            <label className="black-text4 small-font mb-1">Sports</label>
            <Select
              className="small-font"
              options={selectOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>
        )}

        {activeBtn !== "Sports" && (
          <>
            <div className="col-3 flex-column me-3">
              <label className="black-text4 small-font mb-1">Provider</label>
              <Select
                className="small-font"
                options={selectOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>

            <div className="col-3 flex-column me-3">
              <label className="black-text4 small-font mb-1">Game</label>
              <Select
                className="small-font"
                options={selectOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>
          </>
        )}

        <div className="align-self-end saffron-btn2 small-font pointer col-2">
          Submit
        </div>
      </div>

      {activeBtn === "Sports" ? (
        <Table columns={CRICKET_COLUMNS} data={CRICKET_DATA} itemsPerPage={4} />
      ) : (
        <Table columns={CASINO_COLUMNS} data={CASINO_DATA} itemsPerPage={4} />
      )}
    </div>
  );
};

export default Result;
