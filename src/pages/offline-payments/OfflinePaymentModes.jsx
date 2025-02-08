import React, { useState } from "react";
import Table from "../../components/Table";
import { FaPlus, FaSearch } from "react-icons/fa";
import { SlPencil } from "react-icons/sl";
import { Images } from "../../images";
import AddNewOfflinePaymentModal from "./AddNewOfflinePaymentModal";

const OfflinePaymentModes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const hanldeAddModal=()=>{
    setShowAddModal(true);
    setIsEdit(false);
  }
  const handleEditModal=()=>{
    setIsEdit(true);
    setShowAddModal(true);
  }
  const columns = [
    { header: "Country", field: "country", width: "10%" },
    { header: "Currency ", field: "currency", width: "10%" },
    { header: "Name", field: "name", width: "10%" },
    { header: "Details", field: "details", width: "15%" },
    { header: "Image", field: "image", width: "15%" },
    { header: "type", field: "type", width: "15%" },
    { header: "Qr", field: "qr", width: "15%" },

    { header: "Status", field: "status", width: "10%" },
    {
      header: <div className="text-center">Actions</div>,
      field: "action",
      width: "10%",
    },
  ];
  const data = [
    {
      country: <div>India</div>,
      currency: <div>INR</div>,
      name: <div>Paytm</div>,
      details: <div>details</div>,
      type: <div>other</div>,
      qr: (
        <div className="d-flex gap-2">
          <img src={Images?.QrImg} className="w-10 h-5vh" loading="lazy" />
          <span>Qr Code</span>
        </div>
      ),
      image: (
        <img src={Images?.ChatIcon} className="w-10 h-5vh" loading="lazy" />
      ),
      status: <span className="red-btn badge py-2 px-3">In-Active</span>,
      action: (
        <span title="this gateway is inactivated you can't updated it!">
          <SlPencil size={20} className="me-2 pointer" onClick={handleEditModal}/>
        </span>
      ),
    },
    {
      country: <div>India</div>,
      currency: <div>INR</div>,
      name: <div>Paytm</div>,
      details: <div>details</div>,
      type: <div>other</div>,
      qr: (
        <div className="d-flex gap-2">
          <img src={Images?.QrImg} className="w-10 h-5vh" loading="lazy" />
          <span>Qr Code</span>
        </div>
      ),
      image: (
        <img src={Images?.ChatIcon} className="w-10 h-5vh" loading="lazy" />
      ),
      status: <span className="green-btn badge py-2 px-3">In-Active</span>,
      action: (
        <span title="this gateway is inactivated you can't updated it!">
          <SlPencil size={20} className="me-2 pointer" />
        </span>
      ),
    },
  ];
  return (
    <div>
      <div className="row justify-content-between align-items-center mb-3 mt-2">
        <h6 className="col-2 yellow-font medium-font mb-0">
          Offline Payment Modes
        </h6>

        <div className="col-6 d-flex justify-content-end gap-3 medium-font">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 w-50">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>

          <button className="rounded-pill input-pill blue-font small-font px-2" onClick={hanldeAddModal}>
            <FaPlus /> Add New
          </button>
        </div>
      </div>

      <div className="mt-2">
        <Table data={data} columns={columns} itemsPerPage={6} />
      </div>

      <AddNewOfflinePaymentModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};

export default OfflinePaymentModes;
