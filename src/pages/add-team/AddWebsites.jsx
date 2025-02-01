import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { MdBlockFlipped } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import AddWebsitesPopup from "./popups/AddWebsitesPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import SuccessPopup from "../popups/SuccessPopup";
import { getAllCountires, getWebsitesList, blockAndUnblock } from "../../api/apiMethods";
import ErrorPopup from "../popups/ErrorPopup";

const AddWibsites = () => {
  const role = localStorage.getItem("role_code");
  const [onAddwebsitePopup, setOnAddwebsitePopup] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [error, setError] = useState("")
  const [websites, setWebsite] = useState([])
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
  useEffect(() => {
    getCountries()
  }, []);
  useEffect(() => {
    if (filterName === "") {
      getAllWebsiteList();
    }
  }, [filterName])
  const handlePageChange = (page) => {
    console.log(page, "current page")
    setCurrentPage(page);
    getAllWebsiteList();
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
    { header: "Website Name", field: "websiteName", width: "25%" },
    { header: "Location", field: "location", width: "20%" },
    { header: "URL", field: "url", width: "20%" },
  ];

  const directorswebsitedata = [
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped
            size={18}
            className="pointer"
            onClick={() => setConfirmationPopupOpen(true)}
          />
        </div>
      ),
    },
    {
      type: "White Label",
      websiteName: "T Casino Park",
      location: "Delhi, India",
      url: "www.tcasinopark.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped
            size={18}
            className="pointer"
            onClick={() => setConfirmationPopupOpen(true)}
          />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "Spark Book",
      location: "Hyderabad, India",
      url: "www.sparkbook.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "White Label",
      websiteName: "Fun77",
      location: "Kolkata, India",
      url: "www.fun77.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "Diamond Exchange",
      location: "Kochi, India",
      url: "www.diamondexchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer red-font" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer font-red" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer red-font" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
  ];
  const getWebsitesCallback = () => {
    getAllWebsiteList()
  }

  const handleFiltration = async (e) => {
    if (e.key === "Enter") {
      setError(null);
      try {
        const limit = itemsPerPage;
        const offset = currentOffset;
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
              setError("Data Not Found");
              setWebsite(response.data);
            }
          })
          .catch((error) => {
            setError(error?.message || "API request failed");
            setWebsite([]);
          });
      } catch (error) {
        console.error("Try-Catch Error:", error);
      }
    }

  };
  const handleBlockAndUnblock = () => {
    blockAndUnblock(websiteId)
      .then((response) => {
        if (response?.status === true) {
          getWebsitesCallback();
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
        getWebsitesCallback={getWebsitesCallback}
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
        CallbackFunction={handleBlockAndUnblock}
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
