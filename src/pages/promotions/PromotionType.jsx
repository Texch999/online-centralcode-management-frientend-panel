import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { IoAddOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import NewPromotionPopUp from "./NewPromotionPopUp";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import FullPosterPopUp from "./FullPosterPopUp";
import { MdOutlineFileUpload } from "react-icons/md";
import EditPosterPopUp from "./EditPosterPopUp";
import Select from "react-select";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import { getPromotionsTypes } from "../../api/apiMethods";
import axios from "axios";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "../popups/ErrorPopup";

const PromotionType = () => {
  const [activeBtn, setActiveBtn] = useState("Promotion Type");
  const [fullPoster, setFullPoster] = useState(false);
  const [fullPosterImage, setFullPosterImage] = useState(false);
  const [editPoster, setEditPoster] = useState(false);
  const [promotionDeleteModal, setPromotionDeleteModal] = useState(false);
  const [posterDeleteModal, setPosterDeleteModal] = useState(false);
  const ACTIVE_BTNS = ["Promotion Type", "Poster Templates"];
  const [promotionsTypes, setPromotionsTypes] = useState([]);
  const [selectedPromotionId, setSelectedPromotionId] = useState(null);
  const [selectedPromotionStatus, setSelectedPromotionStatus] = useState(null);
  const [promotionBlockModal, setPromotionBlockModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [promotionsIMages, setPromotionsIMages] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    getPromotions();
    getPromotionsImages();
  }, []);

  const getPromotions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/rest2/0.1/user/:id/api/getPromotionsTypes"
      );
      if (response?.status === 200) {
        setPromotionsTypes(response?.data?.promotionsTypes);
      } else {
        console.log("Something Went Wrong");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const getPromotionsImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9001/rest2/0.1/user/:id/api/getPromotionsImages"
      );
      if (response?.status === 200) {
        setPromotionsIMages(response?.data?.promotionsImages);
      } else {
        console.log("Something Went Wrong");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlePromotionsImages = async () => {
    const formData = new FormData();
    formData.append("promotionsId", selectedOption.value);
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:9001/rest2/0.1/user/:id/api/createPromotionImages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        setSelectedFile(null);
        setSelectedOption(null);
        getPromotionsImages();
        setSuccessPopupOpen(true);
      } else {
        setMessage(response.data.message);
        setSelectedFile(null);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      setMessage(error?.response?.data?.message);
      setSelectedFile(null);
      setErrorPopupOpen(true);
    }
  };

  const selectOptions = promotionsTypes?.map((item) => ({
    value: item.id,
    label: item.promotionsType,
  }));

  const handleSportClick = (item) => {
    setActiveBtn(item);
  };

  const handleBlockOrUnblock = (id, status) => {
    setSelectedPromotionId(id);
    setSelectedPromotionStatus(status);
    setPromotionBlockModal(true);
  };

  const handleDeletePoster = (id) => {
    setSelectedPromotionId(id);
    setPosterDeleteModal(true);
  };
  const handleFullScreen = (image) => {
    setFullPosterImage(image);
    setFullPoster(!fullPoster);
  };

  const PROMOTIONS_COLUMNS = [
    { header: "Promotion ID", field: "promotionid" },
    { header: "Date & Time", field: "dateTime" },
    { header: "Promotion Type", field: "promotionType" },
    { header: "", field: "icons" },
  ];

  const PROMOTIONS_DATA = promotionsTypes?.map((promotion) => ({
    promotionid: <div>{promotion.id}</div>,
    dateTime: <div>{new Date(promotion.created_at).toLocaleString()}</div>,
    promotionType: <div>{promotion.promotionsType}</div>,

    icons: (
      <div className="flex-end">
        {promotion.status === 1 ? (
          <MdBlockFlipped
            style={{ color: "green" }}
            size={18}
            className="mx-3 pointer"
            onClick={() => handleBlockOrUnblock(promotion.id, promotion.status)}
          />
        ) : (
          <MdBlockFlipped
            style={{ color: "red" }}
            size={18}
            className="mx-3 pointer"
            onClick={() => handleBlockOrUnblock(promotion.id, promotion.status)}
          />
        )}
      </div>
    ),
  }));

  const PROMOTIONSIMAGES_COLUMNS = [
    { header: "Id", field: "promotionid", width: "20%" },
    { header: "Poster Type", field: "promotionType", width: "20%" },
    { header: "Poster", field: "Poster", width: "20%" },
    { header: "Date & Time", field: "dateTime", width: "20%" },
    {
      header: <div className="flex-center">Action</div>,
      field: "icons",
      width: "20%",
    },
  ];

  const filteredPromotions = promotionsIMages?.filter((promotion) =>
    promotion.promotionsType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePromotions = searchQuery ? filteredPromotions : promotionsIMages;

  const PROMOTIONSIMAGES_DATA = activePromotions?.map((promotionsImage) => ({
    promotionid: <div>{promotionsImage.promotionsId}</div>,
    promotionType: <div>{promotionsImage.promotionsType}</div>,
    Poster: (
      <div className="flex-center">
        <div className="relative poster-img">
          <img
            src={`http://localhost:9001/uploads/${promotionsImage.image}`}
            alt="Promotion"
            style={{ width: "200px", height: "150px" }}
          />
          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => handleFullScreen(promotionsImage.image)}
            style={{ marginLeft: "-25px" }}
          />
        </div>
      </div>
    ),
    dateTime: (
      <div>{new Date(promotionsImage.created_at).toLocaleString()}</div>
    ),

    icons: (
      <div className="flex-center">
        <FaRegTrashCan
          size={18}
          className="pointer ms-2 delete"
          onClick={() => handleDeletePoster(promotionsImage.id)}
        />
      </div>
    ),
  }));

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Promotion Type</h6>
      </div>
      <div className="d-flex small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item ? "saffron-btn2" : "white-btn2 pointer"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      {activeBtn === "Promotion Type" ? (
        <>
          <div className="flex-between w-100 my-3 small-font"></div>
          <Table columns={PROMOTIONS_COLUMNS} data={PROMOTIONS_DATA} />{" "}
          {/* itemsPerPage={2} /> \\*/}
        </>
      ) : (
        <>
          <div className="d-flex my-3 small-font align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="col-md-5 col-lg-9">
                <label
                  htmlFor="promotionType"
                  className="black-text4 small-font mb-1 d-block"
                >
                  Promotion Type
                </label>
                <Select
                  id="promotionType"
                  className="small-font w-100"
                  options={selectOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  classNamePrefix="custom-react-select"
                  value={selectedOption}
                  onChange={handleSelectChange}
                />
              </div>

              <div className="col-md-3 col-lg-5 px-0">
                <label
                  htmlFor="poster"
                  className="black-text4 small-font mb-1 d-block"
                >
                  Upload Poster
                </label>
                <label htmlFor="poster" className="d-block">
                  <input
                    type="file"
                    id="poster"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <div className="input-css2 small-font d-flex justify-content-between align-items-center pointer">
                    {selectedFile ? selectedFile.name : "Upload"}
                    <MdOutlineFileUpload className="grey-color medium-font" />
                  </div>
                </label>
              </div>

              <div className="col-md-2 col-lg-5 align-self-end">
                <button
                  className="w-100 saffron-btn2 pointer small-font"
                  onClick={handlePromotionsImages}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="input-pill d-flex align-items-center rounded-pill px-2">
              <FaSearch size={16} className="grey-clr me-2" />
              <input
                className="small-font all-none"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table
            columns={PROMOTIONSIMAGES_COLUMNS}
            data={PROMOTIONSIMAGES_DATA}
            itemsPerPage={2}
          />
        </>
      )}

      <FullPosterPopUp
        setFullPoster={setFullPoster}
        fullPoster={fullPoster}
        setFullPosterImage={setFullPosterImage}
        fullPosterImage={fullPosterImage}
      />
      <ConfirmationPopup
        confirmationPopupOpen={promotionDeleteModal}
        setConfirmationPopupOpen={() => setPromotionDeleteModal(false)}
        discription={"are you sure you want to delete this Promotion"}
        submitButton={"Delete"}
      />

      <ConfirmationPopup
        confirmationPopupOpen={promotionBlockModal}
        setConfirmationPopupOpen={() => setPromotionBlockModal(false)}
        discription={`are you sure you want to ${
          selectedPromotionStatus === 1 ? "Block" : "UnBlock"
        } this Promotion`}
        selectedId={selectedPromotionId}
        submitButton={selectedPromotionStatus === 1 ? "Block" : "UnBlock"}
        getAction={getPromotions}
        api={"BlockUnBlockPromotion"}
      />

      <ConfirmationPopup
        confirmationPopupOpen={posterDeleteModal}
        setConfirmationPopupOpen={() => setPosterDeleteModal(false)}
        discription={"are you sure you want to delete this Poster"}
        selectedId={selectedPromotionId}
        submitButton={"Delete"}
        getAction={getPromotionsImages}
        api={"DeletePoster"}
      />
      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={message}
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={message}
      />
    </div>
  );
};

export default PromotionType;
