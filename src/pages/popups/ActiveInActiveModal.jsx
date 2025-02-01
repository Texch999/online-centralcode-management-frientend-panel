import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { Images } from "../../images";
import { privacyPolicyStatusUpdate } from "../../api/apiMethods";
import ErrorPopup from "./ErrorPopup";

const ActiveInActiveModal = ({
  setActiveInActivePopup,
  activeInActivePopup,
  discription,
  submitButton,
  privacyStatusId,
  setPrivacyStatusId,
  statusId,
  setStatusId,
  getPolicyPrivacyData,
}) => {
  console.log(privacyStatusId, statusId, "idddd");
  const [errorPopup, setErrorPopup] = useState(false);
  const [error, setError] = useState("");
  const status_Id = statusId === 1 ? 2 : 1;

  const suspendStatus = () => {
    console.log(statusId, "====>");
    privacyPolicyStatusUpdate(privacyStatusId, status_Id)
      .then((response) => {
        console.log(response, "response statuusss");
        getPolicyPrivacyData();
        setPrivacyStatusId("");
        setStatusId("");
        setActiveInActivePopup(false);
      })
      .catch((error) => {
        setError(error.message);
        setErrorPopup(true);
        console.log(error, "error");
      });
  };

  return (
    <div>
      <Modal
        show={activeInActivePopup}
        centered
        className="confirm-popup"
        size="md"
      >
        <Modal.Body>
          <div className="flex-end black-text4 ">
            <IoCloseSharp
              size={20}
              onClick={() => setActiveInActivePopup(false)}
              className="pointer"
            />
          </div>
          <center>
            <img
              src={Images?.qnmark}
              alt="Q_Mark"
              style={{ height: "90px", width: "90px" }}
            />
            <h5 className="black-text4 fw-600 medium-font  mt-2 mb-3">
              {discription}
            </h5>{" "}
            <div className="w-95 flex-between mt-4 mb-3 medium-font">
              <button
                className="w-50 black-text2 border p-2 rounded white-bg me-2"
                onClick={() => setActiveInActivePopup(false)}
              >
                Cancel
              </button>
              <button
                className="w-50 saffron-btn2 ms-2"
                onClick={suspendStatus}
              >
                {submitButton}
              </button>
            </div>
          </center>
        </Modal.Body>
      </Modal>
      <ErrorPopup
        discription={setError}
        errorPopup={errorPopup}
        setErrorPopup={setErrorPopup}
      />
    </div>
  );
};

export default ActiveInActiveModal;
