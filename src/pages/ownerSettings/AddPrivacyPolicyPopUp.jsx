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
} from "../../api/apiMethods";
import { Controller, useForm } from "react-hook-form";

const AddPrivacyPolicyPopUp = ({
  addPrivacyModal,
  setAddPrivacyModal,
  isEditModal,
  setIsEditModal,
  getPolicyPrivacyData,
}) => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [selectWebsite, setSelectWebsite] = useState(false);
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [websites, setWebsites] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [privacyData, setPrivacyData] = useState([]);
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
  const getAllCountries = () => {
    getCountries()
      .then((response) => {
        console.log("Countries", response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllWebsites = () => {
    getWebsites()
      .then((response) => {
        console.log("Websites", response.data);
        setWebsites(response.data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    getAllWebsites();
  }, []);

  const onSubmit = (data) => {
    const payload = {
      country_id: data.country?.value,
      website_id: data.website?.value,
      is_active: Number(data.status?.value),
      description: data.description,
    };
    console.log(payload,"fghfgh")
    createPrivacyPolicy(payload)
      .then((response) => {
        console.log("response from API", response);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  return (
    <>
      <Modal
        show={addPrivacyModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="d-flex w-100 flex-between">
            <h6>Add Privacy Policy</h6>
            <IoCloseSharp
              className="pointer"
              onClick={() => setAddPrivacyModal(false)}
            />
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

      <SelectWebsitePopUp
        setSelectWebsite={setSelectWebsite}
        selectWebsite={selectWebsite}
      />
    </>
  );
};

export default AddPrivacyPolicyPopUp;
