import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { VscCloudUpload } from "react-icons/vsc";

const DepositePopup = ({
    setDepositePopup,
    depositePopup,
}) => {
    const [selectedDepositDetails, setSelectedDepositDetails] = useState({});
    const [formData, setFormData] = useState({
        deployType: null, // Will be set to the first payment type by default
        panelType: null,
        city: "",
        websiteName: "",
        utr: "",
        cashHandoverName: "",
        description: "",
    });
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null); // Reference to hidden input
    const [selectedFile, setSelectedFile] = useState(null);

    const depositeDetails = [
        {
            label: "ICICI Bank",
            value: "icici",
            details: {
                name: "John Doe",
                bankName: "ICICI Bank",
                accountNumber: "1234567890",
                ifscCode: "ICIC0001234",
            },
        },
        {
            label: "HDFC Bank",
            value: "hdfc",
            details: {
                name: "Jane Smith",
                bankName: "HDFC Bank",
                accountNumber: "0987654321",
                ifscCode: "HDFC0005678",
            },
        },
    ];

    const PaymentType = [
        { label: "NEFT/RTGS", value: "neftrtgs" },
        { label: "UPI", value: "upi" },
        { label: "CASH", value: "cash" },
    ];

    const UpiOptions = [
        { label: "UPI Option 1", value: "upi1" },
        { label: "UPI Option 2", value: "upi2" },
    ];

    useEffect(() => {
        if (PaymentType.length > 0) {
            // Set the first payment type as default
            setFormData((prev) => ({
                ...prev,
                deployType: PaymentType[0],
            }));
        }
        if (depositeDetails.length > 0) {
            setFormData((prev) => ({
                ...prev,
                panelType: depositeDetails[0], // Set first option as default
            }));
            setSelectedDepositDetails(depositeDetails[0].details);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (field, option) => {
        setFormData((prev) => ({
            ...prev,
            [field]: option,
        }));
        if (field === "deployType" && option) {
            if (option.value === "neftrtgs") {
                setFormData((prev) => ({ ...prev, utr: "" })); // Clear UTR if changing to NEFT/RTGS
            }
        }
        if (field === "panelType" && option) {
            setSelectedDepositDetails(option.details);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file.name);
            setFormData((prev) => ({ ...prev, websiteName: file }));
        }
    };

    const handleSubmit = () => {
        const payload = { ...formData };
        // Handle form submission, send payload to server
        console.log("Payload:", payload);
    };

    return (
        <div>
            <Modal
                show={depositePopup}
                centered
                className="confirm-popup"
                size="md"
            >
                <Modal.Body>
                    {/* Header Section */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="medium-font fw-600">Deposite</h5>
                        <MdOutlineClose size={22} className="pointer" onClick={() => setDepositePopup(false)} />
                    </div>
                    <div className="col">
                        <label className="small-font mb-1">Amount</label>
                        <input
                            type="text"
                            name="city"
                            className="w-100 small-font rounded input-css all-none"
                            placeholder="Enter"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <p className="text-danger small-font">{errors.city}</p>}
                    </div>
                    {/* Payment Type Dropdown */}
                    <div className="col mb-2">
                        <label className="small-font mb-1">Payment Type</label>
                        <Select
                            className="small-font"
                            options={PaymentType}
                            placeholder="Select"
                            styles={customStyles}
                            value={formData.deployType}
                            onChange={(option) => handleSelectChange("deployType", option)}
                        />
                    </div>

                    {/* Conditional Rendering Based on Payment Type */}
                    {formData.deployType && formData.deployType.value === "neftrtgs" && (
                        <>
                            {/* NEFT/RTGS Section */}
                            <div className="col">
                                <label className="small-font mb-1">Deposit Details</label>
                                <Select
                                    className="small-font"
                                    options={depositeDetails}
                                    placeholder="Select"
                                    styles={customStyles}
                                    value={formData.panelType}
                                    onChange={(option) => handleSelectChange("panelType", option)}
                                />
                                {selectedDepositDetails && (
                                    <div className="mt-1 p-2 border-none rounded input-css">
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>Name</strong> <span className="text-end">{selectedDepositDetails.name}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>Bank Name</strong> <span className="text-end">{selectedDepositDetails.bankName}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>Account Number</strong> <span className="text-end">{selectedDepositDetails.accountNumber}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>IFSC Code</strong> <span className="text-end">{selectedDepositDetails.ifscCode}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col">
                                <label className="small-font mb-1">UTR/Transaction ID</label>
                                <input
                                    type="text"
                                    name="utr"
                                    className="w-100 small-font rounded input-css all-none"
                                    placeholder="Enter"
                                    value={formData.utr}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
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
                                    name="websiteName"
                                    ref={fileInputRef}
                                    className="d-none"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                        </>
                    )}

                    {formData.deployType && formData.deployType.value === "upi" && (
                        <>
                            {/* UPI Section */}
                            <div className="col">
                                <label className="small-font mb-1">UPI ID</label>
                                <Select
                                    className="small-font"
                                    options={UpiOptions}
                                    placeholder="Select UPI"
                                    styles={customStyles}
                                    value={formData.upi}
                                    onChange={(option) => handleSelectChange("upi", option)}
                                />
                            </div>
                            <div className="col">
                                <label className="small-font mb-1">UTR/Transaction ID</label>
                                <input
                                    type="text"
                                    name="utr"
                                    className="w-100 small-font rounded input-css all-none"
                                    placeholder="Enter"
                                    value={formData.utr}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
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
                                    name="websiteName"
                                    ref={fileInputRef}
                                    className="d-none"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                        </>
                    )}

                    {formData.deployType && formData.deployType.value === "cash" && (
                        <>
                            {/* Cash Section */}
                            <div className="col">
                                <label className="small-font mb-1">Cash Handover Name</label>
                                <input
                                    type="text"
                                    name="cashHandoverName"
                                    className="w-100 small-font rounded input-css all-none"
                                    placeholder="Enter Name"
                                    value={formData.cashHandoverName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
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
                    <div className="mt-3 d-flex flex-row w-100 ">
                        <button className="saffron-btn small-font rounded col"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DepositePopup;