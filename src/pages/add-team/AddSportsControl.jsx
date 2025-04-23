import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { addSportsControl, getSportsList } from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorComponent from "../../components/ErrorComponent";
import { IoEye } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  console.log(websiteId, "websiteIddddd");
  const [selectedSports, setSelectedSports] = useState([]);
  const [msg, setMsg] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [pswd, setPswd] = useState("");

  const handleToggleSport = (id) => {
    setSelectedSports((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [pswdError, setPswdError] = useState("");

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
          console.log(response?.data);
          setSportsData(response?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };
  useEffect(() => {
    getSports();
  }, []);

  const handleSubmit = () => {
    if (selectedSports.length === 0) {
      setError("Please select at least one sport.");
      return;
    }
    if (!pswd) {
      setError("Management Password is required");
      return;
    }
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
          setSuccessPopupOpen(true);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, 3000);
          setMsg(response?.message);
          console.log(response?.data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error?.message);
      });
  };

  return (
    <div>
      <div className="yellow-font align-items-center d-flex gap-1">
        <div onClick={() => navigate(-1)}>
          <FaChevronLeft />
        </div>
        <div>{params?.website}</div>
      </div>
      <div className="my-3">
        <div className="d-flex gap-3">
          {buttons?.map((item, index) => (
            <div
              key={index}
              className={`br-5 pointer medium-font ${
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

      <ErrorComponent error={error} />

      {loading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>
      ) : (
        <div>
          <div className="yellow-bg py-1 white-font rounded-top px-2 large-font">{`${
            active === 0 ? "Sports" : "Casino"
          } Type`}</div>
          <div className="white-btn rounded-bottom flex-wrap gap-2">
            {sportsData?.map((item, index) => (
              <div
                key={index}
                className="light-bg d-flex gap-2 medium-font black-font p-2 align-items-center br-5"
              >
                <div>{item?.name}</div>
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
          <div className="my-4 row align-items-center ">
            <div className="col-6">
              <div className="my-1 medium-font">Management Password:</div>
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
                    <FiEye size={15} />
                  ) : (
                    <FiEyeOff size={15} />
                  )}
                </span>
              </div>
              {pswdError && (
                <div className="small-font red-font">{pswdError}</div>
              )}
            </div>

            <div className="col-6">
              <div className="self-end">
                <div
                  className="saffron-btn mt-4 rounded balck-font pointer medium-font"
                  onClick={handleSubmit}
                  disabled={isloading}
                >
                  {isloading ? <div>loading</div> : <div>Submit</div>}
                </div>
              </div>
            </div>
          </div>
          {/* {error && <div className="red-font small-font">{error}</div>} */}
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
