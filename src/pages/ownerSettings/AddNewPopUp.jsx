import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import {
  createSecurityQuestions,
  updateSecurityQuestions,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";

const AddNewPopUp = ({
  addNewModalRejection,
  setAddNewModalRejection,
  setAddNewModalSecurity,
  addNewModalSecurity,
  getSecurityQuestions,
  setSelectedSecurityQuestion,
  selectedSecurityQuestion,
  selectedQnsId,
  setSelectedSecQnsId,
}) => {
  console.log(selectedSecurityQuestion, "selectedSecurityQuestion");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [securityQns, setSecurityQns] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption.value);
  };
  const selectOptions = [
    { value: 1, label: "Active" },
    { value: 2, label: "In-Active" },
  ];
  console.log(typeof selectedStatus);
  const handleSuccessmodal = () => {
    setSuccessPopupOpen(true);
    setAddNewModalSecurity(false);
  };

  // const secQnsPayload = {
  //   questions: securityQns,
  //   status: selectedStatus,
  // };
  // console.log(secQnsPayload, "secQnsPayload");
  // const postSecurityQuestion = () => {
  //   createSecurityQuestions(secQnsPayload)
  //     .then((response) => {
  //       console.log(response, "post sec qns");
  //       setAddNewModalSecurity(false);
  //       getSecurityQuestions();
  //     })

  //     .catch((error) => {
  //       console.log(error, "erorr occur");
  //       setError(error?.message);
  //     });
  // };

  const handleSubmit = () => {
    const payload = {
      id: selectedSecurityQuestion?.id,
      questions: securityQns,
      status: selectedStatus,
    };

    console.log(payload, "payloda,,,,");

    const response = selectedSecurityQuestion
      ? updateSecurityQuestions(payload)
      : createSecurityQuestions(payload);

    response
      .then(() => {
        getSecurityQuestions();
        setSelectedSecurityQuestion(null);
        handleSuccessmodal();
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
              <h6>Add Rejection Reasons</h6>
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
                />
              </div>
              <div className="col-8 flex-column ">
                <label className="black-text4 mb-1">Reason</label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                />
              </div>

              <div className="col-12 flex-column mt-3 ">
                <label className="black-text4 mb-1">Description</label>
                <textarea
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                  rows="4"
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div className="row">
                <div className="col-8"></div>
                <div className="saffron-btn2 small-font pointer mt-4 col-4">
                  Create
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
                <h6>{`${
                  selectedSecurityQuestion ? "Edit" : "Add"
                } Security Questions`}</h6>
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
                    value={selectOptions.find(
                      (option) => option.value === selectedStatus
                    )}
                    onChange={handleStatusChange}
                  />
                </div>
                <div className="col-8 flex-column ">
                  <label className="black-text4 mb-1">Questions</label>
                  {/* <input
                  type="text"
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                  value={securityQns}
                  onChange={(e) => setSecurityQns(e.target.value)}
                /> */}

                  {selectedSecurityQuestion ? (
                    <input
                      type="text"
                      placeholder="Enter"
                      className="all-none input-bg small-font p-2 rounded"
                      value={securityQns}
                      onChange={(e) => setSecurityQns(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter"
                      className="all-none input-bg small-font p-2 rounded"
                      value={securityQns}
                      onChange={(e) => setSecurityQns(e.target.value)}
                    />
                  )}
                </div>
                <div className="row">
                  <div className="col-8"></div>
                  <div
                    className="saffron-btn2 small-font pointer mt-4 col-4"
                    onClick={handleSubmit}
                  >
                    {`${selectedSecurityQuestion ? "Update" : "Create"}`}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <SuccessPopup
            successPopupOpen={successPopupOpen}
            setSuccessPopupOpe={setSuccessPopupOpen}
            discription={"Security Questions Created Successfully"}
          />
        </div>
      )}
    </>
  );
};

export default AddNewPopUp;
