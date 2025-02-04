import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
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
  getWebsitesList,
} from "../../api/apiMethods";
import { imgUrl } from "../../api/baseUrl";

const ACTIVE_BTNS = [
  { value: 1, label: "User" },
  { value: 2, label: "Admin" },
];
const SHEDULE_BTNS = [
  { value: 1, label: "Live" },
  { value: 2, label: "Schedule" },
];

const SandCBanner = () => {
  const [activeBtn, setActiveBtn] = useState(ACTIVE_BTNS[0]);
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

  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    selectType: "",
    selectWebsites: "",
    selectedPage: "",
    selectedPlace: "",
  });

  const selectOptionsType = [
    { value: 1, label: "Sports" },
    { value: 2, label: "Casino" },
  ];
  const selectPages = [
    { value: "home", label: "Home" },
    { value: "discription", label: "Description" },
    { value: "wallet", label: "Wallet" },
    { value: "login", label: "Login" },
  ];
  const selectPlace = [
    { value: "top", label: "Top" },
    { value: "center", label: "Center" },
    { value: "botton", label: "Bottonm" },
    { value: "right", label: "Right" },
    { value: "left", label: "Left" },
  ];

  const selectOptionsWebsites = websitesList?.map((item) => ({
    value: item.id,
    label: item.web_name,
  }));

  const handleSelectType = (selected) => {
    setSelectType(selected);
    setErrors((pre) => ({ ...pre, selectType }));
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

  useEffect(() => {
    getBanners();
    getWebsites();
  }, []);

  const getBanners = async () => {
    try {
      const response = await getBanner();
      if (response.status === 200) {
        setBanners(response.banners);
      }
    } catch (error) {
      setMessage(error.setMessage);
    }
  };

  const getWebsites = async () => {
    try {
      const response = await getWebsitesList();
      console.log(response, "redlknoshc");
      if ((response.status = 200)) {
        setWebsitesList(response?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const formData = {
    register_id: localStorage.getItem("user_id"),
    userfor: activeBtn.value,
    shedule: scheduleBtn.value,
    type: selectType?.value,
    website_id: Array.isArray(selectWebsites)
      ? selectWebsites.map((site) => String(site.value))
      : String(selectWebsites?.value),
    page: selectedPage?.value,
    place: selectedPlace?.value,
    start:startDT,
    end:endDT
  };
  console.log("form data", formData);

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formData = {
      register_id: localStorage.getItem("user_id"),
      userfor: activeBtn.value,
      shedule: scheduleBtn.value,
      type: selectType?.value,
      website_id: Array.isArray(selectWebsites)
        ? selectWebsites.map((site) => String(site.value))
        : String(selectWebsites?.value),
      page: selectedPage?.value,
      place: selectedPlace?.value,
      start:startDT,
      end:endDT
    };

    console.log("form data", formData);
    try {
      const response = await createBanner();
      if (response.status === 200) {
        setMessage(response.setMessage);
      }
    } catch (error) {
      setMessage(error.setMessage);
    }
  };
  const handleEditBanners = async () => {
    try {
      const response = await editBanner();
      if (response.status === 200) {
        setMessage(response.setMessage);
      }
    } catch (error) {
      setMessage(error.setMessage);
    }
  };
  const handleDeleteBanners = async () => {
    try {
      const response = await deleteBanner();
      if (response.status === 200) {
        setMessage(response.setMessage);
      }
    } catch (error) {
      setMessage(error.setMessage);
    }
  };

  const handleFullScreen = (image) => {
    setFullPosterImage(image);
    setFullPoster(!fullPoster);
  };

  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Type", field: "type", width: "10%" },
    { header: "Website", field: "website", width: "15%" },
    { header: "Poster Page", field: "posterPage", width: "15%" },
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

  const filteredbannerdata = banners?.filter((item) => {
    const activedbutton = activeBtn.value;
    if (activedbutton === 1) {
      return item.userfor === 1;
    } else if (activedbutton === 2) {
      return item.userfor === 2;
    }

    return false;
  });

  useEffect(() => {}, [filteredbannerdata, activeBtn]);

  const CRICKET_DATA = filteredbannerdata?.map((banner) => ({
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
    Poster: (
      <div className="flex-center">
        <div className="relative poster-img">
          {banner.image &&
            (() => {
              const images = JSON.parse(banner.image); // Convert JSON string to array
              return (
                <img
                  src={`${imgUrl}/${images[0]}`} // Access first image
                  alt="Promotion"
                  style={{ width: "200px", height: "150px" }}
                />
              );
            })()}
          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => {
              const images = JSON.parse(banner.image);
              handleFullScreen(images[0]);
            }}
            style={{ marginLeft: "-25px" }}
          />
        </div>
      </div>
    ),
    action: (
      <div className="flex-center">
        <SlPencil
          size={18}
          className="pointer me-1"
          onClick={() => handleEditBanners(banner.id)}
        />
        {/* <MdBlockFlipped
          style={{ color: banner.status === 1 ? "green" : "red" }}
          size={18}
          className="mx-3 pointer"
          // onClick={() =>
          //   handleBlockAndUnblockBroadcasting(banner.id, banner.status)
          // }
        /> */}
        <FaRegTrashCan size={18} className="ms-1" />
      </div>
    ),
  }));

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Sports/Casino Banners</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
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
            onClick={() => setActiveBtn(item)}
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
        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Sports/Casino</label>
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
        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Websites</label>
          <Select
            className="small-font"
            options={selectOptionsWebsites}
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

        <div className="col flex-column me-3">
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
        <div className="col flex-column me-3">
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
        <div className="col flex-column me-3">
          <label className="black-text4 mb-1">Start Date & Time</label>
          <input
            className="input-css2"
            type="datetime-local"
            value={startDT}
            onChange={(e) => setStartDT(e.target.value)}
          />
        </div>

        <div className="col flex-column">
          <label className="black-text4 mb-1">End Date & Time</label>
          <input
            className="input-css2"
            type="datetime-local"
            value={endDT}
            onChange={(e) => setEndDT(e.target.value)}
          />
        </div>
      </div>

      <div className="w-50 d-flex small-font my-3">
        <div className="col-5 flex-column me-3">
          <label className="black-text4 mb-1">Upload Poster</label>
          <label htmlFor="poster">
            <input type="file" style={{ display: "none" }} id="poster" />
            <div className="input-css2 flex-between">
              <span>Select File</span> <MdOutlineFileUpload size={18} />
            </div>
          </label>
        </div>
        {/* <div className="col-3 flex-end me-3">
          <div className="w-100 white-bg pointer yellow-font p-2 rounded dashed-border text-center">
            Upload More
          </div>
        </div> */}
        <div className="col-4 flex-end me-3">
          <button className="w-100 saffron-btn2">Submit</button>
        </div>
      </div>

      <Table columns={CRICKET_COLUMNS} data={CRICKET_DATA} itemsPerPage={2} />
      <FullPosterPopUp
        setFullPoster={setFullPoster}
        fullPoster={fullPoster}
        setFullPosterImage={setFullPosterImage}
        fullPosterImage={fullPosterImage}
      />
    </div>
  );
};

export default SandCBanner;
