import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { VscCloudUpload } from "react-icons/vsc";
import { getDirectorAccessWebites, managementPaymentDetails } from "../../api/apiMethods";

const DepositePopup = ({ setDepositePopup, depositePopup }) => {
    const [selectedDepositDetails, setSelectedDepositDetails] = useState({});
    const [directorWebsitesList, setDirectorWebsitesList] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [userWebsites, setUserWebsites] = useState([]);
    const [paymentDetailsList, setPaymentDetailsList] = useState([]);
    const [formData, setFormData] = useState({
        paymentType: null,
        depositeDetails: null,
        city: "",
        websiteName: "",
        utr: "",
        cashHandoverName: "",
        description: "",
        phoneNumber: "",
        amount: null,
        screenshot: null,
    });
    const isInitialRender = useRef(true);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const PaymentType = [
        { label: "NEFT/RTGS", value: "neftrtgs" },
        { label: "UPI", value: "upi" },
        { label: "QR Code", value: "qrcode" },
        { label: "CASH", value: "cash" },
    ];

    const getDirectorAccessedWebistesList = () => {
        getDirectorAccessWebites()
            .then((response) => {
                if (response?.status === true) {
                    setDirectorWebsitesList(response.data);
                } else {
                    setError("Something Went Wrong");
                }
            })
            .catch((error) => {
                setError(error?.message || "API request failed");
            });
    };

    const paymentsDetailsList = () => {
        managementPaymentDetails()
            .then((response) => {
                if (response?.status === true) {
                    setPaymentDetailsList(response.data);
                } else {
                    setError("Something Went Wrong");
                }
            })
            .catch((error) => {
                setError(error?.message || "API request failed");
            });
    };

    const getFilteredPaymentDetails = (paymentType) => {
        return paymentDetailsList.filter((detail) => detail.gateway_type === paymentType);
    };

    useEffect(() => {
        if (PaymentType.length > 0) {
            setFormData((prev) => ({
                ...prev,
                paymentType: PaymentType[0],
            }));
        }
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            getDirectorAccessedWebistesList();
            paymentsDetailsList();
            return;
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSelectChange = (field, option) => {
        setFormData((prev) => ({
            ...prev,
            [field]: option,
        }));

        if (field === "paymentType" && option) {
            if (option.value === "neftrtgs") {
                setFormData((prev) => ({ ...prev, utr: "" }));
            }

            const paymentTypeMap = {
                neftrtgs: 1, // NEFT/RTGS
                upi: 2,      // UPI
                qrcode: 3,     // QR Code
            };
            const filteredDetails = getFilteredPaymentDetails(paymentTypeMap[option.value]);
            setSelectedDepositDetails(filteredDetails[0] || {});
        }

        if (field === "depositeDetails" && option) {
            setSelectedDepositDetails(option.details);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file.name);
            setFormData((prev) => ({ ...prev, screenshot: file }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.amount) newErrors.amount = "Amount is required";
        if (!formData.paymentType) newErrors.paymentType = "Payment type is required";
        if (formData.paymentType?.value === "neftrtgs" && !formData.utr) newErrors.utr = "UTR is required";
        if (formData.paymentType?.value === "upi" && !formData.utr) newErrors.utr = "UTR is required";
        if (formData.paymentType?.value === "cash" && !formData.cashHandoverName) newErrors.cashHandoverName = "Cash handover name is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        const payload = {
            ...formData,
            paymentDetails: selectedDepositDetails,
        };
        console.log("Payload:", payload);
    };
    console.log(paymentDetailsList, "==============>paymentDetailsList")
    return (
        <div>
            <Modal show={depositePopup} centered className="confirm-popup" size="md">
                <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="medium-font fw-600">Deposit</h5>
                        <MdOutlineClose size={22} className="pointer" onClick={() => setDepositePopup(false)} />
                    </div>
                    <div className="col mb-2">
                        <label className="small-font mb-1">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            className="w-100 small-font rounded input-css all-none"
                            placeholder="Enter Amount"
                            value={formData.amount || ""}
                            onChange={handleChange}
                        />
                        {errors.amount && <p className="text-danger small-font">{errors.amount}</p>}
                    </div>
                    <div className="col mb-2">
                        <label className="small-font mb-1">Admin Panel</label>
                        <Select
                            className="small-font"
                            options={directorWebsitesList.map((admin) => ({
                                label: admin.admin_web_name,
                                value: admin.admin_panel_id,
                            }))}
                            placeholder="Select Admin Website"
                            styles={customStyles}
                            value={selectedAdmin}
                            onChange={(option) => {
                                setSelectedAdmin(option);
                                const selectedAdminData = directorWebsitesList.find(
                                    (admin) => admin.admin_panel_id === option.value
                                );
                                setUserWebsites(selectedAdminData?.users || []);
                            }}
                        />
                    </div>
                    <div className="col mb-2">
                        <label className="small-font mb-1">User Panel</label>
                        <Select
                            className="small-font"
                            options={userWebsites.map((user) => ({
                                label: user.user_web_name,
                                value: user.website_access_id,
                            }))}
                            placeholder="Select User Website"
                            styles={customStyles}
                            onChange={(option) => {
                                console.log("Selected User Website:", option);
                            }}
                        />
                    </div>
                    {/* Payment Type Dropdown */}
                    <div className="col mb-2">
                        <label className="small-font mb-1">Payment Type</label>
                        <Select
                            className="small-font"
                            options={PaymentType}
                            placeholder="Select"
                            styles={customStyles}
                            value={formData.paymentType}
                            onChange={(option) => handleSelectChange("paymentType", option)}
                        />
                        {errors.paymentType && <p className="text-danger small-font">{errors.paymentType}</p>}
                    </div>

                    {/* NEFT/RTGS Section */}
                    {formData.paymentType?.value === "neftrtgs" && (
                        <>
                            <div className="col mb-2">
                                <label className="small-font mb-1">Deposit Details</label>
                                <Select
                                    className="small-font"
                                    options={getFilteredPaymentDetails(1).map((detail) => ({
                                        label: detail.bank_name,
                                        value: detail.gateway_id,
                                        details: {
                                            bankName: detail.bank_name,
                                            accountNumber: detail.bank_acc_no,
                                            ifscCode: detail.bank_ifsc,
                                        },
                                    }))}
                                    placeholder="Select Bank"
                                    styles={customStyles}
                                    value={formData.depositeDetails}
                                    onChange={(option) => handleSelectChange("depositeDetails", option)}
                                />
                                {selectedDepositDetails && (
                                    <div className="mt-1 p-2 border-none rounded input-css">
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>Bank Name</strong> <span className="text-end">{selectedDepositDetails.bank_name}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>Account Number</strong> <span className="text-end">{selectedDepositDetails.bank_acc_no}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>IFSC Code</strong> <span className="text-end">{selectedDepositDetails.bank_ifsc}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* UPI Section */}
                    {formData.paymentType?.value === "upi" && (
                        <>
                            <div className="col mb-2">
                                <label className="small-font mb-1">UPI ID</label>
                                <Select
                                    className="small-font"
                                    options={getFilteredPaymentDetails(2).map((detail) => ({
                                        label: detail.upi_provider_id,
                                        value: detail.gateway_id,
                                        details: {
                                            upiProvider: detail.upi_provider,
                                            upiId: detail.upi_provider_id,
                                        },
                                    }))}
                                    placeholder="Select UPI"
                                    styles={customStyles}
                                    value={formData.depositeDetails}
                                    onChange={(option) => handleSelectChange("depositeDetails", option)}
                                />

                            </div>

                        </>
                    )}

                    {formData.paymentType?.value === "qrcode" && (
                        <>
                            <div className="col mb-2">
                                <label className="small-font mb-1">QR Code</label>
                                {selectedDepositDetails?.qr_code_image ? (
                                    <img
                                        src={selectedDepositDetails.qr_code_image}
                                        alt="QR Code"
                                        className="w-100"
                                    />
                                ) : (
                                    <p className="text-muted small-font">No QR Code available.</p>
                                )}
                            </div>
                        </>
                    )}
                    {/* File Upload for NEFT/RTGS and UPI */}
                    {(formData.paymentType?.value !== "cash") && (
                        <div>
                            <div className="col mb-2">
                                <label className="small-font mb-1">UTR/Transaction ID</label>
                                <input
                                    type="text"
                                    name="utr"
                                    className="w-100 small-font rounded input-css all-none"
                                    placeholder="Enter"
                                    value={formData.utr}
                                    onChange={handleChange}
                                />
                                {errors.utr && <p className="text-danger small-font">{errors.utr}</p>}
                            </div>
                            <div className="col mb-2">
                                <label className="small-font mb-1">Upload Payment Screenshot</label>
                                <div
                                    className="custom-file-upload w-100 d-flex align-items-center justify-content-between rounded input-css px-3"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <span className="small-font text-muted">
                                        {selectedFile || "Select File"}
                                    </span>
                                    <VscCloudUpload size={16} className="text-muted" />
                                </div>
                                <input
                                    type="file"
                                    name="screenshot"
                                    ref={fileInputRef}
                                    className="d-none"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    )}

                    {/* Cash Section */}
                    {formData.paymentType?.value === "cash" && (
                        <>
                            <div className="col mb-2">
                                <label className="small-font mb-1">Cash Handover Name</label>
                                <input
                                    type="text"
                                    name="cashHandoverName"
                                    className="w-100 small-font rounded input-css all-none"
                                    placeholder="Enter Name"
                                    value={formData.cashHandoverName}
                                    onChange={handleChange}
                                />
                                {errors.cashHandoverName && <p className="text-danger small-font">{errors.cashHandoverName}</p>}
                            </div>
                            <div className="col mb-2">
                                <label className="small-font mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="w-100 small-font rounded input-css all-none"
                                    placeholder="Enter Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col mb-2">
                                <label className="small-font mb-1">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    className="w-100 small-font rounded input-css all-none"
                                    placeholder="Enter Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    {/* Submit Button */}
                    <div className="mt-3 d-flex flex-row w-100">
                        <button className="saffron-btn small-font rounded col" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DepositePopup;