import React, {  useState } from "react";
import {  FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { IoAddOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";
import NewPromotionPopUp from "./NewPromotionPopUp";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import FullPosterPopUp from "./FullPosterPopUp";
import { MdOutlineFileUpload } from "react-icons/md";
import EditPosterPopUp from "./EditPosterPopUp";


const PromotionType = () => {
  const [activeBtn, setActiveBtn] = useState("Promotion Type");
  const [addNewModal, setAddNewModal] = useState(false);
  const [fullPoster, setFullPoster] = useState(false);
  const [editPoster,setEditPoster]=useState(false)
  const ACTIVE_BTNS = ["Promotion Type", "Poster Templates"];

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const CASINO_COLUMNS = [
    { header: "Date & Time", field: "dateTime" },
    { header: "Promotion Place", field: "promotionPlace" },
    { header: "Promotion Type", field: "promotionType" },
    { header: "Promotion ID", field: "promotionid" },
    { header: "", field: "icons" },
  ];
  const CASINO_DATA = [
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      promotionPlace: <div>Cricket</div>,
      promotionType: <div>1st Deposit Bonus</div>,

      promotionid: <div>1234568774432</div>,

      icons: (
        <div className="d-flex w-80 flex-between">
          <span>
            <LiaPenSolid size={18} />
          </span>
          <span>
            <MdBlockFlipped size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      promotionPlace: <div>Cricket</div>,
      promotionType: <div>1st Deposit Bonus</div>,

      promotionid: <div>1234568774432</div>,

      icons: (
        <div className="d-flex w-80 flex-between">
          <span>
            <LiaPenSolid size={18} />
          </span>
          <span>
            <MdBlockFlipped size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      promotionPlace: <div>Cricket</div>,
      promotionType: <div>1st Deposit Bonus</div>,

      promotionid: <div>1234568774432</div>,

      icons: (
        <div className="d-flex w-80 flex-between">
          <span>
            <LiaPenSolid size={18} />
          </span>
          <span>
            <MdBlockFlipped size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      promotionPlace: <div>Cricket</div>,
      promotionType: <div>1st Deposit Bonus</div>,

      promotionid: <div>1234568774432</div>,

      icons: (
        <div className="d-flex w-80 flex-between">
          <span>
            <LiaPenSolid size={18} />
          </span>
          <span>
            <MdBlockFlipped size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      promotionPlace: <div>Cricket</div>,
      promotionType: <div>1st Deposit Bonus</div>,

      promotionid: <div>1234568774432</div>,

      icons: (
        <div className="d-flex w-80 flex-between">
          <span>
            <LiaPenSolid size={18} />
          </span>
          <span>
            <MdBlockFlipped size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      promotionPlace: <div>Cricket</div>,
      promotionType: <div>1st Deposit Bonus</div>,

      promotionid: <div>1234568774432</div>,

      icons: (
        <div className="d-flex w-80 flex-between">
          <span>
            <LiaPenSolid size={18} />
          </span>
          <span>
            <MdBlockFlipped size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
          </span>
        </div>
      ),
    },
  ];
  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Poster Type", field: "posterType", width: "30%" },
    { header: "Poster", field: "Poster", width: "50%" },
    { header: "", field: "icons", width: "10%" },
  ];

  const CRICKET_DATA = [
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
          <span onClick={()=>setEditPoster(!editPoster)}>
            <LiaPenSolid size={18}  className="pointer" />
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
          <span onClick={()=>setEditPoster(!editPoster)}>
            <LiaPenSolid size={18}  className="pointer" />
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
          <span onClick={()=>setEditPoster(!editPoster)}>
            <LiaPenSolid size={18}  className="pointer" />
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
          <span onClick={()=>setEditPoster(!editPoster)}>
            <LiaPenSolid size={18}  className="pointer" />
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
          <span onClick={()=>setEditPoster(!editPoster)}>
            <LiaPenSolid size={18}  className="pointer" />
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
        <h6 className="yellow-font mb-0">Promotion Type</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
     
      <div className="d-flex col-3 flex-between small-font">
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
      {activeBtn === "Promotion Type" ? (
        <div className="d-flex w-100 flex-between mt-2">
          <div className="d-flex w-80">
            <div className="col-2 flex-column me-3">
              <label className="black-text4 small-font mb-1">Promotion</label>
              <select className="input-css2 small-font">
                <option>All</option>
              </select>
            </div>
          </div>

          <div
            className="saffron-btn2 small-font pointer mt-4 col-1"
            onClick={() => setAddNewModal(!addNewModal)}
          >
            <IoAddOutline className="large-font" /> Add New
          </div>
        </div>
      ) : (
        <div className="d-flex w-100 flex-between mt-2">
          <div className="d-flex w-50 flex-between mt-2">
          <div className="col-4 flex-column me-3">
            <label className="black-text4 small-font mb-1">
              Promotion Type
            </label>
            <select className="input-css2 small-font">
              <option>General Poster</option>
            </select>
          </div>
          <div className="col-6 flex-column me-3 ">
            <label className="black-text4 small-font " htmlFor="poster">
            Upload Poster
              <input type="file" style={{ display: "none" }} id="poster" />
              <div className="input-css2 small-font d-flex flex-between">
                Upload <MdOutlineFileUpload />
              </div>
            </label>
          </div>

          <div className="saffron-btn2 small-font pointer mt-4 col-2 mx-2">
            Submit
          </div>
          </div>
          

        </div>
      )}

      <div className="mt-4 ">
        {activeBtn === "Promotion Type" ? (
          <Table columns={CASINO_COLUMNS} data={CASINO_DATA} itemsPerPage={5} />
        ) : (
          <Table
            columns={CRICKET_COLUMNS}
            data={CRICKET_DATA}
            itemsPerPage={2}
          />
        )}
      </div>
      <NewPromotionPopUp
        addNewModal={addNewModal}
        setAddNewModal={setAddNewModal}
      />

      <FullPosterPopUp setFullPoster={setFullPoster} fullPoster={fullPoster} />
      <EditPosterPopUp setEditPoster={setEditPoster} editPoster={editPoster}/>
    </div>
  );
};

export default PromotionType;
