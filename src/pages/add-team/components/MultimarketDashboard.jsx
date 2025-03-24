import React from "react";
import Table from "../../../components/Table";
import { IoAdd } from "react-icons/io5";
import { MdBlock, MdDelete, MdOutlineModeEdit } from "react-icons/md";

const MultimarketDashboard = () => {
  const columns = [
    {
      header: (
        <div className="d-flex flex-between">
          <div className="">Website Name</div>
          <div className="">Share/Rent</div>
        </div>
      ),
      field: "name",width:"43%"
    },

    {
      header: <div className="flex-center w-100">Last Updated</div>,
      field: "last",width:"40%"
    },
    {
      header: <div className="">Status</div>,
      field: "status", width:"10%"
    },
    {
      header: <div className="text-center w-100">Action</div>,
      field: "action",width:"20%"
    },
  ];
  const data = [
    {
      name: (
        <div>
          <div className="d-flex flex-between">
            <div className="d-flex flex-column">
              <div className="fw-700">Brahma</div>
              <div>User website:</div>
              <div className="d-flex flex-column">
                <div>diamondexchangenew.com</div>
                <div>starsports247.com</div>
              </div>
            </div>
            <div className="d-flex flex-column ">
              <div className="fw-700"></div>
              <div></div>
              <div className="d-flex flex-column">
                <div>10%</div>
                <div>5000</div>
              </div>
            </div>
          </div>
          <div className="d-flex my-2 flex-between">
            <div className="d-flex flex-column">
              <div className="fw-700">Ravana</div>
              <div>User website:</div>
              <div className="d-flex flex-column">
                <div>diamondexchangenew.com</div>
                <div>starsports247.com</div>
              </div>
            </div>
            <div className="d-flex flex-column ">
              <div className="fw-700"></div>
              <div></div>
              <div className="d-flex flex-column">
                <div>10%</div>
                <div>5000</div>
              </div>
            </div>
          </div>
        </div>
      ),

      last: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div>26/09/2024</div>
        </div>
      ),
      status: (
        <div className="badge payment-gateway-status-badge p-2">
          active
        </div>
      ),
      action: (
        <div className="d-flex gap-2 flex-center">
          <span>
            <MdOutlineModeEdit size={20} />
          </span>
          <span>
            <MdBlock size={20} />
          </span>
          <span>
            <MdDelete size={20} />
          </span>
        </div>
      ),
    },
  ];
  return (
    <div className="py-4 bg-white shadow rounded">
      <div className="px-3 d-flex justify-content-between align-items-center mb-3">
        <h6 className="medium-font">Multimarket</h6>
        <div className="d-flex gap-2 align-items-center small-font white-btn br-5">
          <IoAdd className="blue-font" size={20} />
          Add New
        </div>
      </div>

      <div className="table-parent-container mt-2">
        <Table data={data} columns={columns} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default MultimarketDashboard;
