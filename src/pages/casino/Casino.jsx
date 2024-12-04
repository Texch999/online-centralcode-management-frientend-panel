import React, { useState } from "react";
import Table from "../../components/Table";
import "../casino/style.css";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import ConfirmationPopup from "../popups/ConfirmationPopup";

function Casino() {
  const navigate = useNavigate();
  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };

  const handleProviderClick = (vendor, provider) => {
    navigate(`/central-casino/${vendor}/${provider}`);
  };
  const cols = [
    { header: <div className="flex-center">S No</div>, field: "sno" },
    { header: "Vendor Name", field: "vendor" },
    { header: "vendor Percentage", field: "vendorper" },
    { header: "Vendor Country", field: "country" },
    {
      header: (
        <div className="d-flex flex-between row">
          <div className="col-4">Providers</div>
          <div className="col-2"></div>
          <div className="col-2">Action</div>
          <div className="col-2">PL</div>
          <div className="col-2">Status</div>
        </div>
      ),
      field: "all",
    },
  ];

  const data = [
    {
      sno: <div className="flex-center">1</div>,
      vendor: <div className="orange-clr">Ram</div>,
      vendorper: <div>10%</div>,
      country: <div>India</div>,
      all: (
        <div className="d-flex flex-column">
          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Ram", "Ezugi")}
            >
              Ezugi
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Ram", "Ezugi")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 green-clr">10000</div>
            <div className="active-btn-table col-2">Active</div>
          </div>

          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Ram", "Evolution")}
            >
              Evolution
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Ram", "Evolution")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 green-clr">10000</div>
            <div className="active-btn-table col-2">Active</div>
          </div>

          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Ram", "Asian Games")}
            >
              Asian Games
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Ram", "Asian Games")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 dark-orange-clr">10000</div>
            <div className="inactive-btn-table col-2 white-space">In-Active</div>
          </div>

          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Ram", "Praggmatic Play")}
            >
              Praggmatic Play
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Ram", "Praggmatic Play")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 dark-orange-clr">10000</div>
            <div className="inactive-btn-table col-2 white-space">In-Active</div>
          </div>

          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Ram", "Sexy Gaming")}
            >
              Sexy Gaming
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Ram", "Sexy Gaming")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 dark-orange-clr">10000</div>
            <div className="inactive-btn-table col-2 white-space">In-Active</div>
          </div>
        </div>
      ),
    },
    {
      sno: <div className="flex-center">2</div>,
      vendor: <div className="orange-clr">Lokesh</div>,
      vendorper: <div>10%</div>,
      country: <div>India</div>,
      all: (
        <div className="d-flex flex-column">
          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Lokesh", "Ezugi")}
            >
              Ezugi
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Lokesh", "Ezugi")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 green-clr">10000</div>
            <div className="active-btn-table col-2">Active</div>
          </div>

          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Lokesh", "Evolution")}
            >
              Evolution
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Lokesh", "Evolution")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 green-clr">10000</div>
            <div className="active-btn-table col-2">Active</div>
          </div>

          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Lokesh", "Asian Games")}
            >
              Asian Games
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Lokesh", "Asian Games")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 dark-orange-clr">10000</div>
            <div className="inactive-btn-table col-2 white-space">In-Active</div>
          </div>

          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
            >
              Praggmatic Play
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Lokesh", "Praggmatic Play")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 dark-orange-clr">10000</div>
            <div className="inactive-btn-table col-2 white-space">In-Active</div>
          </div>

          <div className="d-flex flex-between pointer">
            <div
              className="py-2 col-4"
              onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
            >
              Sexy Gaming
            </div>

            <div className="col-2">
              <span
                className=" font-20"
                onClick={() => handleProviderClick("Lokesh", "Sexy Gaming")}
              >
                <IoEyeOutline className="orange-clr" />
              </span>
            </div>
            <div className="col-2">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 dark-orange-clr">10000</div>
            <div className="inactive-btn-table col-2 white-space">In-Active</div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between align-items-center mt-3 mb-2">
        <h6 className="">Casino</h6>
        <div className="medium-font ">
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>
      <div className="radius-20">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>

      <ConfirmationPopup
        confirmationPopupOpen={isActive}
        setConfirmationPopupOpen={setIsACtive}
        discription={"Are You Sure to Active this Match"}
        submitButton={"Active"}
      />
    </div>
  );
}

export default Casino;
