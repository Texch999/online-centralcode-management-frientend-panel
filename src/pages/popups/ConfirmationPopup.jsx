import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { Images } from "../../images";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import SuccessPopup from "./SuccessPopup";

function ConfirmationPopup({
  confirmationPopupOpen,
  setConfirmationPopupOpen,
  discription,
  submitButton,
  onSubmit,
  blockLoader,
}) {
  const itemsPerPage = 4;
  const [searchParams, setSearchParams] = useSearchParams();
  const intialpage = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(intialpage);
  const page = currentPage;
  const pageSize = itemsPerPage;
  const handleCancel = () => {
    setConfirmationPopupOpen(false);
  };

  const handleSunmit = async () => {
    onSubmit(page, pageSize);
    setConfirmationPopupOpen(false);
  };

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
              src={Images?.question2}
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
                onClick={() => handleSunmit()}
                disabled={blockLoader === true ? true : false}
              >
                <div className="d-flex flex-center">
                {blockLoader === true ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
                <div className="ms-2"> {submitButton}</div>
                </div>
               
              </button>
            </div>
          </center>
        </Modal.Body>
      </Modal>
      
    </>
  );
}

export default ConfirmationPopup;
