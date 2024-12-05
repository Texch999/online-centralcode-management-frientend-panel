import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { MdBlockFlipped, MdOutlineRemoveRedEye } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";
import { Images } from "../../images";
import { useNavigate } from "react-router";
import { TbArrowsDiagonal } from "react-icons/tb";

const CasinoWebsite = () => {
  const navigation = useNavigate();
  const [activeBtn, setActiveBtn] = useState("Websites");
  const [fullPoster, setFullPoster] = useState(false);
  const [editPoster, setEditPoster] = useState(false);
  const ACTIVE_BTNS = ["Websites", "Casino Providers"];
  const handleMatchClick = (matchName) => {
    navigation(`/management-casino/${encodeURIComponent(matchName)}`);
  };

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const CASINO_COLUMNS = [
    { header: "Website Name", field: "websiteName", width: "25%" },
    { header: "Website URL", field: "websiteURL", width: "30%" },
    { header: "P/L", field: "pl", width: "35%" },
    { header: "Status", field: "status", width: "10%" },
  ];
  const CASINO_DATA = [
    {
      websiteName: <div> Diamond Exchange</div>,
      websiteURL: <div>www.diamondexchange.com</div>,
      pl: <div className="green-font">5000000</div>,

      status: (
        <div className="w-100 flex-between  pointer">
          <MdOutlineRemoveRedEye
            size={18}
            onClick={() => handleMatchClick("T Casino Park")}
          />
          <span>
            <MdBlockFlipped size={18} />
          </span>
          <span className="active-btn-table">Live</span>
        </div>
      ),
    },
  ];
  const CASINO_DATA_DUPLICATES = Array(10).fill(CASINO_DATA[0]);
  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Poster Type", field: "posterType", width: "30%" },
    { header: "Poster", field: "Poster", width: "50%" },
    { header: "", field: "icons", width: "10%" },
  ];

  const CRICKET_DATA = [
    {
      dateTime: <div>Diamond Exchange</div>,
      posterType: <div>www.diamondexchange.com</div>,
      Poster: (
        <div className="relative poster-img">
          <img src={Images.Poster1} alt="Poster" />

          <TbArrowsDiagonal
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
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
      posterType: <div>Cricket</div>,
      Poster: (
        <div className="relative poster-img">
          <img src={Images.Poster1} alt="Poster" />

          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
        </div>
      ),
      icons: (
        <div className="d-flex w-50 flex-between">
          <span onClick={() => setEditPoster(!editPoster)}>
            <LiaPenSolid size={18} className="pointer" />
          </span>

          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
      posterType: <div>Cricket</div>,
      Poster: (
        <div className="relative poster-img">
          <img src={Images.Poster1} alt="Poster" />

          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
        </div>
      ),
      icons: (
        <div className="d-flex w-50 flex-between">
          <span onClick={() => setEditPoster(!editPoster)}>
            <LiaPenSolid size={18} className="pointer" />
          </span>

          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
      posterType: <div>Cricket</div>,
      Poster: (
        <div className="relative poster-img">
          <img src={Images.Poster1} alt="Poster" />

          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
        </div>
      ),
      icons: (
        <div className="d-flex w-50 flex-between">
          <span onClick={() => setEditPoster(!editPoster)}>
            <LiaPenSolid size={18} className="pointer" />
          </span>

          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
      posterType: <div>Cricket</div>,
      Poster: (
        <div className="relative poster-img">
          <img src={Images.Poster1} alt="Poster" />

          <TbArrowsDiagonal
            className="absolute zoom-out white-bg pointer"
            size={18}
            onClick={() => setFullPoster(!fullPoster)}
          />
        </div>
      ),
      icons: (
        <div className="d-flex w-50 flex-between">
          <span onClick={() => setEditPoster(!editPoster)}>
            <LiaPenSolid size={18} className="pointer" />
          </span>

          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Casino Live Settings</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      <div className="d-flex  small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-4 ${
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

      <div className="mt-4 ">
        {activeBtn === "Websites" ? (
          <Table
            columns={CASINO_COLUMNS}
            data={CASINO_DATA_DUPLICATES}
            itemsPerPage={5}
          />
        ) : (
          <Table
            columns={CRICKET_COLUMNS}
            data={CRICKET_DATA}
            itemsPerPage={2}
          />
        )}
      </div>
    </div>
  );
};

export default CasinoWebsite;
