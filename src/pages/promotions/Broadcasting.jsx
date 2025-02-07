import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import Table from "../../components/Table";
import { FaRegTrashCan } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import {
  createBroadCasting,
  getBroadCasting,
  getWebsitesList,
  statusBroadCasting,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "../popups/ErrorPopup";
import EditBroadcastPopup from "./EditBroadcastPopup";
import { MdBlockFlipped } from "react-icons/md";
import ConfirmationPopup from "../popups/ConfirmationPopup";

const ACTIVE_BTNS = [
  { value: 1, label: "User Broadcasting" },
  { value: 2, label: "Admin Broadcasting" },
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
  const [editBroadcast, setEditBroadcast] = useState(false);

  const [websitesList, setWebsitesList] = useState([]);

  const [selectedBroadcastId, setSelectedBroadcastId] = useState();
  const [selectedBroadcastStatus, setSelectedBroadcastStatus] = useState();
  const [broadcastBlockModal, setBroadcastBlockModal] = useState(false);
  const [selectedIdForEdit, setSelectedIdForEdit] = useState([]);

  const hasFetched = useRef(false);

  const [errors, setErrors] = useState({
    selectType: "",
    selectWebsites: "",
    selectLocations: "",
    textMessage: "",
  });

  const selectOptionsType = [
    { value: 1, label: "Sports" },
    { value: 2, label: "Casino" },
  ];

  const selectOptionsWebsites = websitesList?.map((item) => ({
    value: item.id,
    label: item.web_name,
  }));

  const selectOptionsLocations = [{ value: 1, label: "Home" }];

  const handleSelectType = (selected) => {
    setSelectType(selected);
    setErrors((pre) => ({ ...pre, selectType }));
  };

  const handleSelectWebsites = (selected) => {
    console.log("Selected Website:", selected);
    setSelectWebsites(selected);
    setErrors((prev) => ({ ...prev, selectWebsites: "" }));
  };

  const handleSelectLocations = (selected) => {
    setSelectLocations(selected);
    setErrors((pre) => ({ ...pre, selectLocations }));
  };

  const handleMessageChange = (event) => {
    setTextMessage(event.target.value);
    setErrors((pre) => ({ ...pre, textMessage: "" }));
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getWebsites();
    getBroadCastingdata();
  }, []);

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
  const getBroadCastingdata = async () => {
    try {
      const response = await getBroadCasting();
      console.log(response, "redlknoshc");
      if ((response.status = 200)) {
        setBroadCastingdata(response.retData.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async () => {
    let newErrors = {};

    if (!selectType) {
      newErrors.selectType = "Type is required.";
    }

    if (!selectWebsites) {
      newErrors.selectWebsites = "Website is required.";
    }
    if (!selectLocations) {
      newErrors.selectLocations = "Locations is required.";
    }
    if (!textMessage) {
      newErrors.textMessage = "Text is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formData = {
      panel_type: activeBtn.value,
      type: selectType?.value,
      website_id: Array.isArray(selectWebsites)
        ? selectWebsites.map((site) => String(site.value)) // Convert to string if needed
        : String(selectWebsites?.value), // Ensure it's a string
      location_type: selectLocations?.value,
      message: textMessage,
    };

    setLoading(true);
    try {
      const response = await createBroadCasting(formData);
      if ((response.status = 200)) {
        setLoading(false);
        setMessage(response.message);
        setErrorPopupOpen(false);
        setSelectType(null);
        setSelectWebsites(null);
        setSelectLocations(null);
        setTextMessage("");
        getBroadCastingdata();
        setErrorPopupOpen(false);
        setSuccessPopupOpen(true);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error?.message);
      setSelectType(null);
      setSelectWebsites(null);
      setSelectLocations(null);
      setTextMessage("");
      setSuccessPopupOpen(false);
      setErrorPopupOpen(true);
    }
  };

  const handleEditBroadcasting = (id) => {
    setSelectedIdForEdit(broadCastingdata.find((item) => item.id === id));
    if (selectedIdForEdit) {
      setEditBroadcast(true);
    }
  };

  const handleBlockAndUnblockBroadcasting = (id, status) => {
    setSelectedBroadcastId(id);
    setSelectedBroadcastStatus(status);
    setBroadcastBlockModal(true);
  };

  const BockOrUnblock = async () => {
    try {
      setLoading(true);
      const response = await statusBroadCasting(selectedBroadcastId);
      if (response?.status === 200) {
        setMessage(response?.message);
        setLoading(false);
        getBroadCastingdata();
        setErrorPopupOpen(false);
        setSuccessPopupOpen(true);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error?.message);
      setErrorPopupOpen(true);
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

  const filteredbroadCastingdata = broadCastingdata?.filter((item) => {
    const activedbutton = activeBtn.value;
    if (activedbutton === 1) {
      return item.panel_type === 1;
    } else if (activedbutton === 2) {
      return item.panel_type === 2;
    }

    return false;
  });

  useEffect(() => {}, [filteredbroadCastingdata, activeBtn]);

  const CASINO_DATA = filteredbroadCastingdata?.map((broadCast) => ({
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
        <SlPencil
          size={18}
          className="pointer me-1"
          onClick={() => handleEditBroadcasting(broadCast.id)}
        />
        <MdBlockFlipped
          style={{ color: broadCast.status === 1 ? "green" : "red" }}
          size={18}
          className="mx-3 pointer"
          onClick={() =>
            handleBlockAndUnblockBroadcasting(broadCast.id, broadCast.status)
          }
        />
      </div>
    ),
  }));

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Broadcasting</h6>
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
          {errors.selectLocations && (
            <span className="text-danger small-font">
              {errors.selectLocations}
            </span>
          )}
        </div>

        <div className="col-6 flex-column">
          <label className="black-text4 mb-1 small-font">
            Type Broadcasting Message
          </label>
          <textarea
            placeholder="Enter"
            className="all-none input-css2 small-font p-2 rounded"
            rows="1"
            style={{ resize: "none" }}
            value={textMessage}
            onChange={handleMessageChange}
          ></textarea>
          {errors.textMessage && (
            <span className="text-danger small-font">{errors.textMessage}</span>
          )}
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
      <ConfirmationPopup
        confirmationPopupOpen={broadcastBlockModal}
        setConfirmationPopupOpen={() => setBroadcastBlockModal(false)}
        discription={`are you sure you want to ${
          selectedBroadcastStatus === 1 ? "Block" : "UnBlock"
        } this Braodcast`}
        selectedId={selectedBroadcastId}
        submitButton={selectedBroadcastStatus === 1 ? "Block" : "UnBlock"}
        onSubmit={BockOrUnblock}
      />
      <EditBroadcastPopup
        editBroadcast={editBroadcast}
        setEditBroadcast={setEditBroadcast}
        editBroadcastModel={"Edit Broadcast"}
        selectedIdForEdit={selectedIdForEdit}
        setSelectedIdForEdit={setSelectedIdForEdit}
        websitesList={websitesList}
        setMessage={setMessage}
        onSubmit={getBroadCastingdata}
        onSubmitResult={handleEditResult}
      />
    </div>
  );
};

export default Broadcasting;
