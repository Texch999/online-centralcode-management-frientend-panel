import React, { useState } from "react";
import DeletePopup from "../popups/DeletePopup";
import BlockPopup from "../popups/BlockPopup";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { MdBlock, MdDeleteOutline } from "react-icons/md";
import { Images } from "../../images";

const CricketLiveStreaming = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendor, provider, match } = location.state || {};
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleBlockModal = () => {
    setShowBlockModal(!showBlockModal);
  };
  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const cols = [
    { header: "", field: "watch" },
    { header: "Date & Time", field: "date" },
    { header: "Matches/ID", field: "match" },
    { header: "Series Name/ID", field: "series" },

    { header: <div className="flex-center">Live</div>, field: "live" },
    { header: <div className="flex-start">Action</div>, field: "action" },
  ];

  const data = [
    {
      watch: <div className="inplay-btn w-fit py-1 px-2 mx-2">In Play</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>New Zealand vs India</div>
          <div>12345678912343455</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>ICC Women T20 world cup</div>
          <div>12345678912343455</div>
        </div>
      ),
      live: (
        <div className="d-flex flex-center">
          <iframe
            width="300"
            height="150"
            src="https://www.youtube.com/watch?v=S9IkhcLDUPo"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ),
      action: (
        <div class="d-flex mt-1">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20 ms-2" />
          </div>
        </div>
      ),
    },
    {
      watch: <div className="inplay-btn w-fit py-1 px-2 mx-2">In Play</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>New Zealand vs India</div>
          <div>12345678912343455</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>ICC Women T20 world cup</div>
          <div>12345678912343455</div>
        </div>
      ),
      live: (
        <div className="d-flex flex-center">
          <img src={Images.cricket} alt="cricket" className="match-img" />
        </div>
      ),
      action: (
        <div class="d-flex mt-1">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20 ms-2" />
          </div>
        </div>
      ),
    },
    {
      watch: <div className="mx-2">Today</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>New Zealand vs India</div>
          <div>12345678912343455</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>ICC Women T20 world cup</div>
          <div>12345678912343455</div>
        </div>
      ),
      live: (
        <div className="d-flex flex-center">
          <img src={Images.match} alt="cricket" className="match-img" />
        </div>
      ),
      action: (
        <div class="d-flex mt-1">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20 ms-2" />
          </div>
        </div>
      ),
    },
    {
      watch: <div className=" mx-2">Upcoming</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>New Zealand vs India</div>
          <div>12345678912343455</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>ICC Women T20 world cup</div>
          <div>12345678912343455</div>
        </div>
      ),
      live: (
        <div className="d-flex flex-center">
          {/* <img src={Images.cricket} alt="cricket" className="match-img"/> */}
        </div>
      ),
      action: (
        <div class="d-flex mt-1">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20 ms-2" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="p-1">
      <div className="d-flex flex-between">
        <div className="mb-2 pointer large-font" onClick={() => navigate(-1)}>
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
            <span className="fw-800">{match}</span>
          </span>
        </div>

        <div className="small-font">
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>

      <div>
        <Table columns={cols} data={data} itemsPerPage={5} />
      </div>

      <BlockPopup
        show={showBlockModal}
        setShow={setShowBlockModal}
        title={"Match"}
      />
      <DeletePopup
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        title={"Match"}
      />
    </div>
  );
};

export default CricketLiveStreaming;
