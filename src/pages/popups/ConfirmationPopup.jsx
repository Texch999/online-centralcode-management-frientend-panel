import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { Images } from "../../images";
import { useState } from "react";
import SuccessPopup from "./SuccessPopup";
import {
  deletePromotionsImages,
  statusPromotionsTypes,
} from "../../api/apiMethods";
import { FaSpinner } from "react-icons/fa";

function ConfirmationPopup({
  confirmationPopupOpen,
  setConfirmationPopupOpen,
  discription,
  selectedId,
  submitButton,
  CallbackFunction
}) {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const BockOrUnblock = async () => {
    try {
      setLoading(true);
      let response;

      if (api === "BlockUnBlockPromotion") {
        response = await statusPromotionsTypes(selectedId);
      } else {
        response = await deletePromotionsImages(selectedId);
      }
      if (response?.status === "200") {
        setMessage(response?.message);
        setLoading(false);
        setSuccessPopupOpen(true);

        setTimeout(() => {
          getAction();
          setConfirmationPopupOpen(false);
        }, 100);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
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
                {loading ? <FaSpinner className="spinnerspinner-circle" /> : submitButton}
              </button>
            </div>
          </center>
        </Modal.Body>
      </Modal>

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={message}
      />
    </>
  );
}

export default ConfirmationPopup;
