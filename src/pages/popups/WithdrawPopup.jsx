import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { Images } from "../../images";
import { getDirectorAccessWebites, getDirectorSites, DirectorWithdrawTicketCreation } from "../../api/apiMethods";
import { MdContentCopy } from "react-icons/md";
import { imgUrl } from "../../api/baseUrl";
import { rround, rfloor, rceil } from "../../utils/mathFunctions";


const WithdrawPopup = ({
    setWithdrawPopup,
    withdrawPopup,
    selectedPayment,
    handleSuccessPopupOpen,
    setDiscription
}) => {
    const [selectedDepositDetails, setSelectedDepositDetails] = useState({});
    const [directorWebsitesList, setDirectorWebsitesList] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const isInitialRender = useRef(true);
    const [directorSites, setDirectorSites] = useState([]);
    const [userWebsites, setUserWebsites] = useState([]);
    const [directorCurrency, setDirectorCurrency] = useState(null);
    const [fieldError, setFieldError] = useState(null);
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
        websiteName: "",
        selectedChips: "",
        cashHandoverName: "",
        cashDes: ""
    });
    const [apiErrors, setApiErrors] = useState(null);
    const [error, setError] = useState("");
    const [selectedWebDetails, setSelectedWebDetails] = useState(null);

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
                    const siteData = response.data
                    setDirectorSites(response.data);
                    setDirectorCurrency(siteData[0])
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
    // chips math function 

    const shareChipValue = Number(formData.selectedChips * (selectedWebDetails?.share / 100));
    const roundedShareChipValue = shareChipValue > 0 ? rfloor(shareChipValue, -3) : 0;

    const validateForm = () => {

        const newErrors = {};
        if (selectedPayment?.avil_modes !== 4) {
            if (!selectedAdmin?.value) newErrors.adminWebsiteId = "Admin Website is required";
            if (!formData.websiteName) newErrors.userPanelId = "User Website is required";
            if (!formData.selectedChips) newErrors.selectedChips = "Please enter chips";

        } else {
            if (!selectedAdmin?.value) newErrors.adminWebsiteId = "AdminWebsiteId is required";
            if (!selectedWebDetails.user_paner_id) newErrors.userPanelId = "UserPanelId is required";
            if (!formData.selectedChips) newErrors.selectedChips = "Please enter chips";
            if (!formData.cashHandoverName) newErrors.cashHandoverName = "Cash handover name is required";
            if (!formData.cashDes) newErrors.cashDes = "Description is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        let payload = {
            adminPanelId: selectedAdmin?.value || null,
            userPanelId: formData?.websiteName || null,
            currency: directorCurrency?.county || "",
            paymentId: selectedPayment?.gateway_type || null,
            selctChips: Number(formData.selectedChips) || 0,
            paidAmount: roundedShareChipValue,
        };

        if (selectedPayment?.avil_modes === 4) {
            payload.cashDes = formData.cashDes;
        }

        DirectorWithdrawTicketCreation(payload)
            .then((response) => {
                if (response?.status === true) {
                    setWithdrawPopup(false);
                    handleSuccessPopupOpen();
                    setFormData({
                        balanceAmount: "",
                        netAmount: "",
                        withdrawAmount: "",
                        deployType: null,
                        panelType: null,
                        websiteName: "",
                        selectedChips: "",
                        cashHandoverName: "",
                        cashDes: ""
                    });
                    setApiErrors(null);
                    setDiscription("Withdraw ticket created successfully")
                } else {
                    setApiErrors(response?.errors || "Deposit failed. Please try again.");
                }
            })
            .catch((error) => {
                setApiErrors(error?.errors || error?.message || "API request failed");
            });
    };

    const adminWebsitesList = directorWebsitesList.flatMap((ref) => ref.admin_websites);

    function getWebsiteDetailsByUserId(selectedUserId) {
        const WebUserDetails = directorSites.filter(item => item.user_paner_id === selectedUserId);
        setSelectedWebDetails(...WebUserDetails);
    }

    const handleClosePopup = () => {
        setWithdrawPopup(false)
        setSelectedWebDetails(null)
    }
    const maxAllowed = selectedWebDetails?.total_chips !== null ? selectedWebDetails?.total_chips : 0


    return (
        <div>
            <Modal show={withdrawPopup} centered className="confirm-popup" size="md">
                <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <img
                                src={`${imgUrl}/offlinepaymentsMode/${selectedPayment?.image}`}
                                alt="Icon"
                                className="me-3"
                                style={{ width: "50px", height: "50px" }}
                            />
                        </div>
                        <div className="d-flex justify-content-end flex-grow-1">
                            <div className="d-flex flex-column text-end">
                                <h5 className="medium-font fw-600 mb-0 green-font">Withdraw in {directorCurrency?.currencyName}</h5>
                                <p className="medium-font mb-0 dep-pop-clr"> {`${userName} - ${userRole} (Share-${selectedWebDetails?.share || 0}%)`} </p>
                            </div>
                        </div>
                        <div>
                            <MdOutlineClose size={22} className="pointer ms-3" onClick={handleClosePopup} />
                        </div>
                    </div>
                    {apiErrors && (
                        <div className="alert alert-danger">
                            {Array.isArray(apiErrors) ? (
                                <ul>
                                    {apiErrors.map((error, index) => (
                                        <li className="small-font" key={index}>{error.message || error}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="small-font">{apiErrors.message || apiErrors}</p>
                            )}
                        </div>
                    )}
                    <div className="row ">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Admin Panel</label>
                            <Select
                                className="small-font white-bg input-border rounded"
                                options={adminWebsitesList.map((admin) => ({
                                    label: admin.admin_web_name,
                                    value: admin.admin_WebSite_id,
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
                            {errors.adminWebsiteId && <p className="text-danger small-font">{errors.adminWebsiteId}</p>}
                        </div>
                        <div className="col mb-2">
                            <label className="small-font mb-1">User Panel</label>
                            <Select
                                className="small-font white-bg input-border rounded"
                                options={userWebsites.map((user) => ({
                                    label: user.user_web_name,
                                    value: user.user_WebSite_id,
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
                            {errors?.userPanelId && <p className="text-danger small-font">{errors?.userPanelId}</p>}
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
                                value={directorCurrency?.currencyName || ""}
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
                            <label className="small-font mb-1">Wallet Chips Balance - {directorCurrency?.currencyName}</label>
                            <input
                                type="text"
                                className="w-100 small-font rounded input-css white-bg input-border"
                                placeholder="Enter Withdraw Amount"
                                value={selectedWebDetails?.total_chips ?? 0}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                    </div>
                    {selectedWebDetails?.commission_type !== 1 && selectedWebDetails?.commission_type !== 3 && (
                        <div className="row">
                            <div className="col">
                                <label className="small-font mb-1">Enter Chips - {directorCurrency?.currencyName}</label>
                                <input
                                    type="text"
                                    name="selectedChips"
                                    className="w-100 small-font rounded input-css  white-bg placeholder-red-clr input-border"
                                    placeholder="Enter Withdraw Amount"
                                    value={formData.selectedChips}
                                    onChange={(e) => {
                                        if (Number(e.target.value) <= maxAllowed) {
                                            handleChange(e);
                                            setFieldError("")
                                        } else {
                                            setFieldError(`You cannot enter more than ${maxAllowed} chips.`);
                                        }
                                    }}
                                />
                                {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                                {errors.selectedChips && <p className="text-danger small-font">{errors.selectedChips}</p>}
                            </div>
                            <div className="col">
                                <label className="small-font mb-1">Amount ({selectedWebDetails?.share}%) - {directorCurrency?.currencyName}</label>
                                <input
                                    type="text"
                                    name="paidAmount"
                                    className="w-100 small-font rounded input-css  white-bg input-border"
                                    placeholder="Enter Withdraw Amount"
                                    value={roundedShareChipValue}
                                    onChange={handleChange}
                                />
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
                                <label className="small-font mb-1">Description</label>
                                <input
                                    type="text"
                                    name="cashDes"
                                    className="w-100 small-font rounded input-css all-none white-bg input-border"
                                    placeholder="Enter Description"
                                    value={formData.cashDes}
                                    onChange={handleChange}
                                />
                                {errors.cashDes && <p className="text-danger small-font">{errors.cashDes}</p>}
                            </div>
                        </>
                    )}
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
                    {selectedWebDetails?.commission_type !== 1 && selectedWebDetails?.commission_type !== 3 && (
                        <div className="mt-3 d-flex flex-row w-100">
                            <button className="saffron-btn small-font rounded col" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    )}

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default WithdrawPopup;