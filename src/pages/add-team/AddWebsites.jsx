import React, { useState } from "react";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { MdBlockFlipped } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import AddWebsitesPopup from "./popups/AddWebsitesPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";

const AddWibsites = () => {
  const role = localStorage.getItem("role_code");
  const [onAddwebsitePopup, setOnAddwebsitePopup] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const columns = [
    { header: "Type", field: "type", width: "15%" },
    { header: "Website Name", field: "websiteName", width: "25%" },
    { header: "Location", field: "location", width: "20%" },
    { header: "URL", field: "url", width: "20%" },
    {
      header: <div className="ps-1 text-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = [
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil
            size={18}
            className="pointer"
            onClick={() => setOnAddwebsitePopup(true)}
          />
          <MdBlockFlipped
            size={18}
            className="pointer"
            onClick={() => setConfirmationPopupOpen(true)}
          />
        </div>
      ),
    },
    {
      type: "White Label",
      websiteName: "T Casino Park",
      location: "Delhi, India",
      url: "www.tcasinopark.com",
      action:
        role === "Super Admin" ? null : (
          <div className="flex-center gap-4">
            <SlPencil
              size={18}
              className="pointer "
              onClick={() => setOnAddwebsitePopup(true)}
            />
            <MdBlockFlipped
              size={18}
              className="pointer"
              onClick={() => setConfirmationPopupOpen(true)}
            />
          </div>
        ),
    },
    {
      type: "Company",
      websiteName: "Spark Book",
      location: "Hyderabad, India",
      url: "www.sparkbook.com",
      action:
        role === "Super Admin" ? null : (
          <div className="flex-center gap-4">
            <SlPencil
              size={18}
              className="pointer "
              onClick={() => setOnAddwebsitePopup(true)}
            />
            <MdBlockFlipped size={18} className="pointer" />
          </div>
        ),
    },
    {
      type: "White Label",
      websiteName: "Fun77",
      location: "Kolkata, India",
      url: "www.fun77.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "Diamond Exchange",
      location: "Kochi, India",
      url: "www.diamondexchange.com",
      action:
        role === "Super Admin" ? null : (
          <div className="flex-center gap-4">
            <SlPencil
              size={18}
              className="pointer "
              onClick={() => setOnAddwebsitePopup(true)}
            />
            <MdBlockFlipped size={18} className="pointer red-font" />
          </div>
        ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer font-red" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer red-font" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="flex-center gap-4">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
  ];

  const directorswebsitecolumns = [
    { header: "Type", field: "type", width: "15%" },
    { header: "Website Name", field: "websiteName", width: "25%" },
    { header: "Location", field: "location", width: "20%" },
    { header: "URL", field: "url", width: "20%" },
  ];

  const directorswebsitedata = [
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped
            size={18}
            className="pointer"
            onClick={() => setConfirmationPopupOpen(true)}
          />
        </div>
      ),
    },
    {
      type: "White Label",
      websiteName: "T Casino Park",
      location: "Delhi, India",
      url: "www.tcasinopark.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped
            size={18}
            className="pointer"
            onClick={() => setConfirmationPopupOpen(true)}
          />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "Spark Book",
      location: "Hyderabad, India",
      url: "www.sparkbook.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "White Label",
      websiteName: "Fun77",
      location: "Kolkata, India",
      url: "www.fun77.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "Diamond Exchange",
      location: "Kochi, India",
      url: "www.diamondexchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer red-font" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer font-red" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer red-font" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
    {
      type: "Company",
      websiteName: "T Exchange",
      location: "Hyderabad, India",
      url: "www.texchange.com",
      action: (
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" />
          <MdBlockFlipped size={18} className="pointer" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="row justify-content-between align-items-center mb-3 mt-2">
        <h6 className="col-2 yellow-font medium-font mb-0">Websites List</h6>

        <div className="col-6 d-flex justify-content-end gap-3 medium-font">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 w-50">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>

          {role === "management" ? (
            <button
              className="rounded-pill input-pill blue-font small-font px-2"
              onClick={() => setOnAddwebsitePopup(true)}
            >
              <FaPlus /> Add New Website{" "}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {role === "management" ? (
        <div className="mt-2">
          <Table data={data} columns={columns} itemsPerPage={11} />
        </div>
      ) : (
        <div className="mt-2">
          <Table
            data={directorswebsitedata}
            columns={directorswebsitecolumns}
            itemsPerPage={11}
          />
        </div>
      )}

      <AddWebsitesPopup
        show={onAddwebsitePopup}
        onHide={() => setOnAddwebsitePopup(false)}
      />

      <ConfirmationPopup
        confirmationPopupOpen={confirmationPopupOpen}
        setConfirmationPopupOpen={setConfirmationPopupOpen}
        discription="Are you sure you want to block this website?"
        submitButton="Block"
      />
    </div>
  );
};

export default AddWibsites;
