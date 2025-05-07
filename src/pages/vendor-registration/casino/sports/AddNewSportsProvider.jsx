import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { customStyles } from "../../../../components/ReactSelectStyles";
import Select from "react-select";
import { createProvider } from "../../../../api/apiMethods";
import SuccessPopup from "../../../popups/SuccessPopup";
import ErrorComponent from "../../../../components/ErrorComponent";

const AddNewSportsProvider = ({ show, setShow }) => {
  const [addnewGame, setAddNewGame] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [provider, setProvider] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [game, setGame] = useState("");
  const handleGameBtn = () => {
    setAddNewGame((prevState) => !prevState);
  };
  const selectSports = [
    { value: "casino", label: "Casino" },
    { value: "sports", label: "Sports" },
  ];

  const onSubmit = () => {
    setLoading(true);
    const validationErrors = [];

    if (!provider) validationErrors.push("Plaese Enter provider");

    if (!game) validationErrors.push("Game is required.");
    const paylaod = { providerName: provider, gameName: game };
    createProvider(paylaod)
      .then((response) => {
        if (response) {
          setLoading(false);
          setMsg(response?.message);
          setShow(false);
          setSuccessModal(true);
          setTimeout(() => {
            setSuccessModal(false);
          }, 3000);
          setProvider("");
          setGame("");
        }
      })
      .catch((error) => {
        setLoading(false);
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };
  return (
    <>
      <Modal show={show} centered>
        <Modal.Body>
          <div>
            <div className="flex-between text-black">
              <h6 className="mb-0 large-font">Select New Provider</h6>
              <IoCloseSharp
                className="pointer"
                size={18}
                onClick={() => setShow(false)}
              />
            </div>
            {error && <ErrorComponent error={error} />}
            <div className="small-font text-black">
              <div className="felx-column mt-3">
                <label className="mb-1">Providers</label>
                <input
                  type="text"
                  placeholder="Enter Game"
                  className="input-css small-font text-black w-100 pointer"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                />
                {/* <Select
                className="small-font"
                options={selectSports}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              /> */}
              </div>
              <div className="flex-column mt-3">
                <label className="mb-1">Games</label>
                <input
                  type="text"
                  placeholder="Enter Game"
                  className="input-css small-font text-black w-100 pointer"
                  value={game}
                  onChange={(e) => setGame(e.target.value)}
                />
                {/* <Select
                className="small-font"
                options={selectSports}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              /> */}
              </div>
              {/* <div className="flex-end mt-3">
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
            )} */}
              <div className="flex-end mt-3">
                <button
                  className={`saffron-btn2 pointer px-3 pointer ${
                    loading ? "disabled-btn" : ""
                  }`}
                  onClick={onSubmit}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="ms-2">Submit</span>
                    </>
                  ) : (
                    <div>Submit</div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <SuccessPopup
        successPopupOpen={successModal}
        setSuccessPopupOpen={setSuccessModal}
        discription={msg}
      />
    </>
  );
};

export default AddNewSportsProvider;
