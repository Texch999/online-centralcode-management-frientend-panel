import React, { useEffect, useState } from "react";
import Table from "../../../../components/Table";
import { IoMdAdd } from "react-icons/io";
import { SlPencil } from "react-icons/sl";
import AddNewSportsProvider from "./AddNewSportsProvider";
import SportsNewVendor from "./SportsNewVendor";
import { getAllVendors } from "../../../../api/apiMethods";
import { useSelector } from "react-redux";
import { CircleLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

const SportsVendorRegistration = () => {
  const location = useLocation();
  const buttons = ["Vendor List", "Register New Vendor"];
  const [activeBtn, setActiveBtn] = useState(0);
  const [addNewProvider, setAddNewProvider] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isEditVendor, setISEditVendor] = useState(false);
  const [vendorsData, setVendorsData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const allCountries = useSelector((item) => item?.allCountries);
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    setIsActiveBtn(false);
  }, [location.pathname]);

  const showEditModal = (id) => {
    setISEditVendor(true);
    setVendorId(id);
  };
  const addNewProviderModal = () => {
    setIsActiveBtn(!isActiveBtn);
    setAddNewProvider(!addNewProvider);
  };
  const handleClick = (index) => {
    setActiveBtn(index);
  };

  const getCountryName = (id) => {
    const country = allCountries.find((c) => c.id === id);
    return country ? country.name : "Unknown";
  };

  const cols = [
    { header: "S No", field: "sno", width: "10%" },
    { header: "Vendor Name", field: "vendor", width: "15%" },
    { header: "Vendor Percentage/Monthly", field: "vendorper", width: "10%" },
    { header: "Vendor Country", field: "country", width: "15%" },
    { header: "Sports", field: "providers", width: "20%" },
    { header: "Profit & Loss", field: "pl", width: "20%" },
    {
      header: <div className="flex-end">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = vendorsData?.map((item, index) => ({
    sno: <div>{index + 1}</div>,
    vendor: <div>{item?.vendorName}</div>,
    vendorper: (
      <div>
        {item?.amountType === 2 ? `${item?.percentage}%` : item?.monthlyAmount}
      </div>
    ),
    country: <div>{getCountryName(item?.vendorCountry)}</div>,
    providers: (
      <div className="flex-column">
        {item?.vendorMarkets?.map((provider) => (
          <div className="mb-3">{provider?.sportName}</div>
        ))}
      </div>
    ),
    pl: (
      <div className="flex-column">
        {item?.vendorMarkets?.map((provider) => (
          <div className="mb-3">{provider?.pl || 0}</div>
        ))}
      </div>
    ),
    action: (
      <div className="flex-end">
        <SlPencil
          size={15}
          className="pointer me-2 orange-clr"
          onClick={() => showEditModal(item?.id)}
        />
      </div>
    ),
  }));

  //get all vendors
  const fetchAllVendors = () => {
    setLoading(true);
    getAllVendors()
      .then((response) => {
        if (response) {
          setLoading(false);
          setVendorsData(response?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };
  useEffect(() => {
    fetchAllVendors();
  }, []);

  return (
    <div>
      <h6 className="black-text my-3">Register Vendor</h6>
      <div className="d-flex flex-between small-font">
        <div className="d-flex">
          {buttons.map((btn, index) => (
            <div
              key={index}
              className={`px-3 py-1 me-3 white-box pointer ${
                activeBtn === index ? "active-saffron-btn " : ""
              }`}
              onClick={() => {
                handleClick(index);
                setIsActiveBtn(null);
              }}
            >
              {btn}
            </div>
          ))}
        </div>
        <div
          className={`flex-center white-bg grey-border px-3 py-1 rounded-pill pointer black-text2 ${
            isActiveBtn === true ? "saffron-btn" : ""
          }`}
          onClick={() => {
            addNewProviderModal();
          }}
        >
          <IoMdAdd size={18} />
          <span className="ps-2 small-font">Add New Provider</span>
        </div>
      </div>

      <div className="mt-3">
        {activeBtn === 0 && (
          <div>
            {isEditVendor ? (
              <div>
                <SportsNewVendor
                  isEdit={isEditVendor}
                  setIsEdit={setISEditVendor}
                  vendorId={vendorId}
                  fetch={fetchAllVendors}
                />
              </div>
            ) : (
              <>
                {loading ? (
                  <div className="d-flex flex-column flex-center mt-10rem align-items-center">
                    <CircleLoader color="#3498db" size={40} />
                    <div className="medium-font black-font my-3">
                      Just a moment...............⏳
                    </div>
                  </div>
                ) : (
                  <Table columns={cols} data={data} itemsPerPage={4} />
                )}
              </>
            )}
          </div>
        )}
        {activeBtn === 1 && <SportsNewVendor fetch={fetchAllVendors} />}
      </div>
      <AddNewSportsProvider
        show={addNewProvider}
        setShow={setAddNewProvider}
        setIsActiveBtn={setIsActiveBtn}
        fetch={fetchAllVendors}
      />
    </div>
  );
};

export default SportsVendorRegistration;
