import React, { useState, useEffect } from "react";
import { SlPencil } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table";
import { Images } from "../../images";
import AddPaymentGatewayPopup from "./popups/AddPaymentGatewayPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { getDirectorAccountDetails, getCountries, suspendDirectorAccountPaymentDetails, getDirectorAccountById } from '../../../src/api/apiMethods'
import { useNavigate } from "react-router-dom";



const PaymentGateway = () => {
  const [onAddPaymentGateway, setOnAddPaymentGateway] = useState(false)
  const [onBlockPopup, setOnBlockPopup] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountList, setAccountList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [paymentId, setPaymentId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState('');
  const navigate = useNavigate()



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
      console.log(editData)
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

  const gatewayTypeMap = {
    1: "NEFT/RTGS",
    2: "UPI",
    3: "QR Code"
  };


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

  const getCountryName = (id) => {
    const country = countries.find((c) => c.id === id);
    return country ? country.name : "Unknown";
  };

  // Function to get currency dynamically
  const getCurrencySymbol = (id) => {
    const country = countries.find((c) => c.id === id);
    return country ? `${country.currency_symbol} ${country.currency_name}` : "N/A";
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A"; // Handle null or undefined dates
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB"); // Formats to "DD-MM-YYYY"
  };


  const handleStatus = (id, status) => {
    //onsole.log(id,status);
    setOnBlockPopup(true);
    setPaymentId(id);
    setStatusId(status);

  }
  const status_id = statusId === 1 ? 2 : 1;

  const suspendStatus = () => {
    suspendDirectorAccountPaymentDetails(paymentId, status_id)
      .then((response) => {
        // Call getDirectorAccountData to refresh the list
        getDirectorAccountData();
        setOnBlockPopup(false);
      })
      .catch((error) => {
        setError(error.message)
        console.log(error);
        // Optional: Add error handling or show an error message
      });
  };


  const columns = [
    { header: "Gateway Name", field: "gatewayName", width: "15%" },
    { header: "Payment Details", field: "paymentDetails", width: "25%" },
    { header: "Last Updated", field: "lastUpdated", width: "15%" },
    { header: "Country", field: "country", width: "10%" },
    { header: "Currency", field: "currency", width: "10%" },
    { header: "Status", field: "status", width: "10%" },
    { header: <div className="text-center">Actions</div>, field: "action", width: "7%" }, // Increased width to fit two icons
  ];

  // const data = [
  //   {
  //     gatewayName: "Google Pay",
  //     paymentDetails: "7551078156",
  //     lastUpdated: "26-09-2024",
  //     country: "India",
  //     currency: "INR ₹",
  //     status: (
  //       <span className="payment-gateway-status-badge badge py-2 px-3">
  //         Active
  //       </span>
  //     ),
  //     action: (
  //       <div className="flex-center gap-2">
  //         <SlPencil size={18} className="pointer me-2" onClick={() => setOnAddPaymentGateway(true)} />
  //         <RiDeleteBinLine size={18} className="pointer ms-1" onClick={() => setOnBlockPopup(true)} />
  //       </div>
  //     ),
  //   },
  //   {
  //     gatewayName: "UPI",
  //     paymentDetails: "srilICICI@ibl",
  //     lastUpdated: "26-09-2024",
  //     country: "India",
  //     currency: "INR ₹",
  //     status: (
  //       <span className="payment-gateway-status-badge badge py-2 px-3">
  //         Active
  //       </span>
  //     ),
  //     action: (
  //       <div className="flex-center gap-2">
  //         <SlPencil size={18} className="pointer me-2" />
  //         <RiDeleteBinLine size={18} className="pointer ms-1" />
  //       </div>
  //     ),
  //   },
  //   {
  //     gatewayName: "NEFT/RTGS",
  //     paymentDetails: (
  //       <div>
  //         Srikumar Sunkara <br />
  //         A/C No: 34311236216 <br />
  //         IFSC Code: ICIC0040 <br />
  //         Bank: ICICI Bank
  //       </div>
  //     ),
  //     lastUpdated: "26-09-2024",
  //     country: "India",
  //     currency: "INR ₹",
  //     status: (
  //       <span className="payment-gateway-status-badge badge py-2 px-3">
  //         Active
  //       </span>
  //     ),
  //     action: (
  //       <div className="flex-center gap-2">
  //         <SlPencil size={18} className="pointer me-2" />
  //         <RiDeleteBinLine size={18} className="pointer ms-1" />
  //       </div>
  //     ),
  //   },
  //   {
  //     gatewayName: "QR Code",
  //     paymentDetails: (
  //       <div className="d-flex align-items-center">
  //         <img src={Images.QrImg} alt="QR Code" className="w-10 h-10 me-2" />{" "}
  //         ICICI Bank
  //       </div>
  //     ),
  //     lastUpdated: "26-09-2024",
  //     country: "India",
  //     currency: "INR ₹",
  //     status: (
  //       <span className="payment-gateway-status-badge badge py-2 px-3">
  //         Active
  //       </span>
  //     ),
  //     action: (
  //       <div className="flex-center gap-2">
  //         <SlPencil size={18} className="pointer me-2" />
  //         <RiDeleteBinLine size={18} className="pointer ms-1" />
  //       </div>
  //     ),
  //   },
  //   {
  //     gatewayName: "Google Pay",
  //     paymentDetails: "7551078156",
  //     lastUpdated: "26-09-2024",
  //     country: "India",
  //     currency: "INR ₹",
  //     status: (
  //       <span className="payment-gateway-status-badge badge py-2 px-3">
  //         Active
  //       </span>
  //     ),
  //     action: (
  //       <div className="flex-center gap-2">
  //         <SlPencil size={18} className="pointer me-2" />
  //         <RiDeleteBinLine size={18} className="pointer ms-1" />
  //       </div>
  //     ),
  //   },


  //   {
  //     gatewayName: "NEFT/RTGS",
  //     paymentDetails: (
  //       <div>
  //         Srikumar Sunkara <br />
  //         A/C No: 34311236216 <br />
  //         IFSC Code: ICIC0040 <br />
  //         Bank: ICICI Bank
  //       </div>
  //     ),
  //     lastUpdated: "26-09-2024",
  //     country: "India",
  //     currency: "INR ₹",
  //     status: (
  //       <span className="payment-gateway-status-badge badge py-2 px-3">
  //         Active
  //       </span>
  //     ),
  //     action: (
  //       <div className="flex-center gap-2">
  //         <SlPencil size={18} className="pointer me-2" />
  //         <RiDeleteBinLine size={18} className="pointer ms-1" />
  //       </div>
  //     ),
  //   },

  //   {
  //     gatewayName: "Google Pay",
  //     paymentDetails: (
  //       <div className="d-flex align-items-center">
  //         <img src={Images.QrImg} alt="QR Code" className="w-10 h-10 me-2" />{" "}
  //         ICICI Bank
  //       </div>
  //     ),
  //     lastUpdated: "26-09-2024",
  //     country: "India",
  //     currency: "INR ₹",
  //     status: (
  //       <span className="payment-gateway-status-badge badge py-2 px-3">
  //         Active
  //       </span>
  //     ),
  //     action: (
  //       <div className="flex-center gap-2">
  //         <SlPencil size={18} className="pointer me-2" />
  //         <RiDeleteBinLine size={18} className="pointer ms-1" />
  //       </div>
  //     ),
  //   },

  //   {
  //     gatewayName: "Google Pay",
  //     paymentDetails: "7551078156",
  //     lastUpdated: "26-09-2024",
  //     country: "India",
  //     currency: "INR ₹",
  //     status: (
  //       <span className="payment-gateway-status-badge badge py-2 px-3">
  //         Active
  //       </span>
  //     ),
  //     action: (
  //       <div className="flex-center gap-2">
  //         <SlPencil size={18} className="pointer me-2" />
  //         <RiDeleteBinLine size={18} className="pointer ms-1" />
  //       </div>
  //     ),
  //   },
  // ];
  const transformedData = accountList.map(item => ({
    gatewayName: gatewayTypeMap[item.gateway_type] || "NA",
    paymentDetails: item.gateway_type === 1
      ? `${item.bank_name} \n A/C No: ${item.bank_acc_no} \n IFSC: ${item.bank_ifsc}`
      : item.qr_code_image
        ? <div className="d-flex align-items-center">
          <img src={item.qr_code_image} alt="QR Code" className="w-10 h-10 me-2" />
          {item.bank_name}
        </div>
        : item.upi_provider || "N/A",
    lastUpdated: formatDate(item.updated_date),
    country: getCountryName(item.country), // Function to map country code to name
    currency: getCurrencySymbol(item.country), // Function to get currency symbol
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
          <SlPencil size={18} className="pointer me-2" onClick={() => handleEdit(item?.id)} />
        ) : (
          <SlPencil size={18} className="pointer me-2 disabled" />

        )}

        <RiDeleteBinLine size={18} className="pointer ms-1" onClick={() => handleStatus(item?.id, item?.status)} />
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
            <input className="small-font all-none" placeholder="Search..." />
          </div>

          <button className="rounded-pill input-pill blue-font small-font px-2"

            //  onClick={() => setOnAddPaymentGateway(true)}
            onClick={() => navigate("/addnew-payments")}
          >
            <FaPlus /> Add New Gateway{" "}
          </button>
        </div>
      </div>

      <div className="mt-2">
        <Table data={transformedData} columns={columns} itemsPerPage={6} />
      </div>

      <AddPaymentGatewayPopup
        show={onAddPaymentGateway}
        onHide={() => {
          setOnAddPaymentGateway(false);
          setEditMode(false);

        }}
        data={countries}
        getDirectorAccountData={getDirectorAccountData}
        editMode={editMode}
        editData={editData}
        setEditMode={setEditMode}
      />

      <ConfirmationPopup
        confirmationPopupOpen={onBlockPopup}
        setConfirmationPopupOpen={() => setOnBlockPopup(false)}
        discription={`are you sure you want to ${statusId === 1 ? "In-Active" : "Active"} this Gateway?`}
        submitButton={`${statusId === 1 ? "In-Active" : "Active"}`}
        onSubmit={suspendStatus}
      />

    </div>
  );
};

export default PaymentGateway;
