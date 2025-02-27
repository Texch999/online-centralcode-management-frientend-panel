// import React, { useEffect, useRef, useState } from "react";
// import { Modal } from "react-bootstrap";
// import { IoCloseSharp } from "react-icons/io5";
// import {
//   addWebsiteToPrivacyPolicy,
//   getAvailableWebsites,
//   getWebsites,
// } from "../../api/apiMethods";
// import SuccessPopup from "../popups/SuccessPopup";
// import ErrorPopup from "../popups/ErrorPopup";

// const SelectWebsitePopUp = ({
//   selectWebsite,
//   setSelectWebsite,
//   setAvailablePrivacyWebsiteId,
//   availablePrivacyWebsiteId,
//   getPolicyPrivacyData,
// }) => {
//   console.log(availablePrivacyWebsiteId, "availablePrivacyWebsiteId");
//   const [websites, setWebsites] = useState([]);
//   const [error, setError] = useState("");
//   const [successPopupOpen, setSuccessPopupOpen] = useState(false);
//   const [errorPopup, setErrorPopup] = useState(false);
//   const dataFetched = useRef(false);
//   const handleCheckboxChange = (id) => {
//     console.log(id, "checked web id");
//     setWebsites((prevWebsites) =>
//       prevWebsites.map((site) =>
//         site.id === id ? { ...site, selected: !site.selected } : site
//       )
//     );
//   };

//   const availableWebsites = () => {
//     // if (!availablePrivacyWebsiteId) return;
//     getAvailableWebsites(availablePrivacyWebsiteId)
//       .then((response) => {
//         if (response.status === true) {
//           setWebsites(response?.data);
//         } else {
//           setError("Something Went Wrong");
//         }
//       })
//       .catch((error) => {
//         setError(error.message);
//         setErrorPopup(true);
//         setTimeout(() => {
//           setErrorPopup(false);
//         }, 1500);
//       });
//   };
//   useEffect(() => {
//     if (availablePrivacyWebsiteId) {
//       availableWebsites();
//     }
//   }, [availablePrivacyWebsiteId]);

//   const selectedWebsiteNames = websites
//     .filter((site) => site.selected)
//     .map((site) => site.web_name);
//   console.log(selectedWebsiteNames);

//   const addMultipleWebsitesToPrivacyPolicy = () => {
//     const selectedWebsiteIds = websites
//       .filter((site) => site.selected)
//       .map((site) => site.id);

//     console.log("Checked Website IDs:", selectedWebsiteIds);

//     // if (selectedWebsiteIds.length === 0) {
//     //   console.log("No websites selected!");
//     //   return;
//     // }
//     const payload = {
//       websites: selectedWebsiteIds,
//     };
//     addWebsiteToPrivacyPolicy(availablePrivacyWebsiteId, payload)
//       .then((response) => {
//         console.log(
//           "response from addMultipleWebsitesToPrivacyPolicy",
//           response
//         );
//         if (response.status === true) {
//           setWebsites((prevWebsites) =>
//             prevWebsites.map((site) => ({
//               ...site,
//               selected: selectedWebsiteIds.includes(site.id),
//             }))
//           );
//           setSelectWebsite(false);
//           getPolicyPrivacyData();
//           setSuccessPopupOpen(true);
//           setTimeout(() => {
//             setSuccessPopupOpen(false);
//           }, 1500);
//         } else {
//           setError("Something went wrong");
//         }
//       })

//       .catch((error) => {
//         setError(error?.message);
//         setSelectWebsite(false);
//         setErrorPopup(true);
//         setSelectWebsite(false);
//         setTimeout(() => {
//           setErrorPopup(false);
//         }, 2000);
//         console.log("error in addMultipleWebsitesToPrivacyPolicy", error);
//       });
//   };

//   return (
//     <div>
//       <Modal
//         show={selectWebsite}
//         onHide={() => setSelectWebsite(false)}
//         centered
//       >
//         <div className="p-2">
//           <div className="d-flex flex-between text-black px-2 my-2">
//             <div className="medium-font">Select Website</div>
//             <div onClick={() => setSelectWebsite(false)} className="font-20">
//               <IoCloseSharp />
//             </div>
//           </div>
//           <div className="d-flex w-100 flex-column small-font">
//             <div className="d-flex w-100 flex-wrap ">
//               {websites.map((website) => (
//                 <div key={website.id} className="my-2">
//                   <div className="input-css d-flex flex-between small-font mx-2">
//                     <input
//                       type="checkbox"
//                       checked={website?.selected}
//                       className="mx-2"
//                       onChange={() => handleCheckboxChange(website?.id)}
//                     />
//                     {website.web_name}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div
//               className="saffron-btn2 br-5 mx-2 pointer"
//               onClick={addMultipleWebsitesToPrivacyPolicy}
//             >
//               Add Website
//             </div>
//           </div>
//         </div>
//       </Modal>

//       <SuccessPopup
//         successPopupOpen={successPopupOpen}
//         setSuccessPopupOpen={setSuccessPopupOpen}
//         discription={`${selectedWebsiteNames} are now included in the Privacy Policy`}
//       />

//       <ErrorPopup
//         discription={error}
//         errorPopupOpen={errorPopup}
//         setErrorPopupOpen={setErrorPopup}
//       />
//     </div>
//   );
// };

// export default SelectWebsitePopUp;

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import {
  addWebsiteToPrivacyPolicy,
  getAvailableWebsites,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "../popups/ErrorPopup";

const SelectWebsitePopUp = ({
  selectWebsite,
  setSelectWebsite,
  availablePrivacyWebsiteId,
  getPolicyPrivacyData,
}) => {
  const [websites, setWebsites] = useState([]);
  const [error, setError] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [allUnchecked, setAllUnchecked] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);

  const availableWebsites = () => {
    getAvailableWebsites(availablePrivacyWebsiteId)
      .then((response) => {
        if (response.status === true) {
          setWebsites(response?.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error.message);
        setErrorPopup(true);
        setTimeout(() => setErrorPopup(false), 1500);
      });
  };

  useEffect(() => {
    if (availablePrivacyWebsiteId) {
      availableWebsites();
    }
  }, [availablePrivacyWebsiteId]);

  const handleCheckboxChange = (id) => {
    setWebsites((prevWebsites) => {
      const updatedWebsites = prevWebsites.map((site) =>
        site.id === id ? { ...site, selected: !site.selected } : site
      );

      const allDeselected = updatedWebsites.every((site) => !site.selected);
      setAllUnchecked(allDeselected);

      return updatedWebsites;
    });

    setUserConfirmed(false);
  };

  const selectedWebsiteNames = websites
    .filter((site) => site.selected)
    .map((site) => site.web_name);

  const addMultipleWebsitesToPrivacyPolicy = () => {
    if (allUnchecked && !userConfirmed) {
      setError("All websites are unchecked. Confirm before proceeding.");
      setErrorPopup(true);
      return;
    }

    const selectedWebsiteIds = websites
      .filter((site) => site.selected)
      .map((site) => site.id);

    const payload = {
      websites: selectedWebsiteIds,
    };

    addWebsiteToPrivacyPolicy(availablePrivacyWebsiteId, payload)
      .then((response) => {
        if (response.status === true) {
          setWebsites((prevWebsites) =>
            prevWebsites.map((site) => ({
              ...site,
              selected: selectedWebsiteIds.includes(site.id),
            }))
          );
          setSelectWebsite(false);
          getPolicyPrivacyData();
          setSuccessPopupOpen(true);
          setTimeout(() => setSuccessPopupOpen(false), 1500);
        } else {
          setError("Something went wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
        setSelectWebsite(false);
        setWebsites([]);
        setErrorPopup(true);
        setTimeout(() => setErrorPopup(false), 2000);
      });
  };

  return (
    <div>
      <Modal
        show={selectWebsite}
        onHide={() => setSelectWebsite(false)}
        centered
      >
        <div className="p-2">
          <div className="d-flex flex-between text-black px-2 my-2">
            <div className="medium-font">Select Website</div>
            <div onClick={() => setSelectWebsite(false)} className="font-20">
              <IoCloseSharp />
            </div>
          </div>
          <div className="d-flex w-100 flex-column small-font">
            <div className="d-flex w-100 flex-wrap ">
              {websites.map((website) => (
                <div key={website.id} className="my-2">
                  <div className="input-css d-flex flex-between small-font mx-2">
                    <input
                      type="checkbox"
                      checked={website?.selected}
                      className="mx-2"
                      onChange={() => handleCheckboxChange(website?.id)}
                    />
                    {website.web_name}
                  </div>
                </div>
              ))}
            </div>

            {allUnchecked && (
              <div className="alert alert-warning mx-2">
                <p>
                  All websites are unselected. This privacy policy will be
                  removed.
                </p>
                <button
                  className="saffron-btn2"
                  onClick={() => setUserConfirmed(true)}
                >
                  Confirm
                </button>
              </div>
            )}
            <div
              className={`saffron-btn2 br-5 mx-2 pointer ${
                allUnchecked && !userConfirmed ? "disabled" : ""
              }`}
              onClick={addMultipleWebsitesToPrivacyPolicy}
              style={{ opacity: allUnchecked && !userConfirmed ? 0.5 : 1 }}
            >
              Add Website
            </div>
          </div>
        </div>
      </Modal>

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={`${
          selectedWebsiteNames.length > 0
            ? `${selectedWebsiteNames} are now included in the Privacy Policy`
            : "Privacy Policy has been removed."
        }`}
      />

      <ErrorPopup
        discription={error}
        errorPopupOpen={errorPopup}
        setErrorPopupOpen={setErrorPopup}
      />
    </div>
  );
};

export default SelectWebsitePopUp;
