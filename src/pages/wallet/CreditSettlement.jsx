import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../components/ReactSelectStyles";
import Select from "react-select";
import Table from "../../components/Table";
import { IoEye, IoEyeOff, IoEyeOutline } from "react-icons/io5";
import ReturnCreditModal from "./ReturnCreditModal";

const CreditSettlement = () => {
  const navigate = useNavigate();
  const [returnCreditModal, setReturnCreditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pswdVisible, setPswdVisible] = useState(false);
  const adminOptions = [
    { value: "Option 1", label: "Director-Jayanta" },
    { value: "Option 2", label: "Director-Jayanta" },
    { value: "Option 3", label: "Director-Jayanta" },
  ];

  const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
    { header: "Name & Role", field: "nameRole" },
    {
      header: (
        <div className="d-flex w-100">
          <span className="w-50">Admin Website</span>
        </div>
      ),
      field: "adminweb",
    },
    {
      header: (
        <div className="d-flex w-100">
          <span className="w-50">User Website</span>{" "}
        </div>
      ),
      field: "userwb",
    },
    { header: "Total Credit", field: "TotalC" },
    { header: "Settled Amt.", field: "sAmt" },
    { header: "Bal. Credit", field: "balCredit" },
    { header: "Enter Settlement Amount", field: "entersa" },
    { header: "View", field: "view" },
  ];

  const data = [
    {
      nameRole: (
        <div className="small-font">
          <span className="dark-yellow px-1 py-1 mx-1">D</span>Abhi
        </div>
      ),
      adminweb: <div>2</div>,
      userwb: <div>1</div>,
      TotalC: <div>4000</div>,
      sAmt: <div>4000</div>,
      balCredit: <div className="red-font">1000</div>,
      entersa: (
        <div className="d-flex flex-between">
          <div className="white-btn2">0.0</div>
          <div className="saffron-btn2 white-space">Full Settled</div>
        </div>
      ),
      view: (
        <div className="d-flex flex-between">
          <IoEyeOutline
            className="mx-1"
            size={18}
            onClick={() => navigate("/settlement-transaction")}
          />

          <div
            className="saffron-btn2 white-space"
            onClick={() => setReturnCreditModal(true)}
          >
            Return Credit Chips
          </div>
        </div>
      ),
    },
  ];

  const footer = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "0.0" },
    { header: "0.0" },
    { header: "0.0" },
    { header: "" },
    { header: "" },
  ];
  return (
    <>
      <div>
        <div className="flex-between mb-3 mt-1">
          <div className="d-flex align-items-center yellow-font fw-600">
            <span>
              <MdOutlineKeyboardArrowLeft
                size={22}
                onClick={() => navigate(-1)}
              />
            </span>
            <span className="yellow-font">Credit & Settlement</span>
          </div>

          <div className="input-pill d-flex align-items-center rounded-pill px-2 py-1">
            <FaSearch size={16} className="grey-clr me-2" />
            <input
              className="small-font all-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="input-css px-2 medium-font">
          <div className="d-flex flex-start">
            {" "}
            <span className="border-right px-1">Your Balance</span>{" "}
            <span className="green-font mx-1">88,414</span>
          </div>
        </div>
        <div className="d-flex my-1">
          <div className="flex-column col-2 me-3">
            <label className="black-text4 small-font mb-1 ms-1">
              Select Admin Name
            </label>
            <Select
              className="small-font"
              options={adminOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>
          <div className="flex-column col-1 d-flex align-items-end justify-content-end">
            <button className="w-100 saffron-btn2 small-font">Submit</button>
          </div>
        </div>
        <div className="mt-3" style={{ zIndex: "10" }}>
          <Table
            columns={MY_TRANSACTIONS_MANAGEMENT_COLUMNS}
            data={data}
            footer={footer}
            // itemsPerPage={itemsPerPage}
            // totalRecords={totalRecords}
            // onPageChange={handlePageChange}
            verLine={true}
          />
        </div>
        <div className="row small-font my-2 align-items-center">
          <div className="small-font my-1 col-2">Management Password</div>

          <div className="col-4">
            <div className="input-bg d-flex br-5 py-2 px-2 flex-between">
              <input
                className="all-none w-100"
                type={pswdVisible ? "text" : "password"}
                placeholder="Enter Password"
              />
              {pswdVisible ? (
                <IoEye
                  className="black-font"
                  size={15}
                  onClick={() => setPswdVisible(false)}
                />
              ) : (
                <IoEyeOff
                  className="black-font"
                  size={15}
                  onClick={() => setPswdVisible(true)}
                />
              )}
            </div>
          </div>
          <div className="col-2">
            <div className="saffron-btn2 pointer">Fill</div>
          </div>
          <div className="col-2">
            <div className="saffron-btn2 pointer">Settled</div>
          </div>
          <div className="col-2">
            <div className="white-btn2 pointer">Clear All</div>
          </div>
        </div>
      </div>

      <ReturnCreditModal
        show={returnCreditModal}
        setShow={setReturnCreditModal}
      />
    </>
  );
};

export default CreditSettlement;
