import React, { useState } from "react";
import ScrollTable from "../../components/ScrollTable";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { BsEye } from "react-icons/bs";

function DownLineAdmins() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(false);

  const handleMatchClick = (matchName) => {
    navigate(`/downline/${encodeURIComponent(matchName)}`);
  };

  const ADMIN_COLUMNS = [
    { header: "Admin Details", field: "adminDetails" },
    { header: "Type", field: "type" },
    { header: "Sp Rental", field: "spRental" },
    { header: "Casino Share/Royalty", field: "casinoShareRoyalty" },
    { header: "Sp & Ca Share/Royalty", field: "spCaShareRoyalty" },
    { header: "Withdraw", field: "withdraw" },
    { header: "Total P/L", field: "totalPL" },
    { header: "Upper Payments", field: "upperPayments" },
    { header: "Net P/L", field: "netPL" },
    { header: "Downline", field: "downline" },
  ];

  const ADMIN_DATA = Array(6).fill({
    adminDetails: "Jayanta Director",
    type: "Share/Royalty",
    spRental: <div>10000</div>,
    casinoShareRoyalty: <div>10000</div>,
    spCaShareRoyalty: <div>500000</div>,
    withdraw: <div className="red-font">500000</div>,
    totalPL: <div className="green-font">500000</div>,
    upperPayments: <div className="red-font">500000</div>,
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
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: "" },
  ];

  const DIRECTOR_COLUMNS = [
    { header: "Admin Details", field: "adminDetails" },
    { header: "Type", field: "type" },
    { header: "Sp Rental", field: "spRental" },
    { header: "Casino Share/Royalty", field: "casinoShareRoyalty" },
    { header: "Sp & Ca Share/Royalty", field: "spCaShareRoyalty" },
    { header: "Withdraw", field: "withdraw" },
    { header: "Total P/L", field: "totalPL" },
    { header: "Upper Payments", field: "upperPayments" },
    { header: "Net P/L", field: "netPL" },
    { header: "Downline", field: "downline" },
  ];

  const DIRECTOR_DATA = Array(6).fill({
    adminDetails: "Rajesh Super Admin",
    type: "Share/Royalty",
    spRental: <div>10000</div>,
    casinoShareRoyalty: <div>10000</div>,
    spCaShareRoyalty: <div>500000</div>,
    withdraw: <div className="red-font">500000</div>,
    totalPL: <div className="green-font">500000</div>,
    upperPayments: <div className="red-font">500000</div>,
    netPL: <div className="green-font">500000</div>,
    downline: (
      <div className="w-60 flex-center">
        <BsEye
          size={18}
          onClick={() => handleMatchClick("Super Admin - Rajesh")}
          className="pointer"
        />
      </div>
    ),
  });

  const DIRECTOR_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: "" },
  ];

  const summaryData = [
    { label: "Sp Rental", value: "1000000000", color: "green-font" },
    { label: "Withdraw", value: "1000000000", color: "red-font" },
    { label: "Casino Share/Royalty", value: "2000000000", color: "green-font" },
    { label: "Total P/L", value: "2000000000", color: "red-font" },
    { label: "Sp & Ca Share/Royalty", value: "2000000000", color: "red-font" },
    { label: "Upper Payments", value: "2000000000", color: "red-font" },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex  mb-0">
          {" "}
          {activeRole === false ? (
            <div className="yellow-font">P/L Reports Downline Admins</div>
          ) : (
            <div>
              P/L Reports Downline Admins{" "}
              <span className="yellow-font">
                {" "}
                <FiChevronRight />
                Owner - Jayanta (Director)
              </span>
            </div>
          )}
        </h6>
      </div>

      <div className="d-flex w-80 mb-3">
        {["From", "To"].map((label) => (
          <div key={label} className="col-2 flex-column mx-2">
            <label className="black-text4 small-font mb-1">{label}</label>
            <input className="input-css2 small-font" type="date" />
          </div>
        ))}
        <div className="col-2 flex-column me-3">
          <label className="black-text4 small-font mb-1">Admins</label>
          <select className="input-css2 small-font">
            <option>Select</option>
          </select>
        </div>
        <div className="saffron-btn2 small-font pointer mt-3 col-1">Submit</div>
      </div>

      <div className="d-flex w-90 ">
        <div className="w-100  flex-between flex-wrap mb-3 py-3 grey-bg2 rounded">
          {summaryData.map(({ label, value, color }) => (
            <div key={label} className="col-6 px-3 ">
              <div className="white-btn2 flex-between">
                <span className="small-font">{label}</span>
                <span className={`medium-font ${color}`}>{value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="netpl-btn mb-3 ms-3  col-2   pointer">
          <div className="white-btn2 d-flex small-font w-80 flex-between ">
            Net P/L <span className="green-font">1000000</span>
          </div>
        </div>
      </div>

      {activeRole === false && (
        <ScrollTable
          columns={ADMIN_COLUMNS}
          data={ADMIN_DATA}
          footer={ADMIN_FOOTER}
          itemsPerPage={1}
          greyBackground="footer-bg"
        />
      )}

      {activeRole === true && (
        <ScrollTable
          columns={DIRECTOR_COLUMNS}
          data={DIRECTOR_DATA}
          footer={DIRECTOR_FOOTER}
          itemsPerPage={1}
          greyBackground="footer-bg"
        />
      )}
    </div>
  );
}

export default DownLineAdmins;
