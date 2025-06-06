import React, { useEffect, useState } from "react";
import { Alert, Modal } from "react-bootstrap";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import {
  getAdminUserWebsitesList,
  getAdminUserWebsitesListProfile,
  suspendWebsiteProfile,
} from "../../api/apiMethods";
import SuccessPopup from "./../popups/SuccessPopup";

const UnblockBlockWebsiteModal = ({
  show,
  setShow,
  dwnlnId,
  adminWebsiteId,
  getWebMarketDtls,
  adminStatusId,
  dirId,
}) => {
  const [pswdVisible, setPswdVisible] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [userWebName, setUserWebName] = useState("");
  const [userWebId, setUserWebId] = useState(null);
  const [adminWebId, setAdminWebId] = useState(null);
  const [pswd, setPswd] = useState("");
  const [selectedWebsites, setSelectedWebsites] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [webList, setWebList] = useState([]);
  const [successModal, setSuccessModal] = useState(false);
  const [adminStatus, setAdminStatus] = useState(
    webList[0]?.adminPanDtls?.adminStatus
  );
  const [requireUserSelection, setRequireUserSelection] = useState(false);

  const handlePswd = () => {
    setPswdVisible((prev) => !prev);
  };

  const getAdminUserWebsites = () => {
    getAdminUserWebsitesListProfile(dirId, adminWebsiteId)
      .then((response) => {
        if (response?.status === true) {
          setWebList(response?.data);
          const initialSelectedWebsites = response?.data?.user_panels?.map(
            (item) => ({
              admin_panel_id: response?.data?.adminPanDtls?.id,
              user_panel_id: item?.user_paner_id,
              status: item?.status,
            })
          );
          setSelectedWebsites(initialSelectedWebsites || []);
          setOriginalUserStatuses(initialSelectedWebsites || []);
          setAdminStatus(response?.data?.adminPanDtls?.adminStatus);
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    if (dirId && adminWebsiteId) {
      getAdminUserWebsites();
    }
  }, [dirId, adminWebsiteId]);

  const handleBlockUserWebsite = (
    user_paner_id,
    admin_panel_id,
    currentStatus
  ) => {
    const newStatus = currentStatus === 1 ? 2 : 1;
    setSelectedWebsites((prev) => {
      const exists = prev.find((item) => item.user_panel_id === user_paner_id);
      if (exists) {
        return prev.map((item) =>
          item.user_panel_id === user_paner_id
            ? { ...item, status: newStatus }
            : item
        );
      } else {
        return [
          ...prev,
          {
            admin_panel_id,
            user_panel_id: user_paner_id,
            status: newStatus,
          },
        ];
      }
    });
  };
  // const handleBlockAdmin = (newStatus) => {
  //   const wasActive = adminStatus === 1;
  //   const willBeActive = newStatus === 1;
  //   setAdminStatus(newStatus);

  //   if (newStatus === 2) {
  //     const updatedUserWebsites = webList.user_panels?.map((item) => ({
  //       admin_panel_id: webList?.adminPanDtls?.id,
  //       user_panel_id: item?.user_paner_id,
  //       status: 2,
  //     }));
  //     setSelectedWebsites(updatedUserWebsites);
  //     setRequireUserSelection(false);
  //   } else {
  //     setRequireUserSelection(!wasActive && willBeActive);
  //   }
  // };

  const [originalUserStatuses, setOriginalUserStatuses] = useState([]);

  // const [originalUserStatuses, setOriginalUserStatuses] = useState([]);

  const handleBlockAdmin = (newStatus) => {
    const wasActive = adminStatus === 1;
    const willBeActive = newStatus === 1;

    if (newStatus === 2) {
      // When deactivating admin, save current statuses and set all user websites to inactive
      setOriginalUserStatuses(selectedWebsites);
      const updatedUserWebsites = webList.user_panels?.map((item) => ({
        admin_panel_id: webList?.adminPanDtls?.id,
        user_panel_id: item?.user_paner_id,
        status: 2, // Set all to inactive
      }));
      setSelectedWebsites(updatedUserWebsites);
      setRequireUserSelection(false);
    } else {
      // When reactivating admin, restore the original statuses
      setSelectedWebsites(originalUserStatuses);
      setRequireUserSelection(true);
    }

    setAdminStatus(newStatus);
  };

  // const handleBlockAdmin = (newStatus) => {
  //   const wasActive = adminStatus === 1;
  //   const willBeActive = newStatus === 1;

  //   if (newStatus === 2) {
  //     // When deactivating admin, save current statuses and set all user websites to inactive
  //     setOriginalUserStatuses(selectedWebsites);
  //     const updatedUserWebsites = webList.user_panels?.map((item) => ({
  //       admin_panel_id: webList?.adminPanDtls?.id,
  //       user_panel_id: item?.user_paner_id,
  //       status: 2, // Set all to inactive
  //     }));
  //     setSelectedWebsites(updatedUserWebsites);
  //     setRequireUserSelection(false);
  //   } else {
  //     // When reactivating admin, restore the original statuses
  //     setSelectedWebsites(originalUserStatuses);
  //     setRequireUserSelection(true);
  //   }

  //   setAdminStatus(newStatus);
  // };
  ///gangaa

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!pattern.test(password)) {
      return "Password must contain at least one lowercase, one uppercase, one number, and one special character";
    }
    return "";
  };

  const handleSubmit = () => {
    const passwordError = validatePassword(pswd);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (adminStatus === 1 && isAdminStatusChangingToActive()) {
      const hasActiveUserWebsite = selectedWebsites.some(
        (website) => website.status === 1
      );
      if (!hasActiveUserWebsite) {
        setError("Please select at least one user website to activate");
        return;
      }
    }

    setError("");
    setShowAlert(true);
  };

  const isAdminStatusChangingToActive = () => {
    return webList?.adminPanDtls?.adminStatus !== 1 && adminStatus === 1;
  };

  const blockUnblock = () => {
    setShowAlert(false);

    const payload = {
      parent_password: pswd,
      status: adminStatus,
      websites: selectedWebsites,
    };

    suspendWebsiteProfile(dirId, payload)
      .then((response) => {
        setMsg(response?.message);
        getWebMarketDtls();
        setShow(false);
        setSuccessModal(true);
        setPswd("");
        setTimeout(() => {
          setSuccessModal(false);
        }, 3000);
      })
      .catch((error) => {
        setError(error?.message);
        setPswd("");
      });
  };

  const userwebsites = webList?.user_panels?.map((item) => {
    const existingWebsite = selectedWebsites.find(
      (web) => web?.user_panel_id === item?.user_paner_id
    );
    const currentStatus =
      existingWebsite?.status !== undefined
        ? existingWebsite.status
        : item?.status;

    return {
      id: item.id,
      name: <div>{item.web_name}</div>,
      currentStatus,
      control: (
        <div className="form-check form-switch">
          <input
            className="form-check-input w-40"
            type="checkbox"
            role="switch"
            checked={currentStatus === 1}
            onChange={() =>
              handleBlockUserWebsite(
                item?.user_paner_id,
                webList?.adminPanDtls?.id,
                currentStatus
              )
            }
            disabled={adminStatus === 2}
            id={`switch-${item.user_paner_id}`}
          />
        </div>
      ),
    };
  });

  return (
    <div>
      <Modal centered size="md" show={show} onHide={setShow}>
        <div className="p-3">
          <div className="d-flex flex-between mb-3 large-font fw-700">
            <div>Block/Unblock Website</div>
            <div>
              <IoClose
                className="fw-700"
                size={23}
                onClick={() => {
                  setShow(false);
                  setPswd("");
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="medium-font my-1">Admin Website</div>
            <div className="input-bg flex-between br-5 my-1 p-2 align-items-center black-font small-font">
              {webList?.adminPanDtls && (
                <div className="black-font medium-font">
                  {webList?.adminPanDtls?.web_name}
                </div>
              )}
              <div className="d-flex gap-2 align-items-center">
                <div>
                  {adminStatus === 1 ? (
                    <div className="green-font">Active</div>
                  ) : (
                    <div className="red-font">In-Active</div>
                  )}
                </div>
                <div class="form-check form-switch">
                  <input
                    className="form-check-input w-40"
                    type="checkbox"
                    role="switch"
                    checked={adminStatus === 1}
                    onChange={() => handleBlockAdmin(adminStatus === 1 ? 2 : 1)}
                  />
                </div>
              </div>
            </div>
          </div>

          {requireUserSelection &&
            adminStatus === 1 &&
            isAdminStatusChangingToActive() && (
              <Alert>
                <div className="red-font font-11">
                  Please select at least one user website to activate
                </div>
              </Alert>
            )}

          <div className="medium-font my-1">User Website</div>
          <div className="d-flex flex-column">
            {userwebsites?.map((item) => (
              <div
                key={item.user_paner_id}
                className="input-bg flex-between br-5 my-1 p-2 align-items-center small-font"
              >
                <div className="black-font">{item.name}</div>
                <div>{item.control}</div>
              </div>
            ))}
          </div>
          <div className="medium-font my-1">Management Password</div>
          <div className="row small-font">
            <div className="col-6">
              <div className="input-bg d-flex br-5 py-2 px-2 flex-between ">
                <input
                  className="all-none"
                  type={pswdVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  value={pswd}
                  onChange={(e) => setPswd(e.target.value)}
                  maxLength={36}
                />
                {pswdVisible ? (
                  <IoEye
                    className="black-font"
                    size={15}
                    onClick={handlePswd}
                  />
                ) : (
                  <IoEyeOff
                    className="black-font"
                    size={15}
                    onClick={handlePswd}
                  />
                )}
              </div>
            </div>

            <div className="col-6">
              <div className="saffron-btn2 pointer" onClick={handleSubmit}>
                Submit
              </div>
            </div>
            <div className="py-1">
              {error && <div className="red-font font-11 mt-1">{error}</div>}
            </div>
          </div>
          {showAlert && (
            <Alert variant="warning" className="mt-3 mb-2">
              <div className="d-flex medium-font flex-column flex-center align-items-center">
                {adminStatus === 2
                  ? `Are you sure you want to In-Active this admin website? Once you Inactive admin website all user websites are inactivated`
                  : selectedWebsites.some((website) => website.status === 2)
                    ? `Are you sure you want to In-Active the selected user website?`
                    : `Are you sure you want to Active the selected user websites?`}
                <div className="mt-2 d-flex gap-3 align-items-center pointer">
                  <div
                    className="white-btn br-5"
                    onClick={() => setShowAlert(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className="saffron-bg br-5 white-font px-3 py-2"
                    onClick={blockUnblock}
                  >
                    Yes
                  </div>
                </div>
              </div>
            </Alert>
          )}
          {/* {showAlert && (
            <Alert variant="warning" className="mt-3 mb-2">
              <div className="d-flex medium-font flex-column flex-center align-items-center">
                {`Are you sure you want to ${
                  adminStatus === 1 ? "Active" : "In-Active"
                } these selected websites?`}
                <div className="mt-2 d-flex gap-3 align-items-center">
                  <div
                    className="white-btn br-5"
                    onClick={() => setShowAlert(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className="saffron-bg br-5 white-font px-3 py-2"
                    onClick={blockUnblock}
                  >
                    Yes
                  </div>
                </div>
              </div>
            </Alert>
          )} */}
        </div>
      </Modal>
      <SuccessPopup
        successPopupOpen={successModal}
        setSuccessPopupOpen={setSuccessModal}
        discription={msg}
      />
    </div>
  );
};

export default UnblockBlockWebsiteModal;
