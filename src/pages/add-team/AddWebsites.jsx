import React, { useState, useEffect, useRef } from "react";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { MdBlockFlipped } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import AddWebsitesPopup from "./popups/AddWebsitesPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import SuccessPopup from "../popups/SuccessPopup";
import {
  getWebsitesList,
  blockAndUnblock,
  getDirectorAccessWebites,
} from "../../api/apiMethods";
import ErrorPopup from "../popups/ErrorPopup";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AddWibsites = () => {
  const role = localStorage.getItem("role_code");
  const [onAddwebsitePopup, setOnAddwebsitePopup] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [error, setError] = useState("");
  const [websites, setWebsite] = useState([]);
  const [directorSites, setDirectorSites] = useState([]);
  const isInitialRendering = useRef(true)
  const [editMode, setEditMode] = useState(false);
  const [websiteId, setWebsiteId] = useState(null);
  const [status, setStatus] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [displayMsg, setDisplayeMsg] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const itemsPerPage = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const allCountries = useSelector((item) => item?.allCountries);

  const getAllWebsiteList = (limit, offset) => {
    getWebsitesList({
      limit,
      offset,
      web_name: filterName,
    })
      .then((response) => {
        if (response?.status) {
          setWebsite(response.data);
          setTotalRecords(response.totalCount);
        } else {
          setError("Something Went Wrong");
          setWebsite([]);
        }
      })
      .catch((error) => {
        setWebsite([]);
        setError(error?.message || "API request failed");
      });
  };
  const getAllDirectorWebsiteList = (limit, offset) => {
    getDirectorAccessWebites({
      limit,
      offset,
      adminWebName: filterName,
    })
      .then((response) => {
        if (response?.status) {
          setDirectorSites(response.data);
          setTotalRecords(response.totalCount);
        } else {
          setError("Something Went Wrong");
          setDirectorSites([]);
        }
      })
      .catch((error) => {
        setDirectorSites([]);
        setError(error?.message || "API request failed");
      });
  };

  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    // Fetch data based on role and filterName
    if (filterName.trim() === "") {
      if (role === "management") {
        getAllWebsiteList(limit, offset);
      } else {
        getAllDirectorWebsiteList(limit, offset);
      }
    }
  }, [filterName, role, page, itemsPerPage]);

  const handlePageChange = ({ limit, offset }) => {
    if (role === "management") {
      getAllWebsiteList(limit, offset);
    } else {
      getAllDirectorWebsiteList(limit, offset);
    }
  };

  const columns = [
    { header: "Type", field: "type", width: "15%" },
    { header: "Admin Name", field: "admin", width: "25%" },
    { header: "Website Name", field: "websiteName", width: "25%" },
    { header: "Location", field: "location", width: "20%" },
    { header: "URL", field: "url", width: "20%" },
    {
      header: <div className="ps-1 text-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const getLocationName = (locationId) => {
    const country = allCountries.find((country) => country.id === locationId);
    return country?.name.charAt(0).toUpperCase() + country?.name.slice(1);
  };
  const data = websites.map((website) => ({
    type: website?.deploy_type === 1 ? "Company" : "White Lable",
    admin: (
      <div>
        {" "}
        {`${website?.panel_type === 1 ? "Admin" : "User"
          } `}
      </div>
    ),
    websiteName: website?.web_name,
    location: (
      <div>
        {`${website.city.charAt(0).toUpperCase() + website.city.slice(1)
          }, ${getLocationName(website?.location_id)}`}{" "}
      </div>
    ),
    url: website.web_url.replace(/^https?:\/\//i, "").toLowerCase(),
    action: (
      <div className="flex-end gap-4">
        <div>
          <SlPencil
            size={18}
            className={`pointer ${website.status !== 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            style={website.status !== 1 ? { pointerEvents: "none" } : {}}
            onClick={() => {
              if (website.status === 1) {
                setOnAddwebsitePopup(true);
                setEditMode(true);
                setWebsiteId(website?.id);
              }
            }}
          />
        </div>

        <MdBlockFlipped
          size={18}
          className={`pointer ${website.status === 1 ? "green-clr" : "dark-orange-clr"
            }`}
          onClick={() => {
            setConfirmationPopupOpen(true);
            setWebsiteId(website?.id);
            setStatus(website?.status);
          }}
        />
      </div>
    ),
  }));
  const directorswebsitecolumns = [
    { header: "Type", field: "type", width: "15%" },
    { header: "Admin", field: "admin", width: "15%" },
    { header: "Website Name", field: "websiteName", width: "25%" },
    { header: "Location", field: "location", width: "20%" },
    { header: "URL", field: "url", width: "20%" },
    // { header: "Action", field: "action", width: "20%" },
  ];

  const directorswebsitedata = directorSites.flatMap((site) =>
    site.admin_websites.map((adminPanel) => ({
      type: adminPanel.admin_deploy_type === 1 ? "Company" : "White Label",
      admin: <div className="text-capitalize"> {adminPanel.admin_web_name}</div>,
      websiteName: adminPanel.users.map((user) => (
        <div key={user.website_access_id} className="text-capitalize">{user.user_web_name}</div>
      )),
      location: adminPanel.users.map((user) => (
        <div key={user.website_access_id} className="text-capitalize">{user.user_web_city}</div>
      )),
      url: adminPanel.users.map((user) => (
        <div key={user.website_access_id}>{user.user_web_url}</div>
      )),
    }))
  );
  const handleFiltration = async (e) => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    if (e.key === "Enter") {
      if (role === "management") {
        setError(null);
        getAllWebsiteList(limit, offset);
      } else {
        getAllDirectorWebsiteList(limit, offset);
      }
    }
  };
  const handleBlockAndUnblock = () => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    blockAndUnblock(websiteId)
      .then((response) => {
        if (response?.status === true) {
          getAllWebsiteList(limit, offset);
          setOpenSuccessPopup(true);
          setDisplayeMsg(response.message);
          setTimeout(() => {
            setError(response?.message);
            setConfirmationPopupOpen(false);
            setOpenSuccessPopup(false);
          }, 2000);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "API request failed");
        setErrorPopupOpen(true);
        setDisplayeMsg(error?.message);
        setTimeout(() => {
          setErrorPopupOpen(false);
        }, 2000);
      });
  };
  const getWebsitesCallback = () => {

    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    getAllWebsiteList(limit, offset)
  }
  return (
    <div>
      <div className="row justify-content-between align-items-center mb-3 mt-2">
        <h6 className="col-2 yellow-font medium-font mb-0">Websites List</h6>

        <div className="col-6 d-flex justify-content-end gap-3 medium-font">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 w-50">
            <FaSearch size={16} className="grey-clr me-2" />
            <input
              className="small-font all-none"
              placeholder="Enter website name"
              onChange={(e) => setFilterName(e.target.value.trim())}
              onKeyDown={handleFiltration}
            />
          </div>

          {role === "management" ? (
            <button
              className="rounded-pill input-pill blue-font small-font px-2"
              onClick={() => setOnAddwebsitePopup(true)}
            >
              <FaPlus /> Add New Website{" "}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {role === "management" ? (
        <div className="mt-2">
          <Table
            data={data}
            columns={columns}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            totalRecords={totalRecords}
          />
        </div>
      ) : (
        <div className="mt-2">
          <Table
            data={directorswebsitedata}
            columns={directorswebsitecolumns}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            totalRecords={totalRecords}
          />
        </div>
      )}

      <AddWebsitesPopup
        show={onAddwebsitePopup}
        onHide={() => setOnAddwebsitePopup(false)}
        countries={allCountries}
        getWebsitesCallback={getWebsitesCallback}
        editMode={editMode}
        websiteId={websiteId}
        setEditMode={setEditMode}
        setWebsiteId={setWebsiteId}
      />
      <ConfirmationPopup
        confirmationPopupOpen={confirmationPopupOpen}
        setConfirmationPopupOpen={setConfirmationPopupOpen}
        discription={`Are you sure you want to ${status === 1 ? "block" : "unblock"} this website?`}
        submitButton={status === 1 ? "Block" : "Unblock"}
        onSubmit={handleBlockAndUnblock}
      />
      <SuccessPopup
        successPopupOpen={openSuccessPopup}
        setSuccessPopupOpen={setOpenSuccessPopup}
        discription={displayMsg}
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={displayMsg}
      />
    </div>
  );
};

export default AddWibsites;
