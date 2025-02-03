import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { getAvailableWebsites, getWebsites } from "../../api/apiMethods";

const SelectWebsitePopUp = ({
  selectWebsite,
  setSelectWebsite,
  setAvailablePrivacyWebsiteId,
  availablePrivacyWebsiteId,
}) => {
  console.log(availablePrivacyWebsiteId, "availablePrivacyWebsiteId");
  const [websites, setWebsites] = useState([]);
  const [error, setError] = useState("");

  const availableWebsites = () => {
    getAvailableWebsites(availablePrivacyWebsiteId)
      .then((response) => {
        console.log(response, "availableWebsites");
        setWebsites(response.data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error, "error");
      });
  };
  useEffect(() => {
    availableWebsites();
  }, [availablePrivacyWebsiteId]);
  return (
    <Modal show={selectWebsite} onHide={() => setSelectWebsite(false)} centered>
      <div className="p-2">
        <div className="d-flex flex-between text-black px-2">
          <div className="medium-font">Select Website</div>
          <div onClick={() => setSelectWebsite(false)} className="font-20">
            <IoCloseSharp />
          </div>
        </div>
        <div className="d-flex w-100 flex-column small-font">
          {/* <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Baccarat
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Roulette
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Poker
            </div>
          </div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Black Jack
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Playtech
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Table Games
            </div>
          </div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Teenpati
            </div>
            <div className="input-css d-flex flex-between small-font mx-2 checkbox">
              <input type="checkbox" className="mx-2" />
              Spanish 21
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Rummy Online
            </div>
          </div> */}
          {websites.length > 0 &&
            websites.map((website) => (
              <div
                key={website.id}
                className="d-flex my-2"
                onClick={() => {
                  setSelectWebsite(false);
                  setAvailablePrivacyWebsiteId(website.id);
                }}
              >
                <div className="input-css d-flex flex-between small-font mx-2">
                  <input type="checkbox" className="mx-2" />
                  {website.web_name}
                </div>
              </div>
            ))}

          <div className="saffron-btn2 br-5 mx-2 pointer">Add Website</div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectWebsitePopUp;
