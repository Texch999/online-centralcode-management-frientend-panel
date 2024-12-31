import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { customStyles } from "../../../../components/ReactSelectStyles";
import Select from "react-select";

const AddNewSportsProvider = ({ show, setShow }) => {
  const [addnewGame, setAddNewGame] = useState(false);
  const handleGameBtn = () => {
    setAddNewGame((prevState) => !prevState);
  };
  const selectSports = [
    { value: "casino", label: "Casino" },
    { value: "sports", label: "Sports" },
  ];
  return (
    <Modal show={show} centered>
      <Modal.Body>
        <div>
          <div className="flex-between text-black">
            <h6 className="mb-0">Select New Provider</h6>
            <IoCloseSharp
              className="pointer"
              size={18}
              onClick={() => setShow(false)}
            />
          </div>
          <div className="small-font text-black">
            <div className="felx-column mt-3">
              <label className="mb-1">Providers</label>
              <Select
                className="small-font"
                options={selectSports}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              />
            </div>
            <div className="flex-column mt-3">
              <label className="mb-1">Games</label>
              <Select
                className="small-font"
                options={selectSports}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              />
            </div>
            <div className="flex-end mt-3">
              <div
                className="input-css rounded-pill pointer"
                onClick={handleGameBtn}
              >
                {addnewGame ? (
                  <div>
                    <IoCloseSharp className="me-2" size={16} />
                    <span>Close</span>
                  </div>
                ) : (
                  <span>
                    <IoMdAdd className="me-2" size={16} />
                    <span>Add New Game</span>
                  </span>
                )}
              </div>
            </div>
            {addnewGame === true && (
              <input
                type="text"
                placeholder="Enter Game"
                className="input-css small-font text-black w-100 pointer mt-3"
              />
            )}
            <button className="saffron-btn2 pointer mt-3">Submit</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewSportsProvider;
