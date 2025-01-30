import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import {
  createRejReasons,
  createSecurityQuestions,
  getRejReasonsById,
  getSecQusetionsById,
  updateRejReasons,
  updateSecurityQuestions,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";

const AddNewPopUp = ({
  addNewModalRejection,
  setAddNewModalRejection,
  setAddNewModalSecurity,
  addNewModalSecurity,
  getSecurityQuestions,
  selectedQnsId,
  setIsEdit,
  isEdit,
  setSelectedRejReasonId,
  selectedRejReasonId,
  getRejReasons,
  setSelectedSecQnsId,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [securityQns, setSecurityQns] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption.value);
  };
  const [rejReason, setRejReason] = useState("");
  const [rejReasonDescription, setRejReasonDescription] = useState("");
  const [secQnsByIdData, setSecQnsByIdData] = useState([]);
  console.log(secQnsByIdData, "secQnsByIdData");
  const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState([]);
  const [rejReasonsDataById, setRejReasonsDataById] = useState([]);
  const selectOptions = [
    { value: 1, label: "Active" },
    { value: 2, label: "In-Active" },
  ];

  useEffect(() => {
    if (isEdit && selectedRejReasonId) {
      getRejReasonsById(selectedRejReasonId)
        .then((response) => {
          setRejReasonsDataById(response);
        })
        .catch((error) => {
          console.log(error, "Error fetching rejection reason by ID");
        });
    }
  }, [isEdit, selectedRejReasonId]);

  useEffect(() => {
    if (isEdit && rejReasonsDataById) {
      setRejReason(rejReasonsDataById?.reason || "");
      setRejReasonDescription(rejReasonsDataById?.description || "");
      setSelectedStatus(rejReasonsDataById?.status || null);
    }
  }, [isEdit, rejReasonsDataById]);

  const handlePostRejectionReasons = () => {
    const rejReasonsPayload = {
      reason: rejReason,
      description: rejReasonDescription,
      status: selectedStatus,
    };
    const response = isEdit
      ? updateRejReasons(selectedRejReasonId, rejReasonsPayload)
      : createRejReasons(rejReasonsPayload);
    response
      .then(() => {
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1000);

        setRejReason("");
        setRejReasonDescription("");
        setSelectedStatus(null);
        setRejReasonsDataById([]);
        getRejReasons();
        setAddNewModalRejection(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (isEdit && selectedQnsId) {
      getSecQusetionsById(selectedQnsId)
        .then((response) => {
          setSelectedSecurityQuestion(response);
        })
        .catch((error) => {
          console.log(error, "Error fetching rejection reason by ID");
        });
    }
  }, [isEdit, selectedQnsId]);

  useEffect(() => {
    if (isEdit && selectedSecurityQuestion) {
      setSecurityQns(selectedSecurityQuestion?.questions || "");
      setSelectedStatus(selectedSecurityQuestion.status || null);
    }
  }, [isEdit, selectedSecurityQuestion]);

  const handleSecQuestionsSubmit = () => {
    const payload = {
      questions: securityQns,
      status: selectedStatus,
    };
    const response = isEdit
      ? updateSecurityQuestions(selectedQnsId, payload)
      : createSecurityQuestions(payload);
    response
      .then(() => {
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1000);
        getSecurityQuestions();
        setSecurityQns("");
        setSelectedStatus(null);
        setAddNewModalSecurity(false);
      })
      .catch((error) => console.error("Error:", error));
    setLoading(false);
  };

  return (
    <>
      {addNewModalRejection && (
        <Modal
          show={addNewModalRejection}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="d-flex w-100 flex-between">
              <h6>{`${isEdit === true ? "Edit" : "Add"}`} Rejection Reasons</h6>
              <IoCloseSharp
                className="pointer"
                onClick={() => setAddNewModalRejection(false)}
              />
            </div>

            <div className="row mt-3 small-font">
              <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Status</label>
                <Select
                  className="small-font"
                  options={selectOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  value={
                    selectOptions.find(
                      (option) => option.value === selectedStatus
                    ) || null
                  }
                  onChange={handleStatusChange}
                />
              </div>
              <div className="col-8 flex-column ">
                <label className="black-text4 mb-1">Reason</label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                  value={rejReason}
                  onChange={(e) => setRejReason(e.target.value)}
                />
              </div>

              <div className="col-12 flex-column mt-3 ">
                <label className="black-text4 mb-1">Description</label>
                <textarea
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                  rows="4"
                  style={{ resize: "none" }}
                  value={rejReasonDescription}
                  onChange={(e) => setRejReasonDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="row">
                <div className="col-8"></div>
                <div
                  className="saffron-btn2 small-font pointer mt-4 col-4"
                  onClick={handlePostRejectionReasons}
                >
                  {`${isEdit === true ? "Update" : "Create"}`}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {addNewModalSecurity && (
        <div>
          <Modal
            show={addNewModalSecurity}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div className="d-flex w-100 flex-between">
                <h6>
                  {`${isEdit === true ? "Edit" : "Add"}`}
                  Security Questions
                </h6>
                <IoCloseSharp
                  className="pointer"
                  onClick={() => setAddNewModalSecurity(false)}
                />
              </div>

              <div className="row mt-3 small-font">
                <div className="col-4 flex-column">
                  <label className="black-text4 mb-1">Status</label>
                  <Select
                    className="small-font"
                    options={selectOptions}
                    placeholder="Select"
                    styles={customStyles}
                    maxMenuHeight={120}
                    menuPlacement="auto"
                    value={
                      selectOptions.find(
                        (option) => option.value === selectedStatus
                      ) || null
                    }
                    onChange={handleStatusChange}
                  />
                </div>
                <div className="col-8 flex-column ">
                  <label className="black-text4 mb-1">Questions</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="all-none input-bg small-font p-2 rounded"
                    value={securityQns}
                    onChange={(e) => setSecurityQns(e.target.value)}
                  />
                </div>
                <div className="row">
                  <div className="col-8"></div>
                  <div
                    className="saffron-btn2 small-font pointer mt-4 col-4"
                    onClick={handleSecQuestionsSubmit}
                  >
                    {`${isEdit ? "Update" : "Create"}`}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={"success"}
      />
    </>
  );
};

export default AddNewPopUp;
