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
import { useSearchParams } from "react-router-dom";

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
    trigger,
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
  const [reasonError, setReasonError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [rejReason, setRejReason] = useState("");
  const [rejReasonDescription, setRejReasonDescription] = useState("");
  const [secQnsByIdData, setSecQnsByIdData] = useState([]);
  const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState([]);
  const [rejReasonsDataById, setRejReasonsDataById] = useState([]);
  const [errorPopup, setErrorPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const intialpage = parseInt(searchParams.get("page") || 1);
  const itemsPerPage = 2;
  const page = intialpage;
  const pageSize = itemsPerPage;

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
      setRejReason(rejReasonsDataById?.reason);
      setRejReasonDescription(rejReasonsDataById?.description);
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
    const trimmedReason = data.reason.trim();
    const trimmedDescription = data.description.trim();

    if (!trimmedReason) {
      setError("reason", {
        type: "manual",
        message: "Reason cannot be empty",
      });
      return;
    }

    if (!trimmedDescription || trimmedDescription.length <= 20) {
      setError("description", {
        type: "manual",
        message:
          "Description cannot be empty, contain only spaces, or be less than 20 characters",
      });
      return;
    }
    const payload = {
      reason: trimmedReason,
      description: data.description,
      status: Number(data.status?.value),
    };
    setIsSubmitting(true);

    const response = isEdit
      ? updateRejReasons(selectedRejReasonId, payload)
      : createRejReasons(payload);

    response
      .then((response) => {
        setMsg(response?.message);
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1000);
        reset();
        getRejReasons(page, pageSize);
        setAddNewModalRejection(false);
      })
      .catch((error) => {
        setError(error?.message);
        // setErrorPopup(true);
        // setTimeout(() => {
        //   setErrorPopup(false);
        // }, 1000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // sec qns
  useEffect(() => {
    if (isEdit && selectedSecurityQuestion) {
      setSecurityQns(selectedSecurityQuestion?.questions);
      setSelectedStatus(selectedSecurityQuestion.status || null);
    }
  }, [isEdit, selectedSecurityQuestion]);

  useEffect(() => {
    if (isEdit && selectedQnsId) {
      getSecQusetionsById(selectedQnsId).then((response) => {
        setValue("securityQns", isEdit === true && response?.data?.questions);
        setValue(
          "status",
          selectOptions.find((opt) => opt.value === response?.data?.status)
        );
      });
    }
  }, [isEdit, selectedQnsId, setValue]);

  const onSubmitSecQns = (data) => {
    const trimmedQuestion = data.securityQns.trim();

    if (!trimmedQuestion) {
      setError("securityQns", {
        type: "manual",
        message: "Question cannot be empty or cannot be contain spaces",
      });
      return;
    }
    setIsSubmitting(true);
    const payload = {
      questions: trimmedQuestion,
      status: data?.status?.value || null,
    };

    const response = isEdit
      ? updateSecurityQuestions(selectedQnsId, payload)
      : createSecurityQuestions(payload);

    response
      .then((response) => {
        setMsg(response?.message);
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1000);
        reset();
        getSecurityQuestions(page, pageSize);
        setAddNewModalSecurity(false);
      })
      .catch((error) => {
        setError(error?.message);
        // setErrorPopup(true);
        // setTimeout(() => {
        //   setErrorPopup(false);
        // }, 1000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const currentStatus = watch("status")?.value;

  const handleQuestionChange = (e) => {
    const value = e.target.value;

    if (value.length < 2) {
      setValue("securityQns", value);
      trigger("securityQns");
    } else {
      setValue("securityQns", value, { shouldValidate: true });
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length < 2) {
      setValue("description", value);
      trigger("description");
    } else {
      setValue("description", value, { shouldValidate: true });
    }
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
                    {...register("status", { required: "Status is required" })} // Add required validation
                    onChange={(selectedOption) => {
                      setValue("status", selectedOption, {
                        shouldValidate: true,
                      });
                      trigger("status"); // Trigger validation on change
                    }}
                    isSearchable={false} // Disable typing
                  />
                  {errors.status && (
                    <p className="text-danger small-font">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                {/* <div className="col-8 flex-column">
                  <label className="black-text4 mb-1">Reason</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="all-none input-bg small-font p-2 rounded"
                    // {...register("reason", { required: "Reason is required" })}
                    {...register("reason", {
                      required: "Reason is required",
                      validate: (value) => {
                        const trimmedValue = value.trim();
                        if (!trimmedValue) {
                          return "Reason cannot be empty or contain only spaces";
                        }
                        return true;
                      },
                    })}
                  />
                  {errors.reason && (
                    <p className="text-danger small-font">
                      {errors.reason.message}
                    </p>
                  )}
                </div> */}

                <div className="col-8 flex-column">
                  <label className="black-text4 mb-1">Reason</label>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="all-none input-bg small-font p-2 rounded"
                    readOnly={currentStatus === 2}
                    {...register("reason", {
                      required: "Reason is required",
                      minLength: {
                        value: 2,
                        message: "Must be at least 2 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Cannot exceed 100 characters",
                      },
                    })}
                    onChange={(e) => {
                      setValue("reason", e.target.value); // Update input value
                      trigger("reason"); // Validate length constraints while typing
                    }}
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
                    readOnly={currentStatus === 2}
                    rows="4"
                    style={{ resize: "none" }}
                    {...register("description", {
                      required: "Description is required",
                      validate: (value) => {
                        const trimmedValue = value.trim();
                        if (!trimmedValue || trimmedValue.length <= 20) {
                          return "Description cannot be empty, contain only spaces, or be less than 20 characters";
                        }
                        return true;
                      },
                    })}
                    onChange={handleDescriptionChange}
                  ></textarea>

                  {errors.description && (
                    <p className="text-danger small-font mt-1">
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
                    {...register("status", { required: "Status is required" })}
                    onChange={(selectedOption) => {
                      setValue("status", selectedOption, {
                        shouldValidate: true,
                      });
                      trigger("status");
                    }}
                    isSearchable={false}
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
                    readOnly={currentStatus === 2}
                    className="all-none input-bg small-font p-2 rounded"
                    {...register("securityQns", {
                      required: "Question is required",
                      validate: (value) => {
                        const trimmedValue = value.trim();
                        if (!trimmedValue) {
                          return "Question cannot be empty or contain only spaces";
                        }
                        return true;
                      },
                    })}
                    onChange={handleQuestionChange}
                  />
                  {errors.securityQns && (
                    <p className="text-danger small-font mt-1">
                      {errors.securityQns.message}
                    </p>
                  )}
                </div>

                <div className="row">
                  <div className="col-8"></div>
                  <button
                    type="submit"
                    className="saffron-btn2 small-font pointer mt-4 col-4"
                    // disabled={!isValid}
                    // style={{
                    //   opacity: isValid ? 1 : 0.5,
                    //   pointerEvents: isValid ? "auto" : "none",
                    // }}
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
        discription={msg}
      />
    </>
  );
};

export default AddNewPopUp;
