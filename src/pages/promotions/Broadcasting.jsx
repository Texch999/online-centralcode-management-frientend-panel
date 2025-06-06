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
  getDirectorAccessWebitesForBanners,
  getWebsitesList,
  statusBroadCasting,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "../popups/ErrorPopup";
import EditBroadcastPopup from "./EditBroadcastPopup";
import { MdBlockFlipped } from "react-icons/md";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { useSearchParams } from "react-router-dom";

const ACTIVE_BTNS = [
  { value: 1, label: "User Broadcasting" },
  { value: 2, label: "Admin Broadcasting" },
];

const Broadcasting = () => {
  const emp_role_id = parseInt(localStorage.getItem("emp_role_id"));
  const [directorAdminPanels, setDirectorAdminPanels] = useState([]);
  const [directorUserPanels, setDirectorUserPanels] = useState([]);
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
  const [error, setError] = useState("");
  const [typeInputValue, setTypeInputValue] = useState("");
  const [websitesInputValue, setWebsitesInputValue] = useState("");
  const [locationsInputValue, setLocationsInputValue] = useState("");
  const [websitesList, setWebsitesList] = useState([]);

  const [selectedBroadcastId, setSelectedBroadcastId] = useState();
  const [selectedBroadcastStatus, setSelectedBroadcastStatus] = useState();
  const [broadcastBlockModal, setBroadcastBlockModal] = useState(false);
  const [selectedIdForEdit, setSelectedIdForEdit] = useState([]);

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

  useEffect(() => {
    localStorage.setItem("activeBtn", JSON.stringify(activeBtn));
    getBroadCastingdata();
  }, [activeBtn]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const currentPage = page || 1;
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const limit = itemsPerPage;
  const offset = (currentPage - 1) * itemsPerPage;
  const [totalRecords, setTotalRecords] = useState("");

  const handleButtonClick = (btn) => {
    setSelectType(null);
    setSelectWebsites(null);
    setSelectLocations(null);
    setTextMessage("");
    setActiveBtn(btn);
    setBroadCastingdata([]);
    localStorage.setItem("activeBtn", JSON.stringify(btn));
  };

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

  // const selectOptionsWebsites = websitesList?.map((item) => ({
  //   value: item.id,
  //   label: item.web_name,
  // }));

  const selectOptionsLocations = [{ value: 1, label: "Home" }];

  const handleSelectType = (selected) => {
    setSelectType(selected);
    setErrors((pre) => ({ ...pre, selectType: "" }));
  };

  const handleSelectWebsites = (selected) => {
    setSelectWebsites(selected);
    setErrors((prev) => ({ ...prev, selectWebsites: "" }));
  };

  const handleSelectLocations = (selected) => {
    setSelectLocations(selected);
    setErrors((pre) => ({ ...pre, selectLocations }));
  };

  // const handleMessageChange = (event) => {
  //   setTextMessage(event.target.value);
  //   setErrors((pre) => ({ ...pre, textMessage: "" }));
  // };
  const handleMessageChange = (e) => {
    const value = e.target.value;

    // Remove special characters while typing
    const sanitizedValue = value.replace(/[^a-zA-Z0-9.,()/\-' ?’]/g, "");

    // Show error if the length is less than 2 characters
    if (sanitizedValue.length > 0 && sanitizedValue.length < 2) {
      setError("Message must be at least 2 characters long.");
    } else {
      setError(""); // Clear error if valid
    }

    setTextMessage(sanitizedValue); // Update input field
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getBroadCastingdata();
    if (emp_role_id === 1) {
      getDirectorWebsites();
    } else {
      getWebsites();
    }
  }, [emp_role_id]);

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
      } else {
        console.log("Invalid response structure:", response);
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

  const getBroadCastingdata = async () => {
    const id = activeBtn.value;
    try {
      const response = await getBroadCasting({ id, limit, offset });
      if ((response.status = 200)) {
        setBroadCastingdata(response.broadcasting);
        setTotalRecords(response.totalRecords);
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
      // setSelectType(null);
      // setSelectWebsites(null);
      // setSelectLocations(null);
      // setTextMessage("");
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
      // setLoading(true);
      const response = await statusBroadCasting(selectedBroadcastId);
      if (response?.status === 200) {
        setMessage(
          `Banner ${
            response?.newStatus === 1 ? "Un Blocked" : "Blocked"
          } Successfully`
        );
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
    type: (
      <div>
        {selectOptionsType.find(
          (option) => Number(option.value) === Number(broadCast.type)
        )?.label || "Unknown"}
      </div>
    ),
    website: <div>{broadCast.website_id}</div>,
    website: (
      <div>
        {websitesList
          .find((site) => site.id.slice(3, -3) === String(broadCast.website_id))
          ?.web_name?.replace(/^./, (char) => char.toUpperCase()) || "Unknown"}
      </div>
    ),
    broadcastingLocation: (
      <div>
        {selectOptionsLocations.find(
          (location) =>
            Number(location.value) === Number(broadCast.location_type)
        )?.label || "Unknown"}
      </div>
    ),
    broadcastingMessage: <div>{broadCast.message}</div>,

    icons: (
      <div className="flex-center">
        <SlPencil
          size={18}
          className="pointer me-1"
          style={
            broadCast.status !== 1 ? { pointerEvents: "none", color: "gray" } : {}
          }
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

  const handlePageChange = ({ limit, offset }) => {
    getBroadCastingdata(limit, offset);
  };

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
            onClick={() => handleButtonClick(item)}
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
            // onChange={handleSelectType}
            onChange={setSelectType}
            isSearchable={false} // Disable typing
          />
          {errors.selectType && (
            <span className="text-danger small-font">{errors.selectType}</span>
          )}
        </div>

        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Websites</label>
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
            isSearchable={false} // Disable typing
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
            className="all-none input-css2 small-font rounded"
            rows="1"
            style={{
              resize: "none",
              overflowY: "auto",
              minHeight: "30px",
              maxHeight: "75px",
            }}
            value={textMessage}
            onChange={handleMessageChange}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 96) + "px";
            }}
          ></textarea>

          {error && <span className="text-danger small-font">{error}</span>}
        </div>

        <div className="col-2 mt-4">
          <div
            className="saffron-btn2 small-font pointer ms-2 w-100"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Submit"}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Table
          columns={CASINO_COLUMNS}
          data={CASINO_DATA}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
        />
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
        discription={`Are you sure you want to ${
          selectedBroadcastStatus === 1 ? "Block" : "UnBlock"
        } this Broadcast?`}
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
