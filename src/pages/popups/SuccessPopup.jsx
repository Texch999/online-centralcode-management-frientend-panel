import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { Images } from "../../images";

const SuccessPopup = ({
  successPopupOpen,
  setSuccessPopupOpen,
  discription,
  loader,
}) => {
  const handleCancel = () => {
    setSuccessPopupOpen(false);
  };
  return (
    <Modal show={successPopupOpen} centered className="confirm-popup">
      <Modal.Body>
        <div className="flex-end black-text4">
          <IoCloseSharp size={20} onClick={handleCancel} className="pointer" />
        </div>
        <center>
          <img src={Images?.check} alt="Check_Mark" />
          <div className="black-text4 fw-600 mt-2 mb-3 medium-font d-flex flex-center flex-wrap">
            {discription}
          </div>

          <button
            className="w-50 black-text2 border p-2 rounded white-bg mt-4 mb-3 medium-font"
            onClick={handleCancel}
            disabled={loader === true ? true : false}
          >
            OK
          </button>
        </center>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessPopup;
