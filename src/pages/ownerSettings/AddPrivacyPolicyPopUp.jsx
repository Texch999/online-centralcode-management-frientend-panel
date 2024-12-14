import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import SelectWebsitePopUp from "./SelectWebsitePopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../../pages/add-team/style.css";

const AddPrivacyPolicyPopUp = ({
  addPrivacyModal,
  setAddPrivacyModal,
  addPrivacyTitleModal,
  addPrivacyButtonTitleModal,
}) => {
  const [selectWebsite, setSelectWebsite] = useState(false);
  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

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
            <h6>{addPrivacyTitleModal}</h6>
            <IoCloseSharp
              className="pointer"
              onClick={() => setAddPrivacyModal(false)}
            />
          </div>

          <div className="row mt-3 small-font">
            <div className="col-4 flex-column">
              <label className="black-text4 mb-1">Country</label>
              <Select
                className="small-font"
                options={selectOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              />
            </div>
            <div className="col-4 flex-column">
              <label className="black-text4 mb-1">Show Website</label>
              <Select
                className="small-font"
                options={selectOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              />
            </div>
            <div className="col-4 flex-column">
              <label className="black-text4 mb-1">Status</label>
              <Select
                className="small-font"
                options={selectOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              />
            </div>

            <div className="col-12 flex-column mt-3 ">
              <label className="black-text4 mb-1">Description</label>
              <textarea
                placeholder="Enter"
                className="all-none input-bg small-font p-2 rounded"
                rows="6"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="row">
              <div className="col-8"></div>
              <div className="saffron-btn2 small-font pointer mt-4 col-4">
                {addPrivacyButtonTitleModal}
              </div>
            </div>
          </div>
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
