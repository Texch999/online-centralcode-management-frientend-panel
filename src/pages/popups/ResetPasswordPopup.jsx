import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

function ResetPasswordPopup({
  resetPasswordPopup,
  setResetPasswordPopup,
  IndividualpassowrdId,
  onSubmit,
  resetPasswordErrrors,
  setResetPasswordErrors,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showManagementPassword, setShowManagementPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const token = localStorage.getItem("jwt_token");
  const login_role_name = localStorage.getItem("role_name");

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // Now properly destructured
    reset,
  } = useForm();

  const handleCancel = () => {
    setResetPasswordPopup(false);
    reset();
    // setResetPasswordErrors("");
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    setResetPasswordPopup(false);
    reset();
    setResetPasswordErrors("");
  };

  useEffect(() => {
    if (!resetPasswordPopup) {
      reset({
        password: "",
        confirmPassword: "",
        managementPassword: "",
      }); // Explicitly reset form fields
    }
  }, [resetPasswordPopup, reset]); // Ensure reset function is included in dependencies

  return (
    <>
      {/* Reset Password Modal */}
      <Modal show={resetPasswordPopup} centered size="sm">
        <Modal.Body>
          <div className="flex-between black-text4">
            <h6 className="fw-600 mb-0">Reset Password</h6>
            <IoCloseSharp
              size={20}
              onClick={handleCancel}
              className="pointer"
            />
          </div>
          <div className="row small-font mb-3">
            {/* New Password Field */}
            <div className="col-12 flex-column mt-3">
              <label className="black-text4 mb-1">New Password</label>
              <div className="grey-box flex-between">
                {/* <input
                  className="all-none"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })} */}

                <input
                  className="all-none"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
                    },
                  })}
                />

                {showPassword ? (
                  <FaEye
                    className="black-text4"
                    size={18}
                    onClick={() => setShowPassword(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <FaEyeSlash
                    className="black-text4"
                    size={18}
                    onClick={() => setShowPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="col-12 flex-column mt-3">
              <label className="black-text4 mb-1">Confirm Password</label>
              <div className="grey-box flex-between">
                {/* <input
                  className="all-none"
                  placeholder="Re-enter Password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                /> */}

                <input
                  className="all-none"
                  placeholder="Re-enter Password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: {
                      matchesPassword: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                      passwordPattern: (value) =>
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
                          value
                        ) ||
                        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
                    },
                  })}
                />

                {showConfirmPassword ? (
                  <FaEye
                    className="black-text4"
                    size={18}
                    onClick={() => setShowConfirmPassword(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <FaEyeSlash
                    className="black-text4"
                    size={18}
                    onClick={() => setShowConfirmPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <span className="text-danger">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Management Password Field */}
            <div className="col-12 flex-column mt-3">
              <label className="black-text4 mb-1">{`${
                login_role_name === "director" ? "Director" : "Management"
              } Password`}</label>
              <div className="grey-box flex-between">
                <input
                  className="all-none"
                  placeholder="Enter Management Password"
                  type={showManagementPassword ? "text" : "password"}
                  {...register("managementPassword", {
                    required: "Management password is required",
                  })}
                />
                {showManagementPassword ? (
                  <FaEye
                    className="black-text4"
                    size={18}
                    onClick={() => setShowManagementPassword(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <FaEyeSlash
                    className="black-text4"
                    size={18}
                    onClick={() => setShowManagementPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              {errors.managementPassword && (
                <span className="text-danger">
                  {errors.managementPassword.message}
                </span>
              )}
            </div>
            <div className="red-font my-2">{resetPasswordErrrors}</div>

            <div className="col-12 mt-3">
              <button
                className="w-100 saffron-btn2"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Success Popup */}
      <Modal show={showSuccessPopup} centered size="sm">
        <Modal.Body>
          <div className="text-center">
            <h6 className="fw-600">Password Reset Successfully</h6>
            <button
              className="w-100 saffron-btn2 mt-3"
              onClick={handleSuccessClose}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResetPasswordPopup;
