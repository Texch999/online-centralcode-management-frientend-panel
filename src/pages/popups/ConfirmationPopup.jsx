import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { Images } from "../../images";
import { useState } from "react";
=========
import { blockEmploye } from "../../api/apiMethods";
import { useEffect } from "react";

function ConfirmationPopup({
  confirmationPopupOpen,
  setConfirmationPopupOpen,
  discription,
  submitButton,
<<<<<<<<< Temporary merge branch 1
  CallbackFunction
}) {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [message, setMessage] = useState("");

  const BockOrUnblock = async () => {
    try {
      let response;

      if (api === "BlockUnBlockPromotion") {
        response = await statusPromotionsTypes(selectedId);
      } else {
        response = await deletePromotionsImages(selectedId);
      }
      console.log("response kwd gvljenvojenvvojwrg", response);
      if (response?.status === "200") {
        console.log("hiyhb");
        setMessage(response?.message);
        setSuccessPopupOpen(true);

        setTimeout(() => {
          getAction();
          setConfirmationPopupOpen(false);
        }, 100);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    setConfirmationPopupOpen(false);
  };
  const handleBlockAndUnblock = () => {
    CallbackFunction()
  }
  return (
    <>
      <Modal
        show={confirmationPopupOpen}
        centered
        className="confirm-popup"
        size="md"
      >
        <Modal.Body>
          <div className="flex-end black-text4">
            <IoCloseSharp
              size={20}
              onClick={handleCancel}
              className="pointer"
            />
          </div>
          <center>
            <img
              src={Images?.qnmark}
              alt="Q_Mark"
              style={{ height: "90px", width: "90px" }}
            />
            <h5 className="black-text4 fw-600 medium-font mt-2 mb-3">
              {discription}
            </h5>
            <div className="w-95 flex-between mt-4 mb-3 medium-font">
              <button
                className="w-50 black-text2 border p-2 rounded white-bg me-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="w-50 saffron-btn2 ms-2"
                onClick={BockOrUnblock}
              >
                {submitButton}
              </button>
            </div>
          </center>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmationPopup;
