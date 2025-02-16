import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
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
}) => {
  const [error, setError] = useState("");
  const [showPrivacyText, setShowPrivacyText] = useState({ description: "" });
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  console.log(showPrivacyText?.description, "showPrivacyText");
  const [errorPopup, setErrorPopup] = useState(false);

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
          <div className="small-font w-100 d-flex flex-column col-12">
            <ReactQuill
              theme="snow"
              value={showPrivacyText?.description || ""}
              onChange={hanldeChnage}
            />
            ;
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
