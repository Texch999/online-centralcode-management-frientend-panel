import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import SelectWebsitePopUp from "./SelectWebsitePopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../../pages/add-team/style.css";
import {
  createPrivacyPolicy,
  getCountries,
  getPrivacyPolicy,
  getPrivacyPolicyById,
  getWebsites,
  countries,
  setCountries,
} from "../../api/apiMethods";
import { Controller, useForm } from "react-hook-form";
import SuccessPopup from "./../popups/SuccessPopup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ErrorPopup from "../popups/ErrorPopup";

const AddPrivacyPolicyPopUp = ({
  addPrivacyModal,
  setAddPrivacyModal,
  isEditModal,
  setIsEditModal,
  getPolicyPrivacyData,
  setCountriesData,
  countriesData,
  websites,
  setWebsites,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [values, setValues] = useState("");
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [privacyData, setPrivacyData] = useState([]);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [descriptionError, setDescriptionError] = useState("");

  const handleDescriptionChange = (value) => {
    // Remove HTML tags to count only text length
    const textLength = value.replace(/<[^>]+>/g, "").trim().length;

    if (textLength === 0) {
      setDescriptionError("Description is required");
    } else if (textLength < 2) {
      setDescriptionError("Description must be at least 2 characters");
    } else if (textLength > 5000) {
      setDescriptionError("Description cannot exceed 5000 characters");
    } else {
      setDescriptionError(""); // Clear error when valid
    }

    setValue("description", value, { shouldValidate: true });
  };
  const handleStatusChange = (selectOptionStatus) => {
    setSelectedStatus(selectOptionStatus);
  };

  const countryOptions = countriesData.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const websiteOptions = websites.map((item) => ({
    value: item?.id,
    label: item?.web_name,
  }));

  const statusOptions = [
    { value: "1", label: "Active" },
    { value: "2", label: "In-Active" },
  ];

  const handleClose = () => {
    setAddPrivacyModal(false);
    setIsEditModal(false);
    reset();
    setSuccessPopupOpen(false);
  };

  useEffect(() => {
    setValue("description", values);
  }, [values, setValue]);

  const onSubmit = (data) => {
    if (!values || values === "<p><br></p>") {
      setError("description", {
        type: "manual",
        message: "Description is required",
      });
      return;
    }
    setIsSubmitting(true);

    const payload = {
      country_id: data.country?.value,
      // website_id: data.website?.value,
      is_active: Number(data.status?.value),
      description: values,
    };
    createPrivacyPolicy(payload)
      .then((response) => {
        setAddPrivacyModal(false);
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1000);
        reset();
        setValues("");
        getPolicyPrivacyData();
      })
      .catch((error) => {
        setError(error?.message);
        setAddPrivacyModal(false);
        setErrorPopup(true);
        setTimeout(() => {
          setErrorPopup(false);
        }, 3000);
        reset();
        setValues("");
        getPolicyPrivacyData();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Modal
        show={addPrivacyModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="d-flex w-100 flex-between">
            <h6>Add Privacy Policy</h6>
            <IoCloseSharp className="pointer" onClick={handleClose} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-3 small-font">
              <div className="col-6 flex-column">
                <label className="black-text4 mb-1">Country</label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={countryOptions}
                      styles={customStyles}
                      placeholder="Select"
                      maxMenuHeight={120}
                      menuPlacement="auto"
                      classNamePrefix="custom-react-select"
                      value={countryOptions.find(
                        (option) => option.value === field.value
                      )}
                      onInputChange={(inputValue, { action }) => {
                        if (action === "input-change") {
                          const filteredValue = inputValue.replace(
                            /[^A-Za-z\s]/g,
                            ""
                          ); // Allow only letters and spaces
                          return filteredValue;
                        }
                      }}
                      onChange={(selectedOption) => {
                        setSelectedCountry(selectedOption);
                      }}
                    />
                  )}
                />
                {errors.country && (
                  <p className="text-danger small-font">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Showing Websites</label>
                <Controller
                  name="website"
                  control={control}
                  rules={{ required: "Website is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={websiteOptions}
                      styles={customStyles}
                      placeholder="Select"
                      maxMenuHeight={120}
                      menuPlacement="auto"
                      value={websiteOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(val) => field.onChange(val)}
                    />
                  )}

                />
                {errors.website && (
                  <p className="text-danger small-font">
                    {errors.website.message}
                  </p>
                )}
              </div> */}

              <div className="col-6 flex-column">
                <label className="black-text4 mb-1">Status</label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={null}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={statusOptions}
                      styles={customStyles}
                      placeholder="Select"
                      maxMenuHeight={120}
                      menuPlacement="auto"
                      value={statusOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(val) => field.onChange(val)}
                      isSearchable={false} // Disable typing
                    />
                  )}
                />
                {errors.status && (
                  <p className="text-danger small-font">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* <div className="col-12 flex-column mt-3 mb-4 ">
                <label className="black-text4 mb-1">Description</label>
                <ReactQuill theme="snow" value={values} onChange={setValues} />
                {errors.description && (
                  <p className="text-danger small-font">
                    {errors.description.message}
                  </p>
                )}
              </div> */}

              <div className="col-12 flex-column mt-3 mb-4">
                <label className="black-text4 mb-1">Description</label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      theme="snow"
                      onChange={(val) => {
                        field.onChange(val);
                        handleDescriptionChange(val);
                      }}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-danger small-font mt-5">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="row">
                <div className="col-8"></div>
                <div className=" small-font pointer mt-4 flex-end col-4">
                  <button
                    type="submit"
                    className="w-100 saffron-btn2"
                    // className={` w-100 ${
                    //   isValid ? "saffron-btn2" : "disabled-btn py-2 px-2 br-5"
                    // }`}
                    // disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? "submitting..." : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </form>
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
    </>
  );
};

export default AddPrivacyPolicyPopUp;
