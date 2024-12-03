import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdBlock, MdDeleteOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../components/Table";
import { WiDayThunderstorm } from "react-icons/wi";
import { GrEdit } from "react-icons/gr";

const SportsLiveCricket = () => {
  const navigate = useNavigate();
  const { sport } = useParams();

  const cols = [
    { header: "Odds", field: "odds" },
    {
      header: (
        <div className="row">
          <div className="col-6 flex-end">
            <span>Back</span>
          </div>
          <div className="col-6 d-flex">
            <span>Lay</span>
          </div>
        </div>
      ),
      field: "back_lay",
    },
    { header: <div className="text-center">Back</div>, field: "back" },
    { header: <div className="text-center">Lay</div>, field: "back" },
    { header: <div className="text-center">Exposure</div>, field: "exposure" },
    { header: <div className="flex-start">Action</div>, field: "action"},
  ];

  const tableData1 = [
    {
      odds: "",
      back_lay: (
        <div>
          <div className="d-flex w-100 mb-2">
            <div className="col-6 flex-between">
              <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
                <span>3.05</span>
                <span>2k</span>
              </div>
              <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
                <span>4.05</span>
                <span>953k</span>
              </div>
              <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
                <span>1.35</span>
                <span>1k</span>
              </div>
            </div>
            <div className="col-6 flex-between">
              <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
                <span>1.73</span>
                <span>2k</span>
              </div>
              <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
                <span>8.02</span>
                <span>4k</span>
              </div>
              <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
                <span>4.06</span>
                <span>1k</span>
              </div>
            </div>
          </div>

          <div className="d-flex w-100">
            <div className="col-6 flex-between">
              <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
                <span>3.05</span>
                <span>2k</span>
              </div>
              <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
                <span>4.05</span>
                <span>953k</span>
              </div>
              <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
                <span>1.35</span>
                <span>1k</span>
              </div>
            </div>
            <div className="col-6 flex-between">
              <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
                <span>1.73</span>
                <span>2k</span>
              </div>
              <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
                <span>8.02</span>
                <span>4k</span>
              </div>
              <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
                <span>4.06</span>
                <span>1k</span>
              </div>
            </div>
          </div>
        </div>
      ),

      back: <div className="back-btn-cricket mb-1 ms-1">10000</div>,
      lay: <div className="lay-btn-cricket ms-1">30000</div>,

      exposure: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="red-font">471.19</div>
          <div className="">100k</div>
        </div>
      ),
      action: (
        <div class="flex-center mt-1">
          <div className="pointer">
            <MdBlock className="font-20 me-2" />
          </div>
          <div className="pointer">
            <GrEdit className="font-20 ms-2" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center">
          <IoIosArrowBack
            className="yellow-font fw-800 font-20 me-1 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h6 className="m-0 cursor-pointer" onClick={() => navigate(-1)}>
            Sports Live Settings
          </h6>
          <IoIosArrowForward className="font-20 yellow-font mx-2" />
          <span className="yellow-font">{sport}</span>
        </div>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input
            className="small-font all-none border-0 outline-none"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="row d-flex px-3">
        <div className="col-6 d-flex align-items-center input-css2 rounded py-2">
          <div className="col-4 small-font border-end border-2 px-2">
            <div>Live</div>
            <div>01-10-2024 16:11:00</div>
          </div>
          <div className="col-4 small-font border-end border-2 px-2">
            <div>ICICI T20 Women World Cup 2024</div>
            <div>Market ID: 1.11045677544</div>
          </div>
          <div className="col-4 small-font px-2">
            <div>New Zealand Wo vs South Africa Wo</div>
            <div>Match ID: 11023843754858</div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-6 ps-3 d-flex justify-content-between align-items-center p-0">
          <div className="d-flex gap-3">
            <button className="saffron-btn rounded">Odds</button>
            <button className="input-css2">Live Score</button>
          </div>
          <div className="d-flex align-items-center">
            <span>P/L:</span>
            <button className="white-btn2 green-font ms-2">10000000</button>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Table columns={cols} data={tableData1} itemsPerPage={5} />
      </div>
    </div>
  );
};

export default SportsLiveCricket;
