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
  console.log(selectedRejReasonId, "is eidtt");
  console.log(isEdit, "edit");

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
  const selectOptions = [
    { value: 1, label: "Active" },
    { value: 2, label: "In-Active" },
  ];
  console.log(typeof selectedStatus);

  const [rejReasonsDataById, setRejReasonsDataById] = useState([]);
  console.log(rejReasonsDataById, "rejReasonsDataById");
  const getRejReasonsId = () => {
    getRejReasonsById(selectedRejReasonId)
      .then((response) => {
        setRejReasonsDataById(response);
      })
      .catch((error) => {
        console.log(error, "get rej reasons by id error occur");
      });
  };
  useEffect(() => {
    if (isEdit && selectedRejReasonId) {
      getRejReasonsId();
    }
  }, [selectedRejReasonId, isEdit]);

  const getSecQnsById = () => {
    getSecQusetionsById(selectedQnsId)
      .then((response) => {
        console.log(response, "get sec qns by id");
        setSelectedSecurityQuestion(response);
      })
      .catch((error) => {
        console.log(error, "get sec qns by id error occur");
      });
  };
  useEffect(() => {
    getSecQnsById();
  }, [selectedQnsId]);

  const handleSecQuestionsSubmit = () => {
    const payload = {
      questions: securityQns || selectedSecurityQuestion?.questions,
      status: selectedStatus || selectedSecurityQuestion.status,
    };
    const response = selectedQnsId
      ? updateSecurityQuestions(selectedQnsId, payload)
      : createSecurityQuestions(payload);
    response
      .then(() => {
        getSecurityQuestions();
        setSecurityQns("");
        setSelectedStatus(null);
        setAddNewModalSecurity(false);
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1000);
      })
      .catch((error) => console.error("Error:", error));
    setLoading(false);
  };

  const handlePostRejectionReasons = () => {
    const rejReasonsPayload = {
      reason: rejReason || rejReasonsDataById.reason,
      description: rejReasonDescription || rejReasonsDataById.description,
      status: selectedStatus || rejReasonsDataById.status,
    };

    console.log(rejReasonsPayload, "payload");

    const handleError = (error) => {
      console.log(error, "error occurred");
      setError(error?.message);
    };
    const response = isEdit
      ? updateRejReasons(selectedRejReasonId, rejReasonsPayload)
      : createRejReasons(rejReasonsPayload);
    console.log(selectedRejReasonId, "dddd");
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
      .catch(handleError);
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
                    isEdit
                      ? selectOptions.find(
                          (option) => option.value === rejReasonsDataById.status
                        )
                      : selectOptions.find(
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
                  value={
                    isEdit === true ? rejReasonsDataById.reason : rejReason
                  }
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
                  value={
                    isEdit === true
                      ? rejReasonsDataById?.description
                      : rejReasonDescription
                  }
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
                  Add Security Questions
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
                      isEdit
                        ? selectOptions.find(
                            (option) =>
                              option.value === selectedSecurityQuestion?.status
                          )
                        : selectOptions.find(
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
                    value={
                      isEdit === true
                        ? selectedSecurityQuestion?.questions
                        : securityQns
                    }
                    onChange={(e) => setSecurityQns(e.target.value)}
                  />
                </div>
                <div className="row">
                  <div className="col-8"></div>
                  <div
                    className="saffron-btn2 small-font pointer mt-4 col-4"
                    onClick={handleSecQuestionsSubmit}
                  >
                    {`${isEdit === true ? "Update" : "Create"}`}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <SuccessPopup
            successPopupOpen={successPopupOpen}
            setSuccessPopupOpen={setSuccessPopupOpen}
            discription={"Security Questions Created Successfully"}
          />
        </div>
      )}
    </>
  );
};

export default AddNewPopUp;
