import React, { useState } from "react";
import Table from "../../components/Table";
import "../casino/style.css";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import ActionPopup from "./ActionPopup";

function Casino() {
  const navigate = useNavigate();
  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };

  const handleProviderClick = (vendor, provider) => {
    navigate(`/casino-vendor/${vendor}/${provider}`);
  };
  const cols = [
    { header: <div className="flex-center">S No</div>, field: "sno" },
    { header: "Vendor Name", field: "vendor" },
    { header: "vendor Percentage", field: "vendorper" },
    { header: "Vendor Country", field: "country" },
    { header: "Providers", field: "providers" },
    { header: "", field: "eye" },
    { header: <div className="flex-center">Action</div>, field: "action" },
    { header: "Profit & Loss", field: "pl" },
    { header: "Status", field: "status" },
  ];

  const data = [
    {
      sno: <div className="flex-center">1</div>,
      vendor: <div className="orange-clr">Lokesh</div>,
      vendorper: <div>10%</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Ezugi")}
          >
            Ezugi{" "}
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Evolution")}
          >
            Evolution
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Asian Games")}
          >
            Asian Games
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
          >
            Pragmatic Play
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
          >
            Sexy Gaming
          </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column pointer">
          <span
            className="py-1 "
            onClick={() => handleProviderClick("Lokesh", "Ezugi")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Evolution")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Asian Games")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column flex-center pointer">
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
        <div className="d-flex flex-column">
          <div className="green-clr py-2">50000</div>
          <div className="dark-orange-clr py-2">60000</div>
          <div className="green-clr py-2">20000</div>
          <div className="green-clr py-2">40000</div>
          <div className="dark-orange-clr py-2">300000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column pointer">
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
      vendor: <div className="orange-clr">Ram</div>,
      vendorper: <div>10%</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Ezugi")}
          >
            Ezugi{" "}
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Evolution")}
          >
            Evolution
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Asian Games")}
          >
            Asian Games
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
          >
            Pragmatic Play
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
          >
            Sexy Gaming
          </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column pointer">
          <span
            className="py-1 "
            onClick={() => handleProviderClick("Lokesh", "Ezugi")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Evolution")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Asian Games")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column flex-center pointer">
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
        <div className="d-flex flex-column">
          <div className="green-clr py-2">50000</div>
          <div className="dark-orange-clr py-2">60000</div>
          <div className="green-clr py-2">20000</div>
          <div className="green-clr py-2">40000</div>
          <div className="dark-orange-clr py-2">300000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column pointer">
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
      vendor: <div className="orange-clr">Lokesh</div>,
      vendorper: <div>10%</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Ezugi")}
          >
            Ezugi{" "}
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Evolution")}
          >
            Evolution
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Asian Games")}
          >
            Asian Games
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
          >
            Pragmatic Play
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
          >
            Sexy Gaming
          </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column pointer">
          <span
            className="py-1 "
            onClick={() => handleProviderClick("Lokesh", "Ezugi")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Evolution")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Asian Games")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column flex-center pointer">
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
        <div className="d-flex flex-column">
          <div className="green-clr py-2">50000</div>
          <div className="dark-orange-clr py-2">60000</div>
          <div className="green-clr py-2">20000</div>
          <div className="green-clr py-2">40000</div>
          <div className="dark-orange-clr py-2">300000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column pointer">
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
      sno: <div className="flex-center">4</div>,
      vendor: <div className="orange-clr">Rakesh</div>,
      vendorper: <div>10%</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Ezugi")}
          >
            Ezugi{" "}
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Evolution")}
          >
            Evolution
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Asian Games")}
          >
            Asian Games
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
          >
            Pragmatic Play
          </div>
          <div
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
          >
            Sexy Gaming
          </div>
        </div>
      ),
      eye: (
        <div className="d-flex flex-column pointer">
          <span
            className="py-1 "
            onClick={() => handleProviderClick("Lokesh", "Ezugi")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Evolution")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Asian Games")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
          <span
            className="py-2"
            onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
          >
            <IoEyeOutline className="orange-clr font-20" />
          </span>
        </div>
      ),
      action: (
        <div className="d-flex flex-column flex-center pointer">
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
        <div className="d-flex flex-column">
          <div className="green-clr py-2">50000</div>
          <div className="dark-orange-clr py-2">60000</div>
          <div className="green-clr py-2">20000</div>
          <div className="green-clr py-2">40000</div>
          <div className="dark-orange-clr py-2">300000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column pointer">
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
    <div>
      <div className="d-flex flex-between align-items-center">
        <h4 className="my-3">Casino</h4>
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
}

export default Casino;
