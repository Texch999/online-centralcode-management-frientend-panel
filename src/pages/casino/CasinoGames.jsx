import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import { FaArrowLeft } from "react-icons/fa";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CasinoGames = () => {
  const navigate = useNavigate();
  const { vendor, provider, game } = useParams();
  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };

  const cols = [
    { header: "S No", field: "sno", width: "8%" },
    { header: "Market ID", field: "mid", width: "10%" },
    { header: "Table Number", field: "tno", width: "50 %" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Profit & Loss", field: "pl", width: "12%" },
    { header: "Action", field: "action", width: "10%" },
  ];

  const data = [
    {
      sno: <div className="">1</div>,
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
      sno: <div className="">2</div>,
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
  ];
  return (
    <div>
      <div className="d-flex flex-between mt-3 mb-2">
        <div className="pointer large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Casino
            <MdKeyboardArrowRight size={18} />
          </span>
          <span className="grey-clr">
            {vendor}
            <MdKeyboardArrowRight size={18} />
          </span>
          <span className="grey-clr">
            {provider} <MdKeyboardArrowRight size={18} />
          </span>
          {game}
        </div>

        <div className="medium-font">
          <span
            className="white-bg grey-border rounded-pill me-4 px-3 py-1 pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Back
          </span>
          Total P/L : <span className="green-clr">20000</span>
        </div>
      </div>
      <Table columns={cols} data={data} itemsPerPage={3} />
      <ConfirmationPopup
        confirmationPopupOpen={isActive}
        setConfirmationPopupOpen={setIsACtive}
        discription={"Are You Sure to Active this Match"}
        submitButton={"Active"}
      />
    </div>
  );
};

export default CasinoGames;
