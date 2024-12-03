import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../components/Table";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const IndividualMatchPl = () => {
  const navigate = useNavigate();
  const { matchName } = useParams();
  const handleMatchAdminsUsersPlPage = (role) => {
    navigate(`/match-wise-pl/${matchName}/${role}`);
  };
  const cols = [
    { header: <div className="">Date & Time</div>, field: "date", width:"15%" },
    { header: "Name & Role", field: "name" },
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
      name: (
        <div className="d-flex flex-column">
          <div>Jayanta</div>
          <div>Director</div>
          <div>Share - 10%</div>
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
          <MdOutlineRemoveRedEye
            className="text-black font-20 me-3 pointer"
            onClick={() => handleMatchAdminsUsersPlPage("Director - Jayanta")}
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
      name: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Super Admin</div>
          <div>Rental - 10000</div>
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
          <MdOutlineRemoveRedEye
            className="text-black font-20 me-3 pointer"
            onClick={() => handleMatchAdminsUsersPlPage("Super Admin-Lokesh")}
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
      name: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Director</div>
          <div>Share - 5%</div>
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-3 pointer" />
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
      name: (
        <div className="d-flex flex-column">
          <div>Sangram</div>
          <div>Super Admin</div>
          <div>Share - 8%</div>
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-3 pointer" />
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
      name: (
        <div className="d-flex flex-column">
          <div>Jayanta</div>
          <div>Director</div>
          <div>Share - 10%</div>
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-3 pointer" />
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
      name: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Director</div>
          <div>Share - 10%</div>
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
      pl: <div className="red-clr">10000000</div>,
      status: (
        <div className="d-flex flex-between flex-center ">
          <MdOutlineRemoveRedEye className="text-black font-20 me-3 pointer" />
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
  ];

  
  const MATCH_FOOTER = [
    { header: "Total", },
    { header: ""},
    { header: ""},
    { header: ""},
    { header: ""},
    { header: ""},
    { header: <div className="clr-green">1500000</div>},
    { header: ""},
  ];
  return (
    <div className="d-flex flex-column p-1">
      <div
        className="d-flex medium-font mb-3 align-items-center pointer"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack className="orange-clr fw-800 me-1" />
        <div>Match Wise P/L</div>
        <div className="orange-clr ">
          <span>
            <IoIosArrowForward className="mx-1" />
          </span>
          {matchName}
        </div>
      </div>

      <div className="w-40 flex-column flex-wrap py-2 grey-bg2 rounded px-3">
      <div className="white-bg radius-10 px-2 py-2 flex-between small-font my-1">
        Admins P/L
        <span className="green-clr">500000</span>
      </div>
      <div className="white-bg radius-10 py-2 px-2 flex-between small-font my-1">
        Users P/L
        <span className="green-clr">500000</span>
      </div>
      </div>

      <div className="d-flex w-100 my-2 align-items-center">
        <div className="flex-column pe-2 small-font col-2">
          <label className="mb-1">Role</label>
          <select className="input-css2">
            <option>select</option>
            <option>select</option>
            <option>select</option>
          </select>
        </div>
        <div className="flex-column pe-2 small-font col-2">
          <label className="mb-1">Admin</label>
          <select className="input-css2">
            <option>select</option>
            <option>select</option>
            <option>select</option>
          </select>
        </div>

        <div className="saffron-btn br-5 small-font col-2 px-2 mt-3">
          Submit
        </div>
      </div>

      <div>
        <Table columns={cols} data={data} itemsPerPage={5} footer={MATCH_FOOTER}/>
      </div>
    </div>
  );
};

export default IndividualMatchPl;
