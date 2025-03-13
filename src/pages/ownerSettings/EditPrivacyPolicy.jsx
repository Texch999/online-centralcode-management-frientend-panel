import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  getAvailableWebsites,
  getPrivacyPolicyById,
  updatePrivacyPolicyById,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ErrorPopup from "../popups/ErrorPopup";

const EditPrivacyPolicy = ({
  setEditPrivacyPolicyModal,
  editPrivacyPolicyModal,
  setPrivacyPolicyId,
  privacyPolicyId,
  getPolicyPrivacyData,
  availablePrivacyWebsiteId,
  setSelectWebsite,
  selectWebsite,
}) => {
  const [error, setError] = useState("");
  const [showPrivacyText, setShowPrivacyText] = useState({ description: "" });
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  console.log(showPrivacyText?.description, "showPrivacyText");
  const [errorPopup, setErrorPopup] = useState(false);

  const [websites, setWebsites] = useState([]);
  // const [error, setError] = useState("");
  // const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  // const [errorPopup, setErrorPopup] = useState(false);
  const [allUnchecked, setAllUnchecked] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);

  const availableWebsites = () => {
    getAvailableWebsites(availablePrivacyWebsiteId)
      .then((response) => {
        if (response.status === true) {
          setWebsites(response?.data);
          console.log(response?.data, "shshhs");
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error.message);
        setErrorPopup(true);
        setTimeout(() => setErrorPopup(false), 1500);
      });
  };

  useEffect(() => {
    if (availablePrivacyWebsiteId) {
      availableWebsites();
    }
  }, [availablePrivacyWebsiteId]);

  const handleCheckboxChange = (id) => {
    setWebsites((prevWebsites) => {
      const updatedWebsites = prevWebsites.map((site) =>
        site.id === id ? { ...site, selected: !site.selected } : site
      );

      const allDeselected = updatedWebsites.every((site) => !site.selected);
      setAllUnchecked(allDeselected);

      return updatedWebsites;
    });

    setUserConfirmed(false);
  };

  const getPolicyPrivacyDataById = () => {
    getPrivacyPolicyById(privacyPolicyId)
      .then((response) => {
        if (response?.status === true) {
          setShowPrivacyText(response?.data || { description: "" });
        } else {
          setErrorPopup("Something went wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
        setEditPrivacyPolicyModal(false);
        setErrorPopup(true);
        setTimeout(() => {
          setErrorPopup(false);
        }, [1500]);
      });
  };
  useEffect(() => {
    if (privacyPolicyId) {
      getPolicyPrivacyDataById();
    }
  }, [privacyPolicyId]);

  const editPrivacyPolicy = () => {
    const payload = {
      description: showPrivacyText?.description,
    };
    updatePrivacyPolicyById(privacyPolicyId, payload)
      .then((response) => {
        if (response.status === true) {
          setSuccessPopupOpen(true);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, 1000);
          setEditPrivacyPolicyModal(false);
          getPolicyPrivacyData();
          setPrivacyPolicyId(null);
          setShowPrivacyText("");
        } else {
          setError("Something went wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
        setErrorPopup(true);
      });
  };
  const hanldeChnage = (value) => {
    setShowPrivacyText((prev) => ({ ...prev, description: value }));
  };
  return (
    <div>
      <Modal
        show={editPrivacyPolicyModal}
        onHide={() => setEditPrivacyPolicyModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="d-flex flex-between text-black my-2">
              <div className="medium-font">Select Website</div>
              {/* <div
                        onClick={() => setSelectWebsite(false)}
                        className="font-20"
                      >
                        <IoCloseSharp />
                      </div> */}
            </div>
            <div className="d-flex w-100 flex-column small-font black-border p-2 br-5">
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

              {allUnchecked && (
                <div className="alert alert-warning mx-2">
                  <p>
                    All websites are unselected. This privacy policy will be
                    removed.
                  </p>
                  <button
                    className="saffron-btn2"
                    onClick={() => setUserConfirmed(true)}
                  >
                    Confirm
                  </button>
                </div>
              )}
              {/* <div
                      className={`saffron-btn2 br-5 mx-2 pointer ${
                        allUnchecked && !userConfirmed ? "disabled" : ""
                      }`}
                      onClick={addMultipleWebsitesToPrivacyPolicy}
                      style={{
                        opacity: allUnchecked && !userConfirmed ? 0.5 : 1,
                      }}
                    >
                      Add Website
                    </div> */}
            </div>
          </div>

          <div className="small-font w-100 d-flex flex-column col-12">
            <ReactQuill
              theme="snow"
              value={showPrivacyText?.description || ""}
              onChange={hanldeChnage}
            />
          </div>
          <div className="d-flex flex-end my-3">
            <div
              className="saffron-btn2 white-font py-2 px-4"
              onClick={editPrivacyPolicy}
            >
              Update
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={"Privacy Policy Created Successfully"}
      />
      <ErrorPopup
        discription={error}
        errorPopupOpen={errorPopup}
        setErrorPopupOpen={setErrorPopup}
      />
    </div>
  );
};

export default EditPrivacyPolicy;
