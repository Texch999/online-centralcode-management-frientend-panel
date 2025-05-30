// import React, { useState, useEffect } from "react";
// import { Modal } from "react-bootstrap";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import { MdOutlineClose } from "react-icons/md";
// import { updateDirectorProfileDetails } from "../../../api/apiMethods";
// import SuccessPopup from "../../popups/SuccessPopup";
// import ErrorPopup from "../../popups/ErrorPopup";

// const EditProfilePopup = ({ show, onHide, data, reload }) => {
//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [description, setDesciption] = useState("");
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false)

//   // Populate form when data changes
//   useEffect(() => {
//     if (data) {
//       console.log("Editing data:", data); // Debug log
//       setName(data.name || "");
//       setPhoneNumber(data.phone_no || "");
//       setProfilePhoto(null); // Reset file input
//     }
//   }, [data]);

//   // Handle profile photo change
//   const handleProfilePhotoChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file, 987968765465)
//     if (file) {
//       setProfilePhoto(file);
//     }
//   };

//   // Submit form
//   const handleSubmit = async () => {

//     if (!name || !phoneNumber) {
//       alert("Please fill in all fields before submitting.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("phone_no", phoneNumber);
//     if (profilePhoto) {
//       formData.append("photo", profilePhoto);
//     }

//     try {
//       console.log(data.id, formData)
//       const response = await updateDirectorProfileDetails(data.id, formData);
//       setDesciption(response.message)
//       setShowSuccessPopup(true);
//       onHide(); // Close modal after success
//     } catch (error) {
//       console.log(formData)
//       setDesciption("Failed to update profile: " + (error.message || "Unknown error"))
//       setErrorPopupOpen(true)
//       onHide();
//     }
//   };

//   return (
//     <>
//       <Modal centered show={show} onHide={onHide} size="md">
//         <Modal.Body className="p-3">
//           <div className="d-flex justify-content-between align-items-center mb-2">
//             <h5 className="small-font fw-600">Edit Profile</h5>
//             <MdOutlineClose size={22} onClick={onHide} className="pointer" />
//           </div>

//           <div className="row d-flex mb-3">
//             {/* Name Field */}
//             <div className="col-4">
//               <label htmlFor="name" className="small-font fw-400 mb-1">Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 className="all-none rounded input-css w-100 small-font"
//                 placeholder="Enter"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             {/* Phone Number Field */}
//             <div className="col-4">
//               <label htmlFor="phoneNumber" className="small-font fw-400 mb-1">Phone Number</label>
//               <input
//                 id="phoneNumber"
//                 type="text"
//                 className="all-none rounded input-css w-100 small-font"
//                 placeholder="Enter"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//             </div>

//             {/* Profile Photo Upload Field */}
//             <div className="col-4">
//               <label htmlFor="profilePhoto" className="small-font fw-400 mb-1">Upload Profile Photo</label>
//               <div className="input-group">
//                 <input
//                   id="profilePhoto"
//                   type="file"
//                   className="form-control all-none"
//                   onChange={handleProfilePhotoChange}
//                   style={{ display: "none" }}
//                 />
//                 <label
//                   htmlFor="profilePhoto"
//                   className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
//                 >
//                   <span className="small-font">Upload</span>
//                   <AiOutlineCloudUpload size={20} />
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="row d-flex align-items-center justify-content-end m-0 p-0">
//               <div className="col-4 pointer mt-3">
//                 <button
//                   type="button"
//                   className="saffron-btn2 rounded w-100 small-font"
//                   onClick={handleSubmit}
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>

//         </Modal.Body>

//       </Modal>
//       <SuccessPopup
//         successPopupOpen={showSuccessPopup}
//         // onHide={() => setShowSuccessPopup(false)}
//         setSuccessPopupOpen={() => setShowSuccessPopup(false)}
//         discription={description}
//       />
//       <ErrorPopup
//       errorPopupOpen={errorPopupOpen}
//       setErrorPopupOpen={setErrorPopupOpen}
//        discription= {description}
//        />
//     </>
//   );

// };

// export default EditProfilePopup;

import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { updateDirectorProfileDetails } from "../../../api/apiMethods";
import SuccessPopup from "../../popups/SuccessPopup";
import ErrorPopup from "../../popups/ErrorPopup";
import { useSelector } from "react-redux";
import ErrorComponent from "../../../components/ErrorComponent";

const EditProfilePopup = ({ show, onHide, data, reload, getById }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [description, setDesciption] = useState("");
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [error, setError] = useState("");

  const dirProfileData = useSelector((item) => item?.dirProfileData);

  // Validation error states
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [profileImg, setProfileImg] = useState(null);


  const handleClose=()=>{
    onHide(false)
    setError("")
  }
  // Populate form when data changes
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setPhoneNumber(data.phone_no || "");
      setProfilePhoto(null); // Reset file input
    }
  }, [data]);

  // Handle profile photo change
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setProfileImg(file?.name);
    }
  };

  // Validate Name
  const validateName = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setNameError("Name must be at least 2 characters long.");
      return false;
    } else {
      setNameError(""); // Clear error if valid
      return true;
    }
  };

  // Validate Phone Number
  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^[0-9]{10}$/;
    if (!phoneNumber || !phonePattern.test(phoneNumber)) {
      setPhoneNumberError("Phone number must be a 10-digit number.");
      return false;
    } else {
      setPhoneNumberError(""); // Clear error if valid
      return true;
    }
  };

  // Handle Name Change
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setName(value.trimStart());
    validateName(value);
  };

  // Handle Phone Number Change
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  // Submit form
  const handleSubmit = async () => {
    setError("")
    if (!validateName(name)) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone_no", phoneNumber);
    if (profilePhoto) {
      formData.append("photo", profilePhoto);
    }

    try {
      const response = await updateDirectorProfileDetails(data.id, formData);
      setDesciption(response.message);
      setShowSuccessPopup(true);
      onHide();

      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      getById();
      setNameError("");
      setPhoneNumberError("");
    } catch (error) { 
      setError(error?.message);
      // getById();
      setNameError("");
      setPhoneNumberError("");

      // setErrorPopupOpen(true);
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose} size="md">
        <Modal.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="small-font fw-600">Edit Profile</h5>
            <MdOutlineClose size={22} onClick={handleClose} className="pointer" />
          </div>

          {error?.length > 0 && <ErrorComponent error={error} />}

          <div className="row d-flex mb-3">
            {/* Name Field */}
            <div className="col-4">
              <label htmlFor="name" className="small-font fw-400 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="all-none rounded input-css w-100 small-font"
                placeholder="Enter"
                value={name}
                onChange={handleNameChange}
              />
              {nameError && (
                <div className="text-danger small-font">{nameError}</div>
              )}{" "}
              {/* Show name error */}
            </div>

            {/* Phone Number Field */}
            <div className="col-4">
              <label htmlFor="phoneNumber" className="small-font fw-400 mb-1">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                className="all-none rounded input-css w-100 small-font"
                placeholder="Enter"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                maxLength={15}
              />
              {phoneNumberError && (
                <div className="text-danger small-font">{phoneNumberError}</div>
              )}{" "}
              {/* Show phone number error */}
            </div>

            {/* Profile Photo Upload Field */}
            <div className="col-4">
              <label htmlFor="profilePhoto" className="small-font fw-400 mb-1">
                Upload Profile Photo
              </label>
              <div className="input-group">
                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  className="form-control all-none"
                  onChange={handleProfilePhotoChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="profilePhoto"
                  className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
                >
                  <span className="small-font text-ellipsis">{`${
                    profilePhoto ? profileImg : "Upload"
                  }`}</span>
                  <AiOutlineCloudUpload size={20} />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="row d-flex align-items-center justify-content-end m-0 p-0">
              <div className="col-4 pointer mt-3">
                <button
                  type="button"
                  className="saffron-btn2 rounded w-100 small-font"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
            {/* {error && <div className="red-font">{error}</div>} */}
          </div>
        </Modal.Body>
      </Modal>
      <SuccessPopup
        successPopupOpen={showSuccessPopup}
        setSuccessPopupOpen={() => setShowSuccessPopup(false)}
        discription={description}
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={description}
      />
    </>
  );
};

export default EditProfilePopup;
