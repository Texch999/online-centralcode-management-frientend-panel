import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { Images } from "./../../images/index";

function DepositWithdrawPopup({
  depositWithdrawPopupOpen,
  setDepositWithdrawPopupOpen,
}) {
  const handleCancel = () => {
    setDepositWithdrawPopupOpen(false);
  };
  return (
    <Modal show={depositWithdrawPopupOpen} centered>
      <div className="d-flex justify-content-between black-text4 p-3">
        <div className="flex-column">
          <h6 className="fw-600 mb-0">Srinivas - (Share/Royalty: 10%)</h6>
          <div className="yellow-bg py-1 px-2 rounded small-font white-text w-fit">
            Director
          </div>
        </div>
        <div className="green-btn small-font h-fit">Deposit</div>
        <IoCloseSharp size={20} onClick={handleCancel} />
      </div>
      <hr className="m-0" />
      <div className="px-3 pb-3 pt-1">
        <div className="row small-font">
          <div className="col-6 mt-2">
            <div className="grey-box flex-between">
              <span>Tnr ID</span>
              <span>123454566789556</span>
            </div>
          </div>
          <div className="col-6 mt-2">
            <div className="grey-box flex-between">
              <span>Ref ID</span>
              <span>123454566789556</span>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="grey-box flex-between">
              <span>Currency</span>
              <span>USD</span>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="grey-box flex-between">
              <span>Cur Amt.</span>
              <span>1000</span>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="grey-box flex-between">
              <span>Amt INR</span>
              <span className="yellow-font">84000</span>
            </div>
          </div>
        </div>
        <div className="input-bg rounded small-font mt-2">
          <div className="flex-between p-2">
            <span>Payment Method</span>
            <span>UPI</span>
          </div>
          <hr className="m-0" />
          <div className="flex-between p-2">
            <span>From</span>
            <span>Srinivas-Director</span>
          </div>
          <hr className="m-0" />
          <div className="flex-between p-2">
            <span>To</span>
            <span>Owner</span>
          </div>
          <hr className="m-0" />
          <div className="flex-between p-2">
            <span>Date & Time</span>
            <span>07-10-2024 I 20:02:00</span>
          </div>
        </div>

        <div className="w-100 border mt-2">
          <img className="w-100 h-10vh" src={Images?.S7Logo} alt="" />
        </div>

        <div className="row small-font">
          <div className="col-6 mt-2">
            <div className="grey-box flex-between">
              <span>Sports Chips</span>
              <span>0</span>
            </div>
          </div>
          <div className="col-6 mt-2">
            <div className="grey-box flex-between">
              <span>Casino Chips</span>
              <span>0</span>
            </div>
          </div>
          <div className="col-12 mt-2">
            <div className="grey-box flex-between">
              <span>Sports & Casino Chips</span>
              <span className="yellow-font">840000</span>
            </div>
          </div>
          <div className="col-12 mt-2">
            <select className="w-100 grey-box">
              <option>Select Reject Reason</option>
              <option>No Amount</option>
            </select>
          </div>
          <div className="col-6 mt-3">
            <button className="w-100 saffron-btn2">Approved</button>
          </div>
          <div className="col-6 mt-3">
            <button className="w-100 white-btn3">Rejected</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DepositWithdrawPopup;
