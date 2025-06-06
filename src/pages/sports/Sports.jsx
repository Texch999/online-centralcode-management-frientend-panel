import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { BsEye } from "react-icons/bs";
import { getAllVendors } from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { CircleLoader } from "react-spinners";

const Sports = () => {
  const navigate = useNavigate();

  const handleSportNextPage = (vendor, provider, vId, mId) => {
    navigate(`/central-sports/${vendor}/${provider}`, {
      state: { vId, mId },
    });
  };
  const [isActive, setIsACtive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [vendorsData, setVendorsData] = useState([]);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };
  const allCountries = useSelector((item) => item?.allCountries);

  const getCountryName = (id) => {
    const country = allCountries.find((c) => c.id === id);
    return country ? country.name : "Unknown";
  };
  const cols = [
    {
      header: "S No",
      field: "sno",
      width: "8%",
    },
    { header: "VendorName & Company", field: "vendorname", width: "20%" },
    { header: "Vendor %", field: "vendorper", width: "10%" },
    { header: "Vendor Monthly Amt", field: "vendormon", width: "13%" },
    { header: "Date", field: "date", width: "10%" },
    { header: "Vendor Country", field: "country", width: "10%" },
    {
      header: (
        <div className="d-flex w-100">
          <div className="col-6">Sports</div>
          <div className="col-4 flex-center">Profit&Loss</div>
          <div className="col-4 ">View</div>
        </div>
      ), field: "all", width: "20%",
    },
  ];
  const data = vendorsData?.map((item, index) => ({
    sno: index + 1,
    vendorname: (
      <div className="d-flex flex-column">
        <div className="text-capitalize">{item?.vendorName}</div>
        <div>{item?.vendorCompany}</div>
      </div>
    ),
    vendorper: (
      <div>{item?.percentage !== null ? `${item?.percentage}%` : "-"}</div>
    ),
    vendormon: (
      <div>{item?.monthlyAmount !== null ? item?.monthlyAmount : "-"}</div>
    ),
    date: <div>{item?.billingDate !== null ? item?.billingDate : "-"}</div>,
    country: <div className="text-capitalize">{getCountryName(item?.vendorCountry)}</div>,
    all: (
      <div className="flex-column">
        {item?.vendorMarkets?.map((market, mIdx) => (
          <div className="d-flex w-100 ">
            <div key={index} className="col-6">
              {market?.sportName}
            </div>

            <div className="col-4 flex-center green-clr">{market?.pnl}</div>
            <div className="col-4 d-flex ">
              <BsEye
                className="orange-clr pointer"
                size={18}
                onClick={() =>
                  handleSportNextPage(
                    item?.vendorName,
                    market?.sportName,
                    item?.id,
                    market?.marketId
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    ),
  }));

  //   get  all  vendors
  const fetchVendors = () => {
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
    fetchVendors();
  }, []);
  return (
    <div className="">
      <div className="d-flex flex-between align-items-center mt-3 mb-2">
        <h6 className="mb-0">Sports</h6>
        {/* <div className="medium-font">
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div> */}
      </div>
      {loading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>
      ) : (
        <Table columns={cols} data={data} itemsPerPage={3} />
      )}
      <ConfirmationPopup
        confirmationPopupOpen={isActive}
        setConfirmationPopupOpen={setIsACtive}
        discription={"Are You Sure to Active this Match"}
        submitButton={"Active"}
      />
    </div>
  );
};

export default Sports;
