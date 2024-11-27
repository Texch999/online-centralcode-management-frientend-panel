import React, { useState } from "react";
import Table from "../../components/Table";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import NewProvidersPopup from "./NewProvidersPopup";
import NewGamesPopup from "./NewGamesPopup";
import AddNewProvider from "./AddNewProvider";

const VendorRegistration = () => {
  const buttons = ["Vendor List", "Register New Vendor"];
  const [activeBtn, setActiveBtn] = useState(0);
  const [newProvidersModal, setNewProvidersModal] =useState(false);
  const [newGamesModal, setNewGamesModal]=useState(false);
  const[addNewProvider, setAddNewProvider]=useState(false);
  const handleProvidersModal=()=>{
    setNewProvidersModal(!newProvidersModal);
  }

  const handleGamesModal=()=>{
    setNewGamesModal(!newGamesModal)
  }

  const addNewProviderModal=()=>{
    setAddNewProvider(!addNewProvider);

  }

  const handleClick = (index) => {
    setActiveBtn(index);
  };

  const cols = [
    { header: "S No", field: "sno" },
    { header: "Vendor Name", field: "vendor" },
    { header: "vendor Percentage", field: "vendorper" },
    { header: "Vendor Country", field: "country" },
    { header: "Providers", field: "providers" },
    { header: "Profit & Loss", field: "pl" },
    { header: "Action", field: "action" },
  ];

  const data = [
    {
      sno: <div>1</div>,
      vendor: <div className="orange-clr">Jitendra</div>,
      vendorper: <div>15%</div>,
      country: <div>UK</div>,
      providers: (
        <div className="d-flex flex-column">
          <div className="mb-2">Ezugi</div>
          <div className="mb-2">Evolution</div>
          <div className="mb-2">Asian Games</div>
          <div className="mb-2">Pragmatic Play</div>
          <div className="mb-2">Sexy Gaming</div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column">
          <div className="green-clr mb-2">50000</div>
          <div className="dark-orange-clr mb-2">60000</div>
          <div className="green-clr mb-2">20000</div>
          <div className="green-clr mb-2">40000</div>
          <div className="dark-orange-clr mb-2">65000</div>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <MdOutlineEdit className="orange-clr font-20" />
         
        </div>
      ),
    },
    {
      sno: <div>2</div>,
      vendor: <div className="orange-clr">Lokesh</div>,
      vendorper: <div>15%</div>,
      country: <div>UK</div>,
      providers: (
        <div className="d-flex flex-column">
          <div className="mb-2">Ezugi</div>
          <div className="mb-2">Evolution</div>
          <div className="mb-2">Asian Games</div>
          <div className="mb-2">Pragmatic Play</div>
          <div className="mb-2">Sexy Gaming</div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column">
          <div className="green-clr mb-2">50000</div>
          <div className="dark-orange-clr mb-2">60000</div>
          <div className="green-clr mb-2">20000</div>
          <div className="green-clr mb-2">40000</div>
          <div className="dark-orange-clr mb-2">65000</div>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <MdOutlineEdit className="orange-clr font-20" />
        
        </div>
      ),
    },
  ];


  

  return (
    <div>
      <h4 className="black-text">Register Vendor</h4>
      <div className="d-flex flex-between medium-font">
        <div className="d-flex mt-3">
          {buttons.map((btn, index) => {
            return (
              <div
                key={index}
                className={`px-3 py-1 me-2 white-box pointer ${
                  activeBtn === index ? "active-saffron-btn " : ""
                }`}
                onClick={() => handleClick(index)}
              >
                {btn}
              </div>
            );
          })}
        </div>
        <div className="flex-center white-bg2 grey-border px-3 py-1 rounded-pill me-2 pointer black-text2 " 
        onClick={()=>{addNewProviderModal()
          handleClick(null)
        }}>
          <IoMdAdd size={19} />
          <span className="ps-2 medium-font">Add New Provider</span>
        </div>
      </div>

      <div className="mt-3">
        {activeBtn === 0 && (
          <div className="white-bg radius box-shadow">
            <Table columns={cols} data={data} itemsPerPage={4} />
          </div>
        )}
        {activeBtn === 1 && (
          <div className="dashboard-white-bg box-shadow radius p-3">
            <div className="d-felx w-100 d-flex align-items-center">
              <div className="col-4 felx-column px-2 text-black ">
                <label className="small-font">Providers</label>
                <div className="input-css small-font text-black pointer w-100 d-flex flex-between" 
                onClick={handleProvidersModal}>
                <span> Select</span>
                  <FaChevronDown className="font-15 grey-clr" />
                </div>
              </div>
              <div className="col-4 felx-column px-2 text-black">
                <label className="small-font">Games</label>
                <div className="input-css small-font text-black pointer w-100 d-flex flex-between" onClick={handleGamesModal}>
                  <span> Select</span>
                  <FaChevronDown className="font-15 grey-clr" />
                </div>
              </div>
              <div className="col-4 felx-column px-2 small-font">
                <div className="saffron-btn2 br-5 pointer mt-4">Submit</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <NewProvidersPopup show={newProvidersModal} setShow={setNewProvidersModal}/>
      <NewGamesPopup show={newGamesModal} setShow={setNewGamesModal}/>
      <AddNewProvider show={addNewProvider} setShow={setAddNewProvider}/>
    </div>
  );
};

export default VendorRegistration;
