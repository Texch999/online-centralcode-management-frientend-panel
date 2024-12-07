import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table";
import { Images } from "../../images";
import AddPaymentGatewayPopup from "./popups/AddPaymentGatewayPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";

const PaymentGateway = () => {
  const [onAddPaymentGateway, setOnAddPaymentGateway] = useState(false)
  const [onBlockPopup, setOnBlockPopup] = useState(false)

  const columns = [
    { header: "Gateway Name", field: "gatewayName", width: "15%" },
    { header: "Payment Details", field: "paymentDetails", width: "25%" },
    { header: "Last Updated", field: "lastUpdated", width: "15%" },
    { header: "Country", field: "country", width: "10%" },
    { header: "Currency", field: "currency", width: "10%" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Action", field: "action", width: "5%" }, // Increased width to fit two icons
  ];

  const data = [
    {
      gatewayName: "Google Pay",
      paymentDetails: "7551078156",
      lastUpdated: "26-09-2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <div className="d-flex gap-2">
          <GrEdit size={17} className="pointer me-2" onClick={() => setOnAddPaymentGateway(true)}/>
          <RiDeleteBinLine size={17} className="pointer ms-1" onClick={() => setOnBlockPopup(true)}/>
        </div>
      ),
    },
    {
      gatewayName: "UPI",
      paymentDetails: "srilICICI@ibl",
      lastUpdated: "26-09-2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <div className="d-flex gap-2">
          <GrEdit size={17} className="pointer me-2" />
          <RiDeleteBinLine size={17} className="pointer ms-1" />
        </div>
      ),
    },
    {
      gatewayName: "NEFT/RTGS",
      paymentDetails: (
        <div>
          Srikumar Sunkara <br />
          A/C No: 34311236216 <br />
          IFSC Code: ICIC0040 <br />
          Bank: ICICI Bank
        </div>
      ),
      lastUpdated: "26-09-2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <div className="d-flex gap-2">
          <GrEdit size={17} className="pointer me-2" />
          <RiDeleteBinLine size={17} className="pointer ms-1" />
        </div>
      ),
    },
    {
      gatewayName: "QR Code",
      paymentDetails: (
        <div className="d-flex align-items-center">
          <img src={Images.QrImg} alt="QR Code" className="w-10 h-10 me-2" />{" "}
          ICICI Bank
        </div>
      ),
      lastUpdated: "26-09-2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <div className="d-flex gap-2">
          <GrEdit size={17} className="pointer me-2" />
          <RiDeleteBinLine size={17} className="pointer ms-1" />
        </div>
      ),
    },
    {
      gatewayName: "Google Pay",
      paymentDetails: "7551078156",
      lastUpdated: "26-09-2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <div className="d-flex gap-2">
          <GrEdit size={17} className="pointer me-2" />
          <RiDeleteBinLine size={17} className="pointer ms-1" />
        </div>
      ),
    },

    {
      gatewayName: "Google Pay",
      paymentDetails: "7551078156",
      lastUpdated: "26-09-2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <div className="d-flex gap-2">
          <GrEdit size={17} className="pointer me-2" />
          <RiDeleteBinLine size={17} className="pointer ms-1" />
        </div>
      ),
    },

    {
      gatewayName: "NEFT/RTGS",
      paymentDetails: (
        <div>
          Srikumar Sunkara <br />
          A/C No: 34311236216 <br />
          IFSC Code: ICIC0040 <br />
          Bank: ICICI Bank
        </div>
      ),
      lastUpdated: "26-09-2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <div className="d-flex gap-2">
          <GrEdit size={17} className="pointer me-2" />
          <RiDeleteBinLine size={17} className="pointer ms-1" />
        </div>
      ),
    },

    {
      gatewayName: "Google Pay",
      paymentDetails: (
        <div className="d-flex align-items-center">
          <img src={Images.QrImg} alt="QR Code" className="w-10 h-10 me-2" />{" "}
          ICICI Bank
        </div>
      ),
      lastUpdated: "26-09-2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <div className="d-flex gap-2">
          <GrEdit size={17} className="pointer me-2" />
          <RiDeleteBinLine size={17} className="pointer ms-1" />
        </div>
      ),
    },

    {
      gatewayName: "Google Pay",
      paymentDetails: "7551078156",
      lastUpdated: "26-09-2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <div className="d-flex gap-2">
          <GrEdit size={17} className="pointer me-2" />
          <RiDeleteBinLine size={17} className="pointer ms-1" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="row justify-content-between align-items-center mb-3 mt-2">
        <h6 className="col-2 yellow-font medium-font mb-0">Payment Gateway</h6>

        <div className="col-6 d-flex justify-content-end gap-3 medium-font">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 w-50">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>

          <button className="rounded-pill input-pill blue-font small-font px-2" onClick={() => setOnAddPaymentGateway(true)}>
            {" "}
            <FaPlus /> Add New Gateway{" "}
          </button>
        </div>
      </div>

      <div className="mt-2">
        <Table data={data} columns={columns} itemsPerPage={8} />
      </div>

      <AddPaymentGatewayPopup show={onAddPaymentGateway} onHide={() => setOnAddPaymentGateway(false)}/>

      <ConfirmationPopup
        confirmationPopupOpen={onBlockPopup}
        setConfirmationPopupOpen={() => setOnBlockPopup(false)}
        discription={"are you sure you want to delete this Gateway?"}
        submitButton={"Delete"}
      />

    </div>
  );
};

export default PaymentGateway;
