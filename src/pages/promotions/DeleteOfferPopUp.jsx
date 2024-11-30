import React from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { MdOutlineFileUpload } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";
import { Images } from "../../images";

const DeleteOfferPopUp = ({ deleteOffer, setDeleteOffer }) => {
  return (
    <>
      <Modal
        show={deleteOffer}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div>
          <div className="d-flex w-100 flex-end">
            <IoClose
              className="pointer m-2" size={18}
              onClick={() => setDeleteOffer(false)}
            />
          </div>

          <div className="flex-center w-100 mt-4">
            <img src={Images.qnmark} alt="" />
          </div>
          <h6 className="text-center">Are You Sure to Delete this Offer</h6>
          <div className="flex-center small-font">
            Lorem Ipsum is simply dummy text of the printing..
          </div>

          <div className="d-flex w-100 medium-font flex-between mb-4 mt-4">
            <div className="white-btn2 w-50 pointer m-2 flex-center rounded">
              Cancel
            </div>
            <div className="saffron-btn w-50 m-2 pointer flex-center rounded">
              Delete
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteOfferPopUp;
