import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import SelectWebsitePopUp from "./SelectWebsitePopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../../pages/add-team/style.css";
// import {Editor, EditorState} from 'draft-js';
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
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
} from "draft-js";
import "draft-js/dist/Draft.css";

const AddPrivacyPolicyPopUp = ({
  addPrivacyModal,
  setAddPrivacyModal,
  isEditModal,
  setIsEditModal,
  getPolicyPrivacyData,
  countries,
  setCountries,
  websites,
  setWebsites,
}) => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [error, setError] = useState("");
  // const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  // const [websites, setWebsites] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [privacyData, setPrivacyData] = useState([]);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const handleStatusChange = (selectOptionStatus) => {
    setSelectedStatus(selectOptionStatus);
  };

  const countryOptions = countries.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));
  const handleCountryChange = (selectedOption) => {
    console.log("country changed");
    setSelectedCountry(selectedOption);
  };

  const websiteOptions = websites.map((item) => ({
    value: item?.id,
    label: item?.web_name,
  }));
  const handleWebsiteChange = (selectedOption) => {
    console.log("website changed");
    setSelectedWebsite(selectedOption);
  };
  const statusOptions = [
    { value: "1", label: "Active" },
    { value: "2", label: "In-Active" },
  ];
  // const getAllCountries = () => {
  //   getCountries()
  //     .then((response) => {
  //       console.log("Countries", response.data);
  //       setCountries(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error?.message);
  //     });
  // };
  // useEffect(() => {
  //   getAllCountries();
  // }, []);

  // const getAllWebsites = () => {
  //   getWebsites()
  //     .then((response) => {
  //       console.log("Websites", response.data);
  //       setWebsites(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error?.message);
  //     });
  // };
  // useEffect(() => {
  //   getAllWebsites();
  // }, []);

  useEffect(() => {
    const savedDescription = watch("description");
    if (savedDescription) {
      try {
        const contentState = convertFromRaw(JSON.parse(savedDescription));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromText(savedDescription)
          )
        );
      }
    }
  }, [watch("description")]);

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const content = newEditorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(content));
    setValue("description", rawContent, { shouldValidate: true });
  };
  const handleClose = () => {
    setAddPrivacyModal(false);
    setIsEditModal(false);
    reset();
    setEditorState(EditorState.createEmpty());
    setSuccessPopupOpen(false);
  };

  const onSubmit = (data) => {
    const payload = {
      country_id: data.country?.value,
      website_id: data.website?.value,
      is_active: Number(data.status?.value),
      description: data.description,
    };
    console.log(payload, "fghfgh");
    createPrivacyPolicy(payload)
      .then((response) => {
        setAddPrivacyModal();
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1000);
        reset();
        getPolicyPrivacyData();
        console.log("response from API", response);
      })
      .catch((error) => {
        setError(error?.message);
        console.log(error, "error from API", error);
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
              <div className="col-4 flex-column">
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

              <div className="col-4 flex-column">
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
              </div>

              <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Status</label>
                <Controller
                  name="status"
                  control={control}
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

              <div className="col-12 flex-column mt-3 ">
                <label className="black-text4 mb-1">Description</label>
                <textarea
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                  rows="30"
                  style={{ resize: "none" }}
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 300,
                      message: "Description must be at least 100 characters",
                    },
                  })}
                ></textarea>
                {/* <div className="border p-2" style={{ minHeight: "300px" }}>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: "Description is required" }}
                    render={() => (
                      <Editor
                        editorState={editorState}
                        onChange={handleEditorChange}
                      />
                    )}
                  />
                </div> */}
                {errors.description && (
                  <p className="text-danger small-font">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="row">
                <div className="col-8"></div>
                <div className=" small-font pointer mt-4 col-4">
                  <button
                    type="submit"
                    className={` w-100 ${
                      isValid ? "saffron-btn2" : "disabled-btn py-2 px-2 br-5"
                    }`}
                    disabled={!isValid}
                  >
                    Create
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
    </>
  );
};

export default AddPrivacyPolicyPopUp;
