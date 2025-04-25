import React, { useState } from "react";
import { IoTrash } from "react-icons/io5";
import { MdBlock, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { FaArrowLeft } from "react-icons/fa";

const SportMatches = () => {
  const navigate = useNavigate();
  const { match } = useParams();

  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };

  const cols = [
    { header: "S No", field: "sno", width: "8%" },
    { header: "Upcoming Matches", field: "games", width: "20%" },
    { header: "Date", field: "date", width: "20%" },
    { header: "Status", field: "status", width: "10%" },

    { header: "Profit&Loss", field: "pl", width: "10%" },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = [
    {
      sno: 1,
      games: <div className="pointer">India vs Srilanka</div>,
      date: <div className="pointer d-flex ">2025-06-09</div>,
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>Active
        </div>
      ),
      pl: <div className="dark-orange-clr">50000000</div>,
      action: (
        <div className="flex-center gap-2">
          <MdBlock
            size={18}
            className="green-font pointer"
            onClick={handleActiveModal}
          />
          {/* <IoTrash size={18} className="pointer" onClick={handleActiveModal} /> */}
        </div>
      ),
    },
    {
      sno: 2,
      games: (
        <div className="pointer d-flex gap-2">
          Australia vs South Africa
          <div className="green-bg px-2 br-5">live</div>
        </div>
      ),
      date: <div className="pointer d-flex ">2025-06-09</div>,
      status: (
        <div className="green-clr">
          <span className="round-red-dot mx-1"></span>Blocked
        </div>
      ),
      pl: <div className="dark-orange-clr">50000000</div>,
      action: (
        <div className="flex-center gap-2">
          <MdBlock
            size={18}
            className="green-font pointer"
            onClick={handleActiveModal}
          />
          {/* <IoTrash size={18} className="pointer" onClick={handleActiveModal} /> */}
        </div>
      ),
    },
  ];
  return (
    <div className="">
      <div className="d-flex flex-between mt-1 mb-2">
        <div className="large-font pointer flex-center">
          <span
            className="black- fw-600 large-font"
            onClick={() => navigate(-2)}
          >
            Matches List
            <MdKeyboardArrowRight size={20} />
          </span>
          <span className="black-text" onClick={() => navigate(-1)}>
            {match}
          </span>
        </div>
        <div className="small-font flex-between">
          <span
            className="input-css2 rounded-pill me-4 px-3 text-black py-1 flex-center pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-1 d-flex" />
            Back
          </span>
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>

      <Table columns={cols} data={data} itemsPerPage={5} />
      <ConfirmationPopup
        confirmationPopupOpen={isActive}
        setConfirmationPopupOpen={setIsACtive}
        discription={"Are You Sure to In-Active this Match"}
        submitButton={"Active"}
      />
    </div>
  );
};

export default SportMatches;
