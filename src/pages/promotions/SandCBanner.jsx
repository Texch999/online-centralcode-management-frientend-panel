import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import Table from "../../components/Table";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import FullPosterPopUp from "./FullPosterPopUp";
import { SlPencil } from "react-icons/sl";

const SandCBanner = () => {
  const [activeBtn, setActiveBtn] = useState("User Posters");
  const [activeBtn2, setActiveBtn2] = useState("Live");
  const ACTIVE_BTNS = ["User Posters", "Admin Posters"];
  const ACTIVE_BTNS2 = ["Live", "Schedule"];
  const [fullPoster, setFullPoster] = useState(false);
  const [editPoster, setEditPoster] = useState(false);

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };
  const handleSportClick2 = (item) => {
    setActiveBtn2(activeBtn2 === item ? null : item);
  };

  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Type", field: "type", width: "10%" },
    { header: "Websites", field: "websites", width: "15%" },
    { header: "Poster Location", field: "posterLocation", width: "15%" },
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
      type: <div>Sports</div>,
      websites: (
        <div>
          www.texchange.com <br />
          www.diamondexchange.com <br />
          www.fun77.com
        </div>
      ),
      posterLocation: <div>Home Page</div>,
      Poster: (
        <div className="flex-center">
          <div className="relative poster-img">
            <div>
              <img src={Images.Poster1} alt="Poster" />
              <TbArrowsDiagonal
                className="absolute zoom-out white-bg pointer"
                size={18}
                onClick={() => setFullPoster(!fullPoster)}
              />
            </div>
          </div>
          <div className="relative poster-img ms-2">
            <div>
              <img src={Images.Cricket1} alt="Poster" />
              <TbArrowsDiagonal
                className="absolute zoom-out white-bg pointer"
                size={18}
                onClick={() => setFullPoster(!fullPoster)}
              />
            </div>
          </div>
        </div>
      ),
      action: (
        <div className="flex-center">
          <SlPencil
            size={18}
            className="pointer me-1"
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
        <h6 className="yellow-font mb-0">Sports/Casino Banners</h6>
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
      <hr />
      <div className="d-flex my-3 small-font">
        {ACTIVE_BTNS2?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn2 === item
                ? "saffron-btn2 px-3"
                : "white-btn2 pointer px-3"
            }`}
            onClick={() => handleSportClick2(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="w-80 d-flex small-font">
        <div className="col flex-column me-3">
          <label className="black-text4 mb-1">Sports/Casino</label>
          <select className="input-css2">
            <option>Sports</option>
          </select>
        </div>
        <div className="col flex-column me-3">
          <label className="black-text4 mb-1">Websites</label>
          <select className="input-css2">
            <option>All</option>
          </select>
        </div>
        <div className="col flex-column me-3">
          <label className="black-text4 mb-1">Poster Location</label>
          <select className="input-css2">
            <option>All</option>
          </select>
        </div>
        <div className="col flex-column me-3">
          <label className="black-text4 mb-1">Live Date</label>
          <input className="input-css2" type="date" />
        </div>
        <div className="col flex-column">
          <label className="black-text4 mb-1">Live Time</label>
          <input className="input-css2" type="date" />
        </div>
      </div>

      <div className="w-50 d-flex small-font my-3">
        <div className="col-5 flex-column me-3">
          <label className="black-text4 mb-1">Upload Poster</label>
          <label htmlFor="poster">
            <input type="file" style={{ display: "none" }} id="poster" />
            <div className="input-css2 flex-between">
              <span>Select File</span> <MdOutlineFileUpload size={16} />
            </div>
          </label>
        </div>
        <div className="col-3 flex-end me-3">
          <div className="w-100 white-bg pointer yellow-font p-2 rounded dashed-border text-center">
            Upload More
          </div>
        </div>
        <div className="col-4 flex-end me-3">
          <div className="w-100 saffron-btn2">Submit</div>
        </div>
      </div>

      <Table columns={CRICKET_COLUMNS} data={CRICKET_DATA} itemsPerPage={2} />
      <FullPosterPopUp fullPoster={fullPoster} setFullPoster={setFullPoster} />
    </div>
  );
};

export default SandCBanner;
