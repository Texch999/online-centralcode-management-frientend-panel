import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { IoAddOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import NewPromotionPopUp from "./NewPromotionPopUp";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import FullPosterPopUp from "./FullPosterPopUp";
import { MdOutlineFileUpload } from "react-icons/md";
import EditPosterPopUp from "./EditPosterPopUp";
import Select from "react-select";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

const PromotionType = () => {
  const [activeBtn, setActiveBtn] = useState("Promotion Type");
  const [fullPoster, setFullPoster] = useState(false);
  const [editPoster, setEditPoster] = useState(false);
  const [addNewModal, setAddNewModal] = useState(false);
  const [promotionDeleteModal, setPromotionDeleteModal] = useState(false);
  const [promotionBlockModal, setPromotionBlockModal] = useState(false);
  const [posterDeleteModal, setPosterDeleteModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const ACTIVE_BTNS = ["Promotion Type", "Poster Templates"];

  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const handleSportClick = (item) => {
    setActiveBtn(item);
  };

  const handleAddNew = () => {
    setModalType("New Promotion Type");
    setAddNewModal(true);
  };

  const handleEdit = () => {
    setModalType("Edit Promotion Type");
    setAddNewModal(true);
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
        <div className="flex-end">
          <SlPencil size={18} className="pointer" onClick={handleEdit} />
          <MdBlockFlipped
            size={18}
            className="mx-3 pointer"
            onClick={() => setPromotionBlockModal(true)}
          />
          <FaRegTrashCan
            size={18}
            className="pointer"
            onClick={() => setPromotionDeleteModal(true)}
          />
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      promotionPlace: <div>Cricket</div>,
      promotionType: <div>1st Deposit Bonus</div>,
      promotionid: <div>1234568774432</div>,

      icons: (
        <div className="flex-end">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="mx-3 pointer" />
          <FaRegTrashCan size={18} className="pointer" />
        </div>
      ),
    },
    {
      dateTime: <div>1-10-2024 16:11:00</div>,
      promotionPlace: <div>Cricket</div>,
      promotionType: <div>1st Deposit Bonus</div>,
      promotionid: <div>1234568774432</div>,

      icons: (
        <div className="flex-end">
          <SlPencil size={18} />
          <MdBlockFlipped size={18} className="mx-3" />
          <FaRegTrashCan size={18} />
        </div>
      ),
    },
  ];
  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "10%" },
    { header: "Poster Type", field: "posterType", width: "50%" },
    { header: <div className="flex-center">Poster</div>, field: "Poster" },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
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
        <div className="flex-center">
          <div className="relative poster-img">
            <img src={Images.Poster1} alt="Poster" />
            <TbArrowsDiagonal
              className="absolute zoom-out white-bg pointer"
              size={18}
              onClick={() => setFullPoster(!fullPoster)}
            />
          </div>
        </div>
      ),
      action: (
        <div className="flex-center">
          <SlPencil
            size={18}
            className="pointer me-2"
            onClick={() => setEditPoster(!editPoster)}
          />
          <FaRegTrashCan
            size={18}
            className="pointer ms-2 delete"
            onClick={() => setPosterDeleteModal(true)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font medium-font mb-0">Promotion Type</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="d-flex small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item ? "saffron-btn2" : "white-btn2 pointer"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      {activeBtn === "Promotion Type" ? (
        <>
          <div className="flex-between w-100 my-3 small-font">
            <div className="col-3 col-lg-2 flex-column">
              <label className="black-text4 mb-1">Promotion</label>
              <Select
                className="small-font"
                options={selectOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>
            <button
              className="saffron-btn2 pointer align-self-end"
              onClick={handleAddNew}
            >
              <IoAddOutline className="me-1 large-font" />
              <span>Add New</span>
            </button>
          </div>
          <Table columns={CASINO_COLUMNS} data={CASINO_DATA} itemsPerPage={2} />
        </>
      ) : (
        <>
          <div className="row my-3 small-font align-items-center">
            {/* Promotion Type */}
            <div className="col-md-3 col-lg-2">
              <label
                htmlFor="promotionType"
                className="black-text4 small-font mb-1 d-block"
              >
                Promotion Type
              </label>
              <Select
                id="promotionType"
                className="small-font w-100"
                options={selectOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>

            {/* Upload Poster */}
            <div className="col-md-3 col-lg-2 px-0">
              <label
                htmlFor="poster"
                className="black-text4 small-font mb-1 d-block"
              >
                Upload Poster
              </label>
              <label htmlFor="poster" className="d-block">
                <input type="file" id="poster" style={{ display: "none" }} />
                <div className="input-css2 small-font d-flex justify-content-between align-items-center pointer">
                  Upload
                  <MdOutlineFileUpload className="grey-color medium-font" />
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="col-md-2 col-lg-1 align-self-end">
              <button className="w-100 saffron-btn2 pointer small-font">
                Submit
              </button>
            </div>
          </div>

          <Table
            columns={CRICKET_COLUMNS}
            data={CRICKET_DATA}
            itemsPerPage={2}
          />
        </>
      )}

      <NewPromotionPopUp
        addNewModal={addNewModal}
        setAddNewModal={setAddNewModal}
        modalType={modalType}
      />

      <FullPosterPopUp setFullPoster={setFullPoster} fullPoster={fullPoster} />
      <EditPosterPopUp setEditPoster={setEditPoster} editPoster={editPoster} />
      <ConfirmationPopup
        confirmationPopupOpen={promotionDeleteModal}
        setConfirmationPopupOpen={() => setPromotionDeleteModal(false)}
        discription={"are you sure you want to delete this Promotion"}
        submitButton={"Delete"}
      />

      <ConfirmationPopup
        confirmationPopupOpen={promotionBlockModal}
        setConfirmationPopupOpen={() => setPromotionBlockModal(false)}
        discription={"are you sure you want to block this Promotion"}
        submitButton={"Block"}
      />

      <ConfirmationPopup
        confirmationPopupOpen={posterDeleteModal}
        setConfirmationPopupOpen={() => setPosterDeleteModal(false)}
        discription={"are you sure you want to delete this Poster"}
        submitButton={"Delete"}
      />
    </div>
  );
};

export default PromotionType;
