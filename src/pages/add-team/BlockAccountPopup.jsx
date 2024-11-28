import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AiOutlineClose } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Images } from "../../images";
import "../add-team/style.css";

const BlockAccountPopup = ({ isOpen, onRequestClose, onBlock }) => {
  return (
    <Modal show={isOpen} onHide={onRequestClose} centered size='md'>
      <Modal.Body className="py-4 px-3">
        <div className="d-flex justify-content-end">
          <AiOutlineClose onClick={onRequestClose} style={{ cursor: 'pointer' }} />
        </div>

        <div className="text-center mb-3">
          <img
            src={Images.addManagementPopup}
            alt="Question Mark Icon"
            style={{ width: '90px' }}
          />
        </div>

        <div className="text-center mb-3">
          <h5 className="fw-600 large-font">Are You Sure to Block this Account</h5>
          <p className="text-muted small-font">Lorem Ipsum is simply dummy text of the printing.</p>
        </div>

        <div className="d-flex justify-content-between gap-3">
          <Button className='white-btn w-50' onClick={onRequestClose}>
            Cancel
          </Button>
          <Button
            className='saffron-btn2 w-50'
            onClick={onBlock}
          >
            Block
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BlockAccountPopup;
