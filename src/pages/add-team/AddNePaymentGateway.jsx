// import React, { useState, useEffect } from "react";
// import { Images } from "../../images";
// import AddPaymentGatewayPopup from "./popups/AddPaymentGatewayPopup";
// import ConfirmationPopup from "../popups/ConfirmationPopup";
// import { getDirectorAccountDetails, getCountries, suspendDirectorAccountPaymentDetails, getDirectorAccountById } from '../../../src/api/apiMethods'
// import Select from "react-select";
// import { customStyles } from "../../components/ReactSelectStyles";

// const AddNePaymentGateway = () => {
//     const [onAddPaymentGateway, setOnAddPaymentGateway] = useState(false)
//     const [onBlockPopup, setOnBlockPopup] = useState(false)
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [accountList, setAccountList] = useState([]);
//     const [countries, setCountries] = useState([]);
//     const [paymentId, setPaymentId] = useState(null);
//     const [statusId, setStatusId] = useState(null);
//     const [editMode, setEditMode] = useState(false)
//     const [editData, setEditData] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState("1");
//     const getDirectorAccountData = () => {
//         setLoading(true);
//         getDirectorAccountDetails()
//             .then((response) => {
//                 console.log("getDirectorAccountDetails success", response.data);
//                 setAccountList(response.data);
//             })
//             .catch((error) => {
//                 setError(error?.message);
//                 console.log("getDirectorAccountDetails error", error);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };
//     useEffect(() => {
//         getDirectorAccountData();
//     }, []);

//     const gatewayTypeMap = {
//         1: "NEFT/RTGS",
//         2: "UPI",
//         3: "QR Code"
//     };


//     const getCountry = () => {
//         setLoading(true);
//         getCountries()
//             .then((response) => {
//                 // console.log("getCountries success", response.data);
//                 setCountries(response.data);
//             })
//             .catch((error) => {
//                 setError(error?.message);
//                 // console.log("getCountries error", error);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };
//     useEffect(() => {
//         getCountry();
//     }, []);

//     const getCountryName = (id) => {
//         const country = countries.find((c) => c.id === id);
//         return country ? country.name : "Unknown";
//     };

//     const getCurrencySymbol = (id) => {
//         const country = countries.find((c) => c.id === id);
//         return country ? `${country.currency_symbol} ${country.currency_name}` : "N/A";
//     };

//     const formatDate = (isoDate) => {
//         if (!isoDate) return "N/A";
//         const date = new Date(isoDate);
//         return date.toLocaleDateString("en-GB"); 
//     };


//     const handleStatus = (id, status) => {
//         setOnBlockPopup(true);
//         setPaymentId(id);
//         setStatusId(status);

//     }
//     const status_id = statusId === 1 ? 2 : 1;

//     const suspendStatus = () => {
//         suspendDirectorAccountPaymentDetails(paymentId, status_id)
//             .then((response) => {
//                 getDirectorAccountData();
//                 setOnBlockPopup(false);
//             })
//             .catch((error) => {
//                 setError(error.message)
//                 console.log(error);
//             });
//     };
//     const [selectedTab, setSelectedTab] = useState("All Methods");
//     const getSelectedPaymentMethod = () => {
//         const selected = paymentMethodOptions.find(
//             option => option.value === paymentMethod
//         );
//         return selected || null;
//     };
//     const paymentMethodOptions = [
//         { value: "1", label: "NEFT/RTGS" },
//         { value: "2", label: "UPI" },
//         { value: "3", label: "QR Code" },
//     ];
//     const tabNames = [
//         "All Methods",
//         "Recommended Methods",
//         "Bank Transfer",
//         "Payment Gateway",
//         "e-Wallet",
//     ];
//     const cards = [
//         { id: 1, image: Images.phonepe, tag: "Tag 1" },
//         { id: 2, image: Images.phonepe, tag: "Tag 2" },
//         { id: 3, image: Images.phonepe, tag: "Tag 3" },
//         { id: 4, image: Images.phonepe, tag: "Tag 4" },
//         { id: 5, image: Images.phonepe, tag: "Tag 5" },
//         { id: 6, image: Images.phonepe, tag: "Tag 6" },
//         { id: 7, image: Images.phonepe, tag: "Tag 7" },
//     ];


//     return (
//         <div>
//             <div className="row justify-content-between align-items-center mb-3 mt-2">
//                 <h6 className="col-2 yellow-font medium-font mb-0">Add New Gateway</h6>

//                 {/* <div className="col-6 d-flex justify-content-end gap-3 medium-font">
//                     <div className="input-pill d-flex align-items-center rounded-pill px-2 w-50">
//                         <FaSearch size={16} className="grey-clr me-2" />
//                         <input className="small-font all-none" placeholder="Search..." />
//                     </div>

//                     <button className="rounded-pill input-pill blue-font small-font px-2" onClick={() => setOnAddPaymentGateway(true)}>
//                         <FaPlus /> Add New Gateway{" "}
//                     </button>
//                 </div> */}
//             </div>

//             <div className="mt-2 bg-white rounded-md ms-3 ps-2 rounded">
//                 <div className="row mb-3 ">
//                     <div className="col-4">
//                         <label htmlFor="paymentMethod" className="medium-font mb-1">
//                             Currency
//                         </label>
//                         <Select
//                             className="small-font"
//                             options={paymentMethodOptions}
//                             placeholder="Select"
//                             styles={customStyles}
//                             maxMenuHeight={120}
//                             menuPlacement="auto"
//                             value={getSelectedPaymentMethod()}
//                             onChange={(selected) => setPaymentMethod(selected.value)}
//                             isDisabled={editMode}
//                         />
//                     </div>
//                 </div>

//                 <div className="d-flex justify-content-start ms-2">
//                     <div className="row mb-2 col-9 gap-2">
//                         {tabNames.map((tabName, index) => (
//                             <div
//                                 key={index}
//                                 className={`border col text-center py-2 medium-font fw-600 text-nowrap ${selectedTab === tabName ? "saffron-btn2 " : ""
//                                     }`}
//                                 style={{ cursor: "pointer" }}
//                                 onClick={() => setSelectedTab(tabName)}
//                             >
//                                 {tabName}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <hr />
//                 <div className="mb-3">
//                     <h1 className="large-font fw-600">Recommended Methods</h1>
//                     <div className="row g-1">
//                         {cards.map((card) => (
//                             <div key={card.id} className="col-2">
//                                 <div className="card h-100">
//                                     <div
//                                         className="card-img-top d-flex align-items-center justify-content-center"
//                                         style={{
//                                             height: "80%",
//                                             overflow: "hidden",
//                                             backgroundColor: "#F5F7FF"
//                                         }}

//                                     >
//                                         <img
//                                             src={card.image}
//                                             alt={`Card ${card.id}`}
//                                             className="w-60 h-100"
//                                             style={{ objectFit: "contain", objectPosition: "center" }}
//                                         />
//                                     </div>
//                                     <div
//                                         className="card-body d-flex align-items-center justify-content-center tag-bg"
//                                         style={{
//                                             height: "20%",
//                                             color: "#fff"
//                                         }}
//                                     >
//                                         <span className="text-center large-font">{card.tag}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="mb-3">
//                     <h1 className="large-font fw-600">Bank Transfer</h1>
//                     <div className="row g-1">
//                         {cards.map((card) => (
//                             <div key={card.id} className="col-2">
//                                 <div className="card h-100">
//                                     <div
//                                         className="card-img-top d-flex align-items-center justify-content-center"
//                                         style={{
//                                             height: "80%",
//                                             overflow: "hidden",
//                                             backgroundColor: "#F5F7FF"
//                                         }}
//                                     >
//                                         <img
//                                             src={card.image}
//                                             alt={`Card ${card.id}`}
//                                             className="w-60 h-100"
//                                             style={{ objectFit: "contain", objectPosition: "center" }}
//                                         />
//                                     </div>
//                                     <div
//                                         className="card-body d-flex align-items-center justify-content-center tag-bg"
//                                         style={{
//                                             height: "20%",
//                                             color: "#fff"
//                                         }}
//                                     >
//                                         <span className="text-center large-font">{card.tag}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="mb-3">
//                     <h1 className="large-font fw-600">E-Wallets</h1>
//                     <div className="row g-1">
//                         {cards.map((card) => (
//                             <div key={card.id} className="col-2">
//                                 <div className="card h-100">
//                                     <div
//                                         className="card-img-top d-flex align-items-center justify-content-center"
//                                         style={{
//                                             height: "80%",
//                                             overflow: "hidden",
//                                             backgroundColor: "#F5F7FF"
//                                         }}
//                                     >
//                                         <img
//                                             src={card.image}
//                                             alt={`Card ${card.id}`}
//                                             className="w-60 h-100"
//                                             style={{ objectFit: "contain", objectPosition: "center" }}
//                                         />
//                                     </div>
//                                     <div
//                                         className="card-body d-flex align-items-center justify-content-center tag-bg"
//                                         style={{
//                                             height: "20%",
//                                             color: "#fff"
//                                         }}
//                                     >
//                                         <span className="text-center large-font">{card.tag}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="mb-3">
//                     <h1 className="large-font fw-600">Payment Gateway</h1>
//                     <div className="row g-1">
//                         {cards.map((card) => (
//                             <div key={card.id} className="col-2">
//                                 <div className="card h-100">
//                                     <div
//                                         className="card-img-top d-flex align-items-center justify-content-center"
//                                         style={{
//                                             height: "80%",
//                                             overflow: "hidden",
//                                             backgroundColor: "#F5F7FF"
//                                         }}
//                                     >
//                                         <img
//                                             src={card.image}
//                                             alt={`Card ${card.id}`}
//                                             className="w-60 h-100"
//                                             style={{ objectFit: "contain", objectPosition: "center" }}
//                                         />
//                                     </div>
//                                     <div
//                                         className="card-body d-flex align-items-center justify-content-center tag-bg"
//                                         style={{
//                                             height: "20%",
//                                             color: "#fff"
//                                         }}
//                                     >
//                                         <span className="text-center large-font">{card.tag}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <AddPaymentGatewayPopup
//                 show={onAddPaymentGateway}
//                 onHide={() => {
//                     setOnAddPaymentGateway(false);
//                     setEditMode(false);

//                 }}
//                 data={countries}
//                 getDirectorAccountData={getDirectorAccountData}
//                 editMode={editMode}
//                 editData={editData}
//                 setEditMode={setEditMode}
//             />

//             <ConfirmationPopup
//                 confirmationPopupOpen={onBlockPopup}
//                 setConfirmationPopupOpen={() => setOnBlockPopup(false)}
//                 discription={`are you sure you want to ${statusId === 1 ? "In-Active" : "Active"} this Gateway?`}
//                 submitButton={`${statusId === 1 ? "In-Active" : "Active"}`}
//                 onSubmit={suspendStatus}
//             />

//         </div >
//     );
// };

// export default AddNePaymentGateway;
import React, { useState, useEffect } from "react";
import { Images } from "../../images";
import AddPaymentGatewayPopup from "./popups/AddPaymentGatewayPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { getDirectorAccountDetails, getCountries, suspendDirectorAccountPaymentDetails, getDirectorAccountById } from '../../../src/api/apiMethods';
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import NoDataFound from "./NoDataFound"; 

const AddNePaymentGateway = () => {
    const [onAddPaymentGateway, setOnAddPaymentGateway] = useState(false);
    const [onBlockPopup, setOnBlockPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accountList, setAccountList] = useState([]);
    const [countries, setCountries] = useState([]);
    const [paymentId, setPaymentId] = useState(null);
    const [statusId, setStatusId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState('');
    const [paymentMethod, setPaymentMethod] = useState("1");
    const [selectedTab, setSelectedTab] = useState("All Methods");

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
                setCountries(response.data);
            })
            .catch((error) => {
                setError(error?.message);
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

    const getCurrencySymbol = (id) => {
        const country = countries.find((c) => c.id === id);
        return country ? `${country.currency_symbol} ${country.currency_name}` : "N/A";
    };

    const formatDate = (isoDate) => {
        if (!isoDate) return "N/A";
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-GB");
    };

    const handleStatus = (id, status) => {
        setOnBlockPopup(true);
        setPaymentId(id);
        setStatusId(status);
    };

    const status_id = statusId === 1 ? 2 : 1;

    const suspendStatus = () => {
        suspendDirectorAccountPaymentDetails(paymentId, status_id)
            .then((response) => {
                getDirectorAccountData();
                setOnBlockPopup(false);
            })
            .catch((error) => {
                setError(error.message);
                console.log(error);
            });
    };

    const getSelectedPaymentMethod = () => {
        const selected = paymentMethodOptions.find(
            option => option.value === paymentMethod
        );
        return selected || null;
    };

    const paymentMethodOptions = [
        { value: "1", label: "NEFT/RTGS" },
        { value: "2", label: "UPI" },
        { value: "3", label: "QR Code" },
    ];

    const tabNames = [
        "All Methods",
        "Recommended Methods",
        "Bank Transfer",
        "Payment Gateway",
        "e-Wallet",
    ];

    const cards = [
        { id: 1, image: Images.phonepe, tag: "Tag 1" },
        { id: 2, image: Images.phonepe, tag: "Tag 2" },
        { id: 3, image: Images.phonepe, tag: "Tag 3" },
        { id: 4, image: Images.phonepe, tag: "Tag 4" },
        { id: 5, image: Images.phonepe, tag: "Tag 5" },
        { id: 6, image: Images.phonepe, tag: "Tag 6" },
        { id: 7, image: Images.phonepe, tag: "Tag 7" },
    ];

    // Check if there are no records for the selected currency
    const hasNoRecords = accountList.length === 0;

    return (
        <div>
            <div className="row justify-content-between align-items-center mb-3 mt-2">
                <h6 className="col-2 yellow-font medium-font mb-0">Add New Gateway</h6>
            </div>

            <div className="mt-2 bg-white rounded-md ms-3 ps-2 rounded">
                <div className="row mb-3">
                    <div className="col-4">
                        <label htmlFor="paymentMethod" className="medium-font mb-1">
                            Currency
                        </label>
                        <Select
                            className="small-font"
                            options={paymentMethodOptions}
                            placeholder="Select"
                            styles={customStyles}
                            maxMenuHeight={120}
                            menuPlacement="auto"
                            value={getSelectedPaymentMethod()}
                            onChange={(selected) => setPaymentMethod(selected.value)}
                            isDisabled={editMode}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-start ms-2">
                    <div className="row mb-2 col-9 gap-2">
                        {tabNames.map((tabName, index) => (
                            <div
                                key={index}
                                className={`border col text-center py-2 medium-font fw-600 text-nowrap ${selectedTab === tabName ? "saffron-btn2 " : ""
                                    }`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedTab(tabName)}
                            >
                                {tabName}
                            </div>
                        ))}
                    </div>
                </div>
                <hr />

                {/* Conditionally render NoDataFound or the cards */}
                {hasNoRecords ? (
                    <NoDataFound />
                ) : (
                    <>
                        <div className="mb-3">
                            <h1 className="large-font fw-600">Recommended Methods</h1>
                            <div className="row g-1">
                                {cards.map((card) => (
                                    <div key={card.id} className="col-2">
                                        <div className="card h-100">
                                            <div
                                                className="card-img-top d-flex align-items-center justify-content-center"
                                                style={{
                                                    height: "80%",
                                                    overflow: "hidden",
                                                    backgroundColor: "#F5F7FF"
                                                }}
                                            >
                                                <img
                                                    src={card.image}
                                                    alt={`Card ${card.id}`}
                                                    className="w-60 h-100"
                                                    style={{ objectFit: "contain", objectPosition: "center" }}
                                                />
                                            </div>
                                            <div
                                                className="card-body d-flex align-items-center justify-content-center tag-bg"
                                                style={{
                                                    height: "20%",
                                                    color: "#fff"
                                                }}
                                            >
                                                <span className="text-center large-font">{card.tag}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-3">
                            <h1 className="large-font fw-600">Bank Transfer</h1>
                            <div className="row g-1">
                                {cards.map((card) => (
                                    <div key={card.id} className="col-2">
                                        <div className="card h-100">
                                            <div
                                                className="card-img-top d-flex align-items-center justify-content-center"
                                                style={{
                                                    height: "80%",
                                                    overflow: "hidden",
                                                    backgroundColor: "#F5F7FF"
                                                }}
                                            >
                                                <img
                                                    src={card.image}
                                                    alt={`Card ${card.id}`}
                                                    className="w-60 h-100"
                                                    style={{ objectFit: "contain", objectPosition: "center" }}
                                                />
                                            </div>
                                            <div
                                                className="card-body d-flex align-items-center justify-content-center tag-bg"
                                                style={{
                                                    height: "20%",
                                                    color: "#fff"
                                                }}
                                            >
                                                <span className="text-center large-font">{card.tag}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-3">
                            <h1 className="large-font fw-600">E-Wallets</h1>
                            <div className="row g-1">
                                {cards.map((card) => (
                                    <div key={card.id} className="col-2">
                                        <div className="card h-100">
                                            <div
                                                className="card-img-top d-flex align-items-center justify-content-center"
                                                style={{
                                                    height: "80%",
                                                    overflow: "hidden",
                                                    backgroundColor: "#F5F7FF"
                                                }}
                                            >
                                                <img
                                                    src={card.image}
                                                    alt={`Card ${card.id}`}
                                                    className="w-60 h-100"
                                                    style={{ objectFit: "contain", objectPosition: "center" }}
                                                />
                                            </div>
                                            <div
                                                className="card-body d-flex align-items-center justify-content-center tag-bg"
                                                style={{
                                                    height: "20%",
                                                    color: "#fff"
                                                }}
                                            >
                                                <span className="text-center large-font">{card.tag}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-3">
                            <h1 className="large-font fw-600">Payment Gateway</h1>
                            <div className="row g-1">
                                {cards.map((card) => (
                                    <div key={card.id} className="col-2">
                                        <div className="card h-100">
                                            <div
                                                className="card-img-top d-flex align-items-center justify-content-center"
                                                style={{
                                                    height: "80%",
                                                    overflow: "hidden",
                                                    backgroundColor: "#F5F7FF"
                                                }}
                                            >
                                                <img
                                                    src={card.image}
                                                    alt={`Card ${card.id}`}
                                                    className="w-60 h-100"
                                                    style={{ objectFit: "contain", objectPosition: "center" }}
                                                />
                                            </div>
                                            <div
                                                className="card-body d-flex align-items-center justify-content-center tag-bg"
                                                style={{
                                                    height: "20%",
                                                    color: "#fff"
                                                }}
                                            >
                                                <span className="text-center large-font">{card.tag}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
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

export default AddNePaymentGateway;