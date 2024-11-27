import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegCalendarMinus, FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import Table from "../../components/Table";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import { LiaPenSolid } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";

const SandCBanner = () => {
  const [activeBtn, setActiveBtn] = useState("User Posters");
  const [activeBtn2, setActiveBtn2] = useState("Live");
  const ACTIVE_BTNS = ["User Posters", "Admin Posters"];
  const ACTIVE_BTNS2 = ["Live", "Schedule"];
  const datePickerRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [fullPoster, setFullPoster] = useState(false);
  const [editPoster, setEditPoster] = useState(false);

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };
  const handleSportClick2 = (item) => {
    setActiveBtn2(activeBtn2 === item ? null : item);
  };

  const handleIconClick = () => {
    datePickerRef?.current?.setFocus();
  };

  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Sports", field: "sports", width: "10%" },
    { header: "Poster Type", field: "posterType", width: "10%" },
    { header: "Promotion Msg", field: "promotionMsg", width: "10%" },
    { header: "Websites", field: "websites", width: "10%" },
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
        <h6 className="yellow-font mb-0">Sports/Casino Banners</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="d-flex w-25 flex-between small-font">
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

      <div className="w-100 grey-border mt-2"></div>

      <div>
        <div className="d-flex w-20 flex-between mt-4 small-font">
          {ACTIVE_BTNS2?.map((item, index) => (
            <div
              key={index}
              className={`me-3 ${
                activeBtn2 === item
                  ? "saffron-btn2  px-4"
                  : "white-btn2 pointer px-4"
              }`}
              onClick={() => handleSportClick2(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex w-60 flex-between mt-2">
        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Sports/Casino</label>
          <select className="input-css2 small-font">
            <option>Sports</option>
          </select>
        </div>

        <>
          <div className="col-3 flex-column me-3">
            <label className="black-text4 small-font mb-1">Websites</label>
            <select className="input-css2 small-font">
              <option>All</option>
            </select>
          </div>

          <div className="col-3 flex-column me-3">
            <label className="black-text4 small-font mb-1">
              Poster Location
            </label>
            <select className="input-css2 small-font">
              <option>All</option>
            </select>
          </div>
        </>

        <div className="col-3">
          <span className="small-font">Live Date</span>
          <div className="w-90 grey-border p-1 d-flex flex-between input-css2">
            <DatePicker
              ref={datePickerRef}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="all-none w-70 small-font"
            />
            <FaRegCalendarMinus onClick={handleIconClick} className="pointer" />
          </div>
        </div>

        <div className="col-3">
          <span className="small-font">Live Time</span>
          <div className="w-90 grey-border p-1 d-flex flex-between input-css2">
            <DatePicker
              ref={datePickerRef}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="all-none w-70 small-font"
            />
            <FaRegCalendarMinus onClick={handleIconClick} className="pointer" />
          </div>
        </div>
      </div>

      <div className=" d-flex flex-between w-50">
        <div className={` col-6 flex-column mt-2`}>
          <label className="black-text4 small-font " htmlFor="poster">
            Upload Poster
            <input type="file" style={{ display: "none" }} id="poster" />
            <div className="white-bg small-font d-flex flex-between p-2 rounded mt-2">
              Select File <MdOutlineFileUpload />
            </div>
          </label>
        </div>
        <div className="white-bg small-font pointer mt-4 yellow-font p-2 rounded grey-border col-2">
          Upload More
        </div>
        <div className="saffron-btn2 small-font pointer mt-4  col-2">
          Submit
        </div>
      </div>
      <Table columns={CRICKET_COLUMNS} data={CRICKET_DATA} itemsPerPage={2} />
    </div>
  );
};

export default SandCBanner;
