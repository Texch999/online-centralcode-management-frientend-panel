import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useSelector } from "react-redux";
import { all } from "axios";

const AddNewOfflinePaymentModal = ({
  showAddModal,
  setShowAddModal,
  isEdit,
  setIsEdit,
}) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const allCountries = useSelector((item) => item?.allCountries);

  const countryOptions = allCountries?.map((item, index) => ({
    value: item?.id,
    label: item.name,
  }));
  const currencyOptions = selectedCountry
    ? [
        {
          value: selectedCountry?.id,
          label: selectedCountry?.currency_name,
        },
      ]
    : [];

  const typeOptions = [
    { value: 1, label: "NEFT" },
    { value: 2, label: "UPI" },
    { value: 3, label: "QR Code" },
    { value: 4, label: "Others" },
  ];

  return (
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

        <div className="row mb-3">
          <div className="col-4">
            <label htmlFor="paymentMethod" className="small-font mb-1">
              Select Country
            </label>
            <Select
              className="small-font"
              options={countryOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              onChange={(option) => {
                setSelectedCountry(
                  allCountries.find((c) => c.id === option.value)
                );
                setSelectedCurrency(null);
              }}
            />
          </div>
          <div className="col-4">
            <label htmlFor="paymentMethod" className="small-font mb-1">
              Select Currency
            </label>
            <Select
              className="small-font"
              options={currencyOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              onChange={(option) => setSelectedCurrency(option)}
              isDisabled={!selectedCountry}
            />
          </div>
          <div className="col-4">
            <label htmlFor="paymentMethod" className="small-font mb-1">
              Select Type
            </label>
            <Select
              className="small-font"
              options={typeOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              onChange={(option) => setSelectedType(option.value)}
            />
          </div>
        </div>

        <>
          <div className="row my-3">
            <div className="col-4">
              <label htmlFor="upiID" className="small-font mb-1">
                Name
              </label>
              <input
                id="upiID"
                type="text"
                className="w-100 small-font rounded input-css all-none"
                placeholder="Enter"
              />
            </div>

            <div className="col-4">
              <label htmlFor="image" className="small-font mb-1">
                Upload Image
              </label>
              <div className="input-group">
                <input
                  id="image"
                  type="file"
                  className="w-100 small-font rounded input-css all-none"
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="image"
                  className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
                >
                  <span className="small-font">Upload</span>
                  <AiOutlineCloudUpload size={20} />
                </label>
              </div>
            </div>
            {selectedType === 3 ? (
              <div className="col-4">
                <label htmlFor="image" className="small-font mb-1">
                  Qr Code
                </label>
                <div className="input-group">
                  <input
                    id="image"
                    type="file"
                    className="w-100 small-font rounded input-css all-none"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="image"
                    className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
                  >
                    <span className="small-font">Upload</span>
                    <AiOutlineCloudUpload size={20} />
                  </label>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="row my-3 align-items-center">
            <div className="col-12">
              <label htmlFor="upiID" className="small-font mb-1">
                Details
              </label>

              <textarea
                type="text"
                placeholder="Enter"
                className="w-100 small-font rounded input-css all-none"
              ></textarea>
            </div>
          </div>
        </>

        <div className="d-flex flex-end">
          <div className="col-4">
            <div type="button" className="w-100 saffron-btn rounded small-font">
              {`${isEdit ? "Update" : "Submit"}`}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewOfflinePaymentModal;
