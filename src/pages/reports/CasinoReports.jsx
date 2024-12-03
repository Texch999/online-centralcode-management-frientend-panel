import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import ScrollTable from "../../components/ScrollTable";
import SettlePopUp from "./SettlePopUp";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import AdminDownLineReport from "./AdminDownLineReport";
import CasinoBetPl from "./CasinoBetPl";

function CasinoReports() {
  const [activeSport, setActiveSport] = useState("Vendor Report");
  const [openGameData, setOpenGameData] = useState(false);
  const [openProviderName, setOpenProviderName] = useState(false);
  const [openTableId, setOpenTableId] = useState(false);

  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };
  const SPORTS_BUTTONS = [
    "Vendor Report",
    "Downline Admins Report",
    "Casino Bet P/L",
  ];

  const GATEWAY_COLUMNS = [
    { header: "Vendor Name", field: "vendorName" },
    { header: "Share/Royalty", field: "shareRoyalty" },
    { header: "Casino Profit/Loss", field: "casinoProfitLoss" },
    { header: "Net Payment", field: "netPayment" },
    { header: "", field: "icons" },
  ];

  const GATEWAY_DATA = Array(8)
    .fill(null)
    .map((_, index) => ({
      vendorName: "Jayanta",
      shareRoyalty: <div>5%</div>,
      casinoProfitLoss: <div className="green-font">1000000</div>,
      netPayment: <div className="red-font">1000000000</div>,
      icons: (
        <div
          className={`flex-center large-font pointer`}
          onClick={() => setOpenGameData(true)}
        >
          <MdOutlineRemoveRedEye />
        </div>
      ),
    }));

  const VENDOR_COLUMNS = [
    { header: "Provider Name", field: "vendorName" },
    { header: "Share/Royalty", field: "shareRoyalty" },
    { header: "Casino Profit/Loss", field: "casinoProfitLoss" },
    { header: "Net Payment", field: "netPayment" },
    { header: "", field: "icons" },
  ];

  const VENDOR_DATA = Array(7)
    .fill(null)
    .map((_, index) => ({
      vendorName: "Ezugi",
      shareRoyalty: <div>5%</div>,
      casinoProfitLoss: <div className="green-font">1000000</div>,
      netPayment: <div className="red-font">1000000000</div>,
      icons: (
        <div
          className={`flex-center large-font pointer`}
          onClick={() => setOpenProviderName(true)}
        >
          <MdOutlineRemoveRedEye />
        </div>
      ),
    }));

  const GAME_VENDOR_COLUMNS = [
    { header: "Games", field: "vendorName" },
    { header: "Share/Royalty", field: "shareRoyalty" },
    { header: "Casino Profit/Loss", field: "casinoProfitLoss" },
    { header: "Net Payment", field: "netPayment" },
    { header: "", field: "icons" },
  ];

  const GAME_VENDOR_DATA = Array(6)
    .fill(null)
    .map((_, index) => ({
      vendorName: "Roulette",
      shareRoyalty: <div>5%</div>,
      casinoProfitLoss: <div className="green-font">1000000</div>,
      netPayment: <div className="red-font">1000000000</div>,
      icons: (
        <div
          className={`flex-center large-font pointer`}
          onClick={() => setOpenTableId(true)}
        >
          <MdOutlineRemoveRedEye />
        </div>
      ),
    }));

  const GAME_TABLE_COLUMNS = [
    { header: "Table ID", field: "vendorName" },
    { header: "Share/Royalty", field: "shareRoyalty" },
    { header: "Casino Profit/Loss", field: "casinoProfitLoss" },
    { header: "Net Payment", field: "netPayment" },
  ];

  const GAME_TABLE_DATA = Array(6)
    .fill(null)
    .map(() => ({
      vendorName: "1234567891234",
      shareRoyalty: <div>5%</div>,
      casinoProfitLoss: <div className="green-font">1000000</div>,
      netPayment: <div className="red-font">1000000000</div>,
    }));

  return (
    <>
      <div>
        <div className="flex-between mb-3 mt-4">
          <h6 className="d-flex yellow-font mb-0">P/L Casino Reports</h6>
        </div>
        <div className="d-flex small-font">
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
        {activeSport === "Vendor Report" && (
          <>
            <div className="w-100 d-flex flex-between ">
              <div className="w-50 mt-4 px-2">
                <h6 className="fw-600">Vendor Wise P/L</h6>
                <div>
                  <ScrollTable
                    columns={GATEWAY_COLUMNS}
                    data={GATEWAY_DATA}
                    itemsPerPage={1}
                  />
                </div>
              </div>

              {openGameData === true && (
                <div className="w-50 mt-4 px-2">
                  <h6 className="fw-600">Vendor - Jayanta</h6>
                  <div>
                    <ScrollTable
                      columns={VENDOR_COLUMNS}
                      data={VENDOR_DATA}
                      itemsPerPage={1}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="w-100 d-flex flex-between ">
              {openProviderName === true && (
                <div className="w-50 mt-4 px-2">
                  <h6 className="fw-600">Vendor - Jayanta - Ezugi</h6>
                  <div>
                    <ScrollTable
                      columns={GAME_VENDOR_COLUMNS}
                      data={GAME_VENDOR_DATA}
                      itemsPerPage={1}
                    />
                  </div>
                </div>
              )}

              {openTableId === true && (
                <div className="w-50 mt-4 px-2">
                  <h6 className="fw-600">
                    Vendor - Jayanta - Ezugi - Roulette
                  </h6>
                  <div>
                    <ScrollTable
                      columns={GAME_TABLE_COLUMNS}
                      data={GAME_TABLE_DATA}
                      itemsPerPage={1}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeSport === "Downline Admins Report" && <AdminDownLineReport />}

        {activeSport === "Casino Bet P/L" && <CasinoBetPl />}
      </div>
    </>
  );
}

export default CasinoReports;
