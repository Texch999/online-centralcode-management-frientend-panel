import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { Images } from "../../images";
import { getDirectorAccessWebites, getDirectorSites } from "../../api/apiMethods";
import { MdContentCopy } from "react-icons/md";

const WithdrawPopup = ({
    setWithdrawPopup,
    withdrawPopup,
    actionType,
    selectedPayment
}) => {
    const [selectedDepositDetails, setSelectedDepositDetails] = useState({});
    const [directorWebsitesList, setDirectorWebsitesList] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const isInitialRender = useRef(true);
    const [directorSites, setDirectorSites] = useState([]);
    const [userWebsites, setUserWebsites] = useState([]);
    const [errors, setErrors] = useState({});
    const userName = localStorage.getItem("user_name");
    const userRole = localStorage.getItem("role_code");
    const [formData, setFormData] = useState({
        balanceAmount: "",
        netAmount: "",
        withdrawAmount: "",
        deployType: null,
        panelType: null,
        name: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        upiId: "",
        websiteName: "", // Add websiteName to formData
    });

    const [error, setError] = useState("");
    const [selectedWebDetails, setSelectedWebDetails] = useState(null);

    const getDirectorAccessedWebistesList = () => {
        getDirectorAccessWebites()
            .then((response) => {
                if (response?.status === true) {
                    setDirectorWebsitesList(response.data);
                    // Set the first admin website as default
                    if (response.data.length > 0) {
                        const firstAdmin = response.data[0].admin_websites[0];
                        setSelectedAdmin({
                            label: firstAdmin.admin_web_name,
                            value: firstAdmin.admin_panel_id,
                        });
                        setUserWebsites(firstAdmin.users || []);
                        // Set the first user website as default
                        if (firstAdmin.users.length > 0) {
                            setFormData((prev) => ({
                                ...prev,
                                websiteName: firstAdmin.users[0].website_access_id,
                            }));
                            getWebsiteDetailsByUserId(firstAdmin.users[0].website_access_id);
                        }
                    }
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
    };

    const validateForm = () => {
        const newErrors = {};

        if (!selectedAdmin) {
            newErrors.admin = "Please select an Admin Website.";
        }

        if (!formData.websiteName) {
            newErrors.user = "Please select a User Website.";
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Form Data:", formData);
            // Proceed with your form submission logic here
        } else {
            console.log("Validation failed. Please check the form.");
        }
    };

    const adminWebsitesList = directorWebsitesList.flatMap((ref) => ref.admin_websites);

    function getWebsiteDetailsByUserId(selectedUserId) {
        const WebUserDetails = directorSites.filter(item => item.id === selectedUserId);
        setSelectedWebDetails(...WebUserDetails);
    }
    const handleClosePopup = () => {
        setWithdrawPopup(false)
        setSelectedWebDetails(null)
    }
    return (
        <div>
            <Modal show={withdrawPopup} centered className="confirm-popup" size="md">
                <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <img
                                src={Images?.phonepe}
                                alt="Icon"
                                className="me-3"
                                style={{ width: "50px", height: "50px" }}
                            />
                        </div>
                        <div className="d-flex justify-content-end flex-grow-1">
                            <div className="d-flex flex-column text-end">
                                <h5 className="medium-font fw-600 mb-0 green-font">Withdraw in {selectedWebDetails?.currencyName}</h5>
                                <p className="medium-font mb-0 dep-pop-clr"> {`${userName} - ${userRole} (Share-${selectedWebDetails?.share || 0}%)`} </p>
                            </div>
                        </div>
                        <div>
                            <MdOutlineClose size={22} className="pointer ms-3" onClick={handleClosePopup} />
                        </div>
                    </div>
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
                                    // Set the first user website as default
                                    if (selectedAdminData?.users.length > 0) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            websiteName: selectedAdminData.users[0].website_access_id,
                                        }));
                                    }
                                    // Clear the admin error when an option is selected
                                    setErrors((prev) => ({ ...prev, admin: "" }));
                                }}
                            />
                            {errors.admin && <p className="text-danger small-font">{errors.admin}</p>}
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
                                    getWebsiteDetailsByUserId(option.value);
                                    // Clear the user error when an option is selected
                                    setErrors((prev) => ({ ...prev, user: "" }));
                                }}
                            />
                            {errors.user && <p className="text-danger small-font">{errors.user}</p>}
                        </div>
                    </div>

                    {/* Rest of the code remains the same */}
                    <div className="row">
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

                    </div>
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
                                        readOnly
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

                    {/* Withdraw Amount */}
                    <div className="row">
                        <div className="col">
                            <label className="small-font mb-1">Wallet Chips Balance - {selectedWebDetails?.currencyName}</label>
                            <input
                                type="text"
                                name="withdrawAmount"
                                className="w-100 small-font rounded input-css white-bg input-border"
                                placeholder="Enter Withdraw Amount"
                                value={formData.withdrawAmount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <label className="small-font mb-1">Total Chips - {selectedWebDetails?.currencyName}</label>
                            <input
                                type="text"
                                name="withdrawAmount"
                                className="w-100 small-font rounded input-css  white-bg placeholder-red-clr input-border"
                                placeholder="Enter Withdraw Amount"
                                value={formData.withdrawAmount}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <label className="small-font mb-1">Amount ({selectedWebDetails?.share}%) - {selectedWebDetails?.currencyName}</label>
                        <input
                            type="text"
                            name="withdrawAmount"
                            className="w-100 small-font rounded input-css  white-bg input-border"
                            placeholder="Enter Withdraw Amount"
                            value={formData.withdrawAmount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <label className="small-font mb-1">Enter Chips - {selectedWebDetails?.currencyName}</label>
                        <input
                            type="text"
                            name="withdrawAmount"
                            className="w-100 small-font rounded input-css  white-bg placeholder-red-clr input-border"
                            placeholder="Enter Withdraw Amount"
                            value={formData.withdrawAmount}
                            onChange={handleChange}
                        />
                    </div>
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

export default WithdrawPopup;