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
  getBannerByUserId,
  getDirectorAccessWebitesForBanners,
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
  const hasFetched = useRef(false);
  const emp_role_id = parseInt(localStorage.getItem("emp_role_id"));
  const [directorAdminPanels, setDirectorAdminPanels] = useState([]);
  const [directorUserPanels, setDirectorUserPanels] = useState([]);
  const [scheduleBtn, setScheduleBtn] = useState(SHEDULE_BTNS[0]);
  const [selectWebsites, setSelectWebsites] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [startDT, setStartDT] = useState("");
  const [endDT, setEndDT] = useState("");
  const [banners, setBanners] = useState([]);
  const [websitesList, setWebsitesList] = useState([]);
  const [fullPoster, setFullPoster] = useState(false);
  const [fullPosterImage, setFullPosterImage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [totalRecords, setTotalRecords] = useState("");
  const [selectPages, setSelectPages] = useState(null);
  const [selectPlace, setSelectPlace] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [selectedBannerStatus, setSelectedBannerStatus] = useState(null);
  const [sportsInput, setSportsInput] = useState("");
  const [websiteInput, setWebsiteInput] = useState("");
  const [pageInput, setPageInput] = useState("");
  const [placeInput, setPlaceInput] = useState("");
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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const limit = itemsPerPage;
  const offset = (currentPage - 1) * itemsPerPage;

  const handleButtonClick = (btn) => {
    if (activeBtn.value === btn.value) return;
    setActiveBtn(btn);
    localStorage.setItem("activeBtn", JSON.stringify(btn));
    setBanners([]);
    setTotalRecords("");
    setSelectWebsites(null);
    setSelectedPage(null);
    setSelectedPlace(null);
    setStartDT("");
    setEndDT("");
    setSelectedFiles([]);
  };

  const [errors, setErrors] = useState({
    selectWebsites: "",
    selectedPage: "",
    selectedPlace: "",
    selectedFiles: "",
    endDT: "",
  });

  const handleWebsitesType = (activeBtn) => {
    const panelType = activeBtn.value === 1 ? 2 : 1;

    if (emp_role_id === 1) {
      return panelType === 1
        ? selectOptionsWebsitesDirectors
        : selectOptionsUserWebsitesDirectors;
    } else {
      return websitesList
        ?.filter((item) => item.panel_type === panelType)
        .map((item) => ({
          value: item.id,
          label: item.web_name,
        }));
    }
  };

  const getDirectorWebsites = async () => {
    try {
      const response = await getDirectorAccessWebitesForBanners();

      if (response.status === true) {
        const directorData = response.data;
        if (!Array.isArray(directorData) || directorData.length === 0) {
          return;
        }
        const adminPanels = directorData.flatMap(
          (director) => director.admin_websites || []
        );

        const userPanels = adminPanels.flatMap((admin) => admin.users || []);

        if (adminPanels.length > 0) setDirectorAdminPanels(adminPanels);
        if (userPanels.length > 0) setDirectorUserPanels(userPanels);
      }
    } catch (error) {
      console.log("Error fetching director websites:", error);
    }
  };

  const selectOptionsWebsitesDirectors = directorAdminPanels?.map((item) => ({
    value: item.admin_WebSite_id,
    label: item.admin_web_name,
  }));

  const selectOptionsUserWebsitesDirectors = directorUserPanels?.map(
    (item) => ({
      value: item.user_WebSite_id,
      label: item.user_web_name,
    })
  );
  const pageMappings = {
    brahma: Enums.brahmaSelectPages,
    diamond: Enums.diamondSelectPages,
    sparkbook: Enums.sparkbookSelectPages,
    "9exchange": Enums.nineExchangeSelectPages,
    texchange: Enums.texchangeSelectPages,
  };
  const placeMappings = {
    brahma: Enums.brahmaSelectPlace,
    diamond: Enums.diamondSelectPlace,
    sparkbook: Enums.sparkbookSelectPlace,
    "9exchange": Enums.nineExchangeSelectPlace,
    texchange: Enums.texchangeSelectPlace,
  };

  const handleSelectWebsites = (selected) => {
    console.log("selected", selected);
    setSelectWebsites(selected);
    setErrors((prev) => ({ ...prev, selectWebsites: "" }));
    const selectedWebsitelabel = selected?.label;

    const selectedPages = pageMappings[selectedWebsitelabel] || {};
    const selectedPlace = placeMappings[selectedWebsitelabel] || {};

    const updatedSelectPages = Object.entries(selectedPages).map(
      ([key, value]) => ({
        value,
        label: key,
      })
    );
    const updatedSelectPlace = Object.entries(selectedPlace).map(
      ([key, value]) => ({
        value,
        label: key,
      })
    );

    setSelectPages(updatedSelectPages);
    setSelectPlace(updatedSelectPlace);
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
    const maxSizeImage = 2 * 1024 * 1024; // 2MB for images
    const maxSizeVideo = 5 * 1024 * 1024; // 5MB for videos
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4"];

    let validImages = [];
    let validVideos = [];
    let errorMessages = [];

    files.forEach((file) => {
      console.log(
        `File: ${file.name}, Size: ${(file.size / 1024 / 1024).toFixed(
          2
        )} MB, Type: ${file.type}`
      );

      if (!allowedTypes.includes(file.type)) {
        errorMessages.push(`Invalid format: ${file.name}`);
      } else if (file.type.startsWith("image/") && file.size > maxSizeImage) {
        errorMessages.push(`Image ${file.name} exceeds 2MB.`);
      } else if (file.type === "video/mp4" && file.size > maxSizeVideo) {
        errorMessages.push(`Video ${file.name} exceeds 5MB.`);
      } else {
        if (file.type.startsWith("image/")) {
          validImages.push(file);
        } else if (file.type === "video/mp4") {
          validVideos.push(file);
        }
      }
    });

    // Enforce max limits: 5 images, 2 videos
    if (validImages.length > 5) {
      errorMessages.push("You can only upload up to 5 images.");
      validImages = validImages.slice(0, 5);
    }

    if (validVideos.length > 2) {
      errorMessages.push("You can only upload up to 2 videos.");
      validVideos = validVideos.slice(0, 2);
    }

    if (errorMessages.length > 0) {
      setErrors((prev) => ({
        ...prev,
        selectedFiles: errorMessages.join(" "),
      }));
      return;
    }

    setSelectedFiles([...validImages, ...validVideos]);
    setErrors((prev) => ({ ...prev, selectedFiles: "" }));
  };

  const handleCreateBanner = async () => {
    let newErrors = {};

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
        setSelectWebsites(null);
        setSelectedPage(null);
        setSelectedPlace(null);
        setStartDT("");
        setEndDT("");
        setLoading(false);
        setSelectedFiles([]);
        setSuccessPopupOpen(true);
        getBanners();
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
      setSuccessPopupOpen(false);
      setErrorPopupOpen(true);
    }
  };

  useEffect(() => {
    getBanners();
  }, [activeBtn]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getBanners();
    if (emp_role_id === 1) {
      getDirectorWebsites();
    } else {
      getWebsites();
    }
  }, [emp_role_id]);

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
      // setLoading(true);
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
      // setLoading(true);
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

  const websitelistdetailed = websitesList?.map((item) => ({
    value: item.id,
    label: item.web_name,
  }));

  const directorsWebsites = [
    ...(Array.isArray(selectOptionsWebsitesDirectors)
      ? selectOptionsWebsitesDirectors
      : []),
    ...(Array.isArray(selectOptionsUserWebsitesDirectors)
      ? selectOptionsUserWebsitesDirectors
      : []),
  ];
  let weblist;
  if (emp_role_id === 1) {
    weblist = directorsWebsites;
  } else {
    weblist = websitelistdetailed;
  }

  const selectOptionsWebsites = weblist
    ?.map((item) => ({
      value:
        typeof item?.value === "string"
          ? Number(item.value.slice(3, -3))
          : null,
      label: item?.label || "Unknown",
    }))
    .filter((item) => item.value !== null);
  console.log(selectOptionsWebsites);

  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Website", field: "website", width: "15%" },
    { header: "Banner/Poster Page", field: "posterPage", width: "15%" },
    { header: "Banner/Poster Location", field: "posterLocation", width: "15%" },
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

    website: (
      <div>
        {selectOptionsWebsites
          .find((site) => String(site.value) === String(banner.website_id))
          ?.label?.replace(/^./, (char) => char.toUpperCase()) || "Unknown"}
      </div>
    ),

    posterPage: (
      <div>
        {(() => {
          const websiteLabel = selectOptionsWebsites.find(
            (site) => String(site.value) === String(banner.website_id)
          )?.label;

          const selectedPageMapping = pageMappings[websiteLabel?.toLowerCase()];

          if (selectedPageMapping) {
            return (
              Object.keys(selectedPageMapping).find(
                (key) => selectedPageMapping[key] === Number(banner?.page)
              ) || "Unknown"
            );
          }

          return "Unknown";
        })()}
      </div>
    ),
    posterLocation: (
      <div>
        {(() => {
          const websiteLabel = selectOptionsWebsites.find(
            (site) => String(site.value) === String(banner.website_id)
          )?.label;

          const selectedPlaceMapping =
            placeMappings[websiteLabel?.toLowerCase()];

          if (selectedPlaceMapping) {
            return (
              Object.keys(selectedPlaceMapping).find(
                (key) => selectedPlaceMapping[key] === Number(banner?.place)
              ) || "Unknown"
            );
          }

          return "Unknown";
        })()}
      </div>
    ),
    // posterLocation: (
    //   <div>
    //     {/* {selectPlace.find(
    //       (place) => Number(place.value) === Number(banner.place)
    //     )?.label || "Unknown"} */}
    //     {selectPlace?.length > 0
    //       ? selectPlace.find(
    //           (page) => Number(page.value) === Number(banner?.page)
    //         )?.label || "Unknown"
    //       : "No pages available"}
    //   </div>
    // ),

    schedule: (
      <div>{banner.schedule?.replace(/^./, (char) => char.toUpperCase())}</div>
    ),
    Poster: (
      <div className="flex-center">
        <div className="relative poster-img">
          {banner.image &&
            (() => {
              const images = JSON.parse(banner.image);
              const firstMedia = images[0];
              const isVideo =
                firstMedia.endsWith(".mp4") ||
                firstMedia.endsWith(".mov") ||
                firstMedia.endsWith(".avi") ||
                firstMedia.endsWith(".mkv") ||
                firstMedia.endsWith(".webm");

              return isVideo ? (
                <video
                  src={`${imgUrl}/banner/${firstMedia}`}
                  style={{ width: "200px", height: "150px", cursor: "pointer" }}
                  controls
                  onClick={() => handleFullScreen(images)}
                />
              ) : (
                <img
                  src={`${imgUrl}/banner/${firstMedia}`}
                  alt="Banner"
                  style={{ width: "200px", height: "150px", cursor: "pointer" }}
                  onClick={() => handleFullScreen(images)}
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
          onClick={() => handleEditBanners(banner?.id)}
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
            isSearchable={false} // Disable typing
          />
          {errors.selectWebsites && (
            <span className="text-danger small-font">
              {errors.selectWebsites}
            </span>
          )}
        </div>

        <div className="col flex-column me-3 fixed-width-field1">
          <label className="black-text4 mb-1">Banner/Poster Page</label>
          <Select
            className="small-font"
            options={selectPages || []}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={selectedPage}
            onChange={handleSelectPage}
            isSearchable={false} // Disable typing
          />
          {errors.selectedPage && (
            <span className="text-danger small-font">
              {errors.selectedPage}
            </span>
          )}
        </div>
        <div className="col flex-column me-3 fixed-width-field1">
          <label className="black-text4 mb-1">Banner/Poster Location</label>
          <Select
            className="small-font"
            options={selectPlace || []}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={selectedPlace}
            onChange={handleSelectPlace}
            isSearchable={false} // Disable typing
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
              accept="*"
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
        selectOptionsWebsitesDirectors={selectOptionsWebsitesDirectors}
        selectOptionsUserWebsitesDirectors={selectOptionsUserWebsitesDirectors}
        websitesList={websitesList}
        emp_role_id={emp_role_id}
        onSubmit={getBanners}
        onSubmitResult={handleEditResult}
      />
    </div>
  );
};

export default SandCBanner;
