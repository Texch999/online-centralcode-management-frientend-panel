import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaBackward, FaForward } from "react-icons/fa6";
import Modal from "react-bootstrap/Modal";
import { imgUrl } from "../../api/baseUrl";

const FullPosterPopUp = ({
  fullPoster,
  setFullPoster,
  fullPosterImage,
  path,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = Array.isArray(fullPosterImage)
    ? fullPosterImage
    : [fullPosterImage];

  useEffect(() => {
    setCurrentIndex(0);
  }, [fullPosterImage]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const currentMedia = images[currentIndex] || ""; // Ensure it's a string
  const isVideo =
    typeof currentMedia === "string" &&
    (currentMedia.endsWith(".mp4") ||
      currentMedia.endsWith(".mov") ||
      currentMedia.endsWith(".avi") ||
      currentMedia.endsWith(".mkv") ||
      currentMedia.endsWith(".webm"));

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
            style={{ color: "white", zIndex: 1 }}
          />
        )}

        {/* Render Video or Image based on the file type */}
        {isVideo ? (
          <video
            src={`${imgUrl}/${path}/${currentMedia}`}
            controls
            autoPlay
            style={{ maxHeight: "80vh", maxWidth: "100%" }}
          />
        ) : (
          <img
            src={`${imgUrl}/${path}/${currentMedia}`}
            alt="Full Poster"
            className="promotion-poster"
            style={{ maxHeight: "80vh", maxWidth: "100%" }}
          />
        )}

        {images.length > 1 && (
          <FaForward
            className="position-absolute m-1 end-0 br-5 cursor-pointer"
            size={24}
            onClick={handleNext}
            style={{ color: "white", zIndex: 1 }}
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
