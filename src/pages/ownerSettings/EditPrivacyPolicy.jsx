import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  getPrivacyPolicyById,
  updatePrivacyPolicyById,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";

const EditPrivacyPolicy = ({
  setEditPrivacyPolicyModal,
  editPrivacyPolicyModal,
  setPrivacyPolicyId,
  privacyPolicyId,
  getPolicyPrivacyData,
}) => {
  console.log("privacyPolicyId", privacyPolicyId);
  const [error, setError] = useState("");
  const [showPrivacyText, setShowPrivacyText] = useState();
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  console.log(showPrivacyText?.description, "showPrivacyText");

  const getPolicyPrivacyDataById = () => {
    getPrivacyPolicyById(privacyPolicyId)
      .then((response) => {
        console.log("ganaaaa========", response);
        setShowPrivacyText(response);
      })
      .catch((error) => {
        setError(error?.message);
        console.log("getPrivacyPolicy error", error);
      });
  };
  useEffect(() => {
    getPolicyPrivacyDataById();
  }, [privacyPolicyId]);

  const editPrivacyPolicy = () => {
    const payload = {
      description: showPrivacyText?.description,
    };
    updatePrivacyPolicyById(privacyPolicyId, payload)
      .then((response) => {
        console.log(response, "responseeee");
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 1000);
        setEditPrivacyPolicyModal(false);
        privacyPolicyId(null);
        setShowPrivacyText("");
        getPolicyPrivacyData();
      })
      .catch((error) => {
        console.log(error, "errorrrr");
      });
  };
  return (
    <div>
      <Modal
        show={editPrivacyPolicyModal}
        onHide={() => setEditPrivacyPolicyModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="small-font w-100 d-flex flex-column col-12">
            <textarea
              value={showPrivacyText?.description}
              onChange={(e) => setShowPrivacyText(e.target.value)}
              rows="30"
              className="py-2 px-2"
              placeholder="Enter Privacy Policy..."
            />
          </div>
          <div className="d-flex flex-end my-3">
            <div
              className="saffron-btn2 white-font py-2 px-4"
              onClick={editPrivacyPolicy}
            >
              Update
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={"Privacy Policy Created Successfully"}
      />
    </div>
  );
};

export default EditPrivacyPolicy;

// import React, { useEffect, useState } from "react";
// import {
//   Editor,
//   EditorState,
//   ContentState,
//   convertToRaw,
//   convertFromRaw,
// } from "draft-js";
// import "draft-js/dist/Draft.css"; // Default Draft.js styles
// import Modal from "react-bootstrap/Modal";
// import {
//   getPrivacyPolicyById,
//   updatePrivacyPolicyById,
// } from "../../api/apiMethods";

// const EditPrivacyPolicy = ({
//   setEditPrivacyPolicyModal,
//   editPrivacyPolicyModal,
//   privacyPolicyId,
// }) => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [error, setError] = useState("");

//   // Fetch Privacy Policy Data
//   const getPolicyPrivacyDataById = () => {
//     getPrivacyPolicyById(privacyPolicyId)
//       .then((response) => {
//         console.log("getPrivacyPolicy success", response);

//         const savedContent = response.data.description; // Get privacy policy text

//         if (savedContent) {
//           try {
//             // Try parsing as JSON (if previously saved in Draft.js format)
//             const contentState = convertFromRaw(JSON.parse(savedContent));
//             setEditorState(EditorState.createWithContent(contentState));
//           } catch (error) {
//             // If parsing fails, treat as plain text
//             setEditorState(
//               EditorState.createWithContent(
//                 ContentState.createFromText(savedContent)
//               )
//             );
//           }
//         }
//       })
//       .catch((error) => {
//         setError(error?.message);
//         console.log("getPrivacyPolicy error", error);
//       });
//   };

//   useEffect(() => {
//     getPolicyPrivacyDataById();
//   }, [privacyPolicyId]);

//   // Handle Save (Update API)
//   const editPrivacyPolicy = () => {
//     const contentState = editorState.getCurrentContent();
//     const rawContent = JSON.stringify(convertToRaw(contentState)); // Convert to JSON for API storage

//     const payload = {
//       description: rawContent, // Store as JSON string
//     };

//     updatePrivacyPolicyById(privacyPolicyId, payload)
//       .then((response) => {
//         console.log("Updated Privacy Policy:", response);
//         setEditPrivacyPolicyModal(false);
//       })
//       .catch((error) => {
//         console.log("Error updating policy:", error);
//       });
//   };

//   const handleClose = () => {
//     setEditPrivacyPolicyModal(false);
//   };

//   return (
//     <Modal
//       show={editPrivacyPolicyModal}
//       onHide={handleClose}
//       centered
//       size="lg"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Privacy Policy</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="small-font w-100 d-flex flex-column col-12">
//           {/* Draft.js Editor */}
//           <div className="border p-2" style={{ minHeight: "300px" }}>
//             <Editor editorState={editorState} onChange={setEditorState} />
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="d-flex justify-content-end my-3">
//           <button
//             className="saffron-btn2 white-font py-2 px-4"
//             onClick={editPrivacyPolicy}
//           >
//             Update
//           </button>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default EditPrivacyPolicy;
