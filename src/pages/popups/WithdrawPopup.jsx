import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";

const WithdrawPopup = ({
    setWithdrawPopup,
    withdrawPopup,
    actionType,
    selectedPayment
}) => {
    const [selectedDepositDetails, setSelectedDepositDetails] = useState({});
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
    });

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
    ];

    const UpiOptions = [
        { label: "UPI Option 1", value: "upi1" },
        { label: "UPI Option 2", value: "upi2" },
    ];

    useEffect(() => {
        if (PaymentType.length > 0) {
            setFormData((prev) => ({
                ...prev,
                deployType: PaymentType[0],
            }));
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

        if (field === "deployType") {
            setFormData((prev) => ({
                ...prev,
                panelType: null,
                name: "",
                bankName: "",
                accountNumber: "",
                ifscCode: "",
                upiId: "",
            }));
        }

        if (field === "panelType" && option) {
            setFormData((prev) => ({
                ...prev,
                name: option.details.name,
                bankName: option.details.bankName,
                accountNumber: option.details.accountNumber,
                ifscCode: option.details.ifscCode,
            }));
        }
    };

    const handleSubmit = () => {
        console.log("Form Data:", formData);
    };

    return (
        <div>
            <Modal show={withdrawPopup} centered className="confirm-popup" size="md">
                <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="medium-font fw-600">Withdraw</h5>
                        <MdOutlineClose size={22} className="pointer" onClick={() => setWithdrawPopup(false)} />
                    </div>

                    {/* Balance Amount */}
                    <div className="row">
                        <div className="col">
                            <label className="small-font mb-1">Balance Amount</label>
                            <input
                                type="text"
                                name="balanceAmount"
                                className="w-100 small-font rounded input-css all-none"
                                placeholder="Enter Balance Amount"
                                value={formData.balanceAmount}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Net Amount */}
                        <div className="col">
                            <label className="small-font mb-1">Net Amount</label>
                            <input
                                type="text"
                                name="netAmount"
                                className="w-100 small-font rounded input-css all-none"
                                placeholder="Enter Net Amount"
                                value={formData.netAmount}
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    {/* Withdraw Amount */}
                    <div className="row">
                        <div className="col">
                            <label className="small-font mb-1">Withdraw Amount</label>
                            <input
                                type="text"
                                name="withdrawAmount"
                                className="w-100 small-font rounded input-css all-none"
                                placeholder="Enter Withdraw Amount"
                                value={formData.withdrawAmount}
                                onChange={handleChange}
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
                                value={formData.deployType}
                                onChange={(option) => handleSelectChange("deployType", option)}
                            />
                        </div>
                    </div>
                    {/* Conditional Fields Based on Payment Type */}
                    {formData.deployType?.value === "neftrtgs" && (
                        <>
                            {/* Bank Account Details */}
                            <div className="row">
                                <div className="col">
                                    <label className="small-font mb-1">Name</label>
                                    <input type="text" name="name" placeholder="Enter" className="w-100 small-font rounded input-css all-none" value={formData.name} />
                                </div>

                                <div className="col">
                                    <label className="small-font mb-1">Bank Name</label>
                                    <input type="text" name="bankName" placeholder="Enter" className="w-100 small-font rounded input-css all-none" value={formData.bankName} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="small-font mb-1">Account Number</label>
                                    <input type="text" name="accountNumber" placeholder="Enter" className="w-100 small-font rounded input-css all-none" value={formData.accountNumber} />
                                </div>

                                <div className="col">
                                    <label className="small-font mb-1">IFSC Code</label>
                                    <input type="text" name="ifscCode" placeholder="Enter" className="w-100 small-font rounded input-css all-none" value={formData.ifscCode} />
                                </div>
                            </div>
                        </>
                    )}

                    {formData.deployType?.value === "upi" && (
                        <>
                            {/* UPI Details */}
                            <div className="row">
                                <div className="col">
                                    <label className="small-font mb-1">UPI ID</label>
                                    <input
                                        type="text"
                                        name="upiId"
                                        className="w-100 small-font rounded input-css all-none"
                                        placeholder="Enter UPI ID"
                                        value={formData.upiId}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col">
                                    <label className="small-font mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-100 small-font rounded input-css all-none"
                                        placeholder="Enter Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
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
