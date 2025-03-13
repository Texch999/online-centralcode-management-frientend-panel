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
  availablePrivacyWebsiteId,
  // getPolicyPrivacyData,
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

    const selectedWebsiteIds = websites
    .filter((site) => site.selected)
    .map((site) => ({ website_id: site.id }));

    const payload = {
      country_id: data.country?.value,
      // website_id: data.website?.value,
      is_active: Number(data.status?.value),
      description: values,
      accessWebsites:selectedWebsiteIds,
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

  const [websitess, setWebsitess] = useState([]);
  // const [error, setError] = useState("");
  // const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  // const [errorPopup, setErrorPopup] = useState(false);
  const [allUnchecked, setAllUnchecked] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);

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

  const addMultipleWebsitesToPrivacyPolicy = () => {
    if (allUnchecked && !userConfirmed) {
      setError("All websites are unchecked. Confirm before proceeding.");
      setErrorPopup(true);
      return;
    }
    const selectedWebsiteIds = websites
      .filter((site) => site.selected)
      .map((site) => site.id);
    const payload = {
      websites: selectedWebsiteIds,
    };
    addWebsiteToPrivacyPolicy(availablePrivacyWebsiteId, payload)
      .then((response) => {
        if (response.status === true) {
          setWebsites((prevWebsites) =>
            prevWebsites.map((site) => ({
              ...site,
              selected: selectedWebsiteIds.includes(site.id),
            }))
          );
          // setSelectWebsite(false);
          getPolicyPrivacyData();
          setSuccessPopupOpen(true);
          setTimeout(() => setSuccessPopupOpen(false), 1500);
        } else {
          setError("Something went wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
        // setSelectWebsite(false);
        setWebsites([]);
        setErrorPopup(true);
        setTimeout(() => setErrorPopup(false), 2000);
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
                <div
                // show={selectWebsite}
                // onHide={() => setSelectWebsite(false)}
                // centered
                >
                  <div>
                  <div className="d-flex flex-between text-black my-2">
                    <div className="medium-font">Select Website</div>
                    {/* <div
                        onClick={() => setSelectWebsite(false)}
                        className="font-20"
                      >
                        <IoCloseSharp />
                      </div> */}
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
                              onChange={() => handleCheckboxChange(website?.id)}
                            />
                            {website.web_name}
                          </div>
                        </div>
                      ))}
                    </div>

                    {allUnchecked && (
                      <div className="alert alert-warning mx-2">
                        <p>
                          All websites are unselected. This privacy policy will
                          be removed.
                        </p>
                        <button
                          className="saffron-btn2"
                          onClick={() => setUserConfirmed(true)}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                    {/* <div
                      className={`saffron-btn2 br-5 mx-2 pointer ${
                        allUnchecked && !userConfirmed ? "disabled" : ""
                      }`}
                      onClick={addMultipleWebsitesToPrivacyPolicy}
                      style={{
                        opacity: allUnchecked && !userConfirmed ? 0.5 : 1,
                      }}
                    >
                      Add Website
                    </div> */}
                  </div>
                  </div>
                </div>
              </div>

              <div className="col-12 flex-column mt-3 mb-4 ">
                <label className="black-text4 mb-1">Description</label>
                <ReactQuill theme="snow" value={values} onChange={setValues} />
                {errors.description && (
                  <p className="text-danger small-font">
                    {errors.description.message}
                  </p>
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
                    disabled={!isValid || isSubmitting}
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

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={`${
          selectedWebsiteNames.length > 0
            ? `${selectedWebsiteNames} are now included in the Privacy Policy`
            : "Privacy Policy has been removed."
        }`}
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
