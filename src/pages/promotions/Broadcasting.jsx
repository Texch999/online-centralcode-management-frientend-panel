import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { LiaPenSolid } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";

const Broadcasting = () => {
  const [activeBtn, setActiveBtn] = useState("User Broadcasting");
  const ACTIVE_BTNS = ["User Broadcasting", "Admin Broadcasting"];

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const CASINO_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Type", field: "type", width: "10%" },
    { header: "Website", field: "website", width: "10%" },
    {
      header: "Broadcasting Location",
      field: "broadcastingLocation",
      width: "10%",
    },
    {
      header: "Broadcasting Message",
      field: "broadcastingMessage",
      width: "30%",
    },
    { header: "", field: "icons", width: "10%" },
  ];
  const CASINO_DATA = [
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      type: <div>Sports</div>,
      website: (
        <div>
          www.texchange.com
          <br />
          www.diamondexchange.com <br />
          www.fun77.com
        </div>
      ),

      broadcastingLocation: <div>Home Page</div>,

      broadcastingMessage: (
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      ),

      icons: (
        <div className="large-font w-50 flex-between">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      type: <div>Sports</div>,
      website: (
        <div>
          www.texchange.com
          <br />
          www.diamondexchange.com <br />
          www.fun77.com
        </div>
      ),

      broadcastingLocation: <div>Home Page</div>,

      broadcastingMessage: (
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      ),

      icons: (
        <div className="large-font w-50 flex-between">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
    },

    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      type: <div>Sports</div>,
      website: (
        <div>
          www.texchange.com
          <br />
          www.diamondexchange.com <br />
          www.fun77.com
        </div>
      ),

      broadcastingLocation: <div>Home Page</div>,

      broadcastingMessage: (
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      ),

      icons: (
        <div className="large-font w-50 flex-between">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
    },

    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      type: <div>Sports</div>,
      website: (
        <div>
          www.texchange.com
          <br />
          www.diamondexchange.com <br />
          www.fun77.com
        </div>
      ),

      broadcastingLocation: <div>Home Page</div>,

      broadcastingMessage: (
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      ),

      icons: (
        <div className="large-font w-50 flex-between">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
    },

    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      type: <div>Sports</div>,
      website: (
        <div>
          www.texchange.com
          <br />
          www.diamondexchange.com <br />
          www.fun77.com
        </div>
      ),

      broadcastingLocation: <div>Home Page</div>,

      broadcastingMessage: (
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      ),

      icons: (
        <div className="large-font w-50 flex-between">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Broadcasting</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="d-flex col small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item
                ? "saffron-btn2  px-4"
                : "white-btn2 pointer px-4"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="d-flex w-60  mt-3">
        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Sports/Casino</label>
          <select className="input-css2 small-font">
            <option>All</option>
          </select>
        </div>

        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Websites</label>
          <select className="input-css2 small-font">
            <option>All</option>
          </select>
        </div>

        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">
            Broadcasting Location
          </label>
          <select className="input-css2 small-font">
            <option>All</option>
          </select>
        </div>

        <div className="col-6 flex-column  ">
          <label className="black-text4 mb-1 small-font">
            Type Broadcasting Message
          </label>
          <textarea
            placeholder="Enter"
            className="all-none input-css2 small-font p-2 rounded"
            rows="4"
            style={{ resize: "none" }}
          ></textarea>
        </div>
        <div className="col-2 flex-end">
          <div className="saffron-btn2 small-font pointer ms-2 w-100">
            Submit
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Table columns={CASINO_COLUMNS} data={CASINO_DATA} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default Broadcasting;
