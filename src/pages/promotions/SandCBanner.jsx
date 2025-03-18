import React, { useEffect, useRef, useState } from "react";
import { MdBlockFlipped, MdOutlineFileUpload } from "react-icons/md";
import Table from "../../components/Table";
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoBanner, setSelectedVideoBanner] = useState(null);
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [totalRecords, setTotalRecords] = useState("");
  const [selectPosterType, setSelectPosterType] = useState(null);
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

  console.log("selectedImage", selectedImage);
  console.log("selectedVideo", selectedVideo);
  console.log("selectedVideoBanner", selectedVideoBanner);

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
    setSelectPosterType(null);
    setSelectWebsites(null);
    setSelectedPage(null);
    setSelectedPlace(null);
    setStartDT("");
    setEndDT("");
    setSelectedVideo(null);
    setSelectedVideoBanner(null);
    setSelectedImage(null);
  };

  const [errors, setErrors] = useState({
    selectWebsites: "",
    selectPosterType: "",
    selectedPage: "",
    selectedPlace: "",
    selectedImage: "",
    selectedVideo: "",
    selectedVideoBanner: "",
    endDT: "",
    startDT: "",
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

  const posterTypeOptions = Object.entries(
    Enums.selectOptionsPromotionType
  ).map(([key, value]) => ({
    value,
    label: key,
  }));

  const handleSelectPosterType = (selected) => {
    setSelectPosterType(selected);
    setErrors((prev) => ({ ...prev, selectPosterType: "" }));
  };

  const handleSelectPage = (selected) => {
    setSelectedPage(selected);
    setErrors((prev) => ({ ...prev, selectedPage: "" }));
  };
  const handleSelectPlace = (selected) => {
    setSelectedPlace(selected);
    setErrors((prev) => ({ ...prev, selectedPlace: "" }));
  };

  const handleFileChange = (event, type) => {
    console.log("type", type);
    const file = event.target.files[0];
    if (!file) return;

    const maxSizeImage = 2 * 1024 * 1024; // 2MB for images
    const maxSizeVideo = 5 * 1024 * 1024; // 5MB for videos
    const allowedTypes = {
      image: ["image/jpeg", "image/jpeg", "image/png", "image/webp"],
      video: ["video/mp4"],
      video_banner: ["video/mp4"],
    };

    let errorMessage = "";

    if (!allowedTypes[type].includes(file.type)) {
      errorMessage = `Invalid format: ${file.name}`;
    } else if (type === "image" && file.size > maxSizeImage) {
      errorMessage = `Image ${file.name} exceeds 2MB.`;
    } else if (
      (type === "video" || type === "video_banner") &&
      file.size > maxSizeVideo
    ) {
      errorMessage = `Video ${file.name} exceeds 5MB.`;
    }

    if (errorMessage) {
      setErrors((prev) => ({ ...prev, [type]: errorMessage }));
      return;
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[type];
      return newErrors;
    });

    // Set the correct state based on the type
    if (type === "image") {
      setSelectedImage(file);
      setErrors((prev) => ({ ...prev, selectedImage: "" }));
    } else if (type === "video") {
      setSelectedVideo(file);
      setErrors((prev) => ({ ...prev, selectedVideo: "" }));
    } else if (type === "video_banner") {
      setSelectedVideoBanner(file);
      setErrors((prev) => ({ ...prev, selectedVideoBanner: "" }));
    }

    setErrors((prev) => ({ ...prev, [type]: "" }));
  };

  const handleCreateBanner = async () => {
    console.log("clickedddddddddd");

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
    if (!selectPosterType) {
      newErrors.selectPosterType = "Poster Type is required.";
    } else {
      if (selectPosterType.value === 1 && !selectedImage) {
        newErrors.selectedImage = "Image is required.";
      }
      if (selectPosterType.value === 2) {
        if (!selectedVideo) {
          newErrors.selectedVideo = "Video is required.";
        }
        if (!selectedVideoBanner) {
          newErrors.selectedVideoBanner = "Video Banner is required.";
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation Errors:", newErrors);
      setErrors(newErrors);
      return;
    }

    console.log("Validation Passed. Proceeding...");

    const formData = new FormData();
    formData.append("register_id", localStorage.getItem("user_id"));
    formData.append("userfor", activeBtn.value);
    formData.append("schedule", scheduleBtn.value);
    formData.append("poster_type", selectPosterType.value);
    formData.append("page", selectedPage?.value);
    formData.append("place", selectedPlace?.value);

    if (selectPosterType.value === 1) {
      formData.append("image", selectedImage);
    } else if (selectPosterType.value === 2) {
      formData.append("video", selectedVideo);
      formData.append("video_banner", selectedVideoBanner);
    }

    if (startDT) formData.append("start", startDT);
    if (endDT) formData.append("end", endDT);

    if (Array.isArray(selectWebsites)) {
      selectWebsites.forEach((site) =>
        formData.append("website_id[]", site.value)
      );
    } else {
      formData.append("website_id", selectWebsites?.value);
    }

    if (!createBanner) {
      console.error("createBanner function is not defined!");
      return;
    }

    setLoading(true);
    try {
      console.log("tryingggggg");
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
        setSelectedImage(null);
        setSelectedVideo(null);
        setSelectPosterType(null);
        setSelectedVideoBanner(null);
        setSuccessPopupOpen(true);
        getBanners();
      }
    } catch (error) {
      console.error("Error during API call:", error);
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
        setMessage(
          `Banner ${
            response?.newStatus === 1 ? "Un Blocked" : "Blocked"
          } Successfully`
        );
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
      header: <div className="flex-center">Image</div>,
      field: "Poster",
    },
    {
      header: <div className="flex-center">Banner</div>,
      field: "Banner",
    },
    {
      header: <div className="flex-center">Video</div>,
      field: "Video",
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

    schedule: (
      <div>{banner.schedule?.replace(/^./, (char) => char.toUpperCase())}</div>
    ),
    Poster: (
      <div className="flex-center">
        <div className="relative poster-img">
          {banner.image ? (
            <img
              src={`${imgUrl}/banner/${banner.image}`}
              alt="Banner"
              style={{ width: "200px", height: "150px", cursor: "pointer" }}
              onError={(e) => {
                if (!e.target.dataset.retry) {
                  e.target.dataset.retry = "true"; // Mark as retried
                  setTimeout(() => {
                    e.target.src = `${imgUrl}/banner/${banner.image}`; // Retry after 1 sec
                  }, 1000);
                }
              }}
              // onError={(e) => {
              //   if (!e.target.dataset.retry) {
              //     e.target.dataset.retry = "true"; // Mark as retried once
              //     e.target.src = `${imgUrl}/banner/${banner.image}`; // Retry same source
              //   }
              // }}
              onClick={() => handleFullScreen(banner.image)}
            />
          ) : (
            "-"
          )}
        </div>
      </div>
    ),
    Banner: (
      <div className="flex-center">
        <div className="relative poster-img">
          {banner.video_banner ? (
            <video
              src={`${imgUrl}/banner/${banner.video_banner}`}
              style={{ width: "200px", height: "150px", cursor: "pointer" }}
              // controls
              autoPlay
              muted
              onError={(e) => {
                if (!e.target.dataset.retry) {
                  e.target.dataset.retry = "true"; // Mark as retried
                  setTimeout(() => {
                    e.target.src = `${imgUrl}/banner/${banner.video_banner}`; // Retry after 1 sec
                  }, 1000);
                }
              }}
              // onError={(e) => {
              //   if (!e.target.dataset.retry) {
              //     e.target.dataset.retry = "true"; // Mark as retried once
              //     e.target.src = `${imgUrl}/banner/${banner.video_banner}`; // Retry same source
              //   }
              // }}
              onClick={() => handleFullScreen(banner.video_banner)}
            />
          ) : (
            "-"
          )}
        </div>
      </div>
    ),
    Video: (
      <div className="flex-center">
        <div className="relative poster-img">
          {banner.video ? (
            <video
              src={`${imgUrl}/banner/${banner.video}`}
              style={{ width: "200px", height: "150px", cursor: "pointer" }}
              autoPlay
              muted
              onError={(e) => {
                if (!e.target.dataset.retry) {
                  e.target.dataset.retry = "true"; // Mark as retried
                  setTimeout(() => {
                    e.target.src = `${imgUrl}/banner/${banner.video}`; // Retry after 1 sec
                  }, 1000);
                }
              }}
              // onError={(e) => {
              //   if (!e.target.dataset.retry) {
              //     e.target.dataset.retry = "true"; // Mark as retried once
              //     e.target.src = `${imgUrl}/banner/${banner.video}`; // Retry same source
              //   }
              // }}
              onClick={() => handleFullScreen(banner.video)}
            />
          ) : (
            "-"
          )}
        </div>
      </div>
    ),
    
    
    start: (
      <div>
        {banner.start
          ? new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date(banner.start))
          : "-"}
      </div>
    ),
    end: (
      <div>
        {banner.end
          ? new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date(banner.end))
          : "-"}
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
          style={
            banner.status !== 1 ? { pointerEvents: "none", color: "gray" } : {}
          }
          onClick={() => handleEditBanners(banner?.id)}
        />

        <FaRegTrashCan
          size={18}
          className="mx-3 pointer"
          style={
            banner.status !== 1 ? { pointerEvents: "none", color: "gray" } : {}
          }
          onClick={() => handleDeleteBannerConfirm(banner.id)}
        />
      </div>
    ),
  }));

  const handlePageChange = ({ limit, offset }) => {
    getBanners(limit, offset);
  };


  const [minDateTime, setMinDateTime] = useState(getMinDateTime());

  function getMinDateTime() {
    const now = new Date();
    now.setSeconds(0, 0); // Remove seconds and milliseconds
    return now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:MM"
  }

  // Update minDateTime dynamically every second to prevent past selection
  useEffect(() => {
    const interval = setInterval(() => {
      setMinDateTime(getMinDateTime());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const now = new Date();
    now.setSeconds(0, 0); // Remove seconds/milliseconds

    if (selectedDate < now) {
      setErrors((prev) => ({
        ...prev,
        startDT: "Start date & time cannot be in the past.",
      }));
      setStartDT("");
      setEndDT(""); // Clear end date if invalid start date
    } else {
      setStartDT(e.target.value);
      setErrors((prev) => ({
        ...prev,
        startDT: "",
        endDT: "End date is required.",
      }));
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = new Date(e.target.value);
    const selectedStartDate = new Date(startDT);

    if (!startDT) {
      setErrors((prev) => ({
        ...prev,
        endDT: "Please select a start date first.",
      }));
      setEndDT("");
      return;
    }

    if (selectedEndDate <= selectedStartDate) {
      setErrors((prev) => ({
        ...prev,
        endDT: "End date must be after start date.",
      }));
      setEndDT("");
    } else {
      setEndDT(e.target.value);
      setErrors((prev) => ({ ...prev, endDT: "" })); // Clear error when valid
    }
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
        <div className="col flex-column me-2 fixed-width-field1">
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

        <div className="col flex-column me-2 fixed-width-field1">
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
        <div className="col flex-column me-2 fixed-width-field1">
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
        <div className="col flex-column me-3 fixed-width-field1 me-2">
          <label className="black-text4 mb-1">Start Date & Time</label>
          <input
            className="input-css2"
            type="datetime-local"
            value={startDT}
            onChange={handleStartDateChange}
            // min={getMinDateTime()} // Restrict past times
            min={minDateTime}
            onKeyDown={(e) => e.preventDefault()} // Prevent manual typing
          />
          {errors.startDT && (
            <span className="text-danger small-font">{errors.startDT}</span>
          )}
        </div>

        <div className="col flex-column fixed-width-field1 me-2">
          <label className="black-text4 mb-1">End Date & Time</label>
          <input
            className="input-css2"
            type="datetime-local"
            value={endDT}
            onChange={handleEndDateChange}
            disabled={!startDT} // Disable if start date is not set
            min={startDT || minDateTime} // Ensure end date is after start date
            onKeyDown={(e) => e.preventDefault()} // Prevent manual typing
          />
          {errors.endDT && (
            <span className="text-danger small-font">{errors.endDT}</span>
          )}
        </div>

        <div className="col flex-column me-3 fixed-width-field1 me-2">
          <label className="black-text4 mb-1">Banner/Poster Type</label>
          <Select
            className="small-font"
            options={posterTypeOptions || []}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={selectPosterType}
            onChange={handleSelectPosterType}
            isSearchable={false} // Disable typing
          />
          {errors.selectPosterType && (
            <span className="text-danger small-font">
              {errors.selectPosterType}
            </span>
          )}
        </div>
      </div>

      <div className="d-flex small-font mt-3 fixed-width-field1 mb-5 gap-2">
        {selectPosterType?.value === 1 ? (
          <div className="col-md-3 col-lg-5 fixed-width-field1">
            <label
              htmlFor="posterImage"
              className="black-text4 small-font mb-1 d-block"
            >
              Upload Poster Image
            </label>

            <label htmlFor="posterImage" className="d-block">
              <input
                type="file"
                id="posterImage"
                accept="*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "image")}
              />

              <div className="input-css3 small-font d-flex justify-content-between align-items-center pointer fixed-upload">
                <span className="file-name">
                  {selectedImage
                    ? selectedImage.name.length > 10
                      ? selectedImage.name.substring(0, 10) + "..."
                      : selectedImage.name
                    : "Select Image"}
                </span>
                <MdOutlineFileUpload size={18} />
              </div>
            </label>

            {errors.selectedImage && (
              <div
                className="position-absolute w-100"
                style={{ minHeight: "20px" }}
              >
                <span className="text-danger small-font">
                  {errors.selectedImage}
                </span>
              </div>
            )}
          </div>
        ) : null}

        {selectPosterType?.value === 2 ? (
          <div className="col-md-3 col-lg-5 fixed-width-field1">
            <label
              htmlFor="posterVideoBanner"
              className="black-text4 small-font mb-1 d-block"
            >
              Upload Poster Video Banner
            </label>

            <label htmlFor="posterVideoBanner" className="d-block">
              <input
                type="file"
                id="posterVideoBanner"
                accept="*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "video_banner")}
              />

              <div className="input-css3 small-font d-flex justify-content-between align-items-center pointer fixed-upload">
                <span className="file-name">
                  {selectedVideoBanner
                    ? selectedVideoBanner.name.length > 10
                      ? selectedVideoBanner.name.substring(0, 10) + "..."
                      : selectedVideoBanner.name
                    : "Select Video Banner"}
                </span>
                <MdOutlineFileUpload size={18} />
              </div>
            </label>

            {errors.selectedVideoBanner && (
              <div
                className="position-absolute w-100"
                style={{ minHeight: "20px" }}
              >
                <span className="text-danger small-font">
                  {errors.selectedVideoBanner}
                </span>
              </div>
            )}
          </div>
        ) : null}

        {selectPosterType?.value === 2 ? (
          <div className="col-md-3 col-lg-5 fixed-width-field1">
            <label
              htmlFor="posterVideo"
              className="black-text4 small-font mb-1 d-block"
            >
              Upload Poster Video
            </label>

            <label htmlFor="posterVideo" className="d-block">
              <input
                type="file"
                id="posterVideo"
                accept="*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "video")}
              />

              <div className="input-css3 small-font d-flex justify-content-between align-items-center pointer fixed-upload">
                <span className="file-name">
                  {selectedVideo
                    ? selectedVideo.name.length > 10
                      ? selectedVideo.name.substring(0, 10) + "..."
                      : selectedVideo.name
                    : "Select Video"}
                </span>
                <MdOutlineFileUpload size={18} />
              </div>
            </label>

            {errors.selectedVideo && (
              <div
                className="position-absolute w-100"
                style={{ minHeight: "20px" }}
              >
                <span className="text-danger small-font">
                  {errors.selectedVideo}
                </span>
              </div>
            )}
          </div>
        ) : null}

        <div className="w-100 align-self-end">
          <button
            className="saffron-btn2 pointer small-font px-2"
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
