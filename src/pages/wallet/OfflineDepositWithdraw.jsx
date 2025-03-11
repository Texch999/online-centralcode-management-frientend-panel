import React, { useEffect, useState } from "react";
import Table from "../../components/Table"; // Common Table component
import { customStyles } from "../../components/ReactSelectStyles";
import Select from "react-select";
import { currencyConvert } from "../../utils/currEchange";
import { ManagementOfflineDepositeTicketCreation, ManagementOfflineWithdrawTicketCreation, ownerDowlineDirAndSADetails } from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { rceil } from "../../utils/mathFunctions";
import SuccessPopup from "../popups/SuccessPopup";
import { useSearchParams } from "react-router-dom";

function OfflineDepositWithdraw() {
  const [activeSport, setActiveSport] = useState("Sports & Casino");
  const [dirAndSADetails, setDirAndSADetails] = useState([]);
  const [actionType, setActionType] = useState([]);
  const [apiErrors, setApiErrors] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false)
  const [discription, setDiscription] = useState("")
  const [errors, setErrors] = useState({});
  const [totalRecords, setTotalRecords] = useState(null)
  const [duration, setDuration] = useState("")
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    adminWeb: "",
    userWeb: "",
    inrChips: 0,
    InrAmont: 0,
    extChips: 0,
    selectedAdminSiteId: null,
    selectedUserSiteId: null,
    selectedCommissionType: null,
  });
  const [isCredit, setIsCredit] = useState(false); // State for credit checkbox
  const [creditAmount, setCreditAmount] = useState(0);
  const SPORTS_BUTTONS = ["Sports & Casino", "Sports", "Casino"];
  const allCountries = useSelector((state) => state?.allCountries);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = 4
  const limit = itemsPerPage
  const offset = (currentPage - 1) * itemsPerPage
  const durationOptions = [
    { value: 30, label: "30day" },
    { value: 90, label: "90day" },
    { value: 180, label: "180day" },
    { value: 365, label: "365day" },
  ]
  useEffect(() => {
    fetchOwnerDownlineDirectorAndSuperAdminDetails(limit, offset);
  }, []);

  const fetchOwnerDownlineDirectorAndSuperAdminDetails = async (limit, offset) => {
    try {
      const response = await ownerDowlineDirAndSADetails({ limit, offset });
      if (response?.list?.length > 0) {
        setDirAndSADetails(response.list);
        setTotalRecords(response.count)
      } else {
        setDirAndSADetails([]);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  // Handle sport button click
  const handleSportClick = (sport) => {
    setActiveSport(sport);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Get currency name by ID
  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name;
  };

  // Get currency exchange rate by ID
  const getCurrencyRate = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.exchange;
  };

  // Admin site dropdown component
  const AdminSiteDropdown = ({ options, onChange, value }) => (
    <Select
      className="small-font white-bg input-border rounded text-capitalize text-nowrap"
      placeholder="Select Admin Website"
      styles={customStyles}
      menuPortalTarget={document.body}
      onChange={(option) => onChange(option.value)}
      options={options}
      value={value}
      maxMenuHeight={120}
      menuPlacement="auto"
    />
  );

  // User site dropdown component
  const UserSiteDropdown = ({ options, onChange, value }) => (
    <Select
      className="small-font white-bg input-border rounded text-capitalize text-nowrap"
      placeholder="Select User Website"
      styles={customStyles}
      menuPortalTarget={document.body}
      onChange={(option) => onChange(option.value)}
      options={options}
      value={value}
      maxMenuHeight={120}
      menuPlacement="auto"
    />
  );

  // Action buttons component
  const ActionButtons = ({ onDeposit, onWithdraw }) => (
    <div className="d-flex flex-row justify-content-center align-items-center">
      <button className="me-3 dark-green-bg px-3" onClick={onDeposit}>
        D/C
      </button>
      <button className="me-3 saffron-btn2 px-3" onClick={onWithdraw}>
        W
      </button>
    </div>
  );

  const handleAdminSiteChange = (index, adminSiteId) => {
    const newData = [...dirAndSADetails];
    const selectedAdmin = newData[index].adminSName.find(
      (site) => site.id === adminSiteId
    );

    if (!selectedAdmin) {
      console.error("Admin site not found:", adminSiteId);
      return;
    }

    newData[index].selectedAdminSite = adminSiteId;
    newData[index].selectedAdminName = selectedAdmin.name;
    newData[index].selectedUserSite = null;
    newData[index].availableUserSites = selectedAdmin.list || [];

    // Update selected admin site ID in state
    setInputData((prevData) => ({
      ...prevData,
      selectedAdminSiteId: adminSiteId,
    }));

    setDirAndSADetails(newData);
  };

  const handleUserSiteChange = (index, userSiteId) => {
    const newData = [...dirAndSADetails];
    const selectedUser = newData[index]?.availableUserSites?.find(
      (user) => user.website_access_id === userSiteId
    );

    if (!selectedUser) {
      console.error("User site not found:", userSiteId);
      return;
    }

    newData[index].selectedUserSite = userSiteId;
    newData[index].selectedUserDetails = selectedUser;
    console.log(newData[index].selectedUserSite, "===> newData[index].selectedUserSite")
    // Update selected user site ID and commission type in state
    setInputData((prevData) => ({
      ...prevData,
      selectedUserSiteId: userSiteId,
      selectedCommissionType: selectedUser.commission_type, // Store commission type
    }));

    setDirAndSADetails(newData);
  };

  // Toggle child row visibility
  const toggleChildRow = (index, action) => {
    setDirAndSADetails((prevData) =>
      prevData.map((row, i) => ({
        ...row,
        showChildRow: i === index ? !row.showChildRow : false,
      }))
    );
    setInputData({
      inrChips: 0,
      extChips: 0,
    });
    setCreditAmount(0);
    setActionType(action)
    setErrors({})
    setApiErrors(null);
  };

  // Calculate paid amount based on commission type
  const calculatePaidAmount = (amount, percentage) => {
    return percentage !== undefined ? amount * (percentage / 100) : amount;
  };

  // Table columns
  const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
    { header: "UID", field: "uid" },
    { header: "Details", field: "details" },
    { header: "Chips", field: "usdChips" },
    { header: <div className="text-center">Action</div>, field: "action" },
  ];

  const validateForm = (siteData) => {
    const newErrors = {};

    // Validate Admin Panel ID
    if (!siteData?.selectedUserDetails?.admin_panel_id) {
      newErrors.adminWebsiteId = "Please select an Admin Panel ID";
    }

    // Validate User Panel ID
    if (!siteData?.selectedUserDetails?.user_paner_id) {
      newErrors.userPanelId = "Please select a User Panel ID";
    }

    // Validate INR Chips
    if (!inputData?.inrChips || inputData?.inrChips <= 0) {
      newErrors.inrChips = "INR Chips value is required";
    }
    if (!inputData?.inrChips || inputData?.inrChips <= 0) {
      newErrors.inrChips = "INR Chips value is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (siteData) => {
  //   if (!validateForm(siteData)) return
  //   const payload = {
  //     adminPanelId: siteData?.selectedUserDetails?.admin_panel_id,
  //     userPanelId: siteData?.selectedUserDetails?.user_paner_id,
  //     currency: siteData?.currency_id,
  //     selctChips: (inputData.inrChips ? currencyConvert(
  //       Number(inputData.inrChips),
  //       getCurrencyRate(107),
  //       getCurrencyRate(siteData?.currency_id)
  //     ) : 0),

  //   };

  //   if (siteData?.selectedUserDetails?.commission_type === 1 && actionType !== "WITHDRAW") {
  //     payload.selctSpcChips = (inputData.extChips ? currencyConvert(
  //       Number(inputData.extChips),
  //       getCurrencyRate(107),
  //       getCurrencyRate(siteData?.currency_id)
  //     ) : 0)

  //     payload.paidAmount = rceil((inputData.inrChips ? (
  //       currencyConvert(
  //         Number(inputData.inrChips),
  //         getCurrencyRate(107),
  //         getCurrencyRate(siteData?.currency_id)
  //       ) *
  //       (siteData.selectedUserDetails?.commission_type === 1
  //         ? siteData.selectedUserDetails?.chip_percentage / 100
  //         : siteData.selectedUserDetails?.share / 100)
  //     ) : 0) +
  //       (inputData.extChips ? currencyConvert(
  //         Number(inputData.extChips),
  //         getCurrencyRate(107),
  //         getCurrencyRate(siteData?.currency_id)
  //       ) : 0), -3)
  //   } else {
  //     payload.paidAmount = rceil((inputData.inrChips ? (
  //       currencyConvert(
  //         Number(inputData.inrChips),
  //         getCurrencyRate(107),
  //         getCurrencyRate(siteData?.currency_id)
  //       ) *
  //       (siteData.selectedUserDetails?.commission_type === 1
  //         ? siteData.selectedUserDetails?.chip_percentage / 100
  //         : siteData.selectedUserDetails?.share / 100)
  //     ) : 0), -3)

  //   }
  //   let apiCall
  //   if (actionType === "DEPOSIT") {
  //     apiCall = ManagementOfflineDepositeTicketCreation

  //   } else {
  //     apiCall = ManagementOfflineWithdrawTicketCreation
  //   }
  //   apiCall(siteData?.id, payload)
  //     .then((response) => {
  //       if (response?.status === true) {
  //         setSuccessPopupOpen(true);
  //         setDiscription(`${actionType === "DEPOSIT" ? "Deposit" : "WIthdraw"} Created Successfully`)
  //         setInputData({
  //           inrChips: 0,
  //           extChips: 0,
  //         });
  //         setApiErrors(null);
  //         setErrors({})
  //       } else {
  //         setApiErrors(response?.errors || "Deposit failed. Please try again.");
  //       }
  //     })
  //     .catch((error) => {
  //       setApiErrors(error?.errors || error?.message || "API request failed");
  //     });
  // }

  const handleSubmit = (siteData) => {
    if (!validateForm(siteData)) return;

    // Calculate the total amount based on INR chips and currency conversion
    const totalChips = inputData.inrChips
      ? currencyConvert(
        Number(inputData.inrChips),
        getCurrencyRate(107),
        getCurrencyRate(siteData?.currency_id)
      )
      : 0;

    // Calculate the paid amount based on commission type
    const paidAmount = rceil(
      totalChips *
      (siteData.selectedUserDetails?.commission_type === 1
        ? siteData.selectedUserDetails?.chip_percentage / 100
        : siteData.selectedUserDetails?.share / 100),
      -3
    );

    // Adjust the paid amount if credit is selected
    const finalPaidAmount = isCredit ? paidAmount - creditAmount : paidAmount;

    const payload = {
      adminPanelId: siteData?.selectedUserDetails?.admin_panel_id,
      userPanelId: siteData?.selectedUserDetails?.user_paner_id,
      currency: siteData?.currency_id,
      selctChips: totalChips,
      TotalPaidAmount: paidAmount,
      // Pass 1 if credit is selected, otherwise 2
      // creditAmount: isCredit ? creditAmount : 0, // Pass credit amount if credit is selected
    };
    if (isCredit && actionType !== "WITHDRAW") {
      payload.isCredit = isCredit ? 1 : 2
      payload.paidAmount = finalPaidAmount
      payload.creditAmount = creditAmount
    }

    // Add extra chips data if commission type is 1 and action is not WITHDRAW
    if (siteData?.selectedUserDetails?.commission_type === 1 && actionType !== "WITHDRAW") {
      payload.duration = duration
      payload.paidAmount = rceil(
        (inputData.inrChips
          ? currencyConvert(
            Number(inputData.inrChips),
            getCurrencyRate(107),
            getCurrencyRate(siteData?.currency_id)
          ) *
          (siteData.selectedUserDetails?.commission_type === 1
            ? siteData.selectedUserDetails?.chip_percentage / 100
            : siteData.selectedUserDetails?.share / 100)
          : 0) +
        (inputData.extChips
          ? currencyConvert(
            Number(inputData.extChips),
            getCurrencyRate(107),
            getCurrencyRate(siteData?.currency_id)
          )
          : 0),
        -3
      );
    }

    let apiCall;
    if (actionType === "DEPOSIT") {
      apiCall = ManagementOfflineDepositeTicketCreation;
    } else {
      apiCall = ManagementOfflineWithdrawTicketCreation;
    }
    setLoading(true)
    apiCall(siteData?.id, payload)
      .then((response) => {
        if (response?.status === true) {
          setSuccessPopupOpen(true);
          setDiscription(`${actionType === "DEPOSIT" ? "Deposit" : "Withdraw"} Created Successfully`);
          setInputData({
            inrChips: 0,
            extChips: 0,
          });
          setApiErrors(null);
          setLoading(false)
          setErrors({});
        } else if (response?.status == 422) {
          setLoading(false)
          setApiErrors(response?.errors || "Deposit failed. Please try again.");
        }
      })
      .catch((error) => {
        setLoading(false)
        setApiErrors(error?.message || "API request failed");
      });
  };

  const handleCancel = (index) => {
    setDirAndSADetails((prevData) =>
      prevData.map((row, i) => ({
        ...row,
        showChildRow: i === index ? !row.showChildRow : false,
      }))
    );
    setInputData({
      inrChips: 0,
      extChips: 0,
    });
    setErrors({})
    setApiErrors(null);
  }

  // Prepare table data
  const tableData = dirAndSADetails.map((row, index) => {
    const adminSites = row.adminSName.map((admin) => ({
      label: admin.name,
      value: admin.id,
      userSites: admin?.list.map((user) => ({
        label: user.usrPnl || `User ${user.website_access_id}`,
        value: user.website_access_id,
        chipsData: user,
      })),
    }));

    return {
      ...row,
      uid: <div>{`${row.name}`}</div>,
      details: (
        <div className="w-100">
          <div className="row col-12">
            <div className="col-5">
              <AdminSiteDropdown
                options={adminSites}
                onChange={(value) => handleAdminSiteChange(index, value)}
                value={
                  row.selectedAdminSite && row.selectedAdminName
                    ? {
                      value: row.selectedAdminSite,
                      label: row.selectedAdminName,
                    }
                    : null
                }
              />
              {errors.adminWebsiteId && <p className="text-danger small-font">{errors.adminWebsiteId}</p>}
            </div>
            <div className="col-6">
              <UserSiteDropdown
                options={
                  row.selectedAdminSite
                    ? adminSites.find((a) => a.value === row.selectedAdminSite)
                      ?.userSites
                    : []
                }
                onChange={(value) => handleUserSiteChange(index, value)}
                value={
                  row.selectedUserSite
                    ? {
                      label:
                        row.selectedUserDetails.commission_type !== 1
                          ? `${row.selectedUserDetails?.usrPnl}/ Share ${row.selectedUserDetails?.share}% - ${getCurrency(row?.currency_id)}`
                          : `${row.selectedUserDetails?.usrPnl}/ Rental ${row.selectedUserDetails?.chip_percentage}% - Ext- Chip ${row.selectedUserDetails?.extra_chips_percentage}% - ${getCurrency(row?.currency_id)}`,
                      value: row.selectedUserSite,
                    }
                    : null
                }
              />
              {errors.userPanelId && <p className="text-danger small-font">{errors.userPanelId}</p>}
            </div>
          </div>
          {row.showChildRow && (
            <div className="w-100 d-flex flex-column justify-content-start p-2 mt-2 border-top">
              {/* Avl D/W and Exposure Section */}
              <div className="d-flex flex-row justify-content-between align-items-center col-4">
                <div className="black-text2">
                  Avl D/W:
                  <span className="black-text2 medium-font fw-600">
                    {" "}
                    {row.selectedUserDetails?.commission_type === 1
                      ? row.selectedUserDetails?.inrSportChips 
                        ? Number(row.selectedUserDetails?.inrSportChips).toFixed(2)
                        : 0
                      : row.selectedUserDetails
                        ? Number(row.selectedUserDetails?.inrChips).toFixed(2)
                        : 0}
                  </span>
                </div>
                <div className="ps-2 black-text2">
                  Exposure: <span className="black-text2 medium-font fw-600">0</span>
                </div>
              </div>

              <div className="d-flex flex-column mt-2">
                <div className={`d-flex flex-column flex-md-row align-items-center gap-2 ${errors.inrChips ? "mb-4" : "mb-2"}`}>
                  {/* Enter Chips in INR */}
                  <div className="flex-grow-1 w-100 position-relative">
                    <label>Enter Chips in INR </label>
                    <input
                      type="text"
                      name="inrChips"
                      className="small-font input-css all-none rounded white-bg input-border w-100"
                      placeholder="Enter Chips"
                      onChange={handleInputChange}
                      value={Number(inputData.inrChips)}
                    />
                    {errors.inrChips && (
                      <p className="text-danger small-font position-absolute mt-1">
                        {errors.inrChips}
                      </p>
                    )}
                  </div>

                  {/* Paid Amt In INR */}
                  <div className="flex-grow-1 w-100 position-relative">
                    <label>
                      Paid Amt In INR -{" "}
                      {row.selectedUserDetails?.commission_type === 1
                        ? row.selectedUserDetails?.chip_percentage
                        : row.selectedUserDetails?.share}
                      %:
                    </label>
                    <input
                      type="text"
                      className="small-font input-css all-none rounded white-bg input-border input-cevent-stop w-100"
                      placeholder="Enter Chips"
                      value={
                        inputData.inrChips
                          ? calculatePaidAmount(
                            Number(inputData.inrChips),
                            row.selectedUserDetails?.commission_type === 1
                              ? row.selectedUserDetails?.chip_percentage
                              : row.selectedUserDetails?.share
                          ).toFixed(2)
                          : 0
                      }
                      readOnly
                    />
                  </div>

                  {/* Chips in Currency */}
                  <div className="flex-grow-1 w-100 position-relative">
                    <label>Chips In {getCurrency(row?.currency_id)}</label>
                    <input
                      type="text"
                      className="small-font input-css all-none rounded white-bg input-border input-cevent-stop w-100"
                      placeholder="Enter Chips"
                      value={
                        inputData.inrChips
                          ? currencyConvert(
                            Number(inputData.inrChips),
                            getCurrencyRate(107),
                            getCurrencyRate(row?.currency_id)
                          ).toFixed(4)
                          : 0
                      }
                      readOnly
                    />
                  </div>

                  {/* Paid Amt in Currency */}
                  <div className="flex-grow-1 w-100 position-relative">
                    <label>
                      Paid Amt {getCurrency(row?.currency_id)} -{" "}
                      {row.selectedUserDetails?.commission_type === 1
                        ? row.selectedUserDetails?.chip_percentage
                        : row.selectedUserDetails?.share}
                      %
                    </label>
                    <input
                      type="text"
                      className="small-font input-css all-none rounded white-bg input-border input-cevent-stop w-100"
                      placeholder="Enter Chips"
                      value={
                        inputData.inrChips
                          ? (
                            currencyConvert(
                              Number(inputData.inrChips),
                              getCurrencyRate(107),
                              getCurrencyRate(row?.currency_id)
                            ) *
                            (row.selectedUserDetails && row.selectedUserDetails?.commission_type === 1
                              ? row.selectedUserDetails?.chip_percentage / 100
                              : row.selectedUserDetails?.share / 100)
                          ).toFixed(4)
                          : 0
                      }
                      readOnly
                    />
                  </div>
                </div>

                {/* Extra Chips Section (Conditional) */}
                {actionType !== "WITHDRAW" &&
                  row.selectedUserDetails?.commission_type == 1 ? (
                  <div className="d-flex flex-column flex-md-row align-items-center mb-2 gap-2">
                    {/* Enter Ext Sp Chips */}
                    <div className="flex-grow-1 w-100 position-relative">
                      <label className="text-nowrap">Duration</label>
                      <Select
                        className="small-font white-bg input-border rounded text-capitalize text-nowrap"
                        placeholder="Select Duration"
                        styles={customStyles}
                        onChange={(option) => setDuration(option.value)} // Set selected value
                        options={durationOptions}
                        value={durationOptions.find((option) => option.value === duration)} // Show selected value
                        maxMenuHeight={120}
                        menuPlacement="auto"
                      />
                    </div>
                    <div className="flex-grow-1 w-100 position-relative d-flex align-items-center">
                      <input
                        type="checkbox"
                        checked={isCredit}
                        onChange={(e) => setIsCredit(e.target.checked)}
                        className="me-2"
                      />
                      <label>Is Credit</label>
                    </div>

                    {isCredit && (
                      <>
                        <div className="flex-grow-1 w-100 position-relative">
                          <label>Credit Amount</label>
                          <input
                            type="text"
                            className="small-font input-css all-none rounded white-bg input-border input-cevent-stop w-100"
                            placeholder="Enter Credit Amount"
                            value={Number(creditAmount)}
                            onChange={(e) => setCreditAmount(Number(e.target.value))}
                          />
                        </div>
                        <div className="flex-grow-1 w-100 position-relative">
                          <label>
                            Paid Amt In {getCurrency(row?.currency_id)} -{" "}
                            {row.selectedUserDetails?.chip_percentage}%
                          </label>
                          <input
                            type="text"
                            className="small-font input-css all-none rounded white-bg input-border input-cevent-stop w-100"
                            placeholder="Paid Amount"
                            // value={
                            //   isCredit && inputData.inrChips
                            //   && (
                            //     calculatePaidAmount(
                            //       Number(inputData.inrChips),
                            //       row.selectedUserDetails?.chip_percentage
                            //     ) - Number(creditAmount)
                            //   ).toFixed(2)
                            // }
                            value={
                              inputData.inrChips
                                ? (
                                  (currencyConvert(
                                    Number(inputData.inrChips),
                                    getCurrencyRate(107),
                                    getCurrencyRate(row?.currency_id)
                                  ) *
                                    (row.selectedUserDetails && row.selectedUserDetails?.commission_type === 1
                                      ? row.selectedUserDetails && row.selectedUserDetails?.chip_percentage / 100 || 0
                                      : row.selectedUserDetails && row.selectedUserDetails?.share / 100 || 0)
                                  ) - Number(creditAmount)).toFixed(4)
                                : (currencyConvert(
                                  Number(inputData.inrChips),
                                  getCurrencyRate(107),
                                  getCurrencyRate(row?.currency_id)
                                ) *
                                  (row.selectedUserDetails && row.selectedUserDetails?.commission_type === 1
                                    ? row.selectedUserDetails && row.selectedUserDetails?.chip_percentage / 100 || 0
                                    : row.selectedUserDetails && row.selectedUserDetails?.share / 100 || 0)
                                )
                            }
                            readOnly
                          />
                        </div>
                      </>
                    )}

                  </div>
                ) : <div className="d-flex flex-row flex-md-row align-items-center mb-2 gap-2">
                  {/* Enter Ext Sp Chips */}
                  {/* <div className="flex-grow-1 w-100 position-relative">
                    <label className="text-nowrap">Duration</label>
                    <Select
                      className="small-font white-bg input-border rounded text-capitalize text-nowrap"
                      placeholder="Select Duration"
                      styles={customStyles}
                      onChange={(option) => setDuration(option.value)} // Set selected value
                      options={durationOptions}
                      value={durationOptions.find((option) => option.value === duration)} // Show selected value
                      maxMenuHeight={120}
                      menuPlacement="auto"
                    />
                  </div> */}
                  <div className="flex-grow-1 w-100 position-relative d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={isCredit}
                      onChange={(e) => setIsCredit(e.target.checked)}
                      className="me-2"
                    />
                    <label>Is Credit</label>
                  </div>

                  {isCredit && (
                    <>
                      <div className="flex-grow-1 w-100 position-relative">
                        <label>Credit Amount</label>
                        <input
                          type="text"
                          className="small-font input-css all-none rounded white-bg input-border input-cevent-stop w-100"
                          placeholder="Enter Credit Amount"
                          value={Number(creditAmount)}
                          onChange={(e) => setCreditAmount(Number(e.target.value))}
                        />
                      </div>
                      <div className="flex-grow-1 w-100 position-relative">
                        <label>
                          Paid Amt In {getCurrency(row?.currency_id)} -{" "}
                          {row.selectedUserDetails?.chip_percentage}%
                        </label>
                        <input
                          type="text"
                          className="small-font input-css all-none rounded white-bg input-border input-cevent-stop w-100"
                          placeholder="Paid Amount"
                          // value={
                          //   isCredit && inputData.inrChips
                          //   && (
                          //     calculatePaidAmount(
                          //       Number(inputData.inrChips),
                          //       row.selectedUserDetails?.chip_percentage
                          //     ) - Number(creditAmount)
                          //   ).toFixed(2)
                          // }
                          value={
                            inputData.inrChips
                              ? (
                                (currencyConvert(
                                  Number(inputData.inrChips),
                                  getCurrencyRate(107),
                                  getCurrencyRate(row?.currency_id)
                                ) *
                                  (row.selectedUserDetails && row.selectedUserDetails?.commission_type === 1
                                    ? row.selectedUserDetails?.chip_percentage / 100
                                    : row.selectedUserDetails?.share / 100)
                                ) - Number(creditAmount)).toFixed(4)
                              : (currencyConvert(
                                Number(inputData.inrChips),
                                getCurrencyRate(107),
                                getCurrencyRate(row?.currency_id)
                              ) *
                                (row.selectedUserDetails && row.selectedUserDetails?.commission_type === 1
                                  ? row.selectedUserDetails?.chip_percentage / 100
                                  : row.selectedUserDetails?.share / 100)
                              )
                          }
                          readOnly
                        />
                      </div>
                    </>
                  )}

                </div>}
              </div>

              {/* Buttons Section */}
              <div className="d-flex flex-row justify-content-end align-items-center">
                <button
                  className="me-3 saffron-btn2 px-3"
                  onClick={() => handleCancel(index)}
                >
                  Cancel
                </button>
                {(actionType === "WITHDRAW" && row.selectedUserDetails?.commission_type === 2) ||
                  (actionType !== "WITHDRAW" && (
                    <button
                      className="me-3 saffron-btn2 px-3"
                      onClick={() => handleSubmit(row)}
                    >
                      {loading ? <> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> <span> {`Submit ...`}</span> </> : "Submit"}
                    </button>
                  ))}
              </div>

              {/* API Errors Section */}
              {apiErrors && (
                <div className="alert alert-danger mt-1">
                  {console.log(apiErrors, "==>apiErrors")}
                  {Array.isArray(apiErrors) ? (
                    <ul className="ps-2 mb-0">
                      {apiErrors.map((error, index) => (
                        <li className="small-font" key={index}>
                          {error.message || error}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="small-font ps-2">{apiErrors.message || apiErrors}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ),
      usdChips: (
        <div>
          {/* {row.selectedUserDetails?.commission_type === 1
            ? (row.selectedUserDetails.inrSportChips  ? Number(row.selectedUserDetails?.inrSportChips).toFixed(2) : 0)
            : row.selectedUserDetails.inrChips ? (Number(row.selectedUserDetails?.inrChips).toFixed(2)) : 0} */}
          {row.selectedUserDetails?.commission_type === 1
            && (row.selectedUserDetails.inrSportChips ? Number(row.selectedUserDetails?.inrSportChips).toFixed(2) : 0)
            || 0}
          <br /> {getCurrency(107)}
        </div>
      ),
      action: (
        <ActionButtons
          onDeposit={() => toggleChildRow(index, "DEPOSIT")}
          onWithdraw={() => toggleChildRow(index, "WITHDRAW")}
        />
      ),
    };
  });

  const handlePageChange = ({ limit, offset }) => {
    fetchOwnerDownlineDirectorAndSuperAdminDetails(limit, offset);
  };

  return (
    <>
      <div>
        <div className="flex-between mb-3 mt-2">
          <h6 className="d-flex yellow-font mb-0">Offline Deposit & Withdraw</h6>
        </div>
        <div className="d-flex small-font mb-3">
          {SPORTS_BUTTONS.map((sport, index) => (
            <div
              key={index}
              className={`me-3 ${activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
                }`}
              onClick={() => handleSportClick(sport)}
            >
              {sport}
            </div>
          ))}
        </div>
        <div className="w-100 grey-bg2 d-flex py-3 rounded mb-3">
          <span className="small-font border-right px-3">Your Balance</span>
          <h6 className="green-font fw-600 mb-0 px-3 border-left2">50000000</h6>
        </div>
        <div style={{ zIndex: "10" }}>
          <Table
            columns={MY_TRANSACTIONS_MANAGEMENT_COLUMNS}
            data={tableData}
            itemsPerPage={itemsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={discription}
        />
      )}
    </>
  );
}

export default OfflineDepositWithdraw;