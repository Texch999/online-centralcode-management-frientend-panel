import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { RiUploadCloud2Line } from "react-icons/ri";

function EditProfilePopup({ editProfilePopup, setEditProfilePopup }) {
  const handleCancel = () => {
    setEditProfilePopup(false);
  };
  return (
    <Modal show={editProfilePopup} centered size="lg">
      <Modal.Body>
        <div className="flex-between black-text4 ">
          <h6 className="fw-600 mb-0">Edit Profile</h6>
          <IoCloseSharp size={20} onClick={handleCancel} className="pointer"/>
        </div>
        <div className="row small-font mt-3">
          <div className="col-4 flex-column">
            <label className="black-text4 mb-1">Name</label>
            <input className="grey-box" placeholder="Enter" />
          </div>
          <div className="col-4 flex-column">
            <label className="black-text4 mb-1">Phone Number</label>
            <input className="grey-box" placeholder="Enter" />
          </div>
          <div className="col-4 flex-column">
            <label className="black-text4 mb-1">Upload Profile Photo</label>
            <label
              className="grey-box flex-between"
              htmlFor="upload_profile_photo"
            >
              <span>Upload</span>
              <RiUploadCloud2Line className="black-text4" size={18} />
              <input
                id="upload_profile_photo"
                type="file"
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
        <div className="row small-font mt-4 mb-3 flex-end">
          <div className="col-4">
            <button className="w-100 saffron-btn2">Submit</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditProfilePopup;
