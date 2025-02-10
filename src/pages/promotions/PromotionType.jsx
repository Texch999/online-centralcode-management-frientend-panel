import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import Table from "../../components/Table";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbArrowsDiagonal } from "react-icons/tb";
import FullPosterPopUp from "./FullPosterPopUp";
import { MdOutlineFileUpload } from "react-icons/md";
import Select from "react-select";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import {
  createPromotionImages,
  deletePromotionsImages,
  getPromotionsImage,
  getPromotionsTypes,
  getWebsitesList,
  statusPromotionsTypes,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "../popups/ErrorPopup";
import { imgUrl } from "../../api/baseUrl";

const PromotionType = () => {
  const [activeBtn, setActiveBtn] = useState("Promotion Type");
  const [fullPoster, setFullPoster] = useState(false);
  const [fullPosterImage, setFullPosterImage] = useState(false);
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
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    promotionType: "",
    image: "",
    selectWebsites: "",
    selectUserWebsites: "",
  });
  const [websitesList, setWebsitesList] = useState([]);
  const [selectWebsites, setSelectWebsites] = useState(null);
  const [selectUserWebsites, setSelectUserWebsites] = useState(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getPromotions();
    getPromotionsImages();
    getWebsites();
  }, []);

  const getWebsites = async () => {
    try {
      const response = await getWebsitesList();
      if ((response.status = 200)) {
        setWebsitesList(response?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const selectOptionsWebsites = websitesList?.map((item) => ({
    value: item.id,
    label: item.web_name,
  }));

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    setErrors((prev) => ({ ...prev, promotionType: "" }));
  };
  const handleSelectWebsites = (selected) => {
    setSelectWebsites(selected);
    setErrors((prev) => ({ ...prev, selectWebsites: "" }));
  };
  const handleSelectUserWebsites = (selected) => {
    setSelectUserWebsites(selected);
    setErrors((prev) => ({ ...prev, selectUserWebsites: "" }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 2 * 1024 * 1024;

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Only JPG, PNG, GIF, and WEBP images are allowed.");
        return;
      }

      if (file.size > maxSize) {
        setErrorMessage("File size should not exceed 2MB.");
        return;
      }

      setSelectedFile(file);
      setErrorMessage("");
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const getPromotions = async () => {
    try {
      const response = await getPromotionsTypes();
      if ((response.status = 200)) {
        setPromotionsTypes(response.promotionsTypes);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const getPromotionsImages = async () => {
    try {
      const response = await getPromotionsImage();
      if ((response.status = 200)) {
        setPromotionsIMages(response.promotionsImages);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  
  console.log("")

  const handlePromotionsImages = async () => {
    let newErrors = {};

    if (!selectedOption) {
      newErrors.promotionType = "Thisis required.";
    }
    if (!selectWebsites) {
      newErrors.selectWebsites = "This isrequired.";
    }
    if (!selectUserWebsites) {
      newErrors.selectUserWebsites = "This is required.";
    }

    if (!selectedFile) {
      newErrors.image = "Image is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("promotionsId", selectedOption.value);
    formData.append("adminWebsite", selectWebsites.value);
    formData.append("userWebsite", selectUserWebsites.value);
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      const response = await createPromotionImages(formData);
      if (response.status === 200) {
        setLoading(false);
        setMessage(response.message);
        setSelectedFile(null);
        setSelectedOption(null);
        getPromotionsImages();
        setErrors({});
        setSuccessPopupOpen(true);
      }
    } catch (error) {
      setMessage(error?.message);
      setLoading(false);
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
    dateTime: (
      <div>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(promotion.created_at))}
      </div>
    ),
    promotionType: <div>{promotion.promotionsType}</div>,

    icons: (
      <div className="flex-end">
        <MdBlockFlipped
          style={{ color: promotion.status === 1 ? "green" : "red" }}
          size={18}
          className="mx-3 pointer"
          onClick={() => handleBlockOrUnblock(promotion.id, promotion.status)}
        />
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

  useEffect(() => {
    console.log("filteredPromotions");
  }, [filteredPromotions]);

  const PROMOTIONSIMAGES_DATA = activePromotions?.map((promotionsImage) => ({
    promotionid: <div>{promotionsImage.promotionsId}</div>,
    promotionType: <div>{promotionsImage.promotionsType}</div>,
    Poster: (
      <div className="flex-center">
        <div className="relative poster-img">
          <img
            src={`${imgUrl}/promotionsImages/${promotionsImage.image}`}
            alt="Promotion"
            style={{ width: "200px", height: "150px", cursor: "pointer" }}
            onClick={() => handleFullScreen(promotionsImage.image)}
          />
        </div>
      </div>
    ),
    dateTime: (
      <div>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(promotionsImage.created_at))}
      </div>
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

  const BockOrUnblock = async () => {
    try {
      setLoading(true);
      const response = await statusPromotionsTypes(selectedPromotionId);
      if (response?.status === 200) {
        setMessage(response?.message);
        setLoading(false);
        getPromotions();
        setErrorPopupOpen(false);
        setSuccessPopupOpen(true);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error?.message);
      setErrorPopupOpen(true);
    }
  };

  const DeletePoster = async () => {
    try {
      setLoading(true);
      const response = await deletePromotionsImages(selectedPromotionId);
      if (response?.status === 200) {
        setMessage(response?.message);
        setLoading(false);
        getPromotionsImages();
        setErrorPopupOpen(false);
        setSuccessPopupOpen(true);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setMessage(error?.message);
      setErrorPopupOpen(true);
    }
  };

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Promotion</h6>
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
          <div className="my-3">
            <Table
              columns={PROMOTIONS_COLUMNS}
              data={PROMOTIONS_DATA}
              itemsPerPage={10}
            />
          </div>
        </>
      ) : (
        <>
          <div className="d-flex my-4 small-font align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="col fixed-width-field">
                <label
                  htmlFor="promotionType"
                  className="black-text4 small-font mb-1 d-block"
                >
                  Promotion Type
                </label>
                <Select
                  id="promotionType"
                  className="small-font fixed-select"
                  options={selectOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  classNamePrefix="custom-react-select"
                  value={selectedOption}
                  onChange={handleSelectChange}
                />
                <div
                  className="position-absolute"
                  style={{ minHeight: "20px" }}
                >
                  {errors.promotionType && (
                    <span className="text-danger small-font">
                      {errors.promotionType}
                    </span>
                  )}
                </div>
              </div>

              <div className="col fixed-width-field">
                <label
                  htmlFor="Websites"
                  className="black-text4 small-font mb-1 d-block"
                >
                  Admin Websites
                </label>
                <Select
                  id="Websites"
                  className="small-font fixed-select"
                  options={selectOptionsWebsites}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  classNamePrefix="custom-react-select"
                  value={selectWebsites}
                  onChange={handleSelectWebsites}
                />
                <div
                  className="position-absolute"
                  style={{ minHeight: "20px" }}
                >
                  {errors.selectWebsites && (
                    <span className="text-danger small-font">
                      {errors.selectWebsites}
                    </span>
                  )}
                </div>
              </div>
              <div className="col fixed-width-field">
                <label
                  htmlFor="WebsitesUser"
                  className="black-text4 small-font mb-1 d-block"
                >
                  User Websites
                </label>
                <Select
                  id="Websites"
                  className="small-font fixed-select"
                  options={selectOptionsWebsites}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  classNamePrefix="custom-react-select"
                  value={selectUserWebsites}
                  onChange={handleSelectUserWebsites}
                />
                <div
                  className="position-absolute"
                  style={{ minHeight: "20px" }}
                >
                  {errors.selectUserWebsites && (
                    <span className="text-danger small-font">
                      {errors.selectUserWebsites}
                    </span>
                  )}
                </div>
              </div>

              <div className="col fixed-width-field">
                <label
                  htmlFor="promotionType"
                  className="black-text4 small-font mb-1 d-block"
                >
                  Upload Poster
                </label>
                <label htmlFor="poster" className="d-block">
                  <input
                    type="file"
                    id="poster"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="input-css3 small-font d-flex justify-content-between align-items-center pointer fixed-upload">
                    <span className="file-name">
                      {selectedFile ? selectedFile.name : "Upload"}
                    </span>
                    <MdOutlineFileUpload className="grey-color medium-font upload-icon" />
                  </div>
                </label>
                <div
                  className="position-absolute"
                  style={{ minHeight: "20px" }}
                >
                  {errors.image && (
                    <span className="text-danger small-font">
                      {errors.image}
                    </span>
                  )}
                  {errorMessage && (
                    <span className="text-danger small-font">
                      {errorMessage}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-100 align-self-end">
                <button
                  className="saffron-btn2 pointer small-font"
                  onClick={handlePromotionsImages}
                >
                  {loading ? "Loading..." : "Submit"}
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
        path={"promotionsImages"}
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
        onSubmit={BockOrUnblock}
      />

      <ConfirmationPopup
        confirmationPopupOpen={posterDeleteModal}
        setConfirmationPopupOpen={() => setPosterDeleteModal(false)}
        discription={"are you sure you want to delete this Poster"}
        selectedId={selectedPromotionId}
        submitButton={"Delete"}
        onSubmit={DeletePoster}
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
