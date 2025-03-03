import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { FaSpinner } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import { imgUrl } from "../../api/baseUrl";
import { editBannerApi } from "../../api/apiMethods";

const EditBannerPopup = ({
  editBanner,
  setEditBanner,
  editBannerModel,
  selectedBannerId,
  setSelectedBannerId,
  setMessage,
  websitesList,
  onSubmit,
  onSubmitResult,
}) => {
  console.log("selectedBannerId", selectedBannerId);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    register_id: null,
    userfor: "",
    schedule: "",
    type: null,
    website_id: null,
    place: "",
    page: "",
    image: [],
    start: "",
    end: "",
    existingImages: [],
  });

  useEffect(() => {
    if (selectedBannerId) {
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
      };

      setFormData({
        register_id: selectedBannerId.register_id || null,
        userfor: selectedBannerId.userfor || "",
        schedule: selectedBannerId.schedule || "",
        type: selectedBannerId.type || "",
        website_id: selectedBannerId.website_id || "",
        page: selectedBannerId.page || "",
        place: selectedBannerId.place || "",
        ...(selectedBannerId.start
          ? { start: formatDate(selectedBannerId.start) }
          : {}),
        ...(selectedBannerId.end
          ? { end: formatDate(selectedBannerId.end) }
          : {}),
        existingImages: selectedBannerId.image
          ? Array.isArray(selectedBannerId.image)
            ? selectedBannerId.image
            : JSON.parse(selectedBannerId.image)
          : [],
        image: [],
      });
    }
  }, [selectedBannerId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: Array.isArray(prevFormData.image)
        ? [...prevFormData.image, ...files]
        : [...files],
    }));
  };

  const removeImage = (index, isNewImage = false) => {
    setFormData((prevFormData) => {
      if (isNewImage) {
        return {
          ...prevFormData,
          image: prevFormData.image.filter((_, i) => i !== index),
        };
      } else {
        return {
          ...prevFormData,
          existingImages: prevFormData.existingImages.filter(
            (_, i) => i !== index
          ),
        };
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const id = selectedBannerId.id;
    const { image, existingImages, ...formDataWithoutImages } = formData;

    try {
      const formDataToSubmit = new FormData();

      Object.keys(formDataWithoutImages).forEach((key) => {
        formDataToSubmit.append(key, formDataWithoutImages[key]);
      });

      formDataToSubmit.append("existingImages", JSON.stringify(existingImages));

      image.forEach((img) => {
        formDataToSubmit.append("image", img);
      });

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

  const selectOptionsType = [
    { value: 1, label: "Sports" },
    { value: 2, label: "Casino" },
  ];

  const selectOptionsWebsites = websitesList?.map((item) => ({
    value: Number(item?.id.slice(3, -3)),
    label: item.web_name,
  }));

  const selectPages = [
    { value: "home", label: "Home" },
    { value: "description", label: "Description" },
    { value: "wallet", label: "Wallet" },
    { value: "login", label: "Login" },
  ];

  const selectPlace = [
    { value: "top", label: "Top" },
    { value: "center", label: "Center" },
    { value: "bottom", label: "Bottom" },
    { value: "right", label: "Right" },
    { value: "left", label: "Left" },
  ];

  const handleClose = () => {
    setEditBanner(false);
  };

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
              <label className="black-text4 small-font mb-1">
                Sports/Casino
              </label>
              <input
                className="all-none input-css2 small-font p-2 rounded"
                type="text"
                placeholder="Enter Sports/Casino"
                value={
                  formData.type
                    ? selectOptionsType.find(
                        (option) => option.value === formData.type
                      )?.label || ""
                    : ""
                }
                readOnly
              />
            </div>

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
                  formData.page
                    ? selectPages.find(
                        (option) => option.value === formData.page
                      )
                    : null
                }
              />
            </div>
          </div>

          <div className="d-flex w-80 mt-3">
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
                value={
                  formData.place
                    ? selectPlace.find(
                        (option) => option.value === formData.place
                      )
                    : null
                }
              />
            </div>

            <div className="col-4 flex-column me-3">
              <label className="black-text4 mb-1">Start Date & Time</label>
              <input
                className="input-css2"
                type="datetime-local"
                value={formData.start}
                onChange={(e) =>
                  setFormData({ ...formData, start: e.target.value })
                }
              />
            </div>

            <div className="col-4 flex-column">
              <label className="black-text4 mb-1">End Date & Time</label>
              <input
                className="input-css2"
                type="datetime-local"
                value={formData.end}
                onChange={(e) =>
                  setFormData({ ...formData, end: e.target.value })
                }
              />
            </div>
          </div>

          <div className="d-flex w-100 mt-3 flex-column">
            <label className="black-text4 mb-1 small-font">
              Existing Files
            </label>
            {formData.existingImages?.length > 0 && (
              <div className="mt-2 d-flex">
                {formData.existingImages.map((image, idx) => (
                  <div key={idx} className="position-relative">
                    <img
                      src={`${imgUrl}/banner/${image}`}
                      alt={`preview-${idx}`}
                      className="img-thumbnail"
                      style={{
                        width: "90px",
                        height: "80px",
                        marginLeft: "5px",
                      }}
                    />
                    <MdCancel
                      className="position-absolute top-0 end-0 bg-danger text-white rounded-circle "
                      style={{ cursor: "pointer" }}
                      onClick={() => removeImage(idx, false)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="d-flex w-100 mt-3 flex-column">
            <label className="black-text4 mb-1 small-font">
              Upload New Files
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="input-css2"
            />
            {formData.image?.length > 0 && (
              <div className="mt-2 d-flex">
                {formData.image.map((image, idx) => (
                  <div key={idx} className="position-relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${idx}`}
                      className="img-thumbnail"
                      style={{
                        width: "90px",
                        height: "80px",
                        marginLeft: "5px",
                      }}
                    />
                    <MdCancel
                      className="position-absolute top-0 end-0 bg-danger text-white rounded-circle "
                      style={{ cursor: "pointer" }}
                      onClick={() => removeImage(idx, true)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="d-flex w-100 mt-3 justify-content-center">
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
