import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

const FullPosterPopUp = ({ fullPoster, setFullPoster, setFullPosterImage, fullPosterImage}) => {
  return (
    <>
      <Modal show={fullPoster} size="lg" centered>
        <img
          src={`http://localhost:9001/uploads/${fullPosterImage}`}
          alt="Full Poster"
          className="promotion-poster relative"
        />
        <IoCloseSharp  className="absolute close-icon white-bg m-2 br-5 pointer" size={18} onClick={()=>setFullPoster(false)}/>
      </Modal>
    </>
  );
};

export default FullPosterPopUp;
