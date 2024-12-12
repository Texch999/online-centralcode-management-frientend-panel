import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { IoAddOutline } from "react-icons/io5";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import FullPosterPopUp from "./FullPosterPopUp";
import CasinoPromotionsPopUp from "./CasinoPromotionsPopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

const CasinoPromotions = () => {
  const [activeBtn, setActiveBtn] = useState("Admin Promotion");
  const [fullPoster, setFullPoster] = useState(false);
  const [editPoster, setEditPoster] = useState(false);
  const [casinoPromotion, setCasinoPromotion] = useState(false);
  const ACTIVE_BTNS = ["Admin Promotion", "User Promotion"];

  const handleSportClick = (item) => {
    setActiveBtn(item);
  };

  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Poster Type", field: "posterType", width: "15%" },
    { header: "Promotion Msg", field: "promotionMsg", width: "20%" },
    { header: "Websites", field: "websites", width: "15%" },
    {
      header: <div className="flex-center">Poster</div>,
      field: "Poster",
    },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
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
      posterType: (
        <div>
          1st Deposit Bonus <br />{" "}
          <span className="yellow-font">Code: ABCD234XY</span>
        </div>
      ),
      promotionMsg: (
        <div>
          Welcome Package Rs 15000 <br />
          off Upto 100000
        </div>
      ),
      websites: <div>www.texchange.com</div>,
      Poster: (
        <div className="flex-center">
          <div className="relative poster-img">
            <img src={Images.Casino1} alt="Poster" />
            <TbArrowsDiagonal
              className="absolute zoom-out white-bg pointer"
              size={18}
              onClick={() => setFullPoster(!fullPoster)}
            />
          </div>
        </div>
      ),
      action: (
        <div className="flex-center">
          <SlPencil
            size={18}
            className="me-1 pointer"
            onClick={() => setEditPoster(!editPoster)}
          />
          <FaRegTrashCan size={18} className="ms-1" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Casino Promotion</h6>
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
                ? "saffron-btn2"
                : "white-btn2 pointer"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="d-flex w-100 align-items-end justify-content-between my-3 small-font">
        <div className="col-8 col-lg-6 d-flex">
          <div className="col flex-column me-3">
            <label className="black-text4 mb-1">From</label>
            <input className="input-css2" type="date" />
          </div>
          <div className="col flex-column me-3">
            <label className="black-text4 mb-1">To</label>
            <input className="input-css2" type="date" />
          </div>
          <div className="col flex-column me-3">
            <label className="black-text4 small-font mb-1">Website</label>
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
          <div className="col flex-end">
            <div className="w-100 saffron-btn2 pointer">Submit</div>
          </div>
        </div>

        <div
          className="white-bg px-3 py-2 grey-border flex-center blue-font rounded  pointer"
          onClick={() => setCasinoPromotion(!casinoPromotion)}
        >
          <IoAddOutline className="medium-font me-2" />
          <span className="small-font">Add New</span>
        </div>
      </div>
      {activeBtn === "Admin Promotion" ? (
        <Table columns={CRICKET_COLUMNS} data={CRICKET_DATA} itemsPerPage={2} />
      ) : (
        <Table columns={CRICKET_COLUMNS} data={CRICKET_DATA} itemsPerPage={3} />
      )}
      <CasinoPromotionsPopUp
        setCasinoPromotion={setCasinoPromotion}
        casinoPromotion={casinoPromotion}
      />
      <FullPosterPopUp setFullPoster={setFullPoster} fullPoster={fullPoster} />
    </div>
  );
};

export default CasinoPromotions;
