import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  addSportsControl,
  gameControlById,
  getSportsList,
} from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorComponent from "../../components/ErrorComponent";
import { IoEye } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Spinner } from "react-bootstrap";

const AddSportsControl = () => {
  const navigate = useNavigate();
  const params = useParams();
  const buttons = ["Sports", "Casino"];
  const [active, setActive] = useState(0);
  const handleActive = (index) => {
    setActive(index);
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const id = params?.id;
  const websiteId = id.slice(3, -3);

  const [selectedSports, setSelectedSports] = useState([]);
  const [msg, setMsg] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [pswd, setPswd] = useState("");
  const [selectedSportsData, setSelectedSportsData] = useState([]);
  const [formError, setFormError] = useState("");
  const [pswdError, setPswdError] = useState("");

  const handleToggleSport = (id) => {
    setSelectedSports((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePassword = (value) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,36}$/;
    if (!pattern.test(value)) {
      setPswdError(
        "Password must be 6-36 characters with uppercase, lowercase, number, and special character."
      );
    } else {
      setPswdError("");
    }
    setPswd(value);
  };

  const getSports = () => {
    setLoading(true);
    getSportsList()
      .then((response) => {
        if (response) {
          setLoading(false);

          setSportsData(response?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };
  useEffect(() => {
    getSports();
  }, []);

  const getSelectedSports = () => {
    setLoading(true);
    gameControlById(websiteId)
      .then((response) => {
        if (response) {
          setLoading(false);
          const selectedIds = response.data.map((sport) => sport.id);
          setSelectedSportsData(response.data);
          setSelectedSports(selectedIds);
        }
      })
      .catch((error) => {
        setLoading(false);
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };
  useEffect(() => {
    getSelectedSports();
  }, []);

  const handleSubmit = () => {
    if (selectedSports.length === 0) {
      setFormError("Please select at least one sport.");
      return;
    }
    if (!pswd) {
      setFormError("Management Password is required");
      return;
    }
    setFormError("");
    const payload = {
      websiteId: websiteId,
      sports: selectedSports,
      parentPassword: pswd,
    };
    setIsLoading(true);

    addSportsControl(payload)
      .then((response) => {
        if (response?.status === true) {
          setIsLoading(false);
          setMsg(response?.message);
          setSuccessPopupOpen(true);
          setTimeout(() => {
            setSuccessPopupOpen(false);
            navigate("/websites");
          }, 3000);
          setError("");
          setPswdError("");
          setPswd("");
          setFormError("");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };

  return (
    <div>
      <div className="yellow-font align-items-center d-flex flex-between">
        <div className="fw-600 capitalize-text">{params?.website}</div>

        <span
          className="input-css2 rounded-pill me-1 px-2 text-black py-1 flex-center pointer hover-orange-clr small-font"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-1 d-flex" />
          Back
        </span>
      </div>
      <div className="my-3">
        <div className="d-flex gap-3">
          {buttons?.map((item, index) => (
            <div
              key={index}
              className={`br-5 pointer small-font ${
                active === index
                  ? "saffron-btn white-font"
                  : "white-btn  black-font"
              }`}
              onClick={() => handleActive(index)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {error && <ErrorComponent error={error} />}

      {loading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>
      ) : (
        <div>
          <div className="yellow-bg py-1 white-font fw-600 rounded-top px-2 medium-font">{`${
            active === 0 ? "Sports" : "Casino"
          } Type`}</div>
          {sportsData.length > 0 && active === 0 ? (
            <div className="white-btn rounded-bottom flex-wrap p-2 gap-2">
              {sportsData?.map((item, index) => (
                <div
                  key={index}
                  className="light-bg d-flex gap-2 medium-font black-font p-2 align-items-center br-5"
                >
                  <div className="small-font">{item?.name}</div>
                  <input
                    type="checkbox"
                    id="Games"
                    className="me-2"
                    checked={selectedSports.includes(item?.id)}
                    onChange={() => handleToggleSport(item?.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="white-btn rounded-bottom  small-font flex-wrap p-2 gap-2">
              No Casino Games are not available
            </div>
          )}
          <div className="my-4 row align-items-end">
            <div className="col-6">
              <div className="small-font mb-1">Management Password:</div>
              <div className="input-bg br-5 py-1 px-2 d-flex justify-content-between align-items-center border-grey3">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="all-none small-font w-100 me-2"
                  placeholder="Enter Password"
                  value={pswd}
                  maxLength={36}
                  onChange={(e) => validatePassword(e.target.value)}
                />
                <span
                  onClick={handlePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {passwordVisible ? (
                    <FiEye size={12} />
                  ) : (
                    <FiEyeOff size={12} />
                  )}
                </span>
              </div>
              {pswdError && (
                <div className="small-font red-font mt-1">{pswdError}</div>
              )}
            </div>

            <div className="col-6">
              <div className="">
                <div
                  className={`saffron-bg py-2 px-3 white-font text-center rounded  pointer small-font ${
                    isloading ? "disabled-btn" : ""
                  }`}
                  onClick={handleSubmit}
                  disabled={isloading}
                >
                  {isloading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="ms-2 ">Submit</span>
                    </>
                  ) : (
                    "Submit"
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="my-4 row align-items-center ">
            <div className="col-6">
              <div className=" medium-font">Management Password:</div>
              <div className="input-bg br-5 py-1 px-2 flex-between border-grey3">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="all-none small-font w-100"
                  placeholder="Enter Password"
                  value={pswd}
                  onChange={(e) => validatePassword(e.target.value)}
                />
                <span
                  onClick={handlePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {passwordVisible ? (
                    <FiEye size={14} />
                  ) : (
                    <FiEyeOff size={14} />
                  )}
                </span>
              </div>
              {pswdError && (
                <div className="small-font red-font">{pswdError}</div>
              )}
            </div>

            <div className="col-6">
              <div className="align-self-end mt-4">
                <div
                  className={`saffron-bg py-1 white-font text-center rounded balck-font pointer medium-font ${
                    isloading ? "disabled-btn" : ""
                  }`}
                  onClick={handleSubmit}
                  // disabled={isloading === true ? "disabled-btn" : false}
                >
                  {isloading ? (
                    <div className="">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="ms-2">Submit</span>
                    </div>
                  ) : (
                    <div>Submit</div>
                  )}
                </div>
              </div>
            </div>
          </div> */}
          {formError && <div className="red-font small-font">{formError}</div>}
        </div>
      )}

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={msg}
      />
    </div>
  );
};

export default AddSportsControl;
