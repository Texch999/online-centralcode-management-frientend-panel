import { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function CommSettlementPopup({
  openCommSettledPopup,
  setOpenCommSettledPopup,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleCancel = () => {
    setOpenCommSettledPopup(false);
  };

  return (
    <Modal
      show={openCommSettledPopup}
      centered
      size="md"
      className="black-text4"
    >
      <Modal.Body>
        <div className="flex-between black-text4">
          <h6 className="fw-600 mb-0">Comm Settlement</h6>
          <IoCloseSharp size={20} onClick={handleCancel} className="pointer" />
        </div>
        <div className="medium-font fw-600 mt-2">A - Lokesh</div>
        <div className="row small-font my-2">
          <div className="col-6">
            <div className="grey-box flex-between yellow-border">
              <span>Total Comm</span>
              <span>1000.00</span>
            </div>
          </div>
          <div className="col-6">
            <div className="grey-box flex-between yellow-border">
              <span>Settled Comm</span>
              <span>750.00</span>
            </div>
          </div>
          <div className="col-12 my-3">
            <div className="grey-box flex-between yellow-border">
              <span>Balance Comm</span>
              <span>250.00</span>
            </div>
          </div>
          <div className="col-6 flex-column">
            <label className="mb-1">Enter Settled Amount</label>
            <input className="grey-box" placeholder="Enter" />
          </div>
          <div className="col-6 flex-end">
            <button className="w-100 saffron-btn2">Full Settled</button>
          </div>
          <div className="col-12 flex-column my-3">
            <label className="black-text4 mb-1">Management Password</label>
            <div className="grey-box flex-between">
              <input
                className="all-none w-100 pe-1"
                placeholder="Enter Password"
              />
              {showPassword ? (
                <FaEye
                  className="black-text4"
                  size={18}
                  onClick={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaEyeSlash
                  className="black-text4"
                  size={18}
                  onClick={() => setShowPassword(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>
          <div className="col-12">
            <button className="w-100 saffron-btn2">Submit</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CommSettlementPopup;
