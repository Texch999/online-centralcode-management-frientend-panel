
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { VscCloudUpload } from "react-icons/vsc";
import { getDirectorAccessWebites, getDirectorSites } from "../../api/apiMethods";
import { Images } from "../../images";
import { MdContentCopy } from "react-icons/md";
const DepositePopup = ({ setDepositePopup, depositePopup, actionType, selectedPayment }) => {
    const [selectedDepositDetails, setSelectedDepositDetails] = useState({});
    const [directorWebsitesList, setDirectorWebsitesList] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [userWebsites, setUserWebsites] = useState([]);
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
    const userName = localStorage.getItem("user_name")
    const userRole = localStorage.getItem("role_code")
    const [directorSites, setDirectorSites] = useState([])


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
    const getDirectorSitesList = () => {
        getDirectorSites()
            .then((response) => {
                if (response?.status === true) {
                    setDirectorSites(response.data);
                } else {
                    setError("Something Went Wrong");
                }
            })
            .catch((error) => {
                setError(error?.message || "API request failed");
            });
    };
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        getDirectorAccessedWebistesList();
        getDirectorSitesList();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file.name);
            setPreviewImage(URL.createObjectURL(file));
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

        // Transform formData into the desired payload format
        const payload = {
            amount: parseFloat(formData.amount),
            type: formData.paymentType.type,
            admin: selectedAdmin?.value || null,
            websiteid: formData.websiteName || null,
            transactionId: formData.utr || null,
            slip: formData.screenshot || null,
        };

        // Include cash-specific fields if payment type is cash
        if (formData.paymentType?.value === "cash") {
            payload.handoverName = formData.cashHandoverName;
            payload.description = formData.description;
        }
    };
    const [selectedWebDetails, setSelectedWebDetails] = useState(null)
    const adminWebsitesList = directorWebsitesList.flatMap((ref) => ref.admin_websites);
    function getWebsiteDetailsByUserId(selectedUserId) {
        const WebUserDetails = directorSites.filter(item => item.id === selectedUserId);
        setSelectedWebDetails(...WebUserDetails)
    }
    return (
        <div>
            <Modal show={depositePopup} centered className="confirm-popup" size="md">
                <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        {/* Image on the left */}
                        <img
                            src={Images?.phonepe}
                            alt="Icon"
                            className="me-3"
                            style={{ width: "50px", height: "50px" }}
                        />

                        <div className="d-flex justify-content-end flex-grow-1">
                            <div className="d-flex flex-column text-end">
                                <h5 className="medium-font fw-600 mb-0 green-font">{actionType} in {selectedWebDetails?.currencyName || ""}</h5>
                                <p className="medium-font text-secondary mb-0">{`${userName} - ${userRole} (Share-${selectedWebDetails?.share || null}%)`}</p>
                            </div>
                        </div>
                        <div>
                            <MdOutlineClose size={22} className="pointer ms-3" onClick={() => setDepositePopup(false)} />
                        </div>
                    </div>
                    <hr />
                    <div className="row ">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Admin Panel</label>
                            <Select
                                className="small-font white-bg input-border rounded"
                                options={adminWebsitesList.map((admin) => ({
                                    label: admin.admin_web_name,
                                    value: admin.admin_panel_id,
                                }))}
                                placeholder="Select Admin Website"
                                styles={customStyles}
                                value={selectedAdmin}
                                onChange={(option) => {
                                    setSelectedAdmin(option);
                                    const selectedAdminData = adminWebsitesList.find(
                                        (admin) => admin.admin_panel_id === option.value
                                    );
                                    setUserWebsites(selectedAdminData?.users || []);
                                }}
                            />
                        </div>
                        <div className="col mb-2">
                            <label className="small-font mb-1">User Panel</label>
                            <Select
                                className="small-font white-bg input-border rounded"
                                options={userWebsites.map((user) => ({
                                    label: user.user_web_name,
                                    value: user.website_access_id,
                                }))}
                                placeholder="Select User Website"
                                styles={customStyles}
                                onChange={(option) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        websiteName: option.value,
                                    }));
                                    getWebsiteDetailsByUserId(option.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className="col mb-2">
                        <label className="small-font mb-1">Currency</label>
                        <input
                            type="text"
                            name="currency"
                            className="w-100 small-font rounded input-css all-none rounded white-bg input-border"
                            placeholder="Enter Amount"
                            value={selectedWebDetails?.currencyName || ""}
                            onChange={handleChange}
                        />
                        {errors.amount && <p className="text-danger small-font">{errors.amount}</p>}
                    </div>

                    {/* NEFT/RTGS Section */}
                    {selectedPayment?.avil_modes === 1 && (
                        <>
                            <div className="col mb-2">
                                <label className="small-font mb-1">Bank Transfer</label>
                                <input
                                    type="text"
                                    name="upi"
                                    className="w-100 small-font rounded input-css all-none white-bg input-border"
                                    placeholder="Enter "
                                    value={selectedPayment?.name || ""}
                                    onChange={handleChange}
                                />
                                {errors.amount && <p className="text-danger small-font">{errors.amount}</p>}

                                {selectedDepositDetails && (
                                    <div className="mt-1 p-2  rounded input-css white-bg input-border">
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>Account Holder Name</strong> <span className="text-end">{selectedPayment.acc_hold_name}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>Bank Name</strong> <span className="text-end">{selectedPayment.bank_name}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>Account Number</strong> <span className="text-end">{selectedPayment.bank_acc_no}</span>
                                        </div>
                                        <div className="d-flex justify-content-between small-font mb-1">
                                            <strong>IFSC Code</strong> <span className="text-end">{selectedPayment.bank_ifsc}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* UPI Section */}
                    {selectedPayment?.avil_modes === 2 && (
                        <>
                            <div className="col mb-2">
                                <label className="small-font mb-1">UPI ID</label>
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        name="upi"
                                        className="w-100 small-font rounded input-css all-none white-bg input-border pe-5" // Extra padding for the icon
                                        placeholder="Enter"
                                        value={selectedPayment?.upi_provider_id || ""}
                                        onChange={handleChange}
                                        readOnly // Prevent accidental editing
                                    />
                                    <MdContentCopy
                                        size={18}
                                        className="position-absolute text-muted"
                                        style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
                                        onClick={() => navigator.clipboard.writeText(selectedPayment?.upi_provider_id || "")}
                                    />
                                </div>
                                {errors.amount && <p className="text-danger small-font">{errors.amount}</p>}
                            </div>
                        </>
                    )}
                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Wallet Chips Balance -  {selectedWebDetails?.currencyName}</label>
                            <input
                                type="availableChips"
                                name="upi"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter "
                                value={formData.amount || ""}
                                onChange={handleChange}
                            />
                            {errors.amount && <p className="text-danger small-font">{errors.amount}</p>}
                        </div>
                        <div className="col mb-2">
                            <label className="small-font mb-1">Total Chips - {selectedWebDetails?.currencyName}</label>
                            <input
                                type="availableChips"
                                name="upi"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter "
                                value={formData.amount || ""}
                                onChange={handleChange}
                            />
                            {errors.amount && <p className="text-danger small-font">{errors.amount}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Enter Chips -  {selectedWebDetails?.currencyName}</label>
                            <input
                                type="chipsNeed"
                                name="upi"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter "
                                value={formData.amount || ""}
                                onChange={handleChange}
                            />
                            {errors.amount && <p className="text-danger small-font">{errors.amount}</p>}
                        </div>
                        <div className="col mb-2">
                            <label className="small-font mb-1">Paid Amount ( {selectedWebDetails?.share}%) -  {selectedWebDetails?.currencyName}</label>
                            <input
                                type="availableChips"
                                name="upi"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter "
                                value={formData.amount || ""}
                                onChange={handleChange}
                            />
                            {errors.amount && <p className="text-danger small-font">{errors.amount}</p>}
                        </div>
                    </div>
                    {/* File Upload for NEFT/RTGS and UPI */}
                    {(selectedPayment?.avil_modes !== 4) && (
                        <div>
                            <div className="col mb-2">
                                <label className="small-font mb-1">UTR/Transaction ID</label>
                                <input
                                    type="text"
                                    name="utr"
                                    className="w-100 small-font rounded input-css all-none white-bg input-border"
                                    placeholder="Enter"
                                    value={formData.utr}
                                    onChange={handleChange}
                                />
                                {errors.utr && <p className="text-danger small-font">{errors.utr}</p>}
                            </div>
                            <div className="col mb-2">
                                <label className="small-font mb-1">Upload Payment Screenshot</label>
                                <div
                                    className="white-bg input-border custom-file-upload w-100 d-flex align-items-center justify-content-between rounded input-css px-3"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <span className="small-font text-muted">
                                        {selectedFile || "Select File"}
                                    </span>
                                    <VscCloudUpload size={16} className="text-muted" />
                                </div>

                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    name="screenshot"
                                    ref={fileInputRef}
                                    className="d-none "
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />

                                {/* Display Uploaded Image Preview */}
                                {previewImage && (
                                    <div className="mt-2">
                                        <img
                                            src={previewImage}
                                            alt="Uploaded Screenshot"
                                            className="img-fluid rounded"
                                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {selectedPayment?.avil_modes === 4 && (
                        <>
                            <div className="col mb-2">
                                <label className="small-font mb-1">Cash Handover Name</label>
                                <input
                                    type="text"
                                    name="cashHandoverName"
                                    className="w-100 small-font rounded input-css all-none white-bg input-border"
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
                                    className="w-100 small-font rounded input-css all-none white-bg input-border"
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
                                    className="w-100 small-font rounded input-css all-none white-bg input-border"
                                    placeholder="Enter Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    {/* Cash Section */}
                    {selectedPayment?.avil_modes === 3 && (
                        <>
                            <div className="col mb-2">
                                <label className="small-font mb-1">QR Code</label>
                                {selectedPayment?.qr_code_image ? (
                                    <img
                                        src={selectedPayment.qr_code_image}
                                        alt="QR Code"
                                        className="w-100"
                                    />
                                ) : (
                                    <p className="text-muted small-font">No QR Code available.</p>
                                )}
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