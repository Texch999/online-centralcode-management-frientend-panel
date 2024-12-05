import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { IoAddOutline } from "react-icons/io5";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import FullPosterPopUp from "./FullPosterPopUp";
import AddNewPromotionPopUp from "./AddNewPromotionPopUp";

const SportsPromotions = () => {
  const [activeBtn, setActiveBtn] = useState("Admin Promotion");
  const [addPromotionsModal, setAddPromotionsModal] = useState(false);
  const [fullPoster, setFullPoster] = useState(false);
  const [editPoster, setEditPoster] = useState(false);
  const [userPromotion, setUserPromotion] = useState(false);
  const ACTIVE_BTNS = ["Admin Promotion", "User Promotion"];

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  useEffect(() => {
    if (activeBtn === "User Promotion") {
      setUserPromotion(true);
    } else {
      setUserPromotion(false);
    }
  }, [activeBtn]);

  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Sports", field: "sports", width: "10%" },
    { header: "Poster Type", field: "posterType", width: "15%" },
    { header: "Promotion Msg", field: "promotionMsg", width: "15%" },
    { header: "Websites", field: "websites", width: "15%" },
    { header: <div className="flex-center">Poster</div>, field: "Poster" },
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
            <img src={Images.Poster1} alt="Poster" />
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
            className="me-2 pointer"
            onClick={() => setEditPoster(!editPoster)}
          />
          <FaRegTrashCan size={18} className="ms-2" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Sports Promotion</h6>
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
                ? "saffron-btn2 px-3"
                : "white-btn2 pointer px-3"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="d-flex w-100 flex-between my-3">
        <div className="d-flex w-60 flex-between">
          <div className="col-3 flex-column me-2">
            <label className="black-text4 small-font mb-1">From</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="col-3 flex-column mx-2">
            <label className="black-text4 small-font mb-1">To</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="col-3 flex-column me-3">
            <label className="black-text4 small-font mb-1">Website</label>
            <select className="input-css2 small-font">
              <option>T Exchange</option>
            </select>
          </div>
          <div className="col-3 flex-column me-3">
            <label className="black-text4 small-font mb-1">Sports</label>
            <select className="input-css2 small-font">
              <option>All</option>
            </select>
          </div>
          <div className="saffron-btn2 small-font pointer mt-4  col-2">
            Submit
          </div>
        </div>
        <div
          className="white-bg p-2 grey-border flex-center blue-font br-10 small-font pointer mt-4 w-10"
          onClick={() => setAddPromotionsModal(!addPromotionsModal)}
        >
          <IoAddOutline className="large-font" /> Add New
        </div>
      </div>
      <div className="mt-4 ">
        {activeBtn === "Admin Promotion" ? (
          <Table
            columns={CRICKET_COLUMNS}
            data={CRICKET_DATA}
            itemsPerPage={2}
          />
        ) : (
          <Table
            columns={CRICKET_COLUMNS}
            data={CRICKET_DATA}
            itemsPerPage={2}
          />
        )}
      </div>
      <AddNewPromotionPopUp
        setAddPromotionsModal={setAddPromotionsModal}
        addPromotionsModal={addPromotionsModal}
        userPromotion={userPromotion}
      />
      <FullPosterPopUp setFullPoster={setFullPoster} fullPoster={fullPoster} />
    </div>
  );
};

export default SportsPromotions;
