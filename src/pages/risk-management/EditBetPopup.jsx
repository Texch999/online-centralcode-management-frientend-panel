import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";

function EditBetPopup({ editBetPopupOpen, setEditBetPopupOpen }) {
  const handleCancel = () => {
    setEditBetPopupOpen(false);
  };
  return (
    <Modal show={editBetPopupOpen} centered size="md">
      <Modal.Body>
        <div className="flex-between black-text4">
          <h6 className="fw-600 mb-0">Edit Bet</h6>
          <IoCloseSharp size={20} onClick={handleCancel} />
        </div>
        <div>
          <div className="row small-font mt-3">
            <div className="col-4 flex-column">
              <label className="mb-1 black-text4">User Name</label>
              <div className="input-bg rounded">
                <div className="p-2 yellow-font">Jayanta</div>
                <div className="p-2 grey-font border-top">ID: ABCD1234567</div>
              </div>
            </div>

            <div className="col-4 flex-column">
              <label className="mb-1 black-text4">
                Sport or Casino/Market ID
              </label>
              <div className="input-bg rounded">
                <div className="p-2 yellow-font">Cricket</div>
                <div className="p-2 grey-font border-top">
                  Market ID: 234567890033
                </div>
              </div>
            </div>

            <div className="col-4 flex-column">
              <label className="mb-1 black-text4">Website Name</label>
              <div className="input-bg rounded">
                <div className="p-2 grey-font">texchange.com</div>
              </div>
            </div>
          </div>

          <div className="row small-font mt-3">
            <div className="col-4 flex-column">
              <label className="mb-1 black-text4">Admin History</label>
              <div className="input-bg rounded">
                <div className="p-2 grey-font">Director - Srinivas</div>
                <div className="p-2 grey-font border-top">
                  Super Admin - Lokesh
                </div>
                <div className="p-2 grey-font border-top">Admin - Aman</div>
                <div className="p-2 grey-font border-top">
                  Sub Admin - Srikant
                </div>
                <div className="p-2 grey-font border-top">
                  Super Master - Ranjit
                </div>
                <div className="p-2 grey-font border-top">Master - Sudheer</div>
                <div className="p-2 yellow-font border-top">Agent- Sangram</div>
              </div>
            </div>

            <div className="col-4 flex-column">
              <label className="mb-1 black-text4">Series / Company Name</label>
              <div className="input-bg rounded">
                <div className="p-2 grey-font">
                  New Zealand vs South Africa Test Series
                </div>
                <div className="p-2 grey-font border-top">
                  ID: 1234567890233
                </div>
              </div>
              <label className="mb-1 black-text4 mt-4">Match / Game Name</label>
              <div className="input-bg rounded">
                <div className="p-2 grey-font">
                  Match: New Zealand vs South Africa
                </div>
                <div className="p-2 grey-font border-top">
                  ID: 1234567890233
                </div>
              </div>
            </div>

            <div className="col-4 flex-column">
              <label className="mb-1 black-text4">
                Bet Place / Table History
              </label>
              <div className="input-bg rounded">
                <div className="p-2 grey-font">Bet: New Zealand</div>
                <div className="p-2 grey-font border-top">
                  ID: 1234567890233
                </div>
                <div className="p-2 grey-font border-top">Type: Back</div>
                <div className="p-2 grey-font border-top">Odds: 1.09</div>
                <div className="p-2 grey-font border-top">Stake: 1000000</div>
                <div className="p-2 grey-font border-top">
                  27-09-2024, 15:11:00
                </div>
                <div className="p-2 grey-font border-top">Win/Loss: 9000</div>
              </div>
            </div>
          </div>

          <div className="row small-font mt-3">
            <div className="col-4 flex-column">
              <label className="mb-1 black-text4">Result</label>
              <div className="input-bg rounded p-2 grey-font">New Zealand</div>
            </div>

            <div className="col-4 flex-column">
              <label className="mb-1 black-text4">Bet Status</label>
              <select className="input-bg rounded p-2 grey-font all-none">
                <option>Select</option>
                <option>Win</option>
                <option>Loose</option>
              </select>
            </div>

            <div className="col-4 d-flex align-items-end justify-content-end">
              <div className="w-100 saffron-btn rounded">Save Changes</div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditBetPopup;
