import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/Table";

const CasinoGames = () => {
  const naviagte = useNavigate();
  const location = useLocation();
  const { vendor, provider, game } = location.state || {};

  const cols = [
    { header: "S No", field: "sno" },
    { header: "Market ID", field: "mid" },
    { header: "Table Number", field: "tno" },
    { header: "Status", field: "status" },
    { header: "Profit & Loss", field: "pl" },
    { header: "Action", field: "action" },
  ];

  const data = [
    {
      sno: <div>1</div>,
      mid: <div className="pointer">12345678123456</div>,
      tno: <div>Table No 1</div>,
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
        sno: <div>2</div>,
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
        sno: <div>3</div>,
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
        sno: <div>4</div>,
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
        sno: <div>5</div>,
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
      <div className="pointer" onClick={() => naviagte(-1)}>
        <span className="grey-clr">Casino {">"}</span>{" "}
        <span className="grey-clr">
          {vendor} {">"}
        </span>{" "}
        <span className="grey-clr">{provider}</span>
        <span>
          {">"}
          {game}
        </span>
      </div>

      <div className="white-bg radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default CasinoGames;
