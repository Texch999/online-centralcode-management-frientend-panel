import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import {
  addWebsiteToPrivacyPolicy,
  getAvailableWebsites,
  getWebsites,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "../popups/ErrorPopup";

const SelectWebsitePopUp = ({
  selectWebsite,
  setSelectWebsite,
  setAvailablePrivacyWebsiteId,
  availablePrivacyWebsiteId,
  getPolicyPrivacyData,
}) => {
  console.log(availablePrivacyWebsiteId, "availablePrivacyWebsiteId");
  const [websites, setWebsites] = useState([]);
  const [error, setError] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const handleCheckboxChange = (id) => {
    console.log(id, "checked web id");
    setWebsites((prevWebsites) =>
      prevWebsites.map((site) =>
        site.id === id ? { ...site, selected: !site.selected } : site
      )
    );
  };

  const availableWebsites = () => {
    if (!availablePrivacyWebsiteId) return;
    getAvailableWebsites(availablePrivacyWebsiteId)
      .then((response) => {
        console.log(response?.data, "availableWebsites");
        setWebsites(response?.data);
      })
      .catch((error) => {
        setError(error.message);
        setErrorPopup(true);
        setTimeout(() => {
          setErrorPopup(false);
        }, [1500]);
        console.log(error, "error");
      });
  };
  useEffect(() => {
    if (availablePrivacyWebsiteId) {
      availableWebsites();
    }
  }, [availablePrivacyWebsiteId]);

  const selectedWebsiteNames = websites
    .filter((site) => site.selected)
    .map((site) => site.web_name);
  console.log(selectedWebsiteNames);

  const addMultipleWebsitesToPrivacyPolicy = () => {
    const selectedWebsiteIds = websites
      .filter((site) => site.selected)
      .map((site) => site.id);

    console.log("Checked Website IDs:", selectedWebsiteIds);

    // if (selectedWebsiteIds.length === 0) {
    //   console.log("No websites selected!");
    //   return;
    // }
    const payload = {
      websites: selectedWebsiteIds,
    };
    addWebsiteToPrivacyPolicy(availablePrivacyWebsiteId, payload)
      .then((response) => {
        console.log(
          "response from addMultipleWebsitesToPrivacyPolicy",
          response
        );

        setWebsites((prevWebsites) =>
          prevWebsites.map((site) => ({
            ...site,
            selected: selectedWebsiteIds.includes(site.id),
          }))
        );
        setSelectWebsite(false);
        getPolicyPrivacyData();
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1500);
      })

      .catch((error) => {
        setError(error?.message);
        setErrorPopup(true);
        setSelectWebsite(false);
        getPolicyPrivacyData();
        setTimeout(() => {
          setErrorPopup(false);
        }, 1500);
        console.log("error in addMultipleWebsitesToPrivacyPolicy", error);
      });
  };

  return (
    <div>
      <Modal
        show={selectWebsite}
        onHide={() => setSelectWebsite(false)}
        centered
      >
        <div className="p-2">
          <div className="d-flex flex-between text-black px-2 my-2">
            <div className="medium-font">Select Website</div>
            <div onClick={() => setSelectWebsite(false)} className="font-20">
              <IoCloseSharp />
            </div>
          </div>
          <div className="d-flex w-100 flex-column small-font">
            <div className="d-flex w-100 flex-wrap ">
              {websites.map((website) => (
                <div key={website.id} className="my-2">
                  <div className="input-css d-flex flex-between small-font mx-2">
                    <input
                      type="checkbox"
                      checked={website?.selected}
                      className="mx-2"
                      onChange={() => handleCheckboxChange(website?.id)}
                    />
                    {website.web_name}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="saffron-btn2 br-5 mx-2 pointer"
              onClick={addMultipleWebsitesToPrivacyPolicy}
            >
              {websites.some((site) => site.selected) ? "Add Website" : "Remove this privacy policy"}
            </div>
          </div>
        </div>
      </Modal>

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={`${selectedWebsiteNames} added to privacy policy`}
      />

      <ErrorPopup
        discription={error}
        errorPopup={errorPopup}
        setErrorPopup={setErrorPopup}
      />
    </div>
  );
};

export default SelectWebsitePopUp;
