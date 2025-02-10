import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useSelector } from "react-redux";
import { all } from "axios";
import {
  createManagementOfflinePaymentModes,
  createPaymentModesInManagement,
  getManagementOfflinePaymentModeById,
  updateManagementOfflinePaymentDetails,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "./../popups/ErrorPopup";
import { useForm } from "react-hook-form";

const AddNewOfflinePaymentModal = ({
  showAddModal,
  setShowAddModal,
  isEdit,
  setIsEdit,
  editId,
  setEditId,
  countries,
  getAllManPaymentModes,
}) => {
  console.log(isEdit, "isEdit");
  console.log(editId, "editId");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imgName, setImgName] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [paymentModesDataById, setPaymentModesDataById] = useState();
  const role_code = localStorage.getItem("role_code");
  const [errors, setErrors] = useState({});
  console.log(paymentModesDataById, "paymentModesDataById");
  const [paymnetEditId, setPaymnetEditId] = useState(null);

  const currencyOptions = countries?.map((item) => ({
    value: item?.id,
    label: item?.currency_name,
  }));

  const typeOptions = [
    { value: 1, label: "NEFT" },
    { value: 2, label: "UPI" },
    { value: 3, label: "QR Code" },
    { value: 4, label: "Cash" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file) {
      setImage(file);
      setImgName(file.name);
    }
  };

  const getOffPaymnetDetailsById = () => {
    console.log("editId", editId);
    getManagementOfflinePaymentModeById(editId)
      .then((response) => {
        console.log("response", response);
        setPaymnetEditId(response?.id);
        setName(response?.name || "");
        setSelectedCurrency(
          currencyOptions.find(
            (option) => option.value === response?.currency
          ) || null
        );
        setSelectedType(
          typeOptions.find((option) => option.value === response?.avil_modes) ||
            null
        );
        setImage(response?.image || "");
        setImgName(response?.image || "");
      })
      .catch((error) => {
        setErrorMsg(error?.message);
      });
  };

  useEffect(() => {
    if (editId && isEdit) {
      getOffPaymnetDetailsById();
    }
  }, [editId]);

  const validateForm = () => {
    let newErrors = {};
    if (!selectedCurrency) newErrors.currency = "Currency is required";
    if (!selectedType) newErrors.type = "Type is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!image) newErrors.image = "Image is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setIsEdit(false);
    setShowAddModal(false);
    setImage(null);
    setImgName(null);
    setSelectedType(null);
    setSelectedCurrency(null);
    setName("");
    setErrors({});
  };

  const postEditPaymentModes = async () => {
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("currency", selectedCurrency.value);
    formData.append("name", name);
    formData.append("image", image);
    formData.append("avil_modes", selectedType.value);
    console.log("Final Payload:", Object.fromEntries(formData.entries()));
    setMsg("");
    try {
      const response = isEdit
        ? await updateManagementOfflinePaymentDetails(paymnetEditId, formData)
        : await createManagementOfflinePaymentModes(formData);
      if (response.status === true) {
        console.log("resposne successs", response);
        setMsg(response?.message);
        setShowAddModal(false);
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, [2000]);
        getAllManPaymentModes();
        setImage(null);
        setImgName(null);
        setSelectedType(null);
        setSelectedCurrency(null);
        setName("");
        setErrors({});
      } else {
        console.log("error");
      }
    } catch (error) {
      setErrorMsg(error?.message);
      setShowAddModal(false);
      setErrorPopupOpen(true);
      setTimeout(() => {
        setErrorPopupOpen(false);
      }, [2000]);
      getAllManPaymentModes();
      setImage(null);
      setImgName(null);
      setSelectedType(null);
      setSelectedCurrency(null);
      setName("");
      setErrors({});
    }
  };

  return (
    <>
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="md"
        centered
      >
        <Modal.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="medium-font fw-600">
              {`${isEdit ? "Edit" : "Add"}`} Offline Payment Modes
            </h5>
            <MdOutlineClose
              size={22}
              onClick={handleClose}
              className="pointer"
            />
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <label className="small-font mb-1">Select Currency</label>
              <Select
                className="small-font"
                options={currencyOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                value={
                  currencyOptions.find(
                    (option) => option.value === selectedCurrency
                  ) || selectedCurrency
                }
                // value={selectedCurrency}
                onChange={(option) => {
                  setSelectedCurrency(option.value);
                  setErrors((prev) => ({
                    ...prev,
                    currency: option ? "" : prev.currency,
                  }));
                }}
              />
              {errors.currency && (
                <p className="text-danger small-font">{errors.currency}</p>
              )}
            </div>
            <div className="col-6">
              <label className="small-font mb-1">Select Type</label>
              <Select
                className="small-font"
                options={typeOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                value={
                  typeOptions.find((option) => option.value === selectedType) ||
                  selectedType
                }
                // value={selectedType}
                onChange={(option) => {
                  setSelectedType(option.value);
                  setErrors((prev) => ({
                    ...prev,
                    type: option ? "" : prev.type,
                  }));
                }}
              />
              {errors.type && (
                <p className="text-danger small-font">{errors.type}</p>
              )}
            </div>
          </div>

          <div className="row my-3">
            <div className="col-6">
              <label className="small-font mb-1">Name</label>
              <input
                type="text"
                className="w-100 small-font rounded input-css all-none"
                placeholder="Enter"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    name: e.target.value ? "" : prev.name,
                  }));
                }}
              />
              {errors.name && (
                <p className="text-danger small-font">{errors.name}</p>
              )}
            </div>

            <div className="col-6">
              <label className="small-font mb-1">Upload Image</label>
              <div className="input-group">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="w-100 small-font rounded input-css all-none"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleImageUpload(e);
                    setErrors((prev) => ({
                      ...prev,
                      image: e.target.files.length ? "" : prev.image,
                    }));
                  }}
                />
                <label
                  htmlFor="image"
                  className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
                >
                  <span className="small-font">
                    {imgName ? imgName : "Upload Image"}
                  </span>
                  <AiOutlineCloudUpload size={20} />
                </label>
              </div>

              {errors.image && (
                <p className="text-danger small-font">{errors.image}</p>
              )}
            </div>
          </div>

          <div className="d-flex flex-end">
            <div className="col-5 my-3">
              <button
                type="submit"
                className="w-100 saffron-btn rounded small-font"
                onClick={postEditPaymentModes}
              >
                {`${isEdit ? "Update" : "Submit"}`}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={isEdit ? "Successfully updated!" : msg}
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={errorMsg}
      />
    </>
  );
};

export default AddNewOfflinePaymentModal;
