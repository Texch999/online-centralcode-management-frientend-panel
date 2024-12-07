import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { BsEye } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import Table from "../../../components/Table";
import LiveFancyBets from "./LiveFancy";
import DeclaredFancyBets from "./DeclaredFancy";
import { useNavigate, useParams } from "react-router";
import "../style.css"

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
  { header: <div className="text-center">Lay</div>, field: "lay" },
  { header: <div className="text-center">Exposure</div>, field: "exposure"},
  { header: "", field: "live_block", width: "5%" },
  {
    header: <div className="flex-center">Action</div>,
    field: "action",
    width: "7%",
  },
];

const tableData1 = [
  {
    odds: "",
    back_lay: (
      <div>
        <div className="d-flex w-100 mb-2">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">4.5</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">1.5</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">8.2</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">4.6</span>
              <span>1k</span>
            </div>
          </div>
        </div>

        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">4.5</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">1.35</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">8.2</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">4.6</span>
              <span>1k</span>
            </div>
          </div>
        </div>
      </div>
    ),

    back: <div className="back-btn-cricket mb-1 ms-1">10000</div>,
    lay: <div className="lay-btn-cricket red-font ms-1">20000</div>,

    exposure: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="red-font">471.19</div>
        <div className="">100k</div>
      </div>
    ),
    live_block: <div className="" >
      <button className="red-btn">Blocked</button>
    </div>,
    action: (
      <div class="flex-center mt-1">
        <div className="pointer">
          <MdBlock className="font-20 me-2 red-font" />
        </div>
        <div className="pointer">
          <GrEdit className="font-20 ms-2" />
        </div>
      </div>
    ),
  },
];


const tableData2 = [
  {
    odds: "",
    back_lay: (
      <div>
        <div className="d-flex w-100 mb-2">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">4.5</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">1.5</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">8.2</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">4.6</span>
              <span>1k</span>
            </div>
          </div>
        </div>

        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">4.5</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">1.35</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">8.2</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">4.6</span>
              <span>1k</span>
            </div>
          </div>
        </div>
      </div>
    ),

    back: <div className="back-btn-cricket mb-1 ms-1">10000</div>,
    lay: <div className="lay-btn-cricket red-font ms-1">20000</div>,

    exposure: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="red-font">471.19</div>
        <div className="">100k</div>
      </div>
    ),
    live_block: <div className="green-btn">Live</div>,
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

const tableData3 = [
  {
    odds: "",
    back_lay: (
      <div>
        <div className="d-flex w-100 mb-2">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">4.5</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">1.5</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">8.2</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">4.6</span>
              <span>1k</span>
            </div>
          </div>
        </div>

        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">4.5</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
              <span className="fw-600">1.35</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">8.2</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
              <span className="fw-600">4.6</span>
              <span>1k</span>
            </div>
          </div>
        </div>
      </div>
    ),

    back: <div className="back-btn-cricket mb-1 ms-1">10000</div>,
    lay: <div className="lay-btn-cricket red-font ms-1">20000</div>,

    exposure: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="red-font">471.19</div>
        <div className="">100k</div>
      </div>
    ),
    live_block: <div className="green-btn">Live</div>,
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

const Fancy = () => {
  const [clickFancyButton, setClickFancyButton] = useState("live_fancy");


  const navigate = useNavigate();
  const { sport } = useParams();

  const handleFancyBets = (fancy) => {
    navigate(`/sports-live-cricket/${sport}/${fancy}`);
  };

  const handleDeclaredFancyBets = (declaredFancy) => {
    navigate(`/sports-live-cricket/${sport}/${declaredFancy}`);
  };

  return (
    <div>
      <div className="table-items-centerd mt-3">
        <Table columns={cols} data={tableData1} itemsPerPage={5} />
      </div>

      <div className="table-items-centerd mt-3">
        <Table columns={cols} data={tableData2} itemsPerPage={5} />
      </div>

      <div className="table-items-centerd mt-3">
        <Table columns={cols} data={tableData3} itemsPerPage={5} />
      </div>

      <div className="mt-3 shadow p-3 bg-white rounded">
        <h5 className="medium-font">Fancy</h5>
        <div className="row flex-between mt-1">
          <div className="col-6 d-flex gap-2">
            <button
              className={`rounded small-font ${
                clickFancyButton === "live_fancy" ? "saffron-btn" : "white-btn2"
              }`}
              onClick={() => setClickFancyButton("live_fancy")}
            >
              Live Fancy
            </button>
            <button
              className={`rounded small-font ${
                clickFancyButton === "declared_fancy"
                  ? "saffron-btn"
                  : "white-btn2"
              }`}
              onClick={() => setClickFancyButton("declared_fancy")}
            >
              Declared Fancy
            </button>
          </div>
          <div className="col-6 d-flex">
            <div className="col text-end">
              {clickFancyButton === "live_fancy" ? (
                <button
                  className="saffron-btn rounded small-font me-4"
                  onClick={() => handleFancyBets("View Fancy Bets")}
                >
                  View Fancy Bets
                  <BsEye className="ms-2" size={18} />
                </button>
              ) : (
                <button
                  className="saffron-btn rounded small-font me-4"
                  onClick={() =>
                    handleDeclaredFancyBets("View Fancy Declared Bets")
                  }
                >
                  View fancy Declared Bets
                  <BsEye className="ms-2" size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
        {clickFancyButton === "live_fancy" ? <LiveFancyBets /> : <DeclaredFancyBets />}
      </div>
    </div>
  );
};

export default Fancy;
