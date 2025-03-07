import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaBackward, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { imgUrl } from "../../api/baseUrl";
import { FaForward } from "react-icons/fa6";

const FullPosterPopUp = ({ fullPoster, setFullPoster, fullPosterImage, path }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = Array.isArray(fullPosterImage) ? fullPosterImage : [fullPosterImage];

  useEffect(() => {
    setCurrentIndex(0);
  }, [fullPosterImage]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Modal
      show={fullPoster}
      centered
      size="lg"
      onHide={() => setFullPoster(false)}
    >
      <div className="position-relative d-flex align-items-center justify-content-center">
        {images.length > 1 && (
          <FaBackward 
            className="position-absolute m-1 start-0 br-5 cursor-pointer"
            size={24}
            onClick={handlePrev}
            style={{color: 'white', zIndex: 1,}}
          />
        )}
        <img
          src={`${imgUrl}/${path}/${images[currentIndex]}`}
          alt="Full Poster"
          className="promotion-poster"
          style={{ maxHeight: '80vh', maxWidth: '100%' }} // Adjust image size
        />
        {images.length > 1 && (
          <FaForward
            className="position-absolute m-1 end-0  br-5 cursor-pointer"
            size={24}
            onClick={handleNext}
            style={{ color: 'white',zIndex: 1 }}
          />
        )}
        <IoCloseSharp
          className="position-absolute close-icon white-bg top-0 end-0 m-2 br-5 cursor-pointer"
          size={18}
          onClick={() => setFullPoster(false)}
        />
      </div>
    </Modal>
  );
};

export default FullPosterPopUp;
