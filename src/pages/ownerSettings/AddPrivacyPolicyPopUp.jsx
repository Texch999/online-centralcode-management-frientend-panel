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
  getAvailableWebsites,
  addWebsiteToPrivacyPolicy,
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
  getAllWebsites,
  availablePrivacyWebsiteId,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    // setError,
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
  const [websitess, setWebsitess] = useState([]);
  const [allUnchecked, setAllUnchecked] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [showDescription, setShowDescription] = useState("");
  const handleStatusChange = (selectOptionStatus) => {
    setSelectedStatus(selectOptionStatus);
  };

  console.log(websites, "===>websites");

  const countryOptions = countriesData.map((item) => ({
    value: item?.id,
    label: item?.name,
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
    setWebsites((prevWebsites) =>
      prevWebsites.map((site) => ({ ...site, selected: false }))
    );
    setShowDescription("  ");
    setAllUnchecked(false);
  };

  useEffect(() => {
    setValue("description", values);
  }, [values, setValue]);

  const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g).trim();
  };

  const onSubmit = (data) => {
    let hasError = false;
    if (!stripHtml(values)) {
      setShowDescription("Description is required");
      hasError = true;
    }

    setIsSubmitting(true);

    const selectedWebsiteIds = websites
      .filter((site) => site.selected)
      .map((site) => ({ website_id: site.id }));

    if (selectedWebsiteIds.length === 0) {
      setAllUnchecked(true);
      hasError = true;
    } else {
      setAllUnchecked(false);
    }
    if (hasError) return;

    setAllUnchecked(false);
    setIsSubmitting(true);

    const payload = {
      country_id: data.country?.value,
      is_active: Number(data.status?.value),
      description: values,
      accessWebsites: selectedWebsiteIds,
    };
    createPrivacyPolicy(payload)
      .then((response) => {
        setAddPrivacyModal(false);
        getPolicyPrivacyData();
        setSuccessPopupOpen(true);
        setShowDescription("");
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 4000);
        reset();
        setValues("");
        getAllWebsites();
        setWebsites((prevWebsites) =>
          prevWebsites.map((site) => ({ ...site, selected: false }))
        );
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
        getAllWebsites();
        getPolicyPrivacyData();
        setWebsites((prevWebsites) =>
          prevWebsites.map((site) => ({ ...site, selected: false }))
        );
        setShowDescription("");
      })
      .finally(() => {
        setIsSubmitting(false);
        setWebsites((prevWebsites) =>
          prevWebsites.map((site) => ({ ...site, selected: false }))
        );
        setShowDescription("");
      });
  };

  const availableWebsites = () => {
    getAvailableWebsites(availablePrivacyWebsiteId)
      .then((response) => {
        if (response.status === true) {
          setWebsitess(response?.data);
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

  const selectedWebsiteNames = websites
    .filter((site) => site.selected)
    .map((site) => site.web_name);

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
                      value={countryOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(val) => field.onChange(val)}
                    />
                  )}
                />
                {errors.country && (
                  <p className="text-danger small-font">
                    {errors.country.message}
                  </p>
                )}
              </div>

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
                    />
                  )}
                />
                {errors.status && (
                  <p className="text-danger small-font">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div>
                <div>
                  <div>
                    <div className="d-flex flex-between text-black my-2">
                      <div className="medium-font">Select Website</div>
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
                                onChange={() =>
                                  handleCheckboxChange(website?.id)
                                }
                              />
                              {website.web_name}
                            </div>
                          </div>
                        ))}
                      </div>

                      {allUnchecked && (
                        <div className="alert alert-warning mx-2">
                          <p>Please Select atlease one website...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 flex-column mt-3 mb-4 ">
                <label className="black-text4 mb-1">Description</label>
                <ReactQuill theme="snow" value={values} onChange={setValues} />
              </div>
              <div className="mt-4">
                {showDescription && (
                  <p className="text-danger mt-1">{showDescription}</p>
                )}
              </div>

              <div className="row">
                <div className="col-8"></div>
                <div className=" small-font pointer mt-4 flex-end col-4">
                  <button
                    type="submit"
                    className={` w-100 ${
                      isValid ? "saffron-btn2" : "disabled-btn py-2 px-2 br-5"
                    }`}
                    disabled={!isValid}
                  >
                    Create
                    {/* {isSubmitting ? "submitting..." : "Create"} */}
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

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={"Privacy Policy created Successfully"}
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
