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
    { header: "S No", field: "sno", width: "10%" },
    { header: "Vendor Name", field: "vendor", width: "15%" },
    { header: "Vendor Percentage", field: "vendorper", width: "15%" },
    { header: "Vendor Country", field: "country", width: "15%" },
    {
      header: (
        <div className="w-100 d-flex">
          <div className="col-4">Providers</div>
          <div className="col-1 flex-center"></div>
          <div className="col-2 flex-center">Action</div>
          <div className="col-2 flex-center">Profit&Loss</div>
          <div className="col-3 flex-end">Status</div>
        </div>
      ),
      field: "all",
    },
  ];

  const data = [
    {
      sno: 1,
      vendor: <div className="orange-clr">Ram</div>,
      vendorper: <div>10%</div>,
      country: <div>India</div>,
      all: (
        <div>
          <div className="d-flex w-100 pointer mb-2">
            <div className="col-4">
              <span onClick={() => handleProviderClick("Ram", "Ezugi")}>
                Ezugi
              </span>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <IoEyeOutline
                className="orange-clr"
                size={18}
                onClick={() => handleProviderClick("Ram", "Ezugi")}
              />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <span className="green-clr">10000</span>
            </div>
            <div className="col-3 flex-end">
              <span className="active-btn-table">Active</span>
            </div>
          </div>

          <div className="d-flex w-100 pointer mb-2">
            <div className="col-4">
              <span onClick={() => handleProviderClick("Ram", "Ezugi")}>
                Evolution
              </span>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <IoEyeOutline
                className="orange-clr"
                size={18}
                onClick={() => handleProviderClick("Ram", "Ezugi")}
              />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <span className="green-clr">10000</span>
            </div>
            <div className="col-3 flex-end">
              <span className="inactive-btn-table">In-Active</span>
            </div>
          </div>

          <div className="d-flex w-100 pointer mb-2">
            <div className="col-4">
              <span onClick={() => handleProviderClick("Ram", "Ezugi")}>
                Asian Games
              </span>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <IoEyeOutline
                className="orange-clr"
                size={18}
                onClick={() => handleProviderClick("Ram", "Ezugi")}
              />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <span className="green-clr">10000</span>
            </div>
            <div className="col-3 flex-end">
              <span className="active-btn-table">Active</span>
            </div>
          </div>

          <div className="d-flex w-100 pointer mb-2">
            <div className="col-4">
              <span onClick={() => handleProviderClick("Ram", "Ezugi")}>
                Pragmatic Play
              </span>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <IoEyeOutline
                className="orange-clr"
                size={18}
                onClick={() => handleProviderClick("Ram", "Ezugi")}
              />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <span className="green-clr">10000</span>
            </div>
            <div className="col-3 flex-end">
              <span className="inactive-btn-table">In-Active</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      sno: 2,
      vendor: <div className="orange-clr">Jitendra</div>,
      vendorper: <div>10%</div>,
      country: <div>India</div>,
      all: (
        <div>
          <div className="d-flex w-100 pointer mb-2">
            <div className="col-4">
              <span onClick={() => handleProviderClick("Ram", "Ezugi")}>
                Ezugi
              </span>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <IoEyeOutline
                className="orange-clr"
                size={18}
                onClick={() => handleProviderClick("Ram", "Ezugi")}
              />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <span className="green-clr">10000</span>
            </div>
            <div className="col-3 flex-end">
              <span className="active-btn-table">Active</span>
            </div>
          </div>

          <div className="d-flex w-100 pointer mb-2">
            <div className="col-4">
              <span onClick={() => handleProviderClick("Ram", "Ezugi")}>
                Evolution
              </span>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <IoEyeOutline
                className="orange-clr"
                size={18}
                onClick={() => handleProviderClick("Ram", "Ezugi")}
              />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <span className="green-clr">10000</span>
            </div>
            <div className="col-3 flex-end">
              <span className="inactive-btn-table">In-Active</span>
            </div>
          </div>

          <div className="d-flex w-100 pointer mb-2">
            <div className="col-4">
              <span onClick={() => handleProviderClick("Ram", "Ezugi")}>
                Asian Games
              </span>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <IoEyeOutline
                className="orange-clr"
                size={18}
                onClick={() => handleProviderClick("Ram", "Ezugi")}
              />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <span className="green-clr">10000</span>
            </div>
            <div className="col-3 flex-end">
              <span className="active-btn-table">Active</span>
            </div>
          </div>

          <div className="d-flex w-100 pointer mb-2">
            <div className="col-4">
              <span onClick={() => handleProviderClick("Ram", "Ezugi")}>
                Pragmatic Play
              </span>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <IoEyeOutline
                className="orange-clr"
                size={18}
                onClick={() => handleProviderClick("Ram", "Ezugi")}
              />
            </div>
            <div className="col-2 d-flex justify-content-center">
              <div class="form-check form-switch" onClick={handleActiveModal}>
                <input
                  class="form-check-input w-40"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <span className="green-clr">10000</span>
            </div>
            <div className="col-3 flex-end">
              <span className="inactive-btn-table">In-Active</span>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between align-items-center mt-3 mb-2">
        <h6 className="mb-0">Casino</h6>
        <div className="medium-font">
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>
      <Table columns={cols} data={data} itemsPerPage={3} />
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
