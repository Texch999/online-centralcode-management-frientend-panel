import React, { useEffect, useRef, useState } from "react";
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
  isEdit,
  selectedRejReasonId,
  getRejReasons,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
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
  const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState([]);
  const [rejReasonsDataById, setRejReasonsDataById] = useState([]);
  const [errorPopup, setErrorPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectOptions = [
    { value: 1, label: "Active" },
    { value: 2, label: "In-Active" },
  ];

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
          selectOptions.find((opt) => opt.value === response?.status)
        );
      });
    }
  }, [isEdit, selectedRejReasonId, setValue]);

  const onSubmitRejReasons = (data) => {
    const payload = {
      reason: data.reason,
      description: data.description,
      status: Number(data.status?.value),
    };
    setIsSubmitting(true);

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
      .catch((error) => {
        setError(error?.message);
        setErrorPopup(true);
        setTimeout(() => {
          setErrorPopup(false);
        }, 1000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
    setIsSubmitting(true);
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
        setError(error?.message);
        setErrorPopup(true);
        setTimeout(() => {
          setErrorPopup(false);
        }, 1000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <>
      {addNewModalRejection && (
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
                {/* <div className="col-4 flex-column">
                  <label className="black-text4 mb-1">Status</label>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={null}
                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={selectOptions}
                        placeholder="Select"
                        styles={customStyles}
                        // value={watch("status") || null}
                        // onChange={(selectedOption) =>
                        //   setValue("status", selectedOption, {
                        //     shouldValidate: true,
                        //   })}

                        value={selectOptions.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(val) => field.onChange(val)}
                      />
                    )}
                  />
                  {errors?.status && (
                    <p className="text-danger small-font">
                      {errors?.status?.message}
                    </p>
                  )}
                </div> */}
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
                    {isSubmitting
                      ? "submitting..."
                      : isEdit
                      ? "Update"
                      : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
      <ErrorPopup
        discription={error}
        errorPopupOpen={errorPopup}
        setErrorPopupOpen={setErrorPopup}
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
