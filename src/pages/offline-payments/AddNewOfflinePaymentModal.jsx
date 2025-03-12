import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  createManagementOfflinePaymentModes,
  getManagementOfflinePaymentModeById,
  updateManagementOfflinePaymentDetails,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "./../popups/ErrorPopup";
import { useSearchParams } from "react-router-dom";

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
  const itemsPerPage = 4;
  const [paymnetEditId, setPaymnetEditId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const intialpage = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(intialpage);
  const page = currentPage;
  const pageSize = itemsPerPage;
  const currencyOptions = countries?.map((item) => ({
    value: item?.id,
    label: `${item.name} - ${item.currency_symbol} ${item.currency_name}`,
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
    getManagementOfflinePaymentModeById(editId)
      .then((response) => {
        if (response?.status === true) {
          setPaymnetEditId(response?.data?.id);
          setName(response?.data?.name || "");
          setSelectedCurrency(response?.data?.currency);
          setSelectedType(response?.data?.avil_modes);
          setImage(response?.data?.image || "");
          setImgName(response?.data?.image || "");
        } else {
          setErrorMsg("Payment mode not found.");
        }
      })
      .catch((error) => {
        setErrorMsg(error?.message);
        setShowAddModal(false);
        setErrorPopupOpen(true);
        setTimeout(() => {
          setErrorPopupOpen(false);
        }, 2000);
      });
  };

  useEffect(() => {
    if (editId && isEdit && role_code === "management") {
      getOffPaymnetDetailsById();
    }
  }, [editId,isEdit]);

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
    formData.append("currency", selectedCurrency || selectedCurrency.value);
    formData.append("name", name);
    formData.append("image", image);
    formData.append("avil_modes", selectedType || selectedType.value);
    console.log(
      "Final Payload cretae:",
      Object.fromEntries(formData.entries())
    );
    setMsg("");
    try {
      const response = isEdit
        ? await updateManagementOfflinePaymentDetails(paymnetEditId, formData)
        : await createManagementOfflinePaymentModes(formData);
      if (response.status === true) {
        console.log("resposne successs", response);
        setMsg(response?.message);
        getAllManPaymentModes(page, pageSize);
        setImage(null);
        setImgName(null);
        setSelectedType(null);
        setSelectedCurrency(null);
        setName("");
        setErrors({});
        setShowAddModal(false);
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 2000);
      } else {
        console.log("error");
      }
    } catch (error) {
      setErrorMsg(error?.message[0]?.message);

      setShowAddModal(false);
      setErrorPopupOpen(true);
      setTimeout(() => {
        setErrorPopupOpen(false);
      }, [2000]);
      getAllManPaymentModes(page, pageSize);
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
              {`${isEdit ? "Edit" : "Add"}`} Offline Payment Cards
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
                className="small-font text-capitalize"
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
                onChange={(option) => {
                  setSelectedCurrency(option.value);
                  setErrors((prev) => ({
                    ...prev,
                    currency: option ? "" : prev.currency,
                  }));
                }}
                filterOption={(option, inputValue) => {
                  // Allow filtering only if the input contains text (letters)
                  if (!inputValue) return true;
                  return (
                    /^[A-Za-z]+$/.test(inputValue) &&
                    option.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  );
                }}
                onInputChange={(inputValue, { action }) => {
                  // Restrict input to only text (letters)
                  if (
                    action === "input-change" &&
                    !/^[A-Za-z]*$/.test(inputValue)
                  ) {
                    return inputValue.replace(/[^A-Za-z]/g, "");
                  }
                  return inputValue;
                }}
                formatOptionLabel={(option) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textTransform: "text-capitalize",
                    }}
                  >
                    <span>{option.label.split(" - ")[0]}</span>
                    <span>{option.label.split(" - ")[1]}</span>
                  </div>
                )}
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
                onChange={(option) => {
                  setSelectedType(option.value);
                  setErrors((prev) => ({
                    ...prev,
                    type: option ? "" : prev.type,
                  }));
                }}
                filterOption={(option, inputValue) => {
                  // Allow filtering only if the input contains text (letters)
                  if (!inputValue) return true;
                  return (
                    /^[A-Za-z]+$/.test(inputValue) &&
                    option.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  );
                }}
                onInputChange={(inputValue, { action }) => {
                  // Restrict input to only text (letters)
                  if (
                    action === "input-change" &&
                    !/^[A-Za-z]*$/.test(inputValue)
                  ) {
                    return inputValue.replace(/[^A-Za-z]/g, "");
                  }
                  return inputValue;
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
                  <span className="small-font text-ellipsis">
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
                onClick={() => {
                  if (role_code === "management") {
                    postEditPaymentModes();
                  }
                }}
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
