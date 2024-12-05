import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";

function AdminDownLineReport() {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState("Admins");
  const [activeRole, setActiveRole] = useState(false);

  const SPORTS_BUTTONS = ["Admins", "Users"];

  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };

  const handleMatchClick = (userName) => {
    navigate(`/userbets/${encodeURIComponent(userName)}`);
  };

  const ADMIN_COLUMNS = [
    { header: "Admin Details", field: "adminDetails" },
    { header: "Share/Royalty", field: "shareRoyalty" },
    { header: "My User Win", field: "myUserWin" },
    { header: "My User Loss", field: "myUserLoss" },
    { header: "My Casino P/L", field: "myCasinoPL" },
    { header: "DL User Win", field: "dLUserWin" },
    { header: "DL User Loss", field: "dLUserLoss" },
    { header: "DL Casino P/L", field: "dLCasinoPL" },
    { header: "Casino Net P/L", field: "netPL" },
    { header: "Downline", field: "downline" },
  ];

  const ADMIN_DATA = Array(6).fill({
    adminDetails: "Jayanta Admin",
    shareRoyalty: "5%",
    myUserWin: <div className="red-font">10000</div>,
    myUserLoss: <div className="green-font">10000</div>,
    myCasinoPL: <div className="green-font">500000</div>,
    dLUserWin: <div className="red-font">500000</div>,
    dLUserLoss: <div className="green-font">500000</div>,
    dLCasinoPL: <div className="red-font">500000</div>,
    netPL: <div className="green-font">500000</div>,
    downline: (
      <div className="w-60 flex-center">
        <BsEye
          size={18}
          onClick={() => setActiveRole(true)}
          className="pointer"
        />
      </div>
    ),
  });

  const ADMIN_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: "" },
  ];

  const DIRECTOR_COLUMNS = [
    { header: "User Details", field: "userDetails" },
    { header: "User Win", field: "userWin" },
    { header: "User Loss", field: "userLoss" },
    { header: "User Casino P/L", field: "userCasinoPL" },
    { header: "", field: "icons" },
  ];

  const DIRECTOR_DATA = Array(6).fill({
    userDetails: "Jayanta User",
    userWin: <div className="red-font">10000</div>,
    userLoss: <div className="green-font">10000</div>,
    userCasinoPL: <div className="green-font">10000</div>,
    icons: (
      <div className="w-60 flex-center">
        <BsEye
          size={18}
          onClick={() => handleMatchClick("Jayanth - user")}
          className="pointer"
        />
      </div>
    ),
  });

  const DIRECTOR_FOOTER = [
    { header: "Total" },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: "" },
  ];

  const summaryData = [
    { label: "My Users Win", value: "1000000000", color: "red-font" },
    { label: "Downline Users Win", value: "1000000000", color: "red-font" },
    { label: "My Users Loss", value: "2000000000", color: "green-font" },
    { label: "Downline Users Loss", value: "2000000000", color: "green-font" },
    { label: "My Total Casino P/L", value: "2000000000", color: "green-font" },
    { label: "Downline Casino P/L", value: "2000000000", color: "green-font" },
  ];

  return (
    <div>
      <div className="d-flex w-90 mt-4">
        <div className="w-100  flex-between flex-wrap mb-3 py-3 grey-bg2 rounded">
          {summaryData.map(({ label, value, color }) => (
            <div key={label} className="col-6 px-3 mt-2">
              <div className="white-btn2 flex-between">
                <span className="small-font">{label}</span>
                <span className={`medium-font ${color}`}>{value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="netpl-btn mb-3 ms-3  col-3   pointer">
          <div className="white-btn2 d-flex small-font ">
            Casino Net P/L <span className="green-font">1000000</span>
          </div>
        </div>
      </div>

      <div className="d-flex small-font mt-3 mb-3">
        {SPORTS_BUTTONS?.map((sport, index) => (
          <div
            key={index}
            className={`me-3 px-3 ${
              activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
            }`}
            onClick={() => handleSportClick(sport)}
          >
            {sport}
          </div>
        ))}
      </div>

      {activeSport === "Admins" && (
        <Table
          columns={ADMIN_COLUMNS}
          data={ADMIN_DATA}
          footer={ADMIN_FOOTER}
          itemsPerPage={5}
          greyBackground="footer-bg"
        />
      )}

      {activeSport === "Users" && (
        <Table
          columns={DIRECTOR_COLUMNS}
          data={DIRECTOR_DATA}
          footer={DIRECTOR_FOOTER}
          itemsPerPage={5}
          greyBackground="footer-bg"
        />
      )}
    </div>
  );
}

export default AdminDownLineReport;
