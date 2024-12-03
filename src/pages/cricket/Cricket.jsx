import React, { useState } from "react";
import Table from "../../components/Table";
import { MdBlock, MdDeleteOutline } from "react-icons/md";
import BlockPopup from "./../popups/BlockPopup";
import DeletePopup from "./../popups/DeletePopup";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Cricket = () => {
  const navigate = useNavigate();
  const { vendor, provider, match } = useParams();

  const matchContent =
    match === "Football" ? (
      <>
        <div>Santos vs Cruzeiro MG</div>
        <div>12345678912343455</div>
      </>
    ) : match === "HorseRacing" ? (
      <>
        <div>BathRust</div>
        <div>67890123456789012</div>
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
    ) : match === "HorseRacing" ? null : (
      <>
        <div>ICC Women T20 World Cup</div>
        <div>56789012345678900</div>
      </>
    );

  console.log(vendor, provider, match, "Vendor-provider-match");
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
    ...(match !== "HorseRacing"
      ? [{ header: "Series Name/ID", field: "series" }]
      : []),

    {
      header: (
        <div className="row">
          <div className="col-6 flex-end">
            <span>Back</span>
          </div>
          <div className="col-6 d-flex">
            <span>Lay</span>
          </div>
        </div>
      ),
      field: "back_lay",
    },
    { header: <div className="flex-start">Back/Lay</div>, field: "bl" },
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

      back_lay: (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>4.05</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>1.35</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>8.02</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>4.06</span>
              <span>1k</span>
            </div>
          </div>
        </div>
      ),

      bl: (
        <div className="d-flex">
          <div className="">
            <div className="">Back</div>
            <div className="my-1">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 mb-1 ms-1">10000</div>
            <div className="lay-btn-cricket px-2 ms-1">30000</div>
          </div>
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

      back_lay: (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>5.05</span>
              <span>97k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>6.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>8.05</span>
              <span>7k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>1.75</span>
              <span>8k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>2.85</span>
              <span>9k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>3.05</span>
              <span>2k</span>
            </div>
          </div>
        </div>
      ),

      bl: (
        <div className="d-flex">
          <div className="">
            <div className="">Back</div>
            <div className="my-1">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 mb-1 ms-1">10000</div>
            <div className="lay-btn-cricket px-2 ms-1">30000</div>
          </div>
        </div>
      ),
      action: (
        <div class="d-flex mt-1">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 dark-orange-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20  ms-2" />
          </div>
        </div>
      ),
    },
    {
      watch: <div className=" mx-2 my-1">Upcoming </div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],

      back_lay: (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>4.05</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>1.35</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>8.02</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>4.06</span>
              <span>1k</span>
            </div>
          </div>
        </div>
      ),

      bl: (
        <div className="d-flex">
          <div className="">
            <div className="">Back</div>
            <div className="my-1">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 mb-1 ms-1">10000</div>
            <div className="lay-btn-cricket px-2 ms-1">30000</div>
          </div>
        </div>
      ),
      action: (
        <div class="d-flex mt-1">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20  ms-2" />
          </div>
        </div>
      ),
    },
    {
      watch: <div className="my-1 mx-2">Today</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],

      back_lay: (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>5.05</span>
              <span>97k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>6.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>8.05</span>
              <span>7k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>1.75</span>
              <span>8k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>2.85</span>
              <span>9k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>3.05</span>
              <span>2k</span>
            </div>
          </div>
        </div>
      ),

      bl: (
        <div className="d-flex">
          <div className="">
            <div className="">Back</div>
            <div className="my-1">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 mb-1 ms-1">10000</div>
            <div className="lay-btn-cricket px-2 ms-1">30000</div>
          </div>
        </div>
      ),
      action: (
        <div class="d-flex mt-1">
          <div>
            <MdBlock className="font-20 dark-orange-clr" />
          </div>
          <div>
            <MdDeleteOutline className="font-20  ms-2" />
          </div>
        </div>
      ),
    },
    {
      watch: <div className=" mx-2 my-1">Today</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],

      back_lay: (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>4.05</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>1.35</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>8.02</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>4.06</span>
              <span>1k</span>
            </div>
          </div>
        </div>
      ),

      bl: (
        <div className="d-flex">
          <div className="">
            <div className="">Back</div>
            <div className="my-1">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 mb-1 ms-1">10000</div>
            <div className="lay-btn-cricket px-2 ms-1">30000</div>
          </div>
        </div>
      ),
      action: (
        <div class="d-flex mt-1">
          <div>
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div>
            <MdDeleteOutline className="font-20  ms-2" />
          </div>
        </div>
      ),
    },
    {
      watch: <div className="my-1 mx-2">Upcoming</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],

      back_lay: (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>5.05</span>
              <span>97k</span>
            </div>
            <div className="d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>6.05</span>
              <span>2k</span>
            </div>
            <div className="d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>8.05</span>
              <span>7k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>1.75</span>
              <span>8k</span>
            </div>
            <div className="d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>2.85</span>
              <span>9k</span>
            </div>
            <div className="d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>3.05</span>
              <span>2k</span>
            </div>
          </div>
        </div>
      ),

      bl: (
        <div className="d-flex">
          <div className="">
            <div className="">Back</div>
            <div className="my-1">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 mb-1 ms-1">10000</div>
            <div className="lay-btn-cricket px-2 ms-1">30000</div>
          </div>
        </div>
      ),
      action: (
        <div class="d-flex mt-1">
          <div>
            <MdBlock className="font-20 dark-orange-clr" />
          </div>
          <div>
            <MdDeleteOutline className="font-20  ms-2" />
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

        <div className="medium-font">
          <span
            className="white-bg rounded-pill grey-border me-4 px-3 hover-orange-clr py-1 pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Back
          </span>
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

export default Cricket;
