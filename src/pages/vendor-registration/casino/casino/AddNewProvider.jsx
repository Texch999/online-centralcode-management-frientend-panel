import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import SuccessPopup from "../../../popups/SuccessPopup";
import Select from "react-select";
import { customStyles } from "../../../../components/ReactSelectStyles"
import "../../../add-team/style.css"

const AddNewProvider = ({ show, setShow }) => {
  const [success, setSuccess] = useState(false);
  const [addnewGame, setAddNewGame] = useState(false);
  const handleSubmit = () => {
    setSuccess(!success);
  };

  const handleGameBtn = () => {
    setAddNewGame((prevState) => !prevState);
  };

  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <div className="p-2">
        <div className="d-flex flex-between text-black px-2">
          <div className="medium-font">Select New Provider</div>
          <div onClick={() => setShow(false)} className="font-20 pointer">
            <IoCloseSharp />
          </div>
        </div>
        <div className="flex-column small-font">
          <div className="felx-column px-2 text-black  my-2">
            <label className="small-font mb-1">Providers</label>
            <Select
              className="small-font"
              options={selectOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>

          <div className="flex-column px-2 text-black my-2">
            <label className="small-font mb-1">Games</label>
            <Select
              className="small-font"
              options={selectOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>

          <div className="d-flex flex-end align-items-center px-2 my-2">
            <div
              className="input-css radius-20 small-font text-black pointer px-2"
              onClick={handleGameBtn}
            >
              {addnewGame ? (
                <span>
                  <IoCloseSharp className="mx-1" />
                  Close
                </span>
              ) : (
                <span>
                  <IoMdAdd className="mx-1" />
                  Add New Game
                </span>
              )}
            </div>
          </div>
          {addnewGame === true && (
            <div className="px-2 my-2">
              <input
                type="text"
                placeholder="Enter Game"
                className="input-css small-font text-black w-100 pointer"
              />
            </div>
          )}

          <div
            className="my-2 saffron-bg py-2 white-font text-center br-5 mx-2 pointer"
            onClick={handleSubmit}
          >
            Submit
          </div>
        </div>
      </div>
      <SuccessPopup
        successPopupOpen={success}
        setSuccessPopupOpen={setSuccess}
        discription={"New Provider Added"}
      />
    </Modal>
  );
};

export default AddNewProvider;
