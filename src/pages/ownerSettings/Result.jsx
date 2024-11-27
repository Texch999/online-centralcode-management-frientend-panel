import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarMinus, FaSearch } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [activeBtn, setActiveBtn] = useState("Sports");
  const [startDate, setStartDate] = useState(new Date());
  const ACTIVE_BTNS = ["Sports", "Casino"];
  const datePickerRef = useRef(null);
  const navigation = useNavigate();
  const handleMatchClick = (matchName) => {
    // Navigate to the individual match component
    navigation(`/match/${encodeURIComponent(matchName)}`); // Encode special characters
  };

  const handleIconClick = () => {
    datePickerRef?.current?.setFocus();
  };

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

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
          Ezugi <br />
          <br />
          P. ID: 1.11045677544
        </div>
      ),

      gamename: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          Andar Bahar <br />
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

      provider: (
        <div>
          Evolution <br />
          <br />
          P. ID: 1.11045677544
        </div>
      ),

      gamename: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          Roulette <br />
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
          Ezugi <br />
          <br />
          P. ID: 1.11045677544
        </div>
      ),

      gamename: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          Andar Bahar <br />
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
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo <br /> vs South Africa Wo
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
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <MdOutlineRemoveRedEye />
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
          Ezugi <br />
          <br />
          P. ID: 1.11045677544
        </div>
      ),

      gamename: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          Andar Bahar <br />
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
    { header: "Series Name", field: "seriesName", width: "20%" },
    { header: "Match Name", field: "matchName", width: "20%" },
    { header: "Result", field: "result", width: "10%" },
    { header: "Runs", field: "runs", width: "10%" },
    { header: "Result Date & Time", field: "resultDateTime", width: "12%" },
    { header: "View Fancy", field: "viewFancy", width: "8%" },
  ];

  const CRICKET_DATA = [
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo <br /> vs South Africa Wo
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
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font w-100 flex-center">
          <MdOutlineRemoveRedEye />
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
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div
          onClick={() => handleMatchClick("Brazilian Series  ")}
          className="pointer"
        >
          Brazilian Series
          <br />
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
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <MdOutlineRemoveRedEye />
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
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo <br /> vs South Africa Wo
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
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <MdOutlineRemoveRedEye />
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
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo <br /> vs South Africa Wo
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
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <MdOutlineRemoveRedEye />
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
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo <br /> vs South Africa Wo
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
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <MdOutlineRemoveRedEye />
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
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo <br /> vs South Africa Wo
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
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <MdOutlineRemoveRedEye />
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
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div
          onClick={() => handleMatchClick("New Zealand Wo vs South Africa Wo")}
          className="pointer"
        >
          New Zealand Wo <br /> vs South Africa Wo
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
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <MdOutlineRemoveRedEye />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between w-100">
        <h6 className="saffron-clr">Result</h6>
        <div className="grey-border rounded-pill grey-clr d-flex align-items-center px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="d-flex w-10 flex-between small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item
                ? "saffron-btn2 pointer px-4"
                : "white-btn2 pointer px-4"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="d-flex w-40 flex-between mt-2">
        <div className="col-3">
          <span className="small-font">From</span>
          <div className="w-90 grey-border p-1 d-flex flex-between input-css2">
            <DatePicker
              ref={datePickerRef}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="all-none w-70 small-font"
            />
            <FaRegCalendarMinus onClick={handleIconClick} className="pointer" />
          </div>
        </div>

        <div className="col-3">
          <span className="small-font">To</span>
          <div className="w-90 grey-border p-1 d-flex flex-between input-css2">
            <DatePicker
              ref={datePickerRef}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="all-none w-70 small-font"
            />
            <FaRegCalendarMinus onClick={handleIconClick} className="pointer" />
          </div>
        </div>

        {activeBtn !== "Casino" && (
          <div className="col-3 flex-column me-3">
            <label className="black-text4 small-font mb-1">Sports</label>
            <select className="input-css2 small-font">
              <option>All</option>
            </select>
          </div>
        )}

        {activeBtn !== "Sports" && (
          <>
            <div className="col-3 flex-column me-3">
              <label className="black-text4 small-font mb-1">Provider</label>
              <select className="input-css2 small-font">
                <option>All</option>
              </select>
            </div>

            <div className="col-3 flex-column me-3">
              <label className="black-text4 small-font mb-1">Game</label>
              <select className="input-css2 small-font">
                <option>All</option>
              </select>
            </div>
          </>
        )}

        <div className="saffron-btn2 small-font pointer mt-4 col-2">Submit</div>
      </div>

      <div className="mt-4">
        {activeBtn === "Sports" ? (
          <Table
            columns={CRICKET_COLUMNS}
            data={CRICKET_DATA}
            itemsPerPage={3}
          />
        ) : (
          <Table columns={CASINO_COLUMNS} data={CASINO_DATA} itemsPerPage={3} />
        )}
      </div>
    </div>
  );
};

export default Result;
