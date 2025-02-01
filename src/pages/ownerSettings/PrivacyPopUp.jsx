import React from "react";
import Modal from "react-bootstrap/Modal";

const PrivacyPopUp = ({
  showPrivacyModal,
  setShowPrivacyModal,
  setShowPrivacyText,
  showPrivacyText,
}) => {
  return (
    <Modal
      show={showPrivacyModal}
      onHide={() => setShowPrivacyModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Privacy Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="small-font"
          dangerouslySetInnerHTML={{ __html: showPrivacyText }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default PrivacyPopUp;
