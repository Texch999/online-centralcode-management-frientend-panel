import React, { useState } from "react";
import Table from "../../components/Table";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ActionPopup from "../casino/ActionPopup";

const Sports = () => {
  const navigate = useNavigate();
  const handleSportNextPage = (vendor, provider) => {
    navigate("/sports-providers", { state: { vendor, provider } });
  };

  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };
  const cols = [
    { header: <div className="flex-center">S No</div>, field: "sno" },
    { header: "Vendor Name & Company", field: "vendorname" },
    { header: "vendor Percentage", field: "vendorper" },
    { header: "vendor Monthly", field: "vendormon" },
    { header: "Vendor Country", field: "country" },
    { header: "Providers", field: "providers" },
    { header: "", field: "eye" },
    { header: <div className="flex-center">Action</div>, field: "action" },
    { header: <div className="flex-center">Profit & Loss</div>, field: "pl" },
    { header: <div className="flex-center">Status</div>, field: "status" },
  ];
  const data = [
    {
      sno: <div className="flex-center">1</div>,
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
          <div
            className="py-2 "
            onClick={() => handleSportNextPage("Jitendra", "Odds")}
          >
            ODDS
          </div>
          <div
            className="py-2 "
            onClick={() => handleSportNextPage("Jitendra", "Bookmaker 1")}
          >
            Bookmaker 1{" "}
          </div>
          <div
            className="py-2 "
            onClick={() => handleSportNextPage("Jitendra", "Bookmaker 2")}
          >
            Bookmaker 2{" "}
          </div>
          <div
            className="py-2 "
            onClick={() => handleSportNextPage("Jitendra", "fancy")}
          >
            Fancy{" "}
          </div>
          <div
            className="py-2"
            onClick={() => handleSportNextPage("Jitendra", "Live Streaming")}
          >
            Live Streaming{" "}
          </div>
          <div
            className="py-3"
            onClick={() => handleSportNextPage("Jitendra", "Scoreboard")}
          >
            Scoreboard{" "}
          </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column pointer">
          <span
            className=" font-20"
            onClick={() => handleSportNextPage("Jitendra", "Odds")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
          <span
            className="py-1 font-20"
            onClick={() => handleSportNextPage("Jitendra", "Bookmaker 1")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
          <span
            className="py-1 font-20"
            onClick={() => handleSportNextPage("Jitendra", "Bookmaker 2")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
          <span
            className="py-1 font-20"
            onClick={() => handleSportNextPage("Jitendra", "fancy")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
          <span
            className="py-1 font-20"
            onClick={() => handleSportNextPage("Jitendra", "Live Streaming")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
          <span
            className="py-1 font-20"
            onClick={() => handleSportNextPage("Jitendra", "Scoreboard")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column flex-center pointer">
          <div className="" onClick={handleActiveModal}>
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-2" onClick={handleActiveModal}>
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-2" onClick={handleActiveModal}>
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>

          <div className="py-2" onClick={handleActiveModal}>
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-1" onClick={handleActiveModal}>
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-1" onClick={handleActiveModal}>
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column flex-center">
          <div className="green-clr py-2">50000</div>
          <div className="dark-orange-clr py-2">60000</div>
          <div className="green-clr py-2">20000</div>
          <div className="green-clr py-2">40000</div>
          <div className="dark-orange-clr py-2">65000</div>
          <div className="dark-orange-clr py-3">65000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column pointer flex-center">
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="inactive-btn-table ">in-active</div>
          </div>
          <div className="py-1">
            <div className="inactive-btn-table ">in-active</div>
          </div>
        </div>
      ),
    },
    {
      sno: <div className="flex-center">2</div>,
      vendorname: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Fun77</div>
        </div>
      ),
      vendorper: <div>-</div>,
      vendormon: <div>50000</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div
            className="py-2 "
            onClick={() => handleSportNextPage("Jitendra", "Odds")}
          >
            ODDS
          </div>
          <div className="py-2 ">Bookmaker 1 </div>
          <div className="py-2 ">Bookmaker 2 </div>
          <div className="py-2 ">Fancy </div>
          <div className="py-2">Live Streaming </div>
          <div className="py-3">Scoreboard </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span className=" font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column flex-center pointer">
          <div className="">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-2">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-2">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>

          <div className="py-2">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-1">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-1">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column flex-center">
          <div className="green-clr py-2">50000</div>
          <div className="dark-orange-clr py-2">60000</div>
          <div className="green-clr py-2">20000</div>
          <div className="green-clr py-2">40000</div>
          <div className="dark-orange-clr py-2">65000</div>
          <div className="dark-orange-clr py-3">65000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column pointer flex-center">
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="inactive-btn-table ">in-active</div>
          </div>
          <div className="py-1">
            <div className="inactive-btn-table ">in-active</div>
          </div>
        </div>
      ),
    },
    {
      sno: <div className="flex-center">3</div>,
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
          <div
            className="py-2 "
            onClick={() => handleSportNextPage("Jitendra", "Odds")}
          >
            ODDS
          </div>
          <div className="py-2 ">Bookmaker 1 </div>
          <div className="py-2 ">Bookmaker 2 </div>
          <div className="py-2 ">Fancy </div>
          <div className="py-2">Live Streaming </div>
          <div className="py-3">Scoreboard </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span className=" font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
          <span className="py-1 font-20">
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column flex-center pointer">
          <div className="">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-2">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-2">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>

          <div className="py-2">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-1">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <div className="py-1">
            <div class="form-check form-switch">
              <input
                class="form-check-input w-40"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column flex-center">
          <div className="green-clr py-2">50000</div>
          <div className="dark-orange-clr py-2">60000</div>
          <div className="green-clr py-2">20000</div>
          <div className="green-clr py-2">40000</div>
          <div className="dark-orange-clr py-2">65000</div>
          <div className="dark-orange-clr py-3">65000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column pointer flex-center">
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="active-btn-table">active</div>
          </div>
          <div className="py-1">
            <div className="inactive-btn-table ">in-active</div>
          </div>
          <div className="py-1">
            <div className="inactive-btn-table ">in-active</div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="p-2">
      <div className="d-flex flex-between align-items-center">
        <h4 className="my-3">Sports</h4>
        <div className="small-font">
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>
      <div className="radius-20">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
      <ActionPopup show={isActive} setShow={setIsACtive} />
    </div>
  );
};

export default Sports;
