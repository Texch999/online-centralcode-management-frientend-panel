import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { SlPencil } from "react-icons/sl";
import Form from "react-bootstrap/Form";
import "../style.css";
import AddPaymentGatewayPopup from "../popups/AddPaymentGatewayPopup";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import {
  getDirPayDetailsByIdProfile,
  managementDwnProfileDirPaymentDetails,
} from "../../../api/apiMethods";
import moment from "moment";
import { useSelector } from "react-redux";
import { imgUrl } from "../../../api/baseUrl";
import { useSearchParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import ProfilePaymentsModal from "../popups/ProfilePaymentsModal";

const gatewayOptions = [
  { value: "NEFT", label: "NEFT" },
  { value: "SWIFT", label: "SWIFT" },
  { value: "RTGS", label: "RTGS" },
];
const detailOptions = [
  { value: "NEFT", label: "NEFT" },
  { value: "Detail 2", label: "Detail 2" },
  { value: "Detail 3", label: "Detail 3" },
];

const columns = [
  { header: "Gateway Name", field: "gatewayName", width: "15%" },
  { header: "Payment Details", field: "paymentDetails", width: "25%" },
  { header: "Last Updated", field: "lastUpdated", width: "10%" },
  { header: "Country", field: "country", width: "10%" },
  { header: "Currency", field: "currency", width: "10%" },
  { header: "Status", field: "status", width: "10%" },
  // { header: "Action", field: "action", width: "10%" },
];

const PaymentGateway = ({ dwnlnId }) => {
  const [showPaymentGatewayPopup, setShowPaymentGatewayPopup] = useState(false);
  const [showPaymentGatewayData, setShowPaymentGatewayData] = useState([]);
  const [error, setError] = useState("");
  const allCountries = useSelector((item) => item.allCountries);
  console.log(allCountries,"allCountries")
  const itemsPerPage = 2;
  const [totalRecords, setTotalRecords] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(pages);
  const limit = itemsPerPage;
  const offset = (currentPage - 1) * itemsPerPage;
  const [loading, setLoading] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(4);
  const [currentOffset, setCurrentOffset] = useState(0);
  const page = currentPage;
  const pageSize = itemsPerPage;
  const gatewayTypeMap = {
    1: "NEFT/RTGS",
    2: "UPI",
    3: "QR Code",
    4: "Cash",
  };
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [manDirProfileId, setManDirProfileId] = useState(null);
  const [dirPaymentGatewayProfileId, setDirPaymentGatewayProfileId] =
    useState(null);
  const currencyId = selectedCountry;
  const [countryId, setCountryId] = useState(null);

  const role_code = localStorage.getItem("role_code");
  const countryOptions = allCountries?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const getCurrencySymbol = (id) => {
    const country = allCountries.find((c) => c.id === id);
    return country
      ? `${country.currency_symbol} ${country.currency_name}`
      : "N/A";
  };

  const getCountryName = (id) => {
    const country = allCountries.find((c) => c.id === id);
    return country ? country.name : "Unknown";
  };

  const handleStatusChange = (option) => {
    setSelectedCountry(option?.value);
  };

  const handleEdit = (id, gateway, country) => {
    setShowPaymentGatewayPopup(true);
    setManDirProfileId(id);
    setDirPaymentGatewayProfileId(gateway);
    setCountryId(country);
  };

  const getDirPaymentDetails = (page, pageSize, currencyId) => {
    setLoading(true);
    const params={
      page:page,
      pageSize:pageSize,
      currencyId:currencyId,
      dwnlnId:dwnlnId
    }
    managementDwnProfileDirPaymentDetails( params)
      .then((response) => {
        if (response.status === true) {
          console.log(response.data, "response.data");
          setShowPaymentGatewayData(response?.data);
          setTotalRecords(response?.totalCount);
        } else {
          console.log("Something error happening");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (role_code === "management") {
      getDirPaymentDetails(limit, offset, selectedCountry);
    }
  }, [selectedCountry,currentPage]);

  const handlePageChange = ({ limit, offset }) => {
    setCurrentLimit(limit);
    setCurrentOffset(offset);
    if (role_code === "management") {
      getDirPaymentDetails(pages, pageSize, selectedCountry);
    }
  };

  const filterOption = ({ label }, inputValue) => {
    return /^[A-Za-z\s]*$/.test(inputValue) && label.toLowerCase().includes(inputValue.toLowerCase());
  };
  

  const PAYMENT_DATA = showPaymentGatewayData?.map((item, index) => {
    return {
      gatewayName: gatewayTypeMap[item?.gateway_type],
      paymentDetails: (() => {
        switch (item?.gateway_type) {
          case 1:
            return (
              <div className="d-flex flex-column align-items-start">
                <span className="">bank_name: {item?.bank_name}</span>
                <span>Acc No: {item?.bank_acc_no}</span>
                <span>IFSC: {item?.bank_ifsc}</span>
              </div>
            );
          case 2:
            return (
              <div className="d-flex align-items-center">
                <span className="fw-bold">{item?.upi_id}</span>
              </div>
            );
          case 3:
            return (
              <div className="d-flex align-items-center">
                <img
                  src={`${imgUrl}/directorpayment/${item?.qr_code_image}`}
                  alt="QR Code"
                  className="w-30 h-7vh me-2"
                  loading="lazy"
                />
                <span className="fw-bold">{item?.bank_name}</span>
              </div>
            );
          case 4:
            return <div className="fw-bold">{item?.acc_hold_name}</div>;
          default:
            return <span className="text-muted">N/A</span>;
        }
      })(),
      lastUpdated: moment(item?.last_updated).format("YYYY-MM-DD"),
      country: getCountryName(item.currency_id),
      currency: getCurrencySymbol(item.currency_id),
      status: (
        <span className="">
          {item?.status === 1 ? (
            <div className="green-btn badge py-2 px-3">Active</div>
          ) : (
            <div className="red-btn badge py-2 px-3">In-Active</div>
          )}
        </span>
      ),

      // action: (
      //   <spna>
      //     {item?.status === 1 ? (
      //       <SlPencil
      //         size={17}
      //         onClick={() =>
      //           handleEdit(item?.id, item?.gateway_type, item?.currency_id)
      //         }
      //       />
      //     ) : (
      //       <SlPencil size={17} />
      //     )}
      //   </spna>
      // ),
    };
  });

  return (
    <div>
      <div className="py-4 bg-white shadow rounded">
        <div className="px-4 d-flex justify-content-between align-items-center mb-3">
          <h6 className="medium-font">Add Payment gateway</h6>
          {/* <div className="d-flex align-items-center">
            <span className="me-2 black-text small-font">Active</span>

            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                className="director-admin-profile-toggle-btn"
              />
            </Form>

            <span className="me-2 black-text small-font">In-active</span>
          </div> */}
        </div>
        <hr className="dashed-line mb-4" style={{ color: "black" }} />

        {/* <div className="row align-items-center py-3 px-3 mb-2 payment-gateway-select-container">
         
          <div className="col-md-2 mb-3 mb-md-0">
            <label className="small-font mb-1 d-block">Country</label>
            <Select
              className="small-font"
              options={countryOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
            />
          </div>
    
          <div className="col-md-2 mb-3 mb-md-0">
            <label className="small-font mb-1 d-block">Gateway</label>
            <div className="position-relative">
              <Select
                className="small-font"
                options={gatewayOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              />
            </div>
          </div>

        
          <div className="col-md-6 col-lg-7 mb-3 mb-md-0">
            <label className="small-font mb-1 d-block">Select Details</label>
            <Select
              className="small-font"
              options={detailOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
            />
          </div>

        
          <div className="col-md-2 col-lg-1 align-self-end">
            <button className="small-font saffron-btn2 w-100">Submit</button>
          </div>
        </div> */}

        <div className="row d-flex justify-content-between px-3">
          <h6 className="col-2 small-font">All Currencies</h6>

          <div className="col-2 mb-3 mb-md-0 ">
            <div className="position-relative">
              <Select
                className="small-font"
                options={countryOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                value={countryOptions?.find(
                  (c) => c?.value === selectedCountry
                )}
                onChange={handleStatusChange}
                filterOption={(option, searchText) => {
                  const lettersOnly = searchText.replace(/[^a-zA-Z]/g, "");
                  return option.label
                    .toLowerCase()
                    .includes(lettersOnly.toLowerCase());
                }}
                onInputChange={(inputValue) => {
                  return inputValue.replace(/[^a-zA-Z]/g, "");
                }} 
              />
            </div>
          </div>
        </div>

        <div className="table-parent-container mt-2">
          {loading ? (
            <div className="d-flex flex-column flex-center mt-10rem align-items-center">
              <CircleLoader color="#3498db" size={40} />
              <div className="medium-font black-font my-3">
                Just a moment...............⏳
              </div>
            </div>
          ) : (
            <Table
              data={PAYMENT_DATA}
              columns={columns}
              itemsPerPage={itemsPerPage}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        <ProfilePaymentsModal
          show={showPaymentGatewayPopup}
          onHide={() => setShowPaymentGatewayPopup(false)}
          dirPaymentGatewayProfileId={dirPaymentGatewayProfileId}
          setDirPaymentGatewayProfileId={setDirPaymentGatewayProfileId}
          manDirProfileId={manDirProfileId}
          countryId={countryId}
          getDirPaymentDetails={getDirPaymentDetails}
        />
      </div>
    </div>
  );
};

export default PaymentGateway;
