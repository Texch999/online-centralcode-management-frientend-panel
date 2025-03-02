import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { MdBlockFlipped, MdOutlineFileUpload } from "react-icons/md";
import Table from "../../components/Table";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import FullPosterPopUp from "./FullPosterPopUp";
import { SlPencil } from "react-icons/sl";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import {
  createBanner,
  deleteBanner,
  editBanner,
  getBanner,
  getBannerByUserId,
  getWebsitesList,
  statusUpdateBanner,
} from "../../api/apiMethods";
import { imgUrl } from "../../api/baseUrl";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "../popups/ErrorPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import EditBannerPopup from "./EditBannerPopup";
import { useSearchParams } from "react-router-dom";
import Enums from "./Enum";

const ACTIVE_BTNS = [
  { value: 1, label: "User" },
  { value: 2, label: "Admin" },
];
const SHEDULE_BTNS = [
  { value: "live", label: "Live" },
  { value: "schedule", label: "Schedule" },
];

const SandCBanner = () => {
  // const [activeBtn, setActiveBtn] = useState(ACTIVE_BTNS[0]);
  const [scheduleBtn, setScheduleBtn] = useState(SHEDULE_BTNS[0]);
  const [selectType, setSelectType] = useState(null);
  const [selectWebsites, setSelectWebsites] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [startDT, setStartDT] = useState("");
  const [endDT, setEndDT] = useState("");

  const [banners, setBanners] = useState([]);
  const [websitesList, setWebsitesList] = useState([]);
  const [fullPoster, setFullPoster] = useState(false);
  const [fullPosterImage, setFullPosterImage] = useState(false);
  const [editPoster, setEditPoster] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");

  const [totalRecords, setTotalRecords] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);

  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [selectedBannerStatus, setSelectedBannerStatus] = useState(null);
  const [bannerBlockModal, setBannerBlockModal] = useState(false);

  const [editBanner, setEditBanner] = useState(false);
  const [bannerDeleteModal, setBannerDeleteModal] = useState(false);
  const [activeBtn, setActiveBtn] = useState(() => {
    const storedBtn = localStorage.getItem("activeBtn");
    if (storedBtn) {
      try {
        const parsedBtn = JSON.parse(storedBtn);
        return (
          ACTIVE_BTNS.find((btn) => btn.value === parsedBtn.value) ||
          ACTIVE_BTNS[0]
        );
      } catch (error) {
        console.error("Error parsing stored activeBtn:", error);
        return ACTIVE_BTNS[0];
      }
    }
    return ACTIVE_BTNS[0];
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const currentPage = page || 1;
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const limit = itemsPerPage;
  const offset = (currentPage - 1) * itemsPerPage;

  const handleButtonClick = (btn) => {
    setSelectType(null);
    setSelectWebsites(null);
    setSelectedPage(null);
    setSelectedPlace(null);
    setStartDT("");
    setEndDT("");
    setSelectedFiles([]);
    setActiveBtn(btn);
    localStorage.setItem("activeBtn", JSON.stringify(btn));
  };

  useEffect(() => {
    localStorage.setItem("activeBtn", JSON.stringify(activeBtn));
    getBanners();
    setBanners([]);
    setTotalRecords("");
  }, [activeBtn]);

  const [errors, setErrors] = useState({
    selectType: "",
    selectWebsites: "",
    selectedPage: "",
    selectedPlace: "",
    selectedFiles: "",
    endDT: "",
  });

  const hasFetched = useRef(false);

  const selectOptionsType = Object.entries(Enums.selectOptionsType).map(
    ([key, value]) => ({
      value,
      label: key,
    })
  );
  const selectPages = Object.entries(Enums.diamondSelectPages).map(
    ([key, value]) => ({
      value,
      label: key,
    })
  );
  const selectPlace = Object.entries(Enums.diamondSelectPlace).map(
    ([key, value]) => ({
      value,
      label: key,
    })
  );

  console.log("selectPlace", selectPlace);

  const handleWebsitesType = (activeBtn) => {
    const panelType = activeBtn.value === 1 ? 2 : 1;
    return websitesList
      ?.filter((item) => item.panel_type === panelType) // Filter by panel_type
      .map((item) => ({
        value: item.id,
        label: item.web_name,
      }));
  };

  console.log(websitesList);

  const handleSelectType = (selected) => {
    setSelectType(selected);
    setErrors((pre) => ({ ...pre, selectType: "" }));
  };

  const handleSelectWebsites = (selected) => {
    setSelectWebsites(selected);
    setErrors((prev) => ({ ...prev, selectWebsites: "" }));
  };
  const handleSelectPage = (selected) => {
    setSelectedPage(selected);
    setErrors((prev) => ({ ...prev, selectedPage: "" }));
  };
  const handleSelectPlace = (selected) => {
    setSelectedPlace(selected);
    setErrors((prev) => ({ ...prev, selectedPlace: "" }));
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 2 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    let validFiles = [];
    let errorMessages = [];

    if (files.length > 5) {
      setErrors((prev) => ({
        ...prev,
        selectedFiles: "You can only upload up to 5 images.",
      }));
      return;
    }

    files.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        errorMessages.push("Only JPG, PNG, GIF, and WEBP images are allowed.");
      } else if (file.size > maxSize) {
        errorMessages.push("Each file should not exceed 2MB.");
      } else {
        validFiles.push(file);
      }
    });

    if (errorMessages.length > 0) {
      setErrors((prev) => ({
        ...prev,
        selectedFiles: errorMessages.join(" "),
      }));
      return;
    }

    setSelectedFiles(validFiles);
    setErrors((prev) => ({ ...prev, selectedFiles: "" }));
  };

  const handleCreateBanner = async () => {
    let newErrors = {};

    if (!selectType) {
      newErrors.selectType = "Type is required.";
    }
    if (!selectWebsites) {
      newErrors.selectWebsites = "Website is required.";
    }
    if (!selectedPage) {
      newErrors.selectedPage = "Page is required.";
    }
    if (!selectedPlace) {
      newErrors.selectedPlace = "Place is required.";
    }
    if (selectedFiles.length === 0) {
      newErrors.selectedFiles = "At least one image is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("register_id", localStorage.getItem("user_id"));
    formData.append("userfor", activeBtn.value);
    formData.append("schedule", scheduleBtn.value);
    formData.append("type", selectType?.value);
    formData.append("page", selectedPage?.value);
    formData.append("place", selectedPlace?.value);

    // Only append `start` and `end` if they have values
    if (startDT) {
      formData.append("start", startDT);
    }
    if (endDT) {
      formData.append("end", endDT);
    }

    if (Array.isArray(selectWebsites)) {
      selectWebsites.forEach((site) =>
        formData.append("website_id[]", site.value)
      );
    } else {
      formData.append("website_id", selectWebsites?.value);
    }

    selectedFiles.forEach((file) => {
      formData.append("image", file);
    });

    setLoading(true);
    try {
      const response = await createBanner(formData);
      if (response.status === 200) {
        setMessage(response.message);
        setErrorPopupOpen(false);
        setSelectType(null);
        setSelectWebsites(null);
        setSelectedPage(null);
        setSelectedPlace(null);
        setStartDT("");
        setEndDT("");
        setLoading(false);
        setSelectedFiles([]);
        getBanners();
        setSuccessPopupOpen(true);
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
      setSuccessPopupOpen(false);
      setErrorPopupOpen(true);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getBanners();
    getWebsites();
  }, []);

  const getBanners = async () => {
    const id = activeBtn.value;
    try {
      const response = await getBannerByUserId({ id, limit, offset });
      if (response.status === 200) {
        setBanners(response.banner);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      setMessage(error.setMessage);
    }
  };

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

  const handleEditBanners = (id) => {
    setSelectedBannerId(banners.find((item) => item.id === id));
    if (selectedBannerId) {
      setEditBanner(true);
    }
  };

  const handleEditResult = (result) => {
    if (result === "success") {
      setErrorPopupOpen(false);
      setSuccessPopupOpen(true);
    } else {
      setSuccessPopupOpen(false);
      setErrorPopupOpen(true);
    }
  };

  const handleDeleteBanners = async () => {
    try {
      setLoading(true);
      const response = await deleteBanner(selectedBannerId);
      if (response?.status === 200) {
        setMessage(response?.message);
        setLoading(false);
        getBanners();
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

  const handleDeleteBannerConfirm = (id) => {
    setSelectedBannerId(id);
    setBannerDeleteModal(true);
  };

  const handleFullScreen = (image) => {
    setFullPosterImage(image);
    setFullPoster(!fullPoster);
  };

  const handleEndDateChange = (e) => {
    const selectedEndDT = e.target.value;

    if (selectedEndDT < startDT) {
      setErrors((prev) => ({
        ...prev,
        endDT: "End date cannot be before the start date.",
      }));
      setEndDT("");
    } else {
      setEndDT(selectedEndDT);
      setErrors((prev) => ({ ...prev, endDT: "" }));
    }
  };

  const handleBlockOrUnblock = (id, status) => {
    setSelectedBannerId(id);
    setSelectedBannerStatus(status);
    setBannerBlockModal(true);
  };

  const BockOrUnblock = async () => {
    try {
      setLoading(true);
      const response = await statusUpdateBanner(selectedBannerId);
      if (response?.status === 200) {
        setMessage(response?.message);
        setLoading(false);
        getBanners();
        setErrorPopupOpen(false);
        setSuccessPopupOpen(true);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error?.message);
      setErrorPopupOpen(true);
    }
  };

  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Type", field: "type", width: "10%" },
    { header: "Website", field: "website", width: "15%" },
    { header: "Poster Page", field: "posterPage", width: "15%" },
    { header: "Poster Location", field: "posterLocation", width: "15%" },
    { header: "Schedule", field: "schedule", width: "15%" },
    {
      header: <div className="flex-center">Poster</div>,
      field: "Poster",
    },

    { header: "Start", field: "start", width: "10%" },

    { header: "End", field: "end", width: "10%" },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const CRICKET_DATA = banners?.map((banner) => ({
    dateTime: (
      <div>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(banner.created_at))}
      </div>
    ),
    type: <div>{banner.type}</div>,
    website: <div>{banner.website_id}</div>,
    posterPage: <div>{banner.page}</div>,
    posterLocation: <div>{banner.place}</div>,
    schedule: <div>{banner.schedule}</div>,
    Poster: (
      <div className="flex-center">
        <div className="relative poster-img">
          {banner.image &&
            (() => {
              const images = JSON.parse(banner.image);
              return (
                <img
                  src={`${imgUrl}/banner/${images[0]}`}
                  alt="Banner"
                  style={{ width: "200px", height: "150px", cursor: "pointer" }}
                  onClick={() => {
                    const images = JSON.parse(banner.image);
                    handleFullScreen(images);
                  }}
                />
              );
            })()}
        </div>
      </div>
    ),
    start: (
      <div>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(banner.start))}
      </div>
    ),
    end: (
      <div>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(banner.end))}
      </div>
    ),
    action: (
      <div className="flex-center">
        <MdBlockFlipped
          style={{ color: banner.status === 1 ? "green" : "red" }}
          size={18}
          className="mx-3 pointer"
          onClick={() => handleBlockOrUnblock(banner.id, banner.status)}
        />
        <SlPencil
          size={18}
          className="mx-3 pointer"
          onClick={() => handleEditBanners(banner.id)}
        />

        <FaRegTrashCan
          size={18}
          className="mx-3 pointer"
          onClick={() => handleDeleteBannerConfirm(banner.id)}
        />
      </div>
    ),
  }));

  const handlePageChange = ({ limit, offset }) => {
    getBanners(limit, offset);
  };

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Sports/Casino Banners</h6>
      </div>
      <div className="d-flex col small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn?.value === item.value
                ? "saffron-btn2"
                : "white-btn2 pointer"
            }`}
            onClick={() => handleButtonClick(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="d-flex col my-3 small-font">
        {SHEDULE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              scheduleBtn?.value === item.value
                ? "saffron-btn2"
                : "white-btn2 pointer"
            }`}
            onClick={() => setScheduleBtn(item)}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="w-100 d-flex small-font">
        <div className="col flex-column me-3 fixed-width-field1">
          <label className="black-text4 mb-1">Sports/Casino</label>
          <Select
            className="small-font"
            options={selectOptionsType}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={selectType}
            onChange={handleSelectType}
          />
          {errors.selectType && (
            <span className="text-danger small-font">{errors.selectType}</span>
          )}
        </div>
        <div className="col flex-column me-3 fixed-width-field1">
          <label className="black-text4 mb-1">Websites</label>
          <Select
            className="small-font"
            options={handleWebsitesType(activeBtn)}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={selectWebsites}
            onChange={handleSelectWebsites}
          />
          {errors.selectWebsites && (
            <span className="text-danger small-font">
              {errors.selectWebsites}
            </span>
          )}
        </div>

        <div className="col flex-column me-3 fixed-width-field1">
          <label className="black-text4 mb-1">Poster Page</label>
          <Select
            className="small-font"
            options={selectPages}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={selectedPage}
            onChange={handleSelectPage}
          />
          {errors.selectedPage && (
            <span className="text-danger small-font">
              {errors.selectedPage}
            </span>
          )}
        </div>
        <div className="col flex-column me-3 fixed-width-field1">
          <label className="black-text4 mb-1">Poster Location</label>
          <Select
            className="small-font"
            options={selectPlace}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={selectedPlace}
            onChange={handleSelectPlace}
          />
          {errors.selectedPlace && (
            <span className="text-danger small-font">
              {errors.selectedPlace}
            </span>
          )}
        </div>
        <div className="col flex-column me-3 fixed-width-field1">
          <label className="black-text4 mb-1">Start Date & Time</label>
          <input
            className="input-css2"
            type="datetime-local"
            value={startDT}
            onChange={(e) => setStartDT(e.target.value)}
          />
        </div>

        <div className="col flex-column fixed-width-field1">
          <label className="black-text4 mb-1">End Date & Time</label>
          <input
            className="input-css2"
            type="datetime-local"
            value={endDT}
            onChange={handleEndDateChange}
            disabled={!startDT}
            min={startDT || ""}
          />
          {errors.endDT && (
            <span className="text-danger small-font">{errors.endDT}</span>
          )}
        </div>
      </div>

      <div className="d-flex small-font mt-3 mb-5 gap-3">
        <div className="col-md-3 col-lg-5  fixed-width-field1">
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
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <div className="input-css3 small-font d-flex justify-content-between align-items-center pointer fixed-upload">
              <span className="file-name">
                {selectedFiles.length === 0 ? (
                  "Select Files (Max: 5)"
                ) : selectedFiles.length === 1 ? (
                  selectedFiles[0].name.length > 10 ? (
                    selectedFiles[0].name.substring(0, 10) + "..."
                  ) : (
                    selectedFiles[0].name
                  )
                ) : (
                  <>
                    {selectedFiles[0].name.length > 10
                      ? selectedFiles[0].name.substring(0, 10) + "..."
                      : selectedFiles[0].name}{" "}
                    +{selectedFiles.length - 1} more
                  </>
                )}
              </span>
              <MdOutlineFileUpload size={18} />
            </div>
          </label>

          {errors?.selectedFiles && (
            <div
              className="position-absolute w-100"
              style={{ minHeight: "20px" }}
            >
              <span className="text-danger small-font">
                {errors.selectedFiles}
              </span>
            </div>
          )}
        </div>

        <div className="w-100 align-self-end">
          <button
            className="saffron-btn2 pointer small-font"
            onClick={() => handleCreateBanner()}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>

      <Table
        columns={CRICKET_COLUMNS}
        data={CRICKET_DATA}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        totalRecords={totalRecords}
      />
      <FullPosterPopUp
        setFullPoster={setFullPoster}
        fullPoster={fullPoster}
        setFullPosterImage={setFullPosterImage}
        fullPosterImage={fullPosterImage}
        path={"banner"}
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
      <ConfirmationPopup
        confirmationPopupOpen={bannerBlockModal}
        setConfirmationPopupOpen={() => setBannerBlockModal(false)}
        discription={`Are you sure you want to ${
          selectedBannerStatus === 1 ? "Block" : "UnBlock"
        } this Banner?`}
        selectedId={selectedBannerId}
        submitButton={selectedBannerStatus === 1 ? "Block" : "UnBlock"}
        onSubmit={BockOrUnblock}
      />
      <ConfirmationPopup
        confirmationPopupOpen={bannerDeleteModal}
        setConfirmationPopupOpen={() => setBannerDeleteModal(false)}
        discription={"Are you sure you want to delete this Banner?"}
        selectedId={selectedBannerId}
        submitButton={"Delete"}
        onSubmit={handleDeleteBanners}
      />
      <EditBannerPopup
        editBanner={editBanner}
        setEditBanner={setEditBanner}
        editBannerModel={"Edit Banner"}
        selectedBannerId={selectedBannerId}
        setSelectedBannerId={setSelectedBannerId}
        setMessage={setMessage}
        websitesList={websitesList}
        onSubmit={getBanners}
        onSubmitResult={handleEditResult}
      />
    </div>
  );
};

export default SandCBanner;
