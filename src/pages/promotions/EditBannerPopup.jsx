import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { FaSpinner } from "react-icons/fa";
import { MdCancel, MdOutlineFileUpload } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import { imgUrl } from "../../api/baseUrl";
import { editBannerApi } from "../../api/apiMethods";
import Enums from "./Enum";

const EditBannerPopup = ({
  editBanner,
  setEditBanner,
  editBannerModel,
  selectedBannerId,
  setSelectedBannerId,
  setMessage,
  selectOptionsWebsitesDirectors,
  selectOptionsUserWebsitesDirectors,
  websitesList,
  emp_role_id,
  onSubmit,
  onSubmitResult,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    register_id: null,
    userfor: "",
    schedule: "",
    website_id: null,
    place: "",
    page: "",
    poster_type: "",
    image: null, // Single file, not an array
    video: null, // Single file, not an array
    video_banner: null, // Single file, not an array
    start: "",
    end: "",
  });

  const [initialData, setInitialData] = useState({});

  const selectedWebsite = websitesList.find(
    (site) => Number(site.id.slice(3, -3)) === selectedBannerId?.website_id
  );

  const pageMappings = {
    brahma: Enums.brahmaSelectPages,
    diamond: Enums.diamondSelectPages,
    sparkbook: Enums.sparkbookSelectPages,
    "9exchange": Enums.nineExchangeSelectPages,
    texchange: Enums.texchangeSelectPages,
  };
  const placeMappings = {
    brahma: Enums.brahmaSelectPlace,
    diamond: Enums.diamondSelectPlace,
    sparkbook: Enums.sparkbookSelectPlace,
    "9exchange": Enums.nineExchangeSelectPlace,
    texchange: Enums.texchangeSelectPlace,
  };

  const selectedWebName = selectedWebsite?.web_name;

  const selectPages = selectedWebName
    ? Object.entries(pageMappings[selectedWebName] || {}).map(
        ([label, value]) => ({
          label,
          value,
        })
      )
    : [];

  const selectPlace = selectedWebName
    ? Object.entries(placeMappings[selectedWebName] || {}).map(
        ([label, value]) => ({
          label,
          value,
        })
      )
    : [];

    const [errors, setErrors] = useState({
    start: "",
    end: "",
    changes: "",
    image: "",
    video: "",
    videobanner: "",
  });

  const directorsWebsites = [
    ...(Array.isArray(selectOptionsWebsitesDirectors)
      ? selectOptionsWebsitesDirectors
      : []),
    ...(Array.isArray(selectOptionsUserWebsitesDirectors)
      ? selectOptionsUserWebsitesDirectors
      : []),
  ];

  useEffect(() => {
    if (selectedBannerId) {
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
      };

      const initialFormData = {
        register_id: selectedBannerId.register_id || null,
        userfor: selectedBannerId.userfor || "",
        schedule: selectedBannerId.schedule || "",
        website_id: selectedBannerId.website_id || "",
        page: selectedBannerId.page || "",
        poster_type: selectedBannerId.poster_type || "",
        place: selectedBannerId.place || "",
        start: selectedBannerId.start ? formatDate(selectedBannerId.start) : "",
        end: selectedBannerId.end ? formatDate(selectedBannerId.end) : "",
        image: selectedBannerId.image || null,
        video: selectedBannerId.video || null,
        video_banner: selectedBannerId.video_banner || null,
      };

      setFormData(initialFormData);
      setInitialData(initialFormData); // Store initial data
    }
  }, [selectedBannerId]);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    const maxSizeImage = 2 * 1024 * 1024; // 2MB for images
    const maxSizeVideo = 5 * 1024 * 1024; // 5MB for videos
    const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
    const allowedVideoTypes = ["video/mp4"];

    // if (!file) return;

    if (!file) {
      setMessage(
        `${
          field === "video" || field === "video_banner" ? "Video" : "Image"
        } is required.`
      );
      return;
    }

    let errorMessage = "";

    if (field === "image" && !allowedImageTypes.includes(file.type)) {
      errorMessage =
        "Invalid image format. Only JPEG, PNG, and WEBP are allowed.";
    } else if (field === "image" && file.size > maxSizeImage) {
      errorMessage = "Image exceeds 2MB.";
    } else if (
      (field === "video" || field === "video_banner") &&
      !allowedVideoTypes.includes(file.type)
    ) {
      errorMessage = "Invalid video format. Only MP4 is allowed.";
    } else if (
      (field === "video" || field === "video_banner") &&
      file.size > maxSizeVideo
    ) {
      errorMessage = "Video exceeds 5MB.";
    }

    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }
    setErrors((prev) => ({ ...prev, [field]: "" }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: file,
    }));
  };

  // const removeFile = (field) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [field]: null,
  //   }));

  //   setErrors((prev) => ({
  //     ...prev,
  //     [field]: `${
  //       field === "video" || field === "video_banner" ? "Video" : "Image"
  //     } is required.`,
  //   }));
  // };

  const handleSubmit = async () => {
    setLoading(true);

    let formErrors = {};

    if (formData.poster_type === 1 && !formData.image) {
      formErrors.image = "Image is required.";
    }
    if (
      formData.poster_type === 2 &&
      !formData.video &&
      !formData.video_banner
    ) {
      formErrors.video = "At least one video is required.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    const hasChanges = Object.keys(formData).some((key) => {
      return formData[key] !== initialData[key];
    });

    if (!hasChanges) {
      setErrors((prev) => ({ ...prev, changes: "No changes detected." }));
      setLoading(false);
      return;
    }

    const id = selectedBannerId.id;
    try {
      const formDataToSubmit = new FormData();
      let includeStartEnd = false;

      // Check if "start" is changed and ensure "end" has a value
      if (formData.start !== initialData.start && !formData.end) {
        setErrors((prev) => ({ ...prev, end: "End date is required." }));
        setLoading(false);
        return;
      }

      // Append only the fields that have changed
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== initialData[key]) {
          if (key === "image" || key === "video" || key === "video_banner") {
            if (formData[key]) {
              formDataToSubmit.append(key, formData[key]);
            }
          } else {
            formDataToSubmit.append(key, formData[key]);
          }

          // Check if "start" or "end" is changed
          if (key === "start" || key === "end") {
            includeStartEnd = true;
          }
        }
      });

      // Ensure both "start" and "end" are included if one of them is changed
      if (includeStartEnd) {
        if (!formDataToSubmit.has("start") && formData.start) {
          formDataToSubmit.append("start", formData.start);
        }
        if (!formDataToSubmit.has("end") && formData.end) {
          formDataToSubmit.append("end", formData.end);
        }
      }

      const response = await editBannerApi(id, formDataToSubmit);

      if (response.status === 200) {
        setMessage(response.message);
        onSubmitResult("success");
        onSubmit();
        setEditBanner(false);
      }
    } catch (error) {
      setMessage(error.message);
      onSubmitResult("error");
      onSubmit();
      setEditBanner(false);
    } finally {
      setLoading(false);
    }
  };

  let weblist;
  if (emp_role_id === 1) {
    weblist = directorsWebsites;
  } else {
    weblist = websitesList;
  }

  const selectOptionsWebsites = weblist
    .map((item) => {
      let slicedValue = null;
      let label = "";

      if (item?.value) {
        slicedValue = item.value.length > 6 ? item.value.slice(3, -3) : null;
        label = item.label;
      } else if (item?.id) {
        slicedValue = item.id.length > 6 ? item.id.slice(3, -3) : null;
        label = item.web_name;
      }

      return {
        value: slicedValue ? Number(slicedValue) : null,
        label: label,
      };
    })
    .filter((item) => item.value !== null);

  // const selectPages = Object.entries(Enums.brahmaSelectPages).map(
  //   ([key, value]) => ({
  //     value,
  //     label: key,
  //   })
  // );
  // const selectPlace = Object.entries(Enums.diamondSelectPlace).map(
  //   ([key, value]) => ({
  //     value,
  //     label: key,
  //   })
  // );

  const handleClose = () => {
    setFormData({
      register_id: null,
      userfor: "",
      schedule: "",
      website_id: null,
      place: "",
      page: "",
      poster_type: "",
      image: null,
      video: null,
      video_banner: null,
      start: "",
      end: "",
    });
    setErrors({
      start: "",
      end: "",
      changes: "",
    });
    setEditBanner(false);
    setSelectedBannerId(null);
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1); // Add 1 minute to the current time
    return now.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:MM"
  };

  const handleDateChange = (e, field) => {
    const { value } = e.target;
    let errorMsg = "";

    if (field === "start") {
      const currentDateTime = new Date().toISOString().slice(0, 16);
      if (value < currentDateTime) {
        errorMsg = "Start date and time cannot be in the past.";
      }
      setFormData({ ...formData, start: value });

      // Reset the end date if it's before the new start date
      if (formData.end && value > formData.end) {
        setFormData({ ...formData, end: "" });
        setErrors((prev) => ({
          ...prev,
          end: "End date must be after start date.",
        }));
      }
    }

    if (field === "end") {
      if (value < formData.start) {
        errorMsg = "End date must be after the start date.";
      }
      setFormData({ ...formData, end: value });
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const posterTypeOptions = Object.entries(
    Enums.selectOptionsPromotionType
  ).map(([key, value]) => ({
    value,
    label: key,
  }));

  return (
    <Modal show={editBanner} size="md" centered>
      <Modal.Body>
        <div className="d-flex w-100 flex-between">
          <h6 className="fw-600 mb-0">{editBannerModel}</h6>
          <IoCloseSharp size={20} onClick={handleClose} className="pointer" />
        </div>

        <div className="row mt-3 small-font d-flex justify-content-spacebetween">
          <div className="d-flex w-80 mt-3">
            <div className="col-4 flex-column me-3">
              <label className="black-text4 small-font mb-1">Websites</label>
              <input
                className="all-none input-css2 small-font p-2 rounded"
                type="text"
                placeholder="Enter website"
                value={
                  formData.website_id
                    ? selectOptionsWebsites.find(
                        (option) => option.value === formData.website_id
                      )?.label || ""
                    : ""
                }
                readOnly
              />
            </div>

            <div className="col-4 flex-column me-3">
              <label className="black-text4 small-font mb-1">Poster Page</label>
              <Select
                className="small-font"
                options={selectPages}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={100}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    page: selected ? selected.value : null,
                  })
                }
                value={
                  selectPages.find(
                    (option) => option.value === Number(formData.page)
                  ) || null
                }
              />
            </div>
            <div className="col-4 flex-column me-3">
              <label className="black-text4 mb-1">Poster Location</label>
              <Select
                className="small-font"
                options={selectPlace}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={100}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    place: selected ? selected.value : null,
                  })
                }
                value={selectPlace.find(
                  (option) => option.value === Number(formData.place)
                )}
              />
            </div>
          </div>

          <div className="d-flex w-80 mt-3">
            <div className="col-4 flex-column me-3">
              <label className="black-text4 small-font mb-1">Banner Type</label>
              <input
                className="all-none input-css2 small-font p-2 rounded"
                type="text"
                placeholder="Enter website"
                value={
                  formData.poster_type
                    ? posterTypeOptions.find(
                        (option) => option.value === formData.poster_type
                      )?.label || ""
                    : ""
                }
                readOnly
              />
            </div>

            <div className="col-4 flex-column me-3">
              <label className="black-text4 mb-1">Start Date & Time</label>
              <input
                className="input-css2"
                type="datetime-local"
                value={formData.start}
                onChange={(e) => handleDateChange(e, "start")}
                onKeyDown={(e) => e.preventDefault()}
                min={getMinDateTime()}
              />
              {errors.start && (
                <span className="text-danger small-font">{errors.start}</span>
              )}
            </div>

            <div className="col-4 flex-column">
              <label className="black-text4 mb-1">End Date & Time</label>
              <input
                className="input-css2"
                type="datetime-local"
                value={formData.end}
                onChange={(e) => handleDateChange(e, "end")}
                min={formData.start}
                onKeyDown={(e) => e.preventDefault()}
              />
              {errors.end && (
                <span className="text-danger small-font">{errors.end}</span>
              )}
            </div>
          </div>

          {formData?.poster_type === 1 ? (
            <div className="d-flex w-100 mt-3 flex-column">
              <label className="black-text4 mb-1 small-font">Image</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "image")}
                className="input-css2"
                accept=".jpeg, .jpg, .png, .webp"
                id="imageUpload"
                style={{ display: "none" }}
              />
              <label
                htmlFor="imageUpload"
                className="input-css small-font d-flex justify-content-between align-items-center w-100 pointer fixed-upload"
              >
                <span className="file-name">{selectedBannerId?.image}</span>
                <MdOutlineFileUpload size={18} />
              </label>
              {formData.image && (
                <div className="mt-2 d-flex">
                  <div className="position-relative">
                    <img
                      src={
                        typeof formData.image === "string"
                          ? `${imgUrl}/banner/${formData.image}`
                          : URL.createObjectURL(formData.image)
                      }
                      alt="preview"
                      className="img-thumbnail"
                      style={{
                        width: "90px",
                        height: "80px",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                    />
                    {/* <MdCancel
                      className="position-absolute top-0 end-0 bg-danger text-white rounded-circle"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeFile("image")}
                    /> */}
                  </div>
                  {errors.image && (
                    <span className="text-danger small-font">
                      {errors.image}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : null}

          {formData?.poster_type === 2 ? (
            <div className="d-flex w-100 mt-3 flex-column">
              <label className="black-text4 mb-1 small-font">Video</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "video")}
                className="input-css2 "
                accept=".mp4"
                id="videoUpload"
                style={{ display: "none" }}
              />

              <label
                htmlFor="videoUpload"
                className="input-css small-font d-flex justify-content-between align-items-center w-100 pointer fixed-upload"
              >
                <span className="file-name">{selectedBannerId?.video}</span>
                <MdOutlineFileUpload size={18} />
              </label>

              {formData.video && (
                <div className="mt-2 d-flex">
                  <div className="position-relative">
                    <video
                      src={
                        typeof formData.video === "string"
                          ? `${imgUrl}/banner/${formData.video}`
                          : URL.createObjectURL(formData.video)
                      }
                      className="img-thumbnail"
                      style={{
                        width: "90px",
                        height: "80px",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      controls
                      autoPlay
                      muted
                      loop
                    />
                    {/* <MdCancel
                      className="position-absolute top-0 end-0 bg-danger text-white rounded-circle"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeFile("video")}
                    /> */}
                  </div>
                  {errors.video && (
                    <span className="text-danger small-font">
                      {errors.video}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : null}

          {formData?.poster_type === 2 ? (
            <div className="d-flex w-100 mt-3 flex-column">
              <label className="black-text4 mb-1 small-font">
                Video Banner
              </label>

              <input
                type="file"
                onChange={(e) => handleFileChange(e, "video_banner")}
                className="input-css2"
                accept=".mp4"
                id="videoBannerUpload"
                style={{ display: "none" }}
              />

              <label
                htmlFor="videoBannerUpload"
                className="input-css small-font d-flex justify-content-between align-items-center w-100 pointer fixed-upload"
              >
                <span className="file-name">
                  {selectedBannerId?.video_banner}
                </span>
                <MdOutlineFileUpload size={18} />
              </label>
              {formData.video_banner && (
                <div className="mt-2 d-flex">
                  <div className="position-relative">
                    <video
                      src={
                        typeof formData.video_banner === "string"
                          ? `${imgUrl}/banner/${formData.video_banner}`
                          : URL.createObjectURL(formData.video_banner)
                      }
                      className="img-thumbnail"
                      style={{
                        width: "90px",
                        height: "80px",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      controls
                      autoPlay
                      muted
                      loop
                    />
                    {/* <MdCancel
                      className="position-absolute top-0 end-0 bg-danger text-white rounded-circle"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeFile("video_banner")}
                    /> */}
                  </div>
                  {errors.videobanner && (
                    <span className="text-danger small-font">
                      {errors.videobanner}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : null}

          <div className="d-flex w-100 mt-3 flex-center">
            {errors.changes && (
              <span className="text-danger medium-font">{errors.changes}</span>
            )}
            <div
              className="saffron-btn2 small-font pointer ms-2 w-50 mr-2"
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Update"}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditBannerPopup;
