import React, { useState, useEffect, useRef } from "react";
import { SlPencil } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table";
import { Images } from "../../images";
import AddPaymentGatewayPopup from "./popups/AddPaymentGatewayPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import {
  getDirectorAccountDetails,
  getCountries,
  suspendDirectorAccountPaymentDetails,
  getDirectorAccountById,
  getManagementPaymentDetails,
  suspendManagementPaymentDetails,
  getManagementPaymentDetailsById,
} from "../../../src/api/apiMethods";
import moment from "moment";
import { CircleLoader } from "react-spinners";
import ErrorPopup from "../popups/ErrorPopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { imgUrl } from "../../api/baseUrl";
import { offset } from "@popperjs/core";

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
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState("");
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

  const gatewayTypeMap = {
    1: "NEFT/RTGS",
    2: "UPI",
    3: "QR Code",
    4: "Cash",
  };

  // Function to get currency dynamically
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

  // management payment details =========================== management payment details =========================

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
  // get all

  const itemsPerPage = 4;
  const [totalRecords, setTotalRecords] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const limit = itemsPerPage;
  const offset = (currentPage - 1) * itemsPerPage;
  const onPageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page });
  };

  const fetchManagementPaymentDetails = async () => {
    setLoading(true);
    try {
      const response = await getManagementPaymentDetails({ limit, offset });
      if (response?.status === true) {
        setManagementPaymentDetails(response?.data);
        setTotalRecords(response?.meta?.totalCount);
      }
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (role_code === "management") {
      if (paymentDetailsDataFetched.current) return;
      paymentDetailsDataFetched.current = true;
      fetchManagementPaymentDetails();
    }
  }, []);

  //suspend api

  const suspendManPaymnet = () => {
    suspendManagementPaymentDetails(suspendManagementPaymentId)
      .then((response) => {
        console.log("payment suspend success", response);
        if (response?.status === true) {
          fetchManagementPaymentDetails();
          setSuspendPayment(false);
          setSuspendManagementPaymentId(null);
          setSuspendManagementPaymentStatus(null);
        }
      })
      .catch((error) => setError(error?.message));
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

  // management payment details =================== management payment details====================

  const handleEdit = async (id) => {
    try {
      setEditMode(true);
      const response = await getDirectorAccountById(id);

      console.log("getDirectorAccountById success", response);

      setEditData(response);

      // Use a callback function to ensure the latest state is logged
      // setEditData(prevState => {
      //   console.log(prevState, "Updated editData");
      //   return response;
      // });
      console.log(editData);
      setOnAddPaymentGateway(true);
    } catch (error) {
      console.error("Error fetching director account:", error);
    }
  };

  const getDirectorAccountData = () => {
    setLoading(true);
    getDirectorAccountDetails()
      .then((response) => {
        console.log("getDirectorAccountDetails success", response.data);
        setAccountList(response.data);
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
    getDirectorAccountData();
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
    //onsole.log(id,status);
    setOnBlockPopup(true);
    setPaymentId(id);
    setStatusId(status);
  };
  const status_id = statusId === 1 ? 2 : 1;

  const suspendStatus = () => {
    suspendDirectorAccountPaymentDetails(paymentId, status_id)
      .then((response) => {
        // Call getDirectorAccountData to refresh the list
        getDirectorAccountData();
        setOnBlockPopup(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
        // Optional: Add error handling or show an error message
      });
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

  const transformedData = accountList.map((item) => ({
    gatewayName: gatewayTypeMap[item.gateway_type] || "NA",
    paymentDetails:
      item.gateway_type === 1 ? (
        `${item.bank_name} \n A/C No: ${item.bank_acc_no} \n IFSC: ${item.bank_ifsc}`
      ) : item.qr_code_image ? (
        <div className="d-flex align-items-center">
          <img
            src={item.qr_code_image}
            alt="QR Code"
            className="w-10 h-10 me-2"
          />
          {item.bank_name}
        </div>
      ) : (
        item.upi_provider || "N/A"
      ),
    accholder: item?.acc_hold_name,
    lastUpdated: moment(item.updated_date),
    country: getCountryName(item.country),
    currency: getCurrencySymbol(item.country),
    status: (
      <span className="badge py-2 px-3">
        {item?.status === 1 ? (
          <div className="green-btn w-fill">Active</div>
        ) : (
          <div className="red-btn w-fill">In-Active</div>
        )}
      </span>
    ),

    action: (
      <div className="flex-center gap-2">
        {item?.status === 1 ? (
          <SlPencil
            size={18}
            className="pointer me-2"
            onClick={() => handleEdit(item?.id, item.gateway_type)}
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

  return (
    <div>
      <div className="row justify-content-between align-items-center mb-3 mt-2">
        <h6 className="col-2 yellow-font medium-font mb-0">Payment Gateway</h6>

        <div className="col-6 d-flex justify-content-end gap-3 medium-font">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 w-50">
            <FaSearch size={16} className="grey-clr me-2" />
            <input
              className="small-font all-none"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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
            data={
              role_code === "management"
                ? managementPaymentData
                : transformedData
            }
            columns={columns}
            itemsPerPage={itemsPerPage}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
          />
        )}
      </div>

      {role_code === "management" && (
        <AddPaymentGatewayPopup
          show={onAddPaymentGateway}
          onHide={() => {
            setOnAddPaymentGateway(false);
            setManagementPaymentEditId(false);
          }}
          data={countries}
          managementPaymentEdit={managementPaymentEdit}
          setManagementPaymentEdit={setManagementPaymentEdit}
          fetchManagementPaymentDetails={fetchManagementPaymentDetails}
          managementPaymentEditId={managementPaymentEditId}
          setManagementPaymentEditId={setManagementPaymentEditId}
          availablePaymentModeId={availablePaymentModeId}
        />
      )}

      {role_code === "management" ? (
        <ConfirmationPopup
          confirmationPopupOpen={suspendPayment}
          setConfirmationPopupOpen={setSuspendPayment}
          discription={`Are you sure you want to ${
            suspendManagementPaymentStatus === 1 ? "In-Active" : "Activate"
          } this payment gateway?`}
          submitButton={`${
            suspendManagementPaymentStatus === 1 ? "In-Active" : "Active"
          }`}
          onSubmit={suspendManPaymnet}
        />
      ) : (
        <ConfirmationPopup
          confirmationPopupOpen={onBlockPopup}
          setConfirmationPopupOpen={() => setOnBlockPopup(false)}
          discription={`are you sure you want to ${
            statusId === 1 ? "In-Active" : "Active"
          } this Gateway?`}
          submitButton={`${statusId === 1 ? "In-Active" : "Active"}`}
          onSubmit={suspendStatus}
        />
      )}
    </div>
  );
};

export default PaymentGateway;
