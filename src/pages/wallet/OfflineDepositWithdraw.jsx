import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { customStyles } from "../../components/ReactSelectStyles";
import Select from "react-select";
import { currencyConvert } from "../../utils/currEchange";
import {
  ManagementOfflineDepositeTicketCreation,
  ManagementOfflineWithdrawTicketCreation,
  ownerDowlineDirAndSADetails,
} from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { rceil } from "../../utils/mathFunctions";
import SuccessPopup from "../popups/SuccessPopup";
import { useSearchParams } from "react-router-dom";
import OfflineDepositPopup from "../popups/OfflineDepositPopup";

function OfflineDepositWithdraw() {
  const [activeSport, setActiveSport] = useState("Sports & Casino");
  const [dirAndSADetails, setDirAndSADetails] = useState([]);
  const [actionType, setActionType] = useState([]);
  const [apiErrors, setApiErrors] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [discription, setDiscription] = useState("");
  const [errors, setErrors] = useState({});
  const [totalRecords, setTotalRecords] = useState(null);
  const [duration, setDuration] = useState("");
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
  const [isCredit, setIsCredit] = useState(false);
  const [creditAmount, setCreditAmount] = useState(0);
  const [depositWithdrawPopup, setDepositWithdrawPopup] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const SPORTS_BUTTONS = ["Sports & Casino", "Sports", "Casino"];
  const allCountries = useSelector((state) => state?.allCountries);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = 4;
  const limit = itemsPerPage;
  const offset = (currentPage - 1) * itemsPerPage;
  const durationOptions = [
    { value: 30, label: "30day" },
    { value: 90, label: "90day" },
    { value: 180, label: "180day" },
    { value: 365, label: "365day" },
  ];
  useEffect(() => {
    fetchOwnerDownlineDirectorAndSuperAdminDetails(limit, offset);
  }, []);

  const fetchOwnerDownlineDirectorAndSuperAdminDetails = async (
    limit,
    offset
  ) => {
    try {
      const response = await ownerDowlineDirAndSADetails({ limit, offset });
      if (response?.list?.length > 0) {
        setDirAndSADetails(response.list);
        setTotalRecords(response.count);
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

  // Get currency name by ID
  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name;
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
      <button
        className="saffron-btn3 px-2"
        style={{ borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }}
        onClick={onDeposit}
      >
        D/C
      </button>
      <div
        className="saffron-btn3 white-text"
        style={{ pointerEvents: "none" }}
      >
        |
      </div>
      <button
        className="me-3 saffron-btn3 px-2 "
        style={{ borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }}
        onClick={onWithdraw}
      >
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
    setInputData((prevData) => ({
      ...prevData,
      selectedUserSiteId: userSiteId,
      selectedCommissionType: selectedUser.commission_type, 
    }));

    setDirAndSADetails(newData);
  };

  // Toggle child row visibility
  const toggleChildRow = (index, action, siteDetails) => {
    setSelectedDetails(siteDetails);
    setDepositWithdrawPopup(true);
    setDirAndSADetails((prevData) =>
      prevData.map((row, i) => ({
        ...row,
        showChildRow: i === index ? !row.showChildRow : false,
      }))
    );
    setActionType(action);
    setApiErrors(null);
  };

  // Table columns
  const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
    { header: "Name & Role", field: "nameRole" },
    { header: "Balance", field: "totalBalance" },
    { header: "Available", field: "totalAvailable" },
    {
      header: <div className="text-end">Exposure</div>,
      field: "totalExposure",
    },
    { header: <div className="text-end">Ref P/L</div>, field: "referencePL" },
    { header: "Admin Site", field: "adminSites" },
    { header: "User Site", field: "userSites" },
    { header: "Credit Ref", field: "creditReference" },
    { header: "Avai Bal.", field: "userSiteAvaiBal" },
    { header: "Exposure", field: "userSitexposure" },
    { header: <div className="text-center">Action</div>, field: "action" },
  ];

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
      nameRole: (
        <div>
          {`${row.name}`} <br /> Director
        </div>
      ),
      totalBalance: <div>{`150000`}</div>,
      Available: <div>{`42000`}</div>,
      totalAvailable: <div>{`95000`}</div>,
      totalExposure: <div>{`55000`}</div>,
      referencePL: <div className=" text-end">{`132000`}</div>,
      adminSites: (
        <div>
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
          {errors.adminWebsiteId && (
            <p className="text-danger small-font">{errors.adminWebsiteId}</p>
          )}
        </div>
      ),
      userSites: (
        <div>
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
                        ? `${row.selectedUserDetails?.usrPnl}/ Share ${
                            row.selectedUserDetails?.share
                          }% - ${getCurrency(row?.currency_id)}`
                        : `${row.selectedUserDetails?.usrPnl}/ Rental ${
                            row.selectedUserDetails?.chip_percentage
                          }% - ${getCurrency(row?.currency_id)}`,
                    value: row.selectedUserSite,
                  }
                : null
            }
          />
          {errors.userPanelId && (
            <p className="text-danger small-font">{errors.userPanelId}</p>
          )}
        </div>
      ),
      creditReference: (
        <div className="w-100 d-flex justify-content-between align-items-center gap-3">
          <div>150000</div>
          <div>
            <button className="me-3 saffron-btn2 px-3">Edit</button>
          </div>
        </div>
      ),
      userSiteAvaiBal: (
        <div>
          {row.selectedUserDetails ? (
            row.selectedUserDetails?.totalChips
          ) : (
            <div> {`--`}</div>
          )}
        </div>
      ),
      userSitexposure: (
        <div>
          {row.selectedUserDetails ? (
            row.selectedUserDetails?.totalChips
          ) : (
            <div> {`--`}</div>
          )}
        </div>
      ),
      action: (
        <ActionButtons
          onDeposit={() =>
            toggleChildRow(index, "DEPOSIT", row.selectedUserDetails)
          }
          onWithdraw={() =>
            toggleChildRow(index, "WITHDRAW", row.selectedUserDetails)
          }
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
          <h6 className="d-flex yellow-font mb-0">
            Offline Deposit & Withdraw
          </h6>
        </div>
        <div className="d-flex small-font mb-3">
          {SPORTS_BUTTONS.map((sport, index) => (
            <div
              key={index}
              className={`me-3 ${
                activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
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
      <OfflineDepositPopup
        actionType={actionType}
        depositWithdrawPopup={depositWithdrawPopup}
        selectedDetails={selectedDetails}
        setDepositWithdrawPopup={setDepositWithdrawPopup}
      />
    </>
  );
}

export default OfflineDepositWithdraw;
