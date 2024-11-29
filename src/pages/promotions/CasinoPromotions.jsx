import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarMinus, FaSearch } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";
import NewPromotionPopUp from "./NewPromotionPopUp";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import FullPosterPopUp from "./FullPosterPopUp";
import { MdOutlineFileUpload } from "react-icons/md";
import EditPosterPopUp from "./EditPosterPopUp";
import AddNewPromotionPopUp from "./AddNewPromotionPopUp";
import CasinoPromotionsPopUp from "./CasinoPromotionsPopUp";

const CasinoPromotions = () => {
  const [activeBtn, setActiveBtn] = useState("Admin Promotion");
  const [startDate, setStartDate] = useState(new Date());

  const [addPromotionsModal, setAddPromotionsModal] = useState(false);
  const [fullPoster, setFullPoster] = useState(false);
  const [editPoster, setEditPoster] = useState(false);
  const [casinoPromotion, setCasinoPromotion] = useState(false);
  const ACTIVE_BTNS = ["Admin Promotion", "User Promotion"];
  const datePickerRef = useRef(null);
  const navigation = useNavigate();

  const handleIconClick = () => {
    datePickerRef?.current?.setFocus();
  };

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Poster Type", field: "posterType", width: "10%" },
    { header: "Promotion Msg", field: "promotionMsg", width: "15%" },
    { header: "Websites", field: "websites", width: "15%" },
    { header: "Poster", field: "Poster", width: "20%" },
    { header: "", field: "icons", width: "10%" },
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
        <div className="relative poster-img">
          <img src={Images.Casino1} alt="Poster" />

          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
        </div>
      ),
      icons: (
        <div className="d-flex w-50 flex-between">
          <span onClick={() => setEditPoster(!editPoster)}>
            <LiaPenSolid size={18} className="pointer" />
          </span>

          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
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
        <div className="relative poster-img">
          <img src={Images.Casino1} alt="Poster" />

          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
        </div>
      ),
      icons: (
        <div className="d-flex w-50 flex-between">
          <span onClick={() => setEditPoster(!editPoster)}>
            <LiaPenSolid size={18} className="pointer" />
          </span>

          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },

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
        <div className="relative poster-img">
          <img src={Images.Casino1} alt="Poster" />

          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
        </div>
      ),
      icons: (
        <div className="d-flex w-50 flex-between">
          <span onClick={() => setEditPoster(!editPoster)}>
            <LiaPenSolid size={18} className="pointer" />
          </span>

          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
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
        <div className="relative poster-img">
          <img src={Images.Casino1} alt="Poster" />

          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
        </div>
      ),
      icons: (
        <div className="d-flex w-50 flex-between">
          <span onClick={() => setEditPoster(!editPoster)}>
            <LiaPenSolid size={18} className="pointer" />
          </span>

          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
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
        <div className="relative poster-img">
          <img src={Images.Poster1} alt="Poster" />

          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
        </div>
      ),
      icons: (
        <div className="d-flex w-50 flex-between">
          <span onClick={() => setEditPoster(!editPoster)}>
            <LiaPenSolid size={18} className="pointer" />
          </span>

          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
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
      <div className="d-flex col-3 flex-between small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item
                ? "saffron-btn2  px-4"
                : "white-btn2 pointer px-4"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="d-flex w-100 flex-between">
        <div className="d-flex w-50 flex-between mt-2">
          <div className="col flex-column mx-2">
            <label className="black-text4 small-font mb-1">From</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="col flex-column mx-2">
            <label className="black-text4 small-font mb-1">To</label>
            <input className="input-css2 small-font" type="date" />
          </div>

          <div className="col flex-column me-3">
            <label className="black-text4 small-font mb-1">Website</label>
            <select className="input-css2 small-font">
              <option>All</option>
            </select>
          </div>

          <div className="saffron-btn2 small-font pointer mt-4  col-2">
            Submit
          </div>
        </div>

        <div
          className="white-bg p-2 grey-border flex-center blue-font br-10 small-font pointer mt-4 col-1"
          onClick={() => setCasinoPromotion(!casinoPromotion)}
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
      <CasinoPromotionsPopUp
        setCasinoPromotion={setCasinoPromotion}
        casinoPromotion={casinoPromotion}
      />

      <FullPosterPopUp setFullPoster={setFullPoster} fullPoster={fullPoster} />
    </div>
  );
};

export default CasinoPromotions;
