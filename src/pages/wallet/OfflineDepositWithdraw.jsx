import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DepositePopup from "../popups/DepositePopup";
import WithdrawPopup from "../popups/WithdrawPopup";
import Table from "../../components/Table"; // Common Table component
import { customStyles } from "../../components/ReactSelectStyles";
import Select from "react-select";
import { convertChipsToInr, currencyConvert } from "../../utils/currEchange";
import { ManagementOfflineDepositeTicketCreation, ownerDowlineDirAndSADetails } from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { rceil } from "../../utils/mathFunctions";
import SuccessPopup from "../popups/SuccessPopup";

function OfflineDepositWithdraw() {
  const [activeSport, setActiveSport] = useState("Sports & Casino");
  const [dirAndSADetails, setDirAndSADetails] = useState([]);
  const [inputData, setInputData] = useState({
    adminWeb: "",
    userWeb: "",
    inrChips: 0,
    InrAmont: 0,
    extChips: 0,
    selectedAdminSiteId: null, // Store selected admin site ID
    selectedUserSiteId: null, // Store selected user site ID
    selectedCommissionType: null, // Store selected commission type
  });

  const SPORTS_BUTTONS = ["Sports & Casino", "Sports", "Casino"];
  const allCountries = useSelector((state) => state?.allCountries);

  // Fetch data on component mount
  useEffect(() => {
    fetchOwnerDownlineDirectorAndSuperAdminDetails();
  }, []);

  // Fetch owner downline director and super admin details
  const fetchOwnerDownlineDirectorAndSuperAdminDetails = async () => {
    try {
      const response = await ownerDowlineDirAndSADetails();
      if (response?.list?.length > 0) {
        setDirAndSADetails(response.list);
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
      className="small-font white-bg input-border rounded"
      placeholder="Select Admin Website"
      styles={customStyles}
      menuPortalTarget={document.body}
      onChange={(option) => onChange(option.value)}
      options={options}
      value={value}
    />
  );

  // User site dropdown component
  const UserSiteDropdown = ({ options, onChange, value }) => (
    <Select
      className="small-font white-bg input-border rounded"
      placeholder="Select User Website"
      styles={customStyles}
      menuPortalTarget={document.body}
      onChange={(option) => onChange(option.value)}
      options={options}
      value={value}
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

  // Handle admin site change
  // const handleAdminSiteChange = (index, adminSiteId) => {
  //   const newData = [...dirAndSADetails];
  //   const selectedAdmin = newData[index].adminSName.find(
  //     (site) => site.id === adminSiteId
  //   );

  //   if (!selectedAdmin) {
  //     console.error("Admin site not found:", adminSiteId);
  //     return;
  //   }

  //   newData[index].selectedAdminSite = adminSiteId;
  //   newData[index].selectedAdminName = selectedAdmin.name;
  //   newData[index].selectedUserSite = null;
  //   newData[index].availableUserSites = selectedAdmin.list || [];

  //   setDirAndSADetails(newData);
  // };

  // // Handle user site change
  // const handleUserSiteChange = (index, userSiteId) => {
  //   const newData = [...dirAndSADetails];
  //   const selectedUser = newData[index]?.availableUserSites?.find(
  //     (user) => user.website_access_id === userSiteId
  //   );

  //   if (!selectedUser) {
  //     console.error("User site not found:", userSiteId);
  //     return;
  //   }

  //   newData[index].selectedUserSite = userSiteId;
  //   newData[index].selectedUserDetails = selectedUser;

  //   setDirAndSADetails(newData);
  // };


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

    // Update selected user site ID and commission type in state
    setInputData((prevData) => ({
      ...prevData,
      selectedUserSiteId: userSiteId,
      selectedCommissionType: selectedUser.commission_type, // Store commission type
    }));

    setDirAndSADetails(newData);
  };


  // Toggle child row visibility
  const toggleChildRow = (index) => {
    setDirAndSADetails((prevData) =>
      prevData.map((row, i) => ({
        ...row,
        showChildRow: i === index ? !row.showChildRow : false,
      }))
    );
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
  const [successPopupOpen, setSuccessPopupOpen] = useState(false)
  const [discription, setDiscription] = useState("")
  const handleSubmit = (siteData) => {
    // ManagementOfflineDepositeTicketCreation

    console.log(siteData, "====>siteData")
    console.log("hell")
    const payload = {
      adminPanelId: siteData?.selectedUserDetails?.admin_panel_id,
      userPanelId: siteData?.selectedUserDetails?.user_paner_id,
      currency: siteData?.currency_id, // Assuming currency is fixed or fetched from somewhere
      selctChips: Number(inputData.inrChips),

    };

    if (siteData?.selectedUserDetails?.commission_type === 1) {
      payload.selctSpcChips = Number(inputData?.extChips ? inputData?.extChips : 0);
      payload.paidAmount = rceil((Number(inputData.inrChips) * (siteData?.selectedUserDetails?.chip_percentage ? Number(siteData?.selectedUserDetails?.chip_percentage) / 100 : 0)) +
        (Number(inputData.extChips) * (siteData?.selectedUserDetails?.extra_chips_percentage ? Number(siteData?.selectedUserDetails?.extra_chips_percentage) / 100 : 0)), -3)
    } else {
      payload.paidAmount = rceil((Number(inputData.inrChips) * Number(siteData?.selectedUserDetails?.share) / 100), -3)
    }
    console.log(payload, "=====>payload")
    const formDataToSend = new FormData();
    formDataToSend.append('body', JSON.stringify(payload));
    ManagementOfflineDepositeTicketCreation(siteData?.id, payload)
      .then((response) => {
        if (response?.status === true) {
          setSuccessPopupOpen(true);
          setDiscription("Deposit Created Successfully")
        } else {
          console.log("set erro")
        }
      })
      .catch((error) => {
        console.log("set erro")
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
            </div>
          </div>
          {row.showChildRow && (
            <div className="w-100 d-flex flex-column justify-content-start p-2 mt-2 border-top">
              <div className="d-flex flex-row justify-content-between align-items-center col-4">
                <div className="black-text2">
                  Avl D/W:
                  <span className="black-text2">
                    {row.selectedUserDetails?.commission_type === 1
                      ? Number(row.selectedUserDetails?.inrSportChips).toFixed(2)
                      : Number(row.selectedUserDetails?.inrChips).toFixed(2)}
                  </span>
                </div>
                <div className="ps-2 black-text2">
                  Exposure: <span className="black-text2">0</span>
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
                      />
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
                        value={calculatePaidAmount(
                          Number(inputData.inrChips),
                          row.selectedUserDetails?.commission_type === 1
                            ? row.selectedUserDetails && row.selectedUserDetails?.chip_percentage
                            : row.selectedUserDetails?.share
                        ).toFixed(2)}
                        readOnly
                      />
                    </div>
                    <div className="col-sm-3">
                      <label>Chips In {getCurrency(row?.currency_id)}</label>
                      <input
                        type="text"
                        className="small-font input-css all-none rounded white-bg input-border input-cevent-stop"
                        placeholder="Enter Chips"
                        value={currencyConvert(
                          Number(inputData.inrChips),
                          getCurrencyRate(107),
                          getCurrencyRate(row?.currency_id)
                        ).toFixed(4)}
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
                        value={(
                          currencyConvert(
                            Number(inputData.inrChips),
                            getCurrencyRate(107),
                            getCurrencyRate(row?.currency_id)
                          ) *
                          (row.selectedUserDetails?.commission_type === 1
                            ? row.selectedUserDetails?.chip_percentage / 100
                            : row.selectedUserDetails?.share / 100)
                        ).toFixed(4)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                {row.selectedUserDetails?.commission_type === 1 && (
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
                        />
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
                          value={calculatePaidAmount(
                            Number(inputData.extChips),
                            row.selectedUserDetails?.extra_chips_percentage
                          ).toFixed(2)}
                          readOnly
                        />
                      </div>
                      <div className="col-sm-3">
                        <label>Chips In {getCurrency(row?.currency_id)}</label>
                        <input
                          type="text"
                          className="small-font input-css all-none rounded white-bg input-border input-cevent-stop"
                          placeholder="Enter Chips"
                          value={currencyConvert(
                            Number(inputData.extChips),
                            getCurrencyRate(107),
                            getCurrencyRate(row?.currency_id)
                          ).toFixed(4)}
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
                          value={(
                            currencyConvert(
                              Number(inputData.extChips),
                              getCurrencyRate(107),
                              getCurrencyRate(row?.currency_id)
                            ) *
                            (row.selectedUserDetails?.extra_chips_percentage / 100)
                          ).toFixed(4)}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex flex-row justify-content-end align-items-center">
                <button className="me-3 saffron-btn2 px-3" onClick={() => handleSubmit(row)}>Submit</button>
              </div>
            </div>
          )}
        </div>
      ),
      usdChips: (
        <div>
          {row.selectedUserDetails?.commission_type === 1
            ? (row.selectedUserDetails ? Number(row.selectedUserDetails?.inrSportChips).toFixed(2) : 0)
            : row.selectedUserDetails ? (Number(row.selectedUserDetails?.inrChips).toFixed(2)) : 0}
          <br /> {getCurrency(row?.currency_id)}
        </div>
      ),
      action: (
        <ActionButtons
          onDeposit={() => toggleChildRow(index)}
          onWithdraw={() => toggleChildRow(index)}
        />
      ),
    };
  });

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