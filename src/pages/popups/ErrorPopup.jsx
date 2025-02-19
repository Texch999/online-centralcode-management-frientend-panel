import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { Images } from "../../images";
import { useEffect } from "react";

const ErrorPopup = ({ errorPopupOpen, setErrorPopupOpen, discription }) => {
  const handleCancel = () => {
    setErrorPopupOpen(false);
  };
  // useEffect(() => {
  //   console.log("Error error popup open");
  // });
  return (
    <Modal show={errorPopupOpen} centered className="confirm-popup">
      {console.log("Error error popup opened")}
      <Modal.Body>
        <div className="flex-end black-text4">
          <IoCloseSharp size={20} onClick={handleCancel} className="pointer" />
        </div>
        <center>
          <img
            src={Images?.error}
            alt="Error_Mark"
            style={{ width: "50px", height: "50px" }}
          />
          <h5 className="black-text4 fw-600 mt-3 mb-3">{discription}</h5>
          {/* <div className="small-font black-text4">
            Lorem Ipsum is simply dummy text of the printing...
          </div> */}
          <button
            className="w-50 black-text2 border p-2 saffron-btn rounded white-bg mt-4 mb-3 medium-font"
            onClick={handleCancel}
          >
            OK
          </button>
        </center>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorPopup;
