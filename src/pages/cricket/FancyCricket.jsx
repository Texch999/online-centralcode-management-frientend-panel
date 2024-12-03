import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import Table from "./../../components/Table";
import BlockPopup from "../popups/BlockPopup";
import { FaArrowLeft } from "react-icons/fa";

const FancyCricket = () => {
  const navigate = useNavigate();
  const { vendor, provider, match } = useParams();

  const matchContent =
    match === "Football" ? (
      <>
        <div>Santos vs Cruzeiro MG</div>
        <div>12345678912343455</div>
      </>
    ) : match === "Tennis" ? (
      <>
        <div>Guangzhou Challenger 2023</div>
        <div>67890123456789012</div>
      </>
    ) : (
      <>
        <div>ICC Women T20 World Cup</div>
        <div>09876543211234567</div>
      </>
    );

  const seriesContent =
    match === "Football" ? (
      <>
        <div>Brazilian Series A</div>
        <div>12345678912343455</div>
      </>
    ) : match === "Tennis" ? (
      <>
        <div>Evgeny Donskoy vs Omar Jasika</div>
        <div>67890123456789012</div>
      </>
    ) : (
      <>
        <div>ICC Women T20 World Cup</div>
        <div>56789012345678900</div>
      </>
    );

  const handleFancyMatch = (individualMatch) => {
    navigate(
      `/fancy-individual-match/${vendor}/${provider}/${match}/${individualMatch}`
    );
  };
  const [showBlockModal, setShowBlockModal] = useState(false);

  const handleBlockModal = () => {
    setShowBlockModal(!showBlockModal);
  };

  const cols = [
    { header: "", field: "watch" },
    { header: "Date & Time", field: "date" },
    { header: "Matches/ID", field: "match" },
    { header: "Series Name/ID", field: "series" },
    { header: <div className="flex-center">Profit & Loss</div>, field: "pl" },
    { header: <div className="flex-start">Action</div>, field: "action" },
  ];

  const data = [
    {
      watch: (
        <div className="inplay-btn w-fit py-1 px-2 my-1 mx-2">In Play</div>
      ),
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],
      pl: <div className="flex-center green-clr">10000</div>,
      action: (
        <div class="d-flex mt-1">
          <div className="pointer" onClick={handleBlockModal}>
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div
            className="pointer"
            onClick={() =>
              handleFancyMatch(
                "New Zealand vs India(ICC Women T20 WC) 21-09-2024 08:00:00"
              )
            }
          >
            <IoEyeOutline className="font-20 ms-2 orange-clr" />
          </div>
        </div>
      ),
    },
    {
      watch: (
        <div className="inplay-btn w-fit py-1 px-2 my-1 mx-2">In Play</div>
      ),
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],
      pl: <div className="flex-center green-clr">10000</div>,
      action: (
        <div class="d-flex mt-1">
          <div className="pointer" onClick={handleBlockModal}>
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div
            className="pointer"
            onClick={() =>
              handleFancyMatch(
                "New Zealand vs India(ICC Women T20 WC) 21-09-2024 08:00:00"
              )
            }
          >
            <IoEyeOutline className="font-20 ms-2 orange-clr" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between mb-3">
        <div className="pointer large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Sports <span className="mx-1 font-20">{">"}</span>
          </span>
          <span className="grey-clr">{vendor}</span>
          <span className="grey-clr">
            <span className="mx-1 font-20 grey-clr">{">"}</span>
            {provider}
          </span>
          <span>
            <span className="mx-1 font-20">{">"}</span>
            <span className="fw-600">{match}</span>
          </span>
        </div>
        <div className="medium-font">
        <span className="white-bg rounded-pill me-4 px-3 py-1 grey-border hover-orange-clr pointer" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2"/>Back</span>
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>

      <div>
        <Table columns={cols} data={data} itemsPerPage={4} />
      </div>

      <BlockPopup
        show={showBlockModal}
        setShow={setShowBlockModal}
        title={"Fancy Cricket Match"}
      />
    </div>
  );
};

export default FancyCricket;
