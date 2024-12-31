import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

function SettledPopup({ setteledPopupOpen, setSettledPopupOpen }) {
  const handleCancel = () => {
    setSettledPopupOpen(false);
  };

  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

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
            <Select
              className="small-font"
              options={selectOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
            />
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
