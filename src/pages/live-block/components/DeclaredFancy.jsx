import React from "react";
import ScrollTable from "../../../components/ScrollTable";
import { MdBlock} from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

const columns = [
  { header: "Date & Time", field: "date_time", width: "10%" },
  { header: "Sports", field: "sports", width: "10%" },
  { header: "Match", field: "match", width: "30%" },
  { header: "P/L", field: "pl", width: "10%" },
  {
    header: <div className="text-center">Position</div>,
    field: "position",
    width: "20%",
  },
  {
    header: <div className="">Action</div>,
    field: "action",
    width: "5%",
  },
];

const tableData = [
  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    pl:"100000",
    position: (
      <div className="text-center mt-2">
        <span className="green-btn">Declared</span>
      </div>
    ),
    action: (
        <div className="d-flex">
            <MdBlock size={18} className="font-20 me-2" />
            <FaRegTrashCan size={18} className="font- ms-2" />
        </div>
    ),
  },

  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    pl:"100000",
    position: (
      <div className="text-center mt-2">
        <span className="green-btn">Declared</span>
      </div>
    ),
    action: (
        <div className="d-flex">
            <MdBlock size={18} className="font-20 me-2" />
            <FaRegTrashCan size={18} className="font- ms-2" />
        </div>
    ),
  },

  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    pl:"100000",
    position: (
      <div className="text-center mt-2">
        <span className="green-btn">Declared</span>
      </div>
    ),
    action: (
        <div className="d-flex">
            <MdBlock size={18} className="font-20 me-2" />
            <FaRegTrashCan size={18} className="font- ms-2" />
        </div>
    ),
  },

  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    pl:"100000",
    position: (
      <div className="text-center mt-2">
        <span className="green-btn">Declared</span>
      </div>
    ),
    action: (
        <div className="d-flex">
            <MdBlock size={18} className="font-20 me-2" />
            <FaRegTrashCan size={18} className="font- ms-2" />
        </div>
    ),
  },

  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    pl:"100000",
    position: (
      <div className="text-center mt-2">
        <span className="green-btn">Declared</span>
      </div>
    ),
    action: (
        <div className="d-flex">
            <MdBlock size={18} className="font-20 me-2" />
            <FaRegTrashCan size={18} className="font- ms-2" />
        </div>
    ),
  },

  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    pl:"100000",
    position: (
      <div className="text-center mt-2">
        <span className="green-btn">Declared</span>
      </div>
    ),
    action: (
        <div className="d-flex">
            <MdBlock size={18} className="font-20 me-2" />
            <FaRegTrashCan size={18} className="font- ms-2" />
        </div>
    ),
  },
];

const DeclaredFancy = () => {
  return (
    <div className="table-parent-container mt-3">
      <ScrollTable columns={columns} data={tableData} itemsPerPage={5} />
    </div>
  );
};

export default DeclaredFancy;
