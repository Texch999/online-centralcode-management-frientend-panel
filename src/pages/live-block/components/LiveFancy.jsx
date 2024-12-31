import React from "react";
import ScrollTable from "../../../components/ScrollTable";
import { MdBlock } from "react-icons/md";
import { SlPencil } from "react-icons/sl";

const cols4 = [
  { header: "Date & Time", field: "date_time", width: "15%" },
  { header: "Sports", field: "sports", width: "10%" },
  { header: "Match", field: "match", width: "25%" },
  {
    header: (
      <div className="row">
        <div className="col-6 flex-end">
          <span>No</span>
        </div>
        <div className="col-6 d-flex">
          <span>Yes</span>
        </div>
      </div>
    ),
    field: "no_yes",
    width: "15%",
  },
  { header: "No", field: "no", width: "10%" },
  { header: "Yes", field: "yes", width: "10%" },
  {
    header: <div className="text-center">Exposure</div>,
    field: "exposure",
    width: "",
  },
  {
    header: <div className="">Positon</div>,
    field: "position",
    width:""
  },
];

const tableData4 = [
  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over </div>
        <div className="col"> New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    no_yes: (
      <div className="d-flex red-font ms-1">
        <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
          <span className="fw-600 px-2">4.6</span>
          <span className="px-2">1k</span>
        </div>
        <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
          <span className="fw-600 px-2">3.05</span>
          <span>2k</span>
        </div>
      </div>
    ),

    no: "1000000",
    yes: "1000000",
    exposure: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="red-font">471.19</div>
        <div className="">100k</div>
      </div>
    ),
    position: (
      <div className="d-flex gap-2 align-items-center justify-content-between">
          <button className="col-6 green-btn align-self-center">Live</button>
        <div className="d-flex">
          <MdBlock size={18} className="me-3" />
          <SlPencil size={18} />
        </div>
      </div>
    ),
  },

  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over </div>
        <div className="col"> New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    no_yes: (
      <div className="d-flex red-font ms-1">
        <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
          <span className="fw-600">4.6</span>
          <span>1k</span>
        </div>
        <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
          <span className="fw-600">3.05</span>
          <span>2k</span>
        </div>
      </div>
    ),

    no: "1000000",
    yes: "1000000",
    exposure: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="red-font">471.19</div>
        <div className="">100k</div>
      </div>
    ),
    position: (
      <div className="d-flex gap-2 align-items-center justify-content-between">
        <button className="col-6 red-btn ">Bloked</button>
        <div className="d-flex">
          <MdBlock size={18} className="red-font me-3" />
          <SlPencil size={18} />
        </div>
      </div>
    ),
  },

  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over </div>
        <div className="col"> New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    no_yes: (
      <div className="d-flex red-font ms-1">
        <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
          <span className="fw-600">4.6</span>
          <span>1k</span>
        </div>
        <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
          <span className="fw-600">3.05</span>
          <span>2k</span>
        </div>
      </div>
    ),

    no: "1000000",
    yes: "1000000",
    exposure: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="red-font">471.19</div>
        <div className="">100k</div>
      </div>
    ),
    position: (
      <div className="d-flex gap-2 align-items-center justify-content-between">
        <button className="col-6 green-btn">Live</button>
        <div className="d-flex">
          <MdBlock size={18} className="me-3" />
          <SlPencil size={18} />
        </div>
      </div>
    ),
  },

  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over </div>
        <div className="col"> New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    no_yes: (
      <div className="d-flex red-font ms-1">
        <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
          <span className="fw-600">4.6</span>
          <span>1k</span>
        </div>
        <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
          <span className="fw-600">3.05</span>
          <span>2k</span>
        </div>
      </div>
    ),

    no: "1000000",
    yes: "1000000",
    exposure: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="red-font">471.19</div>
        <div className="">100k</div>
      </div>
    ),
    position: (
      <div className="d-flex gap-2 align-items-center justify-content-between">
        <button className="col-6 green-btn">Live</button>
        <div className="d-flex">
          <MdBlock size={18} className="me-3" />
          <SlPencil size={18} />
        </div>
      </div>
    ),
  },

  {
    date_time: "01-10-2024  16:11:00",
    sports: "Cricket",
    match: (
      <div className="">
        <div className="col">New Zealand Wo vs South Africa Wo - 10 over </div>
        <div className="col"> New Zealand Adv</div>
        <div className="col"> M. ID: 12345678934567</div>
      </div>
    ),
    no_yes: (
      <div className="d-flex red-font ms-1">
        <div className="col d-flex flex-column lay-box py-1 mx-1 text-center">
          <span className="fw-600">4.6</span>
          <span>1k</span>
        </div>
        <div className="col d-flex flex-column back-box py-1 mx-1 text-center">
          <span className="fw-600">3.05</span>
          <span>2k</span>
        </div>
      </div>
    ),

    no: "1000000",
    yes: "1000000",
    exposure: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="red-font">471.19</div>
        <div className="">100k</div>
      </div>
    ),
    position: (
      <div className="d-flex gap-2 align-items-center justify-content-between">
        <button className="col-6 green-btn">Live</button>
        <div className="d-flex">
          <MdBlock size={18} className="me-3" />
          <SlPencil size={18} />
        </div>
      </div>
    ),
  },
];

const LiveFancy = () => {
  return (
    <div className="table-parent-container mt-3">
      <ScrollTable columns={cols4} data={tableData4} itemsPerPage={5} />
    </div>
  );
};

export default LiveFancy;
