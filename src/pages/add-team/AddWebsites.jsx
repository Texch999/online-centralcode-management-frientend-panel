import React, { useState, useEffect, useRef } from "react";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { MdBlockFlipped } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import AddWebsitesPopup from "./popups/AddWebsitesPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import SuccessPopup from "../popups/SuccessPopup";
import { getAllCountires, getWebsitesList, blockAndUnblock, getDirectorAccessWebites } from "../../api/apiMethods";
import ErrorPopup from "../popups/ErrorPopup";

const AddWibsites = () => {
  const role = localStorage.getItem("role_code");
  const userId = localStorage.getItem("user_id");
  const [onAddwebsitePopup, setOnAddwebsitePopup] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [error, setError] = useState("")
  const [websites, setWebsite] = useState([])
  const [directorSites, setDirectorSites] = useState([])
  const [countries, setCountries] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [websiteId, setWebsiteId] = useState(null);
  const [status, setStatus] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false)
  const [errorPopupOpen, setErrorPopupOpen] = useState(false)
  const [displayMsg, setDisplayeMsg] = useState("")
  const itemsPerPage = 9;
  const currentOffset = (currentPage - 1) * 11
  const getAllWebsiteList = () => {
    const limit = itemsPerPage
    const offset = currentOffset
    getWebsitesList({
      limit: 11,
      offset,
      web_name: filterName,
    })
      .then((response) => {
        if (response?.status) {
          // const data = [...response.data].reverse();
          setWebsite(response.data);
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
  const getAllDirectorWebsiteList = () => {
    const offset = currentOffset
    getDirectorAccessWebites({
      limit: 11,
      offset,
      adminWebName: filterName,
    })
      .then((response) => {
        if (response?.status) {
          setDirectorSites(response.data);
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
  const getCountries = () => {
    getAllCountires()
      .then((response) => {
        if (response?.status === true) {
          setCountries(response.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "API request failed");
      });
  }
  const isInitialRender = useRef(true);

  useEffect(() => {
    if ((isInitialRender.current) && (filterName === "")) {
      isInitialRender.current = false; 
      if (role === "management") {
        getAllWebsiteList();
      } else {
        getAllDirectorWebsiteList();
      }
    }
  }, [filterName, role]);

  // useEffect(() => {
  //   if (filterName === "") {
  //     if (role === "management") {
  //       getAllWebsiteList();
  //     } else {
  //       getAllDirectorWebsiteList()
  //     }
  //   }
  // }, [filterName,role])
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    { header: "Type", field: "type", width: "15%" },
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
    const country = countries.find((country) => country.id === locationId);
    return country?.name.charAt(0).toUpperCase() + country?.name.slice(1)
  };
  const data = websites.map((website) => ({
    type: website?.deploy_type === 1 ? "Comapny" : "White Lable",
    websiteName: website?.web_name,
    location: <div>{`${website.city.charAt(0).toUpperCase() + website.city.slice(1)}, ${getLocationName(website?.location_id)}`} </div>,
    url: website.web_url.toLowerCase(),
    action: (
      <div className="flex-end gap-4">
        {website.status === 1 ?
          <div>
            <SlPencil
              size={18}
              className={`pointer`}
              onClick={() => {
                setOnAddwebsitePopup(true)
                setEditMode(true)
                setWebsiteId(website?.id)
              }}
            />
          </div>
          : null}

        <MdBlockFlipped
          size={18}
          className={`pointer ${website.status === 1 ? "green-clr" : "dark-orange-clr"}`}
          onClick={() => {
            setConfirmationPopupOpen(true)
            setWebsiteId(website?.id)
            setStatus(website?.status)
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

  const directorswebsitedata = directorSites.map((adminPanel) => ({
    type: adminPanel.admin_deploy_type === 1 ? "Company" : "White Label",
    admin: adminPanel.admin_web_name,
    websiteName: adminPanel.users.map(user => (
      <div key={user.website_access_id}>{user.user_web_name}</div>
    )),
    location: adminPanel.users.map(user => (
      <div key={user.website_access_id}>{user.user_web_city}</div>
    )),

    url: adminPanel.users.map(user => (
      <div key={user.website_access_id}>
        {user.user_web_url}
      </div>
    )),
    // action: (
    //   <div className="d-flex gap-3">
    //     <SlPencil size={18} className="pointer" />
    //     <MdBlockFlipped
    //       size={18}
    //       className="pointer"
    //       onClick={() => setConfirmationPopupOpen(true)}
    //     />
    //   </div>
    // ),
  }));

  const handleFiltration = async (e) => {
    if (e.key === "Enter") {
      if (role === "management") {
        setError(null);
        getAllWebsiteList()
      } else {
        getAllDirectorWebsiteList()
      }
    }
  };
  const handleBlockAndUnblock = () => {
    blockAndUnblock(websiteId)
      .then((response) => {
        if (response?.status === true) {
          getAllWebsiteList()
          setOpenSuccessPopup(true)
          setDisplayeMsg(response.message)
          setTimeout(() => {
            setError(response?.message);
            setConfirmationPopupOpen(false);
            setOpenSuccessPopup(false)
          }, 2000);

        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "API request failed");
        setErrorPopupOpen(true)
        setDisplayeMsg(error?.message)
        setTimeout(() => {
          setErrorPopupOpen(false)
        }, 2000);

      });
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
              placeholder="Search..."
              onChange={(e) =>
                setFilterName(e.target.value.trim())}
              onKeyDown={handleFiltration}
            />
          </div>

          {role === "management" ? (
            <button
              className="rounded-pill input-pill blue-font small-font px-2"
              onClick={
                () => {
                  getCountries();
                  setOnAddwebsitePopup(true)
                }}
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
          <Table data={data} columns={columns} itemsPerPage={9} />
        </div>
      ) : (
        <div className="mt-2">
          <Table
            data={directorswebsitedata}
            columns={directorswebsitecolumns}
            itemsPerPage={9}
          />
        </div>
      )}
      {
        role === "management" ? (
          <div className="mt-2">
            <Table data={data} columns={columns} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
          </div>
        ) : (
          <div className="mt-2">
            <Table
              data={directorswebsitedata}
              columns={directorswebsitecolumns}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )
      }

      <AddWebsitesPopup
        show={onAddwebsitePopup}
        onHide={() => setOnAddwebsitePopup(false)}
        countries={countries}
        getWebsitesCallback={getAllWebsiteList}
        editMode={editMode}
        websiteId={websiteId}
        setEditMode={setEditMode}
      />

      <ConfirmationPopup
        confirmationPopupOpen={confirmationPopupOpen}
        setConfirmationPopupOpen={setConfirmationPopupOpen}
        discription="Are you sure you want to block this website?"
        submitButton={status === 1 ? "Block" : "Unblock"}
        websiteId={websiteId}
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
    </div >
  );
};

export default AddWibsites;
