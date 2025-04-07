import React, { useState, useEffect, useRef } from "react";
import { SlPencil } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table";
import AddPaymentGatewayPopup from "./popups/AddPaymentGatewayPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import {
  getDirectorAccountDetails,
  getCountries,
  suspendDirectorAccountPaymentDetails,
  getManagementPaymentDetails,
  suspendManagementPaymentDetails,
} from "../../../src/api/apiMethods";
import moment from "moment";
import { CircleLoader } from "react-spinners";
import ErrorPopup from "../popups/ErrorPopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { imgUrl } from "../../api/baseUrl";
import SuccessPopup from "../popups/SuccessPopup";

const PaymentGateway = () => {

  const navigate = useNavigate();
  const [onAddPaymentGateway, setOnAddPaymentGateway] = useState(false);
  const [onBlockPopup, setOnBlockPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountList, setAccountList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [paymentId, setPaymentId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [managementPaymentDetails, setManagementPaymentDetails] = useState([]);
  const paymentDetailsDataFetched = useRef(false);
  const role_code = localStorage.getItem("role_code");
  const [suspendPayment, setSuspendPayment] = useState(false);
  const [suspendManagementPaymentId, setSuspendManagementPaymentId] =
    useState(null);
  const [suspendManagementPaymentStatus, setSuspendManagementPaymentStatus] =
    useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [managementPaymentEditId, setManagementPaymentEditId] = useState(null);
  const [managementPaymentEdit, setManagementPaymentEdit] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [availablePaymentModeId, setAvailablePaymentModeId] = useState(null);
  const [dirEditId, setDirEditId] = useState(null);
  const [dirGatewayId, setDirGatewayId] = useState(null);
  const itemsPerPage = 3;
  const [totalRecords, setTotalRecords] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = parseInt(searchParams.get("page") || 3);
  const [currentPage, setCurrentPage] = useState(pages);
  const limit = itemsPerPage;
  const offset = (currentPage - 1) * itemsPerPage;
  const page = pages;
  const pageSize = itemsPerPage;
  const [countryId, setCountryId] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [desciption, setDesciption] = useState("");

  const gatewayTypeMap = {
    1: "NEFT/RTGS",
    2: "UPI",
    3: "QR Code",
    4: "Cash",
  };

  const getCurrencySymbol = (id) => {
    const country = countries.find((c) => c.id === id);
    return country
      ? `${country.currency_symbol} ${country.currency_name}`
      : "N/A";
  };

  const getCountryName = (id) => {
    const country = countries.find((c) => c.id === id);
    return country ? country.name : "Unknown";
  };

  const columns = [
    { header: "Gateway Name", field: "gatewayName", width: "15%" },
    { header: "Payment Details", field: "paymentDetails", width: "25%" },
    { header: "Acc Holder Name", field: "accholder", width: "15%" },
    { header: "Last Updated", field: "lastUpdated", width: "15%" },
    { header: "Country", field: "country", width: "10%" },
    { header: "Currency", field: "currency", width: "10%" },
    { header: "Status", field: "status", width: "10%" },
    {
      header: <div className="text-center">Actions</div>,
      field: "action",
      width: "7%",
    },
  ];

  const handleManagementSuspend = (id, status) => {

    setSuspendPayment(true);
    setSuspendManagementPaymentId(id);
    setSuspendManagementPaymentStatus(status);

  };

  const handleEditManagePayment = (id, gateway_type) => {
    setManagementPaymentEditId(id);
    setManagementPaymentEdit(true);
    setOnAddPaymentGateway(true);
    setAvailablePaymentModeId(gateway_type);
  };

  const fetchManagementPaymentDetails = async (limit, offset, holder) => {
    setLoading(true);
    try {
      const response = await getManagementPaymentDetails({
        limit,
        offset,
        holder,
      });
      if (response?.status === true) {
        setManagementPaymentDetails(response?.data);
        setTotalRecords(response?.meta?.totalCount);
      }
    } catch (error) {
      console.log(error?.message);
      setError(error?.message);
      setErrorPopup(true);
      setTimeout(() => {
        setErrorPopup(false);
      }, [2000]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (pages - 1) * itemsPerPage;
    fetchManagementPaymentDetails(limit, offset);

  }, []);

  const onPageChange = ({ limit, offset }) => {
    if (role_code === "management") {
      fetchManagementPaymentDetails(limit, offset, searchInput);
    }
  };

  const suspendManPaymnet = (limit, offset) => {
    suspendManagementPaymentDetails(suspendManagementPaymentId)
      .then((response) => {
        if (response?.status === true) {
          fetchManagementPaymentDetails(limit, offset);
          setSuspendPayment(false);
          setSuspendManagementPaymentId(null);
          setSuspendManagementPaymentStatus(null);
          setMsg(response?.message);
          setSuccessPopupOpen(true);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, 3000);
        }
      })
      .catch((error) => {
        setError(error?.message);
        setSuspendPayment(false);
        setErrorPopup(true);
        setTimeout(() => {
          setErrorPopup(false);
        }, [2000]);
      });
  };

  const filteredPayments = managementPaymentDetails.filter((item) => {
    const gatewayName = gatewayTypeMap[item?.gateway_type]?.toLowerCase();
    const bankName = item?.bank_name?.toLowerCase();
    const upiProviderId = item?.upi_id?.toLowerCase();
    const countryName = getCountryName(item?.country)?.toLowerCase();
    const accholder = item?.accholder?.toLowerCase();
    const searchTerm = searchInput.toLowerCase();

    return (
      gatewayName?.includes(searchTerm) ||
      bankName?.includes(searchTerm) ||
      upiProviderId?.includes(searchTerm) ||
      countryName?.includes(searchTerm) ||
      accholder?.includes(searchTerm)
    );
  });
  // const filteredPayments = managementPaymentDetails

  const managementPaymentData = filteredPayments.map((item, index) => ({
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
                src={`${imgUrl}/mngPayDetails/${item?.qr_code_image}`}
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
    accholder: item?.acc_hold_name,
    lastUpdated: moment(item?.updated_date).format("DD-MM-YYYY"),
    country: getCountryName(item?.currency_id),
    currency: getCurrencySymbol(item?.currency_id),
    status:
      item?.status === 1 ? (
        <span className="green-btn badge py-2 px-3">Active</span>
      ) : (
        <span className="red-btn badge py-2 px-3">In-Active</span>
      ),
    action: (
      <div className="flex-center gap-2">
        {item?.status === 1 ? (
          <SlPencil
            size={20}
            className="pointer me-2"
            onClick={() =>
              handleEditManagePayment(item?.id, item?.gateway_type)
            }
          />
        ) : (
          <span title="this gateway is inactivated you can't updated it!">
            <SlPencil size={20} className="me-2 disabled" />
          </span>
        )}

        <RiDeleteBinLine
          size={20}
          className="pointer ms-1"
          onClick={() => handleManagementSuspend(item?.id, item.status)}
        />
      </div>
    ),
  }));

  const handleDirectorEdit = (id, gateway_id, currency_id) => {
    setDirEditId(id);
    setAvailablePaymentModeId(gateway_id);
    setOnAddPaymentGateway(true);
    setManagementPaymentEdit(true);
    setCountryId(currency_id);
  };

  const [totalDirRecords, settotalDirRecords] = useState(null);

  const handleDirPageChange = () => {
    // setCurrentLimit(limit);
    // setCurrentOffset(offset);
    const pages = currentPage;
    const pageSize = itemsPerPage;

    if (role_code === "director") {
      getDirectorAccountData(pages, pageSize);
    }
  };

  const getDirectorAccountData = (page, pageSize) => {
    setLoading(true);
    getDirectorAccountDetails({ page, pageSize })
      .then((response) => {
        console.log("getDirectorAccountDetails success", response.data);
        setAccountList(response.data);
        settotalDirRecords(response?.totalCount);
      })
      .catch((error) => {
        setError(error?.message);
        console.log("getDirectorAccountDetails error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (role_code !== "management") {
      if (paymentDetailsDataFetched.current) return;
      paymentDetailsDataFetched.current = true;
      getDirectorAccountData(pages, pageSize);
    }
  }, []);

  const getCountry = () => {
    setLoading(true);
    getCountries()
      .then((response) => {
        // console.log("getCountries success", response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        setError(error?.message);
        // console.log("getCountries error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCountry();
  }, []);

  const handleStatus = (id, status) => {
    setOnBlockPopup(true);
    setPaymentId(id);
    setStatusId(status);
  };

  const status_id = statusId === 1 ? 2 : 1;

  const suspendStatus = () => {
    suspendDirectorAccountPaymentDetails(paymentId, status_id)
      .then((response) => {
        getDirectorAccountData(page,pageSize);
        setOnBlockPopup(false);
        setMsg(response?.message);
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 3000);
      })
      .catch((error) => {
        setError(error.message);
        setErrorPopup(true);
        setTimeout(() => {
          setErrorPopup(false);
        }, [2000]);
      });
  };

  const filteredDirPayments = accountList;

  const transformedData = filteredDirPayments?.map((item) => ({
    gatewayName: gatewayTypeMap[item.gateway_type],
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
    accholder: item?.acc_hold_name,
    lastUpdated: moment(item?.updated_date).format("DD-MM-YYYY"),
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

    action: (
      <div className="flex-center gap-2">
        {item?.status === 1 ? (
          <SlPencil
            size={18}
            className="pointer me-2"
            onClick={() =>
              handleDirectorEdit(item?.id, item.gateway_type, item?.currency_id)
            }
          />
        ) : (
          <SlPencil size={18} className="pointer me-2 disabled" />
        )}

        <RiDeleteBinLine
          size={18}
          className="pointer ms-1"
          onClick={() => handleStatus(item?.id, item?.status)}
        />
      </div>
    ),
  }));

  const handleFiltration = async (e) => {
    const limit = itemsPerPage;
    const offset = 0;
    if (e.key === "Enter") {
      setError(null);
      fetchManagementPaymentDetails(limit, offset, searchInput);
    }
  };

  useEffect(() => {
    const limit = itemsPerPage
    const offset = (page - 1) * itemsPerPage
    // Fetch data based on role and filterName
    if (searchInput.trim() === "") {
      fetchManagementPaymentDetails(limit, offset);
    }
  }, [searchInput]);

  // successPopupOpen={successPopupOpen}
  // setSuccessPopupOpen={setSuccessPopupOpen}
  // discription={msg}

  const hanldeGetAllDetails = () => {
    const limit = itemsPerPage;
    const offset = (pages - 1) * itemsPerPage;
    fetchManagementPaymentDetails(limit, offset);

  }

  return (
    <div>
      {!loading && (
        <div className="row justify-content-between align-items-center mb-3 mt-2">
          <h6 className="col-2 yellow-font medium-font mb-0">
            Payment Gateway
          </h6>

          <div className="col-6 d-flex justify-content-end gap-3 medium-font">
            <div className="input-pill d-flex align-items-center rounded-pill px-2 w-50">
              <FaSearch size={16} className="grey-clr me-2" />
              <input
                className="small-font all-none"
                placeholder="Enter Account Holder Name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.trim())}
                onKeyDown={handleFiltration}
              />
            </div>

            <button
              className="rounded-pill input-pill blue-font small-font px-2"
              onClick={() => {
                navigate("/addnew-payments");
              }}
            >
              <FaPlus /> Add New Gateway
            </button>
          </div>
        </div>
      )}

      {role_code === "management" ? (
        <div className="mt-2">
          {loading ? (
            <div className="spinner">
              <div className="spinner-circle"></div>
            </div>
          ) : (
            <Table
              data={managementPaymentData}
              columns={columns}
              itemsPerPage={itemsPerPage}
              totalRecords={totalRecords}
              onPageChange={onPageChange}
            />
          )}
        </div>
      ) : (
        <div className="mt-2">
          {loading ? (
            <div className="d-flex flex-column flex-center mt-10rem align-items-center">
              <CircleLoader color="#3498db" size={40} />
              <div className="medium-font black-font my-3">
                Just a moment...............⏳
              </div>
            </div>
          ) : (
            <Table
              data={transformedData}
              columns={columns}
              itemsPerPage={itemsPerPage}
              totalRecords={totalDirRecords}
              onPageChange={handleDirPageChange}
            />
          )}
        </div>
      )}

      {onAddPaymentGateway  && (
        <AddPaymentGatewayPopup
          show={onAddPaymentGateway}
          setOnAddPaymentGateway={setOnAddPaymentGateway}
          managementPaymentEdit={managementPaymentEdit}
          setManagementPaymentEdit={setManagementPaymentEdit}
          fetchManagementPaymentDetails={fetchManagementPaymentDetails}
          managementPaymentEditId={managementPaymentEditId}
          setManagementPaymentEditId={setManagementPaymentEditId}
          availablePaymentModeId={availablePaymentModeId}
          setSuccessPopupOpen={setSuccessPopupOpen}
          setDiscription={setDesciption}
          msg={msg}
          setMsg={setMsg}
          successPopupOpen={successPopupOpen}
        />
      )}

      {/* <AddPaymentGatewayPopup
          show={onAddPaymentGateway}
          setOnAddPaymentGateway={setOnAddPaymentGateway}
          dirEditId={dirEditId}
          setDirEditId={setDirEditId}
          dirGatewayId={dirGatewayId}
          setDirGatewayId={setDirGatewayId}
          setManagementPaymentEdit={setManagementPaymentEdit}
          getDirectorAccountData={getDirectorAccountData}
          availablePaymentModeId={availablePaymentModeId}
          managementPaymentEdit={managementPaymentEdit}
          countryId={countryId}
          setManagementPaymentEditId={setManagementPaymentEditId}
          fetchManagementPaymentDetails={hanldeGetAllDetails}

        /> */}

      {role_code === "management" ? (
        <ConfirmationPopup
          confirmationPopupOpen={suspendPayment}
          setConfirmationPopupOpen={setSuspendPayment}
          discription={`Are you sure you want to ${suspendManagementPaymentStatus === 1 ? "In-Active" : "Activate"
            } this payment gateway?`}
          submitButton={`${suspendManagementPaymentStatus === 1 ? "In-Active" : "Active"
            }`}
          onSubmit={suspendManPaymnet}
        />
      ) : (
        <ConfirmationPopup
          confirmationPopupOpen={onBlockPopup}
          setConfirmationPopupOpen={() => setOnBlockPopup(false)}
          discription={`are you sure you want to ${statusId === 1 ? "In-Active" : "Active"
            } this Gateway?`}
          submitButton={`${statusId === 1 ? "In-Active" : "Active"}`}
          onSubmit={suspendStatus}
        />
      )}
      {errorPopup && (
        <ErrorPopup
          discription={error}
          errorPopupOpen={errorPopup}
          setErrorPopupOpen={setErrorPopup}
        />
      )}

      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={msg}
        />
      )}

    </div>
  );
};

export default PaymentGateway;
