import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";

const CreditReferencePopup = ({ show, onHide }) => {
  const [credit, setCredit] = useState("");

  const handleSubmit = () => {
    if (credit === "") {
      alert("Please enter a valid credit reference");
      return;
    }
    // Submit the credit reference (this could be an API call or other action)
    alert("Credit Reference Submitted: " + credit);
    onHide(); // Close the popup after submission
  };

  return (
    <Modal centered show={show} onHide={onHide} size="md">
      <Modal.Body className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="medium-font fw-600">Credit Reference</h5>
          <MdOutlineClose size={22} onClick={onHide} className="pointer" />
        </div>

        <div className="row d-flex align-items-end mb-3">
          {/* Credit Reference Field */}
          <div className="col-8">
            <label htmlFor="creditReference" className="small-font mb-1">
              Credit Reference Amount
            </label>
            <input
              id="creditReference"
              type="text"
              className="all-none small-font rounded input-css w-100"
              placeholder="Enter"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
          </div>

          <div className="col-4 pointer d-flex align-items-center">
            <button
              type="button"
              className="saffron-btn rounded w-100 py-2 medium-font"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreditReferencePopup;
