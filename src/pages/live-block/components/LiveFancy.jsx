import React from "react";
import ScrollTable from "../../../components/ScrollTable";
import { MdBlock } from "react-icons/md";
import { GrEdit } from "react-icons/gr";


const cols4 = [
    { header: "Date & Time", field: "date_time", width: "10%" },
    { header: "Sports", field: "sports", width: "8%" },
    { header: "Match", field: "match", width: "21%" },
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
      width: "18%",
    },
    { header: "No", field: "no", width: "5%", width: "5%" },
    { header: "Yes", field: "yes", width: "5%", width: "5%" },
    {
      header: <div className="text-center">Exposure</div>,
      field: "exposure",
      width: "6%",
    },
    {
      header: <div className="">Positon</div>,
      field: "position",
      width: "13%",
    },
  ];

  const tableData4 = [
    {
      date_time: "01-10-2024  16:11:00",
      sports: "Cricket",
      match: (
        <div className="">
          <div className="col">
            New Zealand Wo vs South Africa Wo - 10 over{" "}
          </div>
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
        <div className="d-flex align-items-center">
          <div>
            <div className="green-btn">Live</div>
          </div>
          <div className="d-flex ms-3">
            <div className="pointer">
              <MdBlock className="font-20 me-3" />
            </div>
            <div className="pointer">
              <GrEdit className="font-20" />
            </div>
          </div>
        </div>
      ),
    },

    {
      date_time: "01-10-2024  16:11:00",
      sports: "Cricket",
      match: (
        <div className="">
          <div className="col">
            New Zealand Wo vs South Africa Wo - 10 over{" "}
          </div>
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
        <div className="d-flex align-items-center">
          <div className="red-btn">Bloked</div>
          <div className="d-flex ms-3">
            <div className="pointer">
              <MdBlock className="font-20 me-3 red-font" />
            </div>
            <div className="pointer">
              <GrEdit className="font-20" />
            </div>
          </div>
        </div>
      ),
    },

    {
      date_time: "01-10-2024  16:11:00",
      sports: "Cricket",
      match: (
        <div className="">
          <div className="col">
            New Zealand Wo vs South Africa Wo - 10 over{" "}
          </div>
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
        <div className="d-flex align-items-center">
          <div className="green-btn">Live</div>
          <div className="d-flex ms-3">
            <div className="pointer">
              <MdBlock className="font-20 me-3" />
            </div>
            <div className="pointer">
              <GrEdit className="font-20" />
            </div>
          </div>
        </div>
      ),
    },

    {
      date_time: "01-10-2024  16:11:00",
      sports: "Cricket",
      match: (
        <div className="">
          <div className="col">
            New Zealand Wo vs South Africa Wo - 10 over{" "}
          </div>
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
        <div className="d-flex align-items-center">
          <div className="green-btn">Live</div>
          <div className="d-flex ms-3">
            <div className="pointer">
              <MdBlock className="font-20 me-3" />
            </div>
            <div className="pointer">
              <GrEdit className="font-20" />
            </div>
          </div>
        </div>
      ),
    },

    {
      date_time: "01-10-2024  16:11:00",
      sports: "Cricket",
      match: (
        <div className="">
          <div className="col">
            New Zealand Wo vs South Africa Wo - 10 over{" "}
          </div>
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
        <div className="d-flex align-items-center">
          <div className="green-btn">Live</div>
          <div className="d-flex ms-3">
            <div className="pointer">
              <MdBlock className="font-20 me-3" />
            </div>
            <div className="pointer">
              <GrEdit className="font-20" />
            </div>
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
