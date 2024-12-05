import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../components/Table";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import "../../home/style.css";

const MatchAdminsUsersPl = () => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState(0);
  const { matchName, role } = useParams();
  const roles = ["Admin", "User"];
  const handleClick = (index) => {
    setActiveBtn(index);
  };

  const handleMatchusersPl = (userdetails) => {
    navigate(`/match-wise-pl/${matchName}/${role}/${userdetails}`);
  };

  const cols = [
    { header: "Date & Time", field: "date", width: "15%" },
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
          <div>Sri</div>
          <div>Agnet</div>
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
            className="text-black font-20 me-4 pointer"
            onClick={() => handleMatchusersPl("Agent-Sri")}
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-4 pointer" />
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-4 pointer" />
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-4 pointer" />
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-4 pointer" />
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-4 pointer" />
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
  ];

  const usersCols = [
    { header: "Date & Time", field: "date" },
    { header: "Name & Role", field: "name" },
    { header: "Series Name", field: "series" },
    { header: "Match Name", field: "match" },
    { header: "Game Name", field: "game" },
    { header: "Result", field: "result" },
    { header: "P/L", field: "pl" },
    { header: <div className="flex-center">Status</div>, field: "status" },
  ];

  const usersData = [
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
          <div>User</div>
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
            className="text-black font-20 me-4 pointer"
            onClick={() => handleMatchusersPl("User-Lokesh")}
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
          <div>Jayanta</div>
          <div>User</div>
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-4 pointer" />
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
          <div>Sudheer</div>
          <div>User</div>
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
          <MdOutlineRemoveRedEye className="text-black font-20 me-4 pointer" />
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
  ];

  const ADMIN_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="clr-green">1500000</div> },
    { header: "" },
  ];

  const USER_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="clr-green">1500000</div> },
    { header: "" },
  ];

  return (
    <div className="d-flex flex-column p-1">
      <div
        className="d-flex medium-font mt-2 mb-3 align-items-center pointer"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack className="orange-clr fw-800  me-1" />
        <div>Match Wise P/L</div>
        <div className="">
          <span>
            <IoIosArrowForward className="mx-1" />
          </span>
          {matchName}
        </div>
        <div className="orange-clr">
          <span>
            <IoIosArrowForward className="mx-1" />
          </span>
          {role}
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

      <div className="d-flex w-100 my-2 align-items-center flex-between">
        <div className="d-flex pe-2 small-font col-4">
          {roles.map((btn, index) => {
            return (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`input-css2 px-4 py-2 br-5 me-2 pointer ${
                  activeBtn === index ? "saffron-btn" : ""
                }`}
              >
                {btn}
              </div>
            );
          })}
        </div>
        {activeBtn === 0 ? (
          <div className="flex-column pe-2 small-font col-2">
            <label className="mb-1">Admin</label>
            <select className="input-css2">
              <option>select</option>
              <option>select</option>
              <option>select</option>
            </select>
          </div>
        ) : (
          <div className="flex-column pe-2 small-font col-2">
            <label className="mb-1">User</label>
            <select className="input-css2">
              <option>select</option>
              <option>select</option>
              <option>select</option>
            </select>
          </div>
        )}
      </div>

      {activeBtn === 0 && (
        <div>
          <Table
            columns={cols}
            data={data}
            itemsPerPage={5}
            footer={ADMIN_FOOTER}
          />
        </div>
      )}

      {activeBtn === 1 && (
        <div>
          <Table
            columns={usersCols}
            data={usersData}
            itemsPerPage={5}
            footer={USER_FOOTER}
          />
        </div>
      )}
    </div>
  );
};

export default MatchAdminsUsersPl;
