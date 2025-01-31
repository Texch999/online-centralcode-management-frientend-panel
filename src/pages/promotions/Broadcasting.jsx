import React, { useEffect, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import Table from "../../components/Table";
import { FaRegTrashCan } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import { createBroadCasting, getBroadCasting } from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "../popups/ErrorPopup";

const ACTIVE_BTNS = [
  { value: "1", label: "User Broadcasting" },
  { value: "2", label: "Admin Broadcasting" },
];

const Broadcasting = () => {
  const [activeBtn, setActiveBtn] = useState(ACTIVE_BTNS[0]);
  const [selectType, setSelectType] = useState(null);
  const [selectWebsites, setSelectWebsites] = useState(null);
  const [selectLocations, setSelectLocations] = useState(null);
  const [textMessage, setTextMessage] = useState("");
  const [broadCastingdata, setBroadCastingdata] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  const selectOptionsType = [
    { value: "1", label: "Sports" },
    { value: "2", label: "Casino" },
  ];

  const selectOptionsWebsites = [
    { value: "1", label: "WEBSITE 1" },
    { value: "2", label: "WEBSITE 2" },
  ];

  const selectOptionsLocations = [{ value: "1", label: "Home" }];

  const handleSelectType = (selected) => {
    setSelectType(selected);
  };

  const handleSelectWebsites = (selected) => {
    setSelectWebsites(selected);
  };

  const handleSelectLocations = (selected) => {
    setSelectLocations(selected);
  };

  const handleMessageChange = (event) => {
    setTextMessage(event.target.value);
  };

  useEffect(() => {
    getBroadCastingdata();
  }, []);

  const getBroadCastingdata = async () => {
    try {
      const response = await getBroadCasting();
      if ((response.status = "200")) {
        setBroadCastingdata(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const formData = {
    panel_type: activeBtn.value,
    type: selectType?.value,
    website_id: selectWebsites?.value,
    location_type: selectLocations?.value,
    message: textMessage,
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createBroadCasting(formData);
      if (response.status = "200") {
        setLoading(false);
        setMessage(response.message);
        setErrorPopupOpen(false);
        setSelectType(null);
        setSelectWebsites(null);
        setSelectLocations(null);
        setTextMessage(null);
        getBroadCastingdata();
        setSuccessPopupOpen(true);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setSelectType(null);
      setSelectWebsites(null);
      setSelectLocations(null);
      setTextMessage(null);
    }
  };

  const CASINO_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Type", field: "type", width: "10%" },
    { header: "Website", field: "website", width: "15%" },
    {
      header: "Broadcasting Location",
      field: "broadcastingLocation",
      width: "15%",
    },
    {
      header: "Broadcasting Message",
      field: "broadcastingMessage",
      width: "40%",
    },
    { header: "", field: "icons", width: "10%" },
  ];
  const CASINO_DATA = broadCastingdata?.map((broadCast) => ({
    dateTime: (
      <div>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(broadCast.created_date))}
      </div>
    ),
    type: <div>{broadCast.type}</div>,
    website: <div>{broadCast.website_id}</div>,
    broadcastingLocation: <div>{broadCast.location_type}</div>,
    broadcastingMessage: <div>{broadCast.message}</div>,

    icons: (
      <div className="flex-center">
        <SlPencil size={18} className="pointer me-1" />
        <FaRegTrashCan size={18} className="ms-1" />
      </div>
    ),
  }));

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Broadcasting</h6>
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

      <div className="d-flex w-60  mt-3">
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
        </div>

        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">
            Broadcasting Location
          </label>
          <Select
            className="small-font"
            options={selectOptionsLocations}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={selectLocations}
            onChange={handleSelectLocations}
          />
        </div>

        <div className="col-6 flex-column">
          <label className="black-text4 mb-1 small-font">
            Type Broadcasting Message
          </label>
          <textarea
            placeholder="Enter"
            className="all-none input-css2 small-font p-2 rounded"
            rows="4"
            style={{ resize: "none" }}
            value={textMessage}
            onChange={handleMessageChange}
          ></textarea>
        </div>

        <div className="col-2 flex-end">
          <div
            className="saffron-btn2 small-font pointer ms-2 w-100"
            onClick={handleSubmit}
          >
            {loading ? <FaSpinner className="spinner-circle" /> : "Submit"}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Table columns={CASINO_COLUMNS} data={CASINO_DATA} itemsPerPage={3} />
      </div>
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

export default Broadcasting;
