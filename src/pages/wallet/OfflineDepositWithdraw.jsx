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

  const SPORTS_BUTTONS = ["Sports & Casino", "Sports", "Casino"];
  const allCountries = useSelector((state) => state?.allCountries);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = 4
  const limit = itemsPerPage
  const offset = (currentPage - 1) * itemsPerPage

  useEffect(() => {
    fetchOwnerDownlineDirectorAndSuperAdminDetails(limit, offset);
  }, []);

  // Fetch owner downline director and super admin details
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
      className="small-font white-bg input-border rounded text-capitalize"
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
      className="small-font white-bg input-border rounded text-capitalize"
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
    console.log(action, "======>DEPOSIT")
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
    setActionType(action)
    setErrors({})
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
      newErrors.inrChips = "INR Chips value is required and must be greater than zero";
    }

    // Validate Extended INR Chips (only if commission_type is 1 and actionType is not WITHDRAW)
    if (
      siteData?.selectedUserDetails?.commission_type === 1 &&
      actionType !== "WITHDRAW" &&
      (!inputData?.extChips || inputData?.extChips <= 0)
    ) {
      newErrors.extChips = "Extended INR Chips value is required and must be greater than zero";
    }

    // Set errors in state
    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (siteData) => {
    if (!validateForm(siteData)) return
    const payload = {
      adminPanelId: siteData?.selectedUserDetails?.admin_panel_id,
      userPanelId: siteData?.selectedUserDetails?.user_paner_id,
      currency: siteData?.currency_id,
      selctChips: (inputData.inrChips ? currencyConvert(
        Number(inputData.inrChips),
        getCurrencyRate(107),
        getCurrencyRate(siteData?.currency_id)
      ) : 0),

    };

    if (siteData?.selectedUserDetails?.commission_type === 1 && actionType !== "WITHDRAW") {
      payload.selctSpcChips = (inputData.extChips ? currencyConvert(
        Number(inputData.extChips),
        getCurrencyRate(107),
        getCurrencyRate(siteData?.currency_id)
      ) : 0)

      payload.paidAmount = rceil((inputData.inrChips ? (
        currencyConvert(
          Number(inputData.inrChips),
          getCurrencyRate(107),
          getCurrencyRate(siteData?.currency_id)
        ) *
        (siteData.selectedUserDetails?.commission_type === 1
          ? siteData.selectedUserDetails?.chip_percentage / 100
          : siteData.selectedUserDetails?.share / 100)
      ) : 0) +
        (inputData.extChips ? currencyConvert(
          Number(inputData.extChips),
          getCurrencyRate(107),
          getCurrencyRate(siteData?.currency_id)
        ) : 0), -3)
    } else {
      payload.paidAmount = rceil((inputData.inrChips ? (
        currencyConvert(
          Number(inputData.inrChips),
          getCurrencyRate(107),
          getCurrencyRate(siteData?.currency_id)
        ) *
        (siteData.selectedUserDetails?.commission_type === 1
          ? siteData.selectedUserDetails?.chip_percentage / 100
          : siteData.selectedUserDetails?.share / 100)
      ) : 0), -3)

    }
    let apiCall
    if (actionType === "DEPOSIT") {
      apiCall = ManagementOfflineDepositeTicketCreation

    } else {
      apiCall = ManagementOfflineWithdrawTicketCreation
    }
    apiCall(siteData?.id, payload)
      .then((response) => {
        if (response?.status === true) {
          setSuccessPopupOpen(true);
          setDiscription(`${actionType === "DEPOSIT" ? "Deposit" : "WIthdraw"} Created Successfully`)
          setInputData({
            inrChips: 0,
            extChips: 0,
          });
          setApiErrors(null);
          setErrors({})
        } else {
          setApiErrors(response?.errors || "Deposit failed. Please try again.");
        }
      })
      .catch((error) => {
        setApiErrors(error?.errors || error?.message || "API request failed");
      });
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
      uid: <div>{`${index + 1}. ${row.name}`}</div>,
      details: (
        <div className="w-100">
          {console.log(row, "====>row")}
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
              <div className="d-flex flex-row justify-content-between align-items-center col-4">
                <div className="black-text2">
                  Avl D/W:
                  <span className="black-text2 medium-font fw-600">
                    {" "}{row.selectedUserDetails?.commission_type === 1
                      ? (row.selectedUserDetails ? Number(row.selectedUserDetails?.inrSportChips).toFixed(2) : 0)
                      : (row.selectedUserDetails ? Number(row.selectedUserDetails?.inrChips).toFixed(2) : 0)}
                  </span>
                </div>
                <div className="ps-2 black-text2">
                  Exposure: <span className="black-text2  medium-font fw-600">0</span>
                </div>
              </div>
              <div className="d-flex flex-column mt-2">
                <div className="d-flex align-items-center mb-2 col-12">
                  <div className="row w-100">
                    <div className="col-sm-3">
                      <label>Enter Chips INR</label>
                      <input
                        type="text"
                        name="inrChips"
                        className="small-font input-css all-none rounded white-bg input-border"
                        placeholder="Enter Chips"
                        onChange={handleInputChange}
                        value={inputData.inrChips}
                      />
                      {errors.inrChips && <p className="text-danger small-font">{errors.inrChips}</p>}
                    </div>
                    <div className="col-sm-3">
                      <label>
                        Paid Amount In INR -{" "}
                        {row.selectedUserDetails?.commission_type === 1
                          ? row.selectedUserDetails?.chip_percentage
                          : row.selectedUserDetails?.share}
                        %:
                      </label>
                      <input
                        type="text"
                        className="small-font input-css all-none rounded white-bg input-border input-cevent-stop"
                        placeholder="Enter Chips"
                        value={inputData.inrChips ? calculatePaidAmount(
                          Number(inputData.inrChips),
                          row.selectedUserDetails?.commission_type === 1
                            ? row.selectedUserDetails && row.selectedUserDetails?.chip_percentage
                            : row.selectedUserDetails?.share
                        ).toFixed(2) : 0}
                        readOnly
                      />
                    </div>
                    <div className="col-sm-3">
                      <label>Chips In {getCurrency(row?.currency_id)}</label>
                      <input
                        type="text"
                        className="small-font input-css all-none rounded white-bg input-border input-cevent-stop"
                        placeholder="Enter Chips"
                        value={inputData.inrChips ? currencyConvert(
                          Number(inputData.inrChips),
                          getCurrencyRate(107),
                          getCurrencyRate(row?.currency_id)
                        ).toFixed(4) : 0}
                        readOnly
                      />
                    </div>
                    <div className="col-sm-3">
                      <label>
                        Paid Amount {getCurrency(row?.currency_id)} -{" "}
                        {row.selectedUserDetails?.commission_type === 1
                          ? row.selectedUserDetails?.chip_percentage
                          : row.selectedUserDetails?.share}
                        %
                      </label>
                      <input
                        type="text"
                        className="small-font input-css all-none rounded white-bg input-border input-cevent-stop"
                        placeholder="Enter Chips"
                        value={inputData.inrChips ? (
                          currencyConvert(
                            Number(inputData.inrChips),
                            getCurrencyRate(107),
                            getCurrencyRate(row?.currency_id)
                          ) *
                          (row.selectedUserDetails?.commission_type === 1
                            ? row.selectedUserDetails?.chip_percentage / 100
                            : row.selectedUserDetails?.share / 100)
                        ).toFixed(4) : 0}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                {row.selectedUserDetails?.commission_type === 1 && actionType !== "WITHDRAW" && (
                  <div className="d-flex align-items-center mb-2 col-12">
                    <div className="row w-100">
                      <div className="col-sm-3">
                        <label>INR Ext Sp Chips</label>
                        <input
                          type="text"
                          name="extChips"
                          className="small-font input-css all-none rounded white-bg input-border input-cevent-stop"
                          placeholder="Enter Chips"
                          onChange={handleInputChange}
                          value={inputData.extChips}
                        />

                        {errors.extInrChips && <p className="text-danger small-font">{errors.extChips}</p>}
                      </div>
                      <div className="col-sm-3">
                        <label>
                          Paid Amount In INR{" "}
                          {row.selectedUserDetails?.extra_chips_percentage}%
                        </label>
                        <input
                          type="text"
                          className="small-font input-css all-none rounded white-bg input-border input-cevent-stop"
                          placeholder="Enter Chips"
                          value={inputData.extChips ? calculatePaidAmount(
                            Number(inputData.extChips),
                            row.selectedUserDetails?.extra_chips_percentage
                          ).toFixed(2) : 0}
                          readOnly
                        />
                      </div>
                      <div className="col-sm-3">
                        <label>Chips In {getCurrency(row?.currency_id)}</label>
                        <input
                          type="text"
                          className="small-font input-css all-none rounded white-bg input-border input-cevent-stop"
                          placeholder="Enter Chips"
                          value={inputData.extChips ? currencyConvert(
                            Number(inputData.extChips),
                            getCurrencyRate(107),
                            getCurrencyRate(row?.currency_id)
                          ).toFixed(4) : 0}
                          readOnly
                        />
                      </div>
                      <div className="col-sm-3">
                        <label>
                          Paid Amount In {getCurrency(row?.currency_id)} -{" "}
                          {row.selectedUserDetails?.extra_chips_percentage}%
                        </label>
                        <input
                          type="text"
                          className="small-font input-css all-none rounded white-bg input-border input-cevent-stop"
                          placeholder="Enter Chips"
                          value={inputData.extChips ? (
                            currencyConvert(
                              Number(inputData.extChips),
                              getCurrencyRate(107),
                              getCurrencyRate(row?.currency_id)
                            ) *
                            (row.selectedUserDetails?.extra_chips_percentage / 100)
                          ).toFixed(4) : 0}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {actionType === "WITHDRAW" && row.selectedUserDetails?.commission_type === 2 && (
                <div className="d-flex flex-row justify-content-end align-items-center">
                  <button className="me-3 saffron-btn2 px-3" onClick={() => handleSubmit(row)}>Submit</button>
                </div>
              )}

              {actionType !== "WITHDRAW" && (
                <div className="d-flex flex-row justify-content-end align-items-center">
                  <button className="me-3 saffron-btn2 px-3" onClick={() => handleSubmit(row)}>Submit</button>
                </div>
              )}

              {apiErrors && (
                <div className="alert alert-danger mt-1">
                  {Array.isArray(apiErrors) ? (
                    <ul className="ps-2 mb-0">
                      {apiErrors.map((error, index) => (
                        <li className="small-font" key={index}>{error.message || error}</li>
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
          {row.selectedUserDetails?.commission_type === 1
            ? (row.selectedUserDetails ? Number(row.selectedUserDetails?.inrSportChips).toFixed(2) : 0)
            : row.selectedUserDetails ? (Number(row.selectedUserDetails?.inrChips).toFixed(2)) : 0}
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