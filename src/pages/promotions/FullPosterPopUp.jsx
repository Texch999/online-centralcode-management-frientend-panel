import React from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { Images } from "../../images";


const FullPosterPopUp = ({ fullPoster, setFullPoster }) => {
  return (
    <>
      <Modal show={fullPoster} size="lg" centered>
        <img
          src={Images.Poster2}
          alt="Full Poster"
          className="promotion-poster relative"
        />
        <IoClose  className="absolute close-icon white-bg m-2 br-5 pointer" size={18} onClick={()=>setFullPoster(false)}/>
      </Modal>
    </>
  );
};

export default FullPosterPopUp;
