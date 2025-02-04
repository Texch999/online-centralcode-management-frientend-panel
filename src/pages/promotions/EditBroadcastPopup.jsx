import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { FaSpinner } from "react-icons/fa";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import { editBroadCasting } from "../../api/apiMethods";

const EditBroadcastPopup = ({
  editBroadcast,
  setEditBroadcast,
  editBroadcastModel,
  selectedIdForEdit,
  setMessage,
  onSubmit,
  onSubmitResult,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: null,
    website: null,
    location: null,
    message: "",
  });
  useEffect(() => {
    if (selectedIdForEdit) {
      setFormData({
        type: selectedIdForEdit.type || null,
        website: selectedIdForEdit.website_id || null,
        location: selectedIdForEdit.location_type || null,
        message: selectedIdForEdit.message || "",
      });
    }
  }, [selectedIdForEdit]);

  const selectOptionsType = [
    { value: 1, label: "Sports" },
    { value: 2, label: "Casino" },
  ];

  const selectOptionsWebsites = [
    { value: 1, label: "WEBSITE 1" },
    { value: 2, label: "WEBSITE 2" },
  ];

  const selectOptionsLocations = [{ value: 1, label: "Home" }];

  const handleSubmit = async () => {
    const id = selectedIdForEdit.id;
    setLoading(true);

    const { website, location, ...formDataWithoutWebsiteAndLocation } =
      formData;

    try {
      const response = await editBroadCasting(
        id,
        formDataWithoutWebsiteAndLocation
      );

      if (response.status === 200) {
        setLoading(false);
        setMessage(response.message);
        onSubmitResult("success");
        onSubmit();
        setEditBroadcast(false);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
      onSubmitResult("error");
      onSubmit();
      setEditBroadcast(false);
    }
  };

  const handleClose = () => {
    setEditBroadcast(false);
  };

  return (
    <Modal show={editBroadcast} size="md" centered>
      <Modal.Body>
        <div className="d-flex w-100 flex-between">
          <h6 className="fw-600 mb-0">{editBroadcastModel}</h6>
          <IoCloseSharp size={20} onClick={handleClose} className="pointer" />
        </div>

        <div className="row mt-3 small-font d-flex justify-content-spacebetween">
          <div className="d-flex w-60 mt-3">
            <div className="col-6 flex-column me-3">
              <label className="black-text4 small-font mb-1">
                Sports/Casino
              </label>
              <Select
                className="small-font"
                options={selectOptionsType}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    type: selected ? selected.value : null,
                  })
                }
                value={
                  formData.type
                    ? selectOptionsType.find(
                        (option) => option.value === formData.type
                      )
                    : null
                }
              />
            </div>

            <div className="col-6 flex-column me-3">
              <label className="black-text4 small-font mb-1">Websites</label>
              <input
                className="all-none input-css2 small-font p-2 rounded"
                type="text"
                placeholder="Enter website"
                value={
                  formData.website
                    ? selectOptionsWebsites.find(
                        (option) => option.value === formData.website
                      )?.label || ""
                    : ""
                }
              />
            </div>

            <div className="col-6 flex-column me-3">
              <label className="black-text4 small-font mb-1">
                Broadcasting Location
              </label>
              <input
                className="all-none input-css2 small-font p-2 rounded"
                type="text"
                placeholder="Enter location"
                value={
                  formData.location
                    ? selectOptionsLocations.find(
                        (option) => option.value === formData.location
                      )?.label || ""
                    : ""
                }
              />
            </div>
          </div>

          <div className="d-flex w-60 mt-3">
            <div className="col-12 flex-column">
              <label className="black-text4 mb-1 small-font">
                Type Broadcasting Message
              </label>
              <textarea
                placeholder="Enter"
                className="all-none input-css2 small-font p-2 rounded"
                rows="4"
                style={{ resize: "none" }}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                value={formData.message}
              />
            </div>

            <div className="col-6 flex-end ml-10">
              <div
                className="saffron-btn2 small-font pointer ms-2 w-100 mr-2"
                onClick={handleSubmit}
              >
                {loading ? <FaSpinner className="spinner-circle" /> : "Update"}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditBroadcastPopup;
