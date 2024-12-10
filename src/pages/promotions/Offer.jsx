import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { IoAddOutline } from "react-icons/io5";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import { Images } from "../../images";
import UploadPosterPopUp from "./UploadPosterPopUp";

const Offer = () => {
  const [activeBtn, setActiveBtn] = useState("1st Deposit Bonus");
  const [uploadPoster, setUploadPoster] = useState(false);
  const ACTIVE_BTNS = [
    "1st Deposit Bonus",
    "Cashback",
    "Promotions",
    "All Bonus",
  ];
  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const PosterImages = [
    {
      image: Images.promotion3,
      content: " 100% Welcome bonus up to 33000 INR",
    },
    {
      image: Images.promotion4,
      content: " 120% first deposit bonus up to 33000 INR",
    },
    {
      image: Images.promotion5,
      content: "120% first deposit bonus up to 33000 INR",
    },
    {
      image: Images.promotion6,
      content: " 30% cashback bonus",
    },
    {
      image: Images.promotion7,
      content: "5% cashback",
    },
    {
      image: Images.promotion8,
      content: "30% Cashback Bonus",
    },
    {
      image: Images.promotion9,
      content: "Big Bash Wins",
    },
    {
      image: Images.promotion10,
      content: "BECOME A LEGEND",
    },
  ];

  const CRICKET_COLUMNS = [{ header: "", field: "posters" }];
  const CRICKET_DATA = [
    {
      posters: (
        <div className="row poster-img d-flex ">
          {PosterImages?.map((item, index) => (
            <div className="relative p-1 col-3" key={index}>
              <img src={item.image} alt="Poster" className="w-100" />
              <div className="balck-btn small-font me-1 w-100">
                {item.content}
              </div>
              <div className="absolute d-flex w-95 flex-between promotion-posters p-1 ">
                <span className="white-bg rounded-pill p-1  ">
                  <SlPencil
                    size={20}
                    className="pointer"
                    onClick={() => setUploadPoster(!uploadPoster)}
                  />
                </span>
                <span className="white-bg rounded-pill p-1  pointer">
                  <FaRegTrashCan size={20} />
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Offers</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="flex-between small-font mb-3">
        <div className="d-flex">
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
        <div
          className="saffron-btn2 pointer flex-center align-items-center"
          onClick={() => setUploadPoster(!uploadPoster)}
        >
          <IoAddOutline className="medium-font" />
          <span className="ms-2 small-font">Add New</span>
        </div>
      </div>
      <Table columns={CRICKET_COLUMNS} data={CRICKET_DATA} itemsPerPage={1} />
      <UploadPosterPopUp
        setUploadPoster={setUploadPoster}
        uploadPoster={uploadPoster}
      />
    </div>
  );
};

export default Offer;
