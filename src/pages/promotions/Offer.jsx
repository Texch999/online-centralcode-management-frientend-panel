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
import EditOfferPopUp from "./EditOfferPopUp";
import DeleteOfferPopUp from "./DeleteOfferPopUp";
import UploadPosterPopUp from "./UploadPosterPopUp";

const Offer = () => {
  const [activeBtn, setActiveBtn] = useState("1st Deposit Bonus");
  const [editOffer,setEditOffer]=useState(false)
  const [deleteOffer,setDeleteOffer]=useState(false)
  const [uploadPoster,setUploadPoster]=useState(false)
  const ACTIVE_BTNS = [
    "1st Deposit Bonus",
    "Cashback",
    "Promotions",
    "All Bonus",
  ];
  const datePickerRef = useRef(null);
  const navigation = useNavigate();

  const handleIconClick = () => {
    datePickerRef?.current?.setFocus();
  };

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const CRICKET_COLUMNS = [{ header: "", field: "posters" }];

  const PosterImages = [
    {
      image:Images.promotion3,
      content:" 100% Welcome bonus up to 33000 INR"
    },
    {
      image:Images.promotion4,
      content:" 120% first deposit bonus up to 33000 INR"
    },
    {
      image:Images.promotion5,
      content:"120% first deposit bonus up to 33000 INR"
    },
    {
      image:Images.promotion6,
      content:" 30% cashback bonus"
    },
    {
      image:Images.promotion7,
      content:"5% cashback"
    },
    {
      image:Images.promotion8,
      content:"30% Cashback Bonus"
    },
    {
      image:Images.promotion9,
      content:"Big Bash Wins"
    },
    {
      image:Images.promotion10,
      content:"BECOME A LEGEND"
    },
   
    
    
  ];

  const CRICKET_DATA = [
    {
      posters: (
        <div className="row poster-img d-flex ">
          {PosterImages?.map((item, index) => (
            <div className="relative p-1 col-3">
              <img src={item.image} alt="Poster"  className="w-100"/>
              <div className="balck-btn small-font me-1 w-100">
                {item.content}
              </div>
              <div className="absolute d-flex w-95 flex-between promotion-posters p-1 ">
                <span className="white-bg rounded-pill p-1  ">
                  <LiaPenSolid size={20} className="pointer"  onClick={()=>setEditOffer(!editOffer)}/>
                </span>
                <span className="white-bg rounded-pill p-1  pointer">
                  <FaRegTrashCan size={20}  onClick={()=>setDeleteOffer(!deleteOffer)}/>
                </span>
              </div>

             
            </div>
          ))}
        </div>
      ),
     
    },
    {
      posters: (
        <div className="row poster-img d-flex ">
          {PosterImages?.map((item, index) => (
            <div className="relative p-1 col-3">
              <img src={item.image} alt="Poster"  className="w-100"/>
              <div className="balck-btn small-font me-1 w-100">
                {item.content}
              </div>
              <div className="absolute d-flex w-95 flex-between promotion-posters p-1 ">
                <span className="white-bg rounded-pill p-1  ">
                  <LiaPenSolid size={20} className="pointer" onClick={()=>setEditOffer(!editOffer)} />
                </span>
                <span className="white-bg rounded-pill p-1 pointer ">
                  <FaRegTrashCan size={20} onClick={()=>setDeleteOffer(!deleteOffer)} />
                </span>
              </div>

             
            </div>
          ))}
        </div>
      ),
     
    },
    {
      posters: (
        <div className="row poster-img d-flex ">
          {PosterImages?.map((item, index) => (
            <div className="relative p-1 col-3">
              <img src={item.image} alt="Poster"  className="w-100"/>
              <div className="balck-btn small-font me-1 w-100">
                {item.content}
              </div>
              <div className="absolute d-flex w-95 flex-between promotion-posters p-1 ">
                <span className="white-bg rounded-pill p-1  ">
                  <LiaPenSolid size={20} className="pointer"  onClick={()=>setEditOffer(!editOffer)}/>
                </span>
                <span className="white-bg rounded-pill p-1 pointer ">
                  <FaRegTrashCan size={20} onClick={()=>setDeleteOffer(!deleteOffer)}/>
                </span>
              </div>

             
            </div>
          ))}
        </div>
      ),
     
    },
    {
      posters: (
        <div className="row poster-img d-flex ">
          {PosterImages?.map((item, index) => (
            <div className="relative p-1 col-3">
              <img src={item.image} alt="Poster"  className="w-100"/>
              <div className="balck-btn small-font me-1 w-100">
                {item.content}
              </div>
              <div className="absolute d-flex w-95 flex-between promotion-posters p-1 ">
                <span className="white-bg rounded-pill p-1  ">
                  <LiaPenSolid size={20} className="pointer"  onClick={()=>setEditOffer(!editOffer)}/>
                </span>
                <span className="white-bg rounded-pill p-1 pointer ">
                  <FaRegTrashCan size={20} onClick={()=>setDeleteOffer(!deleteOffer)}/>
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
        <h6 className="yellow-font mb-0">Offer</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="d-flex w-100  flex-between small-font">
        <div className=" d-flex col-5">
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

        <div className="saffron-btn2 small-font pointer mt-4 col-1" onClick={()=>setUploadPoster(!uploadPoster)}>
          <IoAddOutline className="large-font" size={18}/> <span className="ms-2">Add New</span> 
        </div>
      </div>
      <div className="mt-4">
        <Table columns={CRICKET_COLUMNS} data={CRICKET_DATA} itemsPerPage={1} />
      </div>
      <EditOfferPopUp setEditOffer={setEditOffer} editOffer={editOffer}/>
      <DeleteOfferPopUp setDeleteOffer={setDeleteOffer} deleteOffer={deleteOffer}/>
      <UploadPosterPopUp setUploadPoster={setUploadPoster} uploadPoster={uploadPoster}/>
    </div>
  );
};

export default Offer;
