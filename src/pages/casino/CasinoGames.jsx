import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import ActionPopup from "./ActionPopup";

const CasinoGames = () => {
  const naviagte = useNavigate();
  const location = useLocation();
  const { vendor, provider, game } = useParams();
  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };

  const cols = [
    { header: <div className="flex-center">S No</div>, field: "sno" },
    { header: "Market ID", field: "mid" },
    { header: "Table Number", field: "tno" },
    { header: "Status", field: "status" },
    { header: "Profit & Loss", field: "pl" },
    { header: "Action", field: "action" },
  ];

  const data = [
    {
      sno: <div className="flex-center">1</div>,
      mid: <div className="pointer">12345678123456</div>,
      tno: <div>Table No 1</div>,
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch" onClick={handleActiveModal}>
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div className="flex-center">2</div>,
      mid: <div className="pointer">12345678123456</div>,
      tno: <div>Table No 2</div>,
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div className="flex-center">3</div>,
      mid: <div className="pointer">12345678123456</div>,
      tno: <div>Table No 3</div>,
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div className="flex-center">4</div>,
      mid: <div className="pointer">12345678123456</div>,
      tno: <div>Table No 4</div>,
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div className="flex-center">5</div>,
      mid: <div className="pointer">12345678123456</div>,
      tno: <div>Table No 5</div>,
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between">
        <div className="pointer my-2 large-font" onClick={() => naviagte(-1)}>
          <span className="grey-clr">
            Casino<span className="mx-1">{">"}</span>
          </span>{" "}
          <span className="grey-clr">
            {vendor}
            <span className="mx-1">{">"}</span>
          </span>{" "}
          <span className="grey-clr">{provider}</span>
          <span>
            <span className="mx-1">{">"}</span>
            {game}
          </span>
        </div>

        <div className="small-font">
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>

      <div className="radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
      <ActionPopup show={isActive} setShow={setIsACtive} />
    </div>
  );
};

export default CasinoGames;
