import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";

function SettledPopup({ setteledPopupOpen, setSettledPopupOpen }) {
  const handleCancel = () => {
    setSettledPopupOpen(false);
  };
  return (
    <Modal show={setteledPopupOpen} centered size="md">
      <Modal.Body>
        <div className="flex-between black-text4">
          <h6 className="fw-600 mb-0">Settled - Mishra - Dubai - Sports</h6>
          <IoCloseSharp size={20} onClick={handleCancel} />
        </div>
        <div className="row small-font mb-3">
          <div className="col-6 flex-column mt-3">
            <label className="mb-1 black-text4">Select Currency</label>
            <select className="input-bg rounded p-2 grey-font all-none">
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
          <div className="col-6 flex-column mt-3">
            <label className="mb-1 black-text4">Payment Mode</label>
            <input
              className="input-bg rounded p-2 grey-font all-none"
              type="text"
              placeholder="Enter"
            />
          </div>
          <div className="col-6 flex-column mt-3">
            <label className="mb-1 black-text4">Currency</label>
            <div className="input-bg rounded p-2 grey-font all-none">4000</div>
          </div>
          <div className="col-6 flex-column mt-3">
            <label className="mb-1 black-text4">Amount in INR</label>
            <div className="input-bg rounded p-2 grey-font all-none">
              40000000
            </div>
          </div>
          <div className="col-12 mt-3 d-flex align-items-end justify-content-end">
            <button className="w-100 saffron-btn2 small-font">Submit</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SettledPopup;
