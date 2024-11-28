import React from 'react';
import { FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Images} from "../../images";
import "../add-team/style.css";

const BlockAccountPopup = ({ onClose, onBlock }) => {
  return (
    <div className="popup-overlay d-flex justify-content-center align-items-center">
      <div className="popup-content bg-white rounded p-4" style={{ maxWidth: '450px', width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        {/* Close Button */}
        <div className="d-flex justify-content-end">
          <FaTimes onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>

        {/* Image */}
        <div className="text-center mb-3">
          <img src={Images.addManagementPopup} alt="Question Mark Icon" style={{ width: '60px' }} />
        </div>

        {/* Title and Description */}
        <div className="text-center mb-3">
          <h5 className="fw-bold">Are You Sure to Block this Account</h5>
          <p className="text-muted">Lorem Ipsum is simply dummy text of the printing.</p>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary block-account-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn saffron-btn text-white block-account-btn" onClick={onBlock}>
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockAccountPopup;
