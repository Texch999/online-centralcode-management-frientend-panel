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
}) => {
  console.log(editId, "editId");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const allCountries = useSelector((item) => item?.allCountries);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imgName, setImgName] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [paymentModesDataById, setPaymentModesDataById] = useState([]);
  const role_code = localStorage.getItem("role_code");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    trigger,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      currency: "",
      avil_modes: "",
    },
  });

  const currencyOptions = allCountries?.map((item) => ({
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
      setValue("image", file);
    }
  };

  const getPaymentModesById = () => {
    getManagementOfflinePaymentModeById(editId)
      .then((response) => {
        console.log("response", response);
        // if (response.status === true) {
        setPaymentModesDataById(response);
        console.log(response.data, "success");
        // } else {
        //   console.log(response.message, "error");
        // }
      })
      .catch((error) => {
        setErrorMsg(error?.message);
        console.log(error);
      });
  };
  useEffect(() => {
    if (role_code === "management" && editId) {
      getPaymentModesById();
    }
  }, [editId]);
  const postPaymentModes = async (data) => {
    if (!data.currency) {
      setError("currency", { type: "manual", message: "Currency is required" });
      return;
    }
    if (!data.avil_modes) {
      setError("avil_modes", {
        type: "manual",
        message: "Payment Type is required",
      });
      return;
    }
    if (!image) {
      setError("image", { type: "manual", message: "Image is required" });
      return;
    }
    const formData = new FormData();
    formData.append("currency", data.currency);
    formData.append("name", data.name);
    formData.append("image", data.image);
    formData.append("avil_modes", data.avil_modes);
    console.log("Final Payload:", Object.fromEntries(formData.entries()));
    setError("");
    setMsg("");
    try {
      const response = await createManagementOfflinePaymentModes(formData);
      if (response.status === true) {
        console.log("resposne successs", response);
        setMsg(response?.message);
        setShowAddModal(false);
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, [2000]);
        reset();
        setImage(null);
        setImgName(null);
      } else {
        console.log("error");
      }
    } catch (error) {
      setErrorMsg(error?.message);
      console.log("erorr catch", error?.message);
      setShowAddModal(false);
      setErrorPopupOpen(true);
      setTimeout(() => {
        setErrorPopupOpen(false);
      }, [2000]);
      reset();
      setImage(null);
      setImgName(null);
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
              onClick={() => setShowAddModal(false)}
              className="pointer"
            />
          </div>

          <form onSubmit={handleSubmit(postPaymentModes)}>
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
                  onChange={(option) => {
                    setValue("currency", Number(option.value), {
                      shouldValidate: true,
                    });
                    trigger("currency");
                  }}
                />
                {errors.currency && (
                  <p className="text-danger small-font">
                    {errors?.currency?.message}
                  </p>
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
                  onChange={(option) => {
                    setValue("avil_modes", Number(option.value), {
                      shouldValidate: true,
                    });
                    trigger("avil_modes");
                  }}
                />
                {errors.avil_modes && (
                  <p className="text-danger small-font">
                    {errors?.avil_modes?.message}
                  </p>
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
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-danger small-font">
                    {errors?.name?.message}
                  </p>
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
                    onChange={handleImageUpload}
                    // onChange={(e) => {
                    //   setImage(e.target.files[0]);
                    //   const file = e.target.files[0];
                    //   if (file) {
                    //     setImgName(file?.name);
                    //   }
                    // }}
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
              </div>
              {errors.image && (
                <p className="text-danger small-font">{errors.image.message}</p>
              )}
            </div>

            <div className="d-flex flex-end">
              <div className="col-5 my-3">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-100 saffron-btn rounded small-font"
                  style={{
                    opacity: isValid ? 1 : 0.5,
                    pointerEvents: isValid ? "auto" : "none",
                  }}
                >
                  {`${isEdit ? "Update" : "Submit"}`}
                </button>
              </div>
            </div>
          </form>
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
