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
import { useForm } from "react-hook-form";
import ErrorPopup from "../popups/ErrorPopup";

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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
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

  const [errorPopup, setErrorPopup] = useState(false);
  console.log(error, "error");

  const handleCloseRejReasons = () => {
    setAddNewModalRejection(false);
    reset();
    getRejReasons();
  };

  const handleCloseSecQns = () => {
    setAddNewModalSecurity(false);
    reset();
    getSecurityQuestions();
  };

  useEffect(() => {
    if (isEdit && rejReasonsDataById) {
      setRejReason(rejReasonsDataById?.reason || "");
      setRejReasonDescription(rejReasonsDataById?.description || "");
      setSelectedStatus(rejReasonsDataById?.status || null);
    }
  }, [isEdit, rejReasonsDataById]);

  useEffect(() => {
    if (isEdit && selectedRejReasonId) {
      getRejReasonsById(selectedRejReasonId).then((response) => {
        setValue("reason", response.reason);
        setValue("description", response.description);
        setValue(
          "status",
          selectOptions.find((opt) => opt.value === response.status)
        );
      });
    }
  }, [isEdit, selectedRejReasonId, setValue]);

  const onSubmitRejReasons = (data) => {
    // if (!data.status) {
    //   setError({ status: { message: "Status is required" } });
    //   return;
    // }
    const payload = {
      reason: data.reason,
      description: data.description,
      status: data.status?.value || null,
    };

    const response = isEdit
      ? updateRejReasons(selectedRejReasonId, payload)
      : createRejReasons(payload);

    response
      .then(() => {
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1000);
        reset();
        getRejReasons();
        setAddNewModalRejection(false);
      })
      .catch((error) => console.error("Error:", error?.message));
    setError(error?.message);
    setErrorPopup(true);
  };

  // sec qns
  useEffect(() => {
    if (isEdit && selectedSecurityQuestion) {
      setSecurityQns(selectedSecurityQuestion?.questions || "");
      setSelectedStatus(selectedSecurityQuestion.status || null);
    }
  }, [isEdit, selectedSecurityQuestion]);

  useEffect(() => {
    if (isEdit && selectedQnsId) {
      getSecQusetionsById(selectedQnsId).then((response) => {
        setValue("securityQns", isEdit === true ? response.questions : "");
        setValue(
          "status",
          selectOptions.find((opt) => opt.value === response.status)
        );
      });
    }
  }, [isEdit, selectedQnsId, setValue]);

  const onSubmitSecQns = (data) => {
    // if (!data.status) {
    //   setError({ status: { message: "Status is required" } });
    //   return;
    // }

    const payload = {
      questions: data.securityQns,
      status: data.status?.value || null,
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
        reset();
        getSecurityQuestions();
        setAddNewModalSecurity(false);
      })
      .catch((error) => {
        setErrorPopup(true);
        setError(error);
        console.log("Error:", error?.message);
      });
  };
  return (
    <>
      {addNewModalRejection && (
        // <Modal
        //   show={addNewModalRejection}
        //   size="md"
        //   aria-labelledby="contained-modal-title-vcenter"
        //   centered
        // >
        //   <Modal.Body>
        //     <div className="d-flex w-100 flex-between">
        //       <h6>{`${isEdit === true ? "Edit" : "Add"}`} Rejection Reasons</h6>
        //       <IoCloseSharp
        //         className="pointer"
        //         onClick={() => setAddNewModalRejection(false)}
        //       />
        //     </div>

        //     <div className="row mt-3 small-font">
        //       <div className="col-4 flex-column">
        //         <label className="black-text4 mb-1">Status</label>
        //         <Select
        //           className="small-font"
        //           options={selectOptions}
        //           placeholder="Select"
        //           styles={customStyles}
        //           maxMenuHeight={120}
        //           menuPlacement="auto"
        //           value={
        //             selectOptions.find(
        //               (option) => option.value === selectedStatus
        //             ) || null
        //           }
        //           onChange={handleStatusChange}
        //         />
        //       </div>
        //       <div className="col-8 flex-column ">
        //         <label className="black-text4 mb-1">Reason</label>
        //         <input
        //           type="text"
        //           placeholder="Enter"
        //           className="all-none input-bg small-font p-2 rounded"
        //           value={rejReason}
        //           onChange={(e) => setRejReason(e.target.value)}
        //         />
        //       </div>

        //       <div className="col-12 flex-column mt-3 ">
        //         <label className="black-text4 mb-1">Description</label>
        //         <textarea
        //           placeholder="Enter"
        //           className="all-none input-bg small-font p-2 rounded"
        //           rows="4"
        //           style={{ resize: "none" }}
        //           value={rejReasonDescription}
        //           onChange={(e) => setRejReasonDescription(e.target.value)}
        //         ></textarea>
        //       </div>
        //       <div className="row">
        //         <div className="col-8"></div>
        //         <div
        //           className="saffron-btn2 small-font pointer mt-4 col-4"
        //           onClick={handlePostRejectionReasons}
        //         >
        //           {`${isEdit === true ? "Update" : "Create"}`}
        //         </div>
        //       </div>
        //     </div>
        //   </Modal.Body>
        // </Modal>
        <Modal show={addNewModalRejection} size="md" centered>
          <Modal.Body>
            <div className="d-flex w-100 flex-between">
              <h6>{isEdit ? "Edit" : "Add"} Rejection Reason</h6>
              <IoCloseSharp
                className="pointer"
                onClick={handleCloseRejReasons}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmitRejReasons)}>
              <div className="row mt-3 small-font">
                <div className="col-4 flex-column">
                  <label className="black-text4 mb-1">Status</label>
                  <Select
                    options={selectOptions}
                    placeholder="Select"
                    styles={customStyles}
                    // value={watch("status")}
                    // onChange={(selectedOption) =>
                    //   setValue("status", selectedOption)
                    // }
                    value={watch("status") || null}
                    onChange={(selectedOption) =>
                      setValue("status", selectedOption, {
                        shouldValidate: true,
                      })
                    }
                  />
                  {errors.status && (
                    <p className="text-danger small-font">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="col-8 flex-column">
                  <label className="black-text4 mb-1">Reason</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="all-none input-bg small-font p-2 rounded"
                    {...register("reason", { required: "Reason is required" })}
                  />
                  {errors.reason && (
                    <p className="text-danger small-font">
                      {errors.reason.message}
                    </p>
                  )}
                </div>

                <div className="col-12 flex-column mt-3">
                  <label className="black-text4 mb-1">Description</label>
                  <textarea
                    placeholder="Enter"
                    className="all-none input-bg small-font p-2 rounded"
                    rows="4"
                    style={{ resize: "none" }}
                    {...register("description", {
                      required: "Description is required",
                    })}
                  ></textarea>
                  {errors.description && (
                    <p className="text-danger small-font">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="row">
                  <div className="col-8"></div>
                  <button
                    type="submit"
                    className="saffron-btn2 small-font pointer mt-4 col-4"
                    disabled={!isValid}
                    style={{
                      opacity: isValid ? 1 : 0.5,
                      pointerEvents: isValid ? "auto" : "none",
                    }}
                  >
                    {isEdit ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {addNewModalSecurity && (
        // <div>
        //   <Modal
        //     show={addNewModalSecurity}
        //     size="md"
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
        //   >
        //     <Modal.Body>
        //       <div className="d-flex w-100 flex-between">
        //         <h6>
        //           {`${isEdit === true ? "Edit" : "Add"}`}
        //           Security Questions
        //         </h6>
        //         <IoCloseSharp
        //           className="pointer"
        //           onClick={() => setAddNewModalSecurity(false)}
        //         />
        //       </div>

        //       <div className="row mt-3 small-font">
        //         <div className="col-4 flex-column">
        //           <label className="black-text4 mb-1">Status</label>
        //           <Select
        //             className="small-font"
        //             options={selectOptions}
        //             placeholder="Select"
        //             styles={customStyles}
        //             maxMenuHeight={120}
        //             menuPlacement="auto"
        //             value={
        //               selectOptions.find(
        //                 (option) => option.value === selectedStatus
        //               ) || null
        //             }
        //             onChange={handleStatusChange}
        //           />
        //         </div>
        //         <div className="col-8 flex-column ">
        //           <label className="black-text4 mb-1">Questions</label>
        //           <input
        //             type="text"
        //             placeholder="Enter"
        //             className="all-none input-bg small-font p-2 rounded"
        //             value={securityQns}
        //             onChange={(e) => setSecurityQns(e.target.value)}
        //           />
        //         </div>
        //         <div className="row">
        //           <div className="col-8"></div>
        //           <div
        //             className="saffron-btn2 small-font pointer mt-4 col-4"
        //             onClick={handleSecQuestionsSubmit}
        //           >
        //             {`${isEdit ? "Update" : "Create"}`}
        //           </div>
        //         </div>
        //       </div>
        //     </Modal.Body>
        //   </Modal>
        // </div>

        <Modal show={addNewModalSecurity} size="md" centered>
          <Modal.Body>
            <div className="d-flex w-100 flex-between">
              <h6>{isEdit ? "Edit" : "Add"} Security Questions</h6>
              <IoCloseSharp className="pointer" onClick={handleCloseSecQns} />
            </div>

            <form onSubmit={handleSubmit(onSubmitSecQns)}>
              <div className="row mt-3 small-font">
                <div className="col-4 flex-column">
                  <label className="black-text4 mb-1">Status</label>
                  <Select
                    options={selectOptions}
                    placeholder="Select"
                    styles={customStyles}
                    value={watch("status") || null}
                    onChange={(selectedOption) =>
                      setValue("status", selectedOption, {
                        shouldValidate: true,
                      })
                    }
                  />
                  {errors.status && (
                    <p className="text-danger small-font">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="col-8 flex-column">
                  <label className="black-text4 mb-1">Questions</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="all-none input-bg small-font p-2 rounded"
                    {...register("securityQns", {
                      required: "Question is required",
                    })}
                  />
                  {errors.securityQns && (
                    <p className="text-danger small-font">
                      {errors.securityQns.message}
                    </p>
                  )}
                </div>

                <div className="row">
                  <div className="col-8"></div>
                  <button
                    type="submit"
                    className="saffron-btn2 small-font pointer mt-4 col-4"
                    disabled={!isValid}
                    style={{
                      opacity: isValid ? 1 : 0.5,
                      pointerEvents: isValid ? "auto" : "none",
                    }}
                  >
                    {isEdit ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
      <ErrorPopup
        discription={error}
        errorPopup={errorPopup}
        setErrorPopup={setErrorPopup}
      />

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={"success"}
      />
    </>
  );
};

export default AddNewPopUp;
