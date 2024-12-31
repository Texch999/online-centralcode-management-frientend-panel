import React, { useState } from "react";
import Table from "../../../../components/Table";
import { IoMdAdd } from "react-icons/io";
import { SlPencil } from "react-icons/sl";
import AddNewSportsProvider from "./AddNewSportsProvider";
import SportsNewVendor from "./SportsNewVendor";

const SportsVendorRegistration = () => {
  const buttons = ["Vendor List", "Register New Vendor"];
  const [activeBtn, setActiveBtn] = useState(0);
  const [addNewProvider, setAddNewProvider] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isEditVendor, setISEditVendor] = useState(false);
  const showEditModal = () => {
    setISEditVendor(true);
  };
  const addNewProviderModal = () => {
    setIsActiveBtn(true);
    setAddNewProvider(!addNewProvider);
  };
  const handleClick = (index) => {
    setActiveBtn(index);
  };

  const cols = [
    { header: "S No", field: "sno", width: "10%" },
    { header: "Vendor Name", field: "vendor", width: "15%" },
    { header: "Vendor %", field: "vendorper", width: "10%" },
    { header: "Vendor Country", field: "country", width: "15%" },
    { header: "Providers", field: "providers", width: "20%" },
    { header: "Profit & Loss", field: "pl", width: "20%" },
    {
      header: <div className="flex-end">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = [
    {
      sno: <div>1</div>,
      vendor: <div>Jitendra</div>,
      vendorper: <div>15%</div>,
      country: <div>India</div>,
      providers: (
        <div className="flex-column">
          <div className="mb-3">Ezugi</div>
          <div className="mb-3">Evolution</div>
          <div className="mb-3">Asian Games</div>
          <div className="mb-3">Pragmatic Play</div>
          <div className="mb-3">Sexy Gaming</div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column">
          <div className="green-clr mb-3">50000000</div>
          <div className="dark-orange-clr mb-3">60000000</div>
          <div className="green-clr mb-3">20000000</div>
          <div className="green-clr mb-3">40000000</div>
          <div className="dark-orange-clr mb-3">65000000</div>
        </div>
      ),
      action: (
        <div className="flex-end">
          <SlPencil
            size={18}
            className="pointer me-2 orange-clr"
            onClick={showEditModal}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h6 className="black-text my-3">Register Vendor</h6>
      <div className="d-flex flex-between small-font">
        <div className="d-flex">
          {buttons.map((btn, index) => (
            <div
              key={index}
              className={`px-3 py-1 me-3 white-box pointer ${
                activeBtn === index ? "active-saffron-btn " : ""
              }`}
              onClick={() => {
                handleClick(index);
                setIsActiveBtn(null);
              }}
            >
              {btn}
            </div>
          ))}
        </div>
        <div
          className={`flex-center white-bg grey-border px-3 py-1 rounded-pill pointer black-text2 ${
            isActiveBtn === true ? "saffron-btn" : ""
          }`}
          onClick={() => {
            addNewProviderModal();
          }}
        >
          <IoMdAdd size={18} />
          <span className="ps-2 small-font">Add New Provider</span>
        </div>
      </div>

      <div className="mt-3">
        {activeBtn === 0 && (
          <div>
            {isEditVendor ? (
              <div>
                <SportsNewVendor
                  isEdit={isEditVendor}
                  setIsEdit={setISEditVendor}
                />
              </div>
            ) : (
              <Table columns={cols} data={data} itemsPerPage={4} />
            )}
          </div>
        )}
        {activeBtn === 1 && <SportsNewVendor />}
      </div>
      <AddNewSportsProvider show={addNewProvider} setShow={setAddNewProvider} />
    </div>
  );
};

export default SportsVendorRegistration;
