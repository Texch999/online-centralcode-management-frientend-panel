import React from "react";
import Table from "../../components/Table";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Sports = () => {
  const navigate =useNavigate();
  const handleSportNextPage=(vendor, provider)=>{
    navigate("/sports-providers", {state:{vendor, provider}})
  }
  const cols = [
    { header: "S No", field: "sno" },
    { header: "Vendor Name & Company", field: "vendorname" },
    { header: "vendor Percentage", field: "vendorper" },
    { header: "vendor Monthly", field: "vendormon" },
    { header: "Vendor Country", field: "country" },
    { header: "Providers", field: "providers" },
    { header: "", field: "eye" },
    { header: "Action", field: "action" },
    { header: "Profit & Loss", field: "pl" },
    { header: "Status", field: "status" },
  ];
  const data = [
    {
      sno: <div>1</div>,
      vendorname: (
        <div className="d-flex flex-column">
          <div>Jitendra</div>
          <div>TExchange</div>
        </div>
      ),
      vendorper: <div>-</div>,
      vendormon: <div>50000</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div className="mb-2 " onClick={()=>handleSportNextPage("Jitendra", "Odds")}>ODDS</div>
          <div className="mb-2 ">Bookmaker 1 </div>
          <div className="mb-2 ">Bookmaker 2 </div>
          <div className="mb-2 ">Fancy </div>
          <div className="mb-2">Live Streaming </div>
          <div className="mb-2">Scoreboard </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
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
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
        </div>
      ),
    },
    {
      sno: <div>2</div>,
      vendorname: (
        <div className="d-flex flex-column">
          <div>Ram</div>
          <div>Fun77</div>
        </div>
      ),
      vendorper: <div>-</div>,
      vendormon: <div>50000</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div className="mb-2 ">ODDS</div>
          <div className="mb-2 ">Bookmaker 1 </div>
          <div className="mb-2 ">Bookmaker 2 </div>
          <div className="mb-2 ">Fancy </div>
          <div className="mb-2">Live Streaming </div>
          <div className="mb-2">Scoreboard </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
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
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
        </div>
      ),
    },
    {
      sno: <div>3</div>,
      vendorname: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>TExchange</div>
        </div>
      ),
      vendorper: <div>-</div>,
      vendormon: <div>50000</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div className="mb-2 ">ODDS</div>
          <div className="mb-2 ">Bookmaker 1 </div>
          <div className="mb-2 ">Bookmaker 2 </div>
          <div className="mb-2 ">Fancy </div>
          <div className="mb-2">Live Streaming </div>
          <div className="mb-2">Scoreboard </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
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
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
        </div>
      ),
    },
    {
      sno: <div>4</div>,
      vendorname: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Fun77</div>
        </div>
      ),
      vendorper: <div>-</div>,
      vendormon: <div>50000</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div className="mb-2 ">ODDS</div>
          <div className="mb-2 ">Bookmaker 1 </div>
          <div className="mb-2 ">Bookmaker 2 </div>
          <div className="mb-2 ">Fancy </div>
          <div className="mb-2">Live Streaming </div>
          <div className="mb-2">Scoreboard </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="mb-2">
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
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
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between align-items-center">
        <h4 className="my-3">Sports</h4>
        <div className="small-font">
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>
      <div className="radius-20">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default Sports;
