import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import "../style.css";
import "../../../App.css";
import { directorEmployees } from "../../../utils/enum";
import { addDirectorTeam } from "../../../api/apiMethods";

function AddDirectorPopup({ onClose, onSubmit, show }) {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm_password: false,
        parent_password: false,
    });
    const [error, setError] = useState()
    const roleOptions = Object.entries(directorEmployees).map(([key, value]) => ({
        value: key,
        label: value,
    }));

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            role: "",
            name: "",
            login_name: "",
            phone_no: "",
            password: "",
            confirm_password: "",
            email: "",
            parent_password: "",
        },
    });
    // {
    //     "role": 1,
    //     "name": "John Doe",
    //     "login_name": "john_doe123",
    //     "phone_no": "+1234567890",
    //     "email": "john.doe@example.com",
    //     "password": "StrongP@ss1",
    //     "confirm_password": "StrongP@ss1",
    //     "parent_password": "ParentP@ss2"
    //   }
    const password = watch("password");

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleChange = (field, value) => {
        setValue(field, value);
    };

    const handleRoleChange = (selectedOption) => {
        setValue("role", selectedOption.value);
    };

    const onFormSubmit = (data) => {
        console.log("Submitting Form Data:", data);
    };
    const onSubmitHandler = (data) => {

        addDirectorTeam(data)
            .then((response) => {
                if (response?.status === true) {
                    console.log(response, "response from API");
                    if (onSubmit) onSubmit();
                } else {
                    setError("Something Went Wrong");
                }
            })
            .catch((error) => {
                setError(error?.message || "Login failed");
            });
    };
    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="yellow-font mb-0 py-2 border-bottom-grey">Add Director Team</h5>
                    <MdOutlineClose size={20} type="button" onClick={onClose} aria-label="Close" />
                </div>
                <form className="add-management-popup-form mt-2" onSubmit={handleSubmit(onSubmitHandler )}>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="small-font mb-1">Role</label>
                            <Select
                                className="small-font"
                                options={roleOptions}
                                placeholder="Select"
                                styles={customStyles}
                                onChange={handleRoleChange}
                                maxMenuHeight={120}
                                menuPlacement="auto"
                            />
                            {errors.role && <p className="text-danger small-font">{errors.role.message}</p>}
                        </div>

                        <div className="col">
                            <label className="small-font mb-1">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter"
                            />
                            {errors.name && <p className="text-danger small-font">{errors.name.message}</p>}
                        </div>

                        <div className="col">
                            <label className="small-font mb-1">Login Name</label>
                            <input
                                type="text"
                                {...register("login_name", { required: "Login Name is required" })}
                                onChange={(e) => handleChange("login_name", e.target.value)}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter"
                            />
                            {errors.login_name && <p className="text-danger small-font">{errors.login_name.message}</p>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="small-font mb-1">Phone Number</label>
                            <input
                                type="text"
                                {...register("phone_no", {
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Enter a valid 10-digit phone number",
                                    },
                                })}
                                onChange={(e) => handleChange("phone_no", e.target.value)}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter"
                            />
                            {errors.phone_no && <p className="text-danger small-font">{errors.phone_no.message}</p>}
                        </div>

                        <div className="col-md-4 position-relative">
                            <label className="small-font mb-1">Password</label>
                            <input
                                type={showPassword.password ? "text" : "password"}
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                                onChange={(e) => handleChange("password", e.target.value)}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter Password"
                            />
                            <span className="eye-icon" onClick={() => togglePasswordVisibility("password")} style={{ position: "absolute", right: "10%", top: "50%", cursor: "pointer" }}>
                                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="col-md-4 position-relative">
                            <label className="small-font mb-1">Confirm Password</label>
                            <input
                                type={showPassword.confirm_password ? "text" : "password"}
                                {...register("confirm_password", {
                                    required: "Confirm Password is required",
                                    validate: (value) => value === password || "Passwords do not match",
                                })}
                                onChange={(e) => handleChange("confirm_password", e.target.value)}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Re-enter Password"
                            />
                            <span className="eye-icon" onClick={() => togglePasswordVisibility("confirm_password")} style={{ position: "absolute", right: "10%", top: "50%", cursor: "pointer" }}>
                                {showPassword.confirm_password ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="small-font mb-1">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter"
                            />
                            {errors.email && <p className="text-danger small-font">{errors.email.message}</p>}
                        </div>

                        <div className="col-md-4 position-relative">
                            <label className="small-font mb-1">Management Password</label>
                            <input
                                type={showPassword.parent_password ? "text" : "password"}
                                {...register("parent_password", { required: "Management Password is required" })}
                                onChange={(e) => handleChange("parent_password", e.target.value)}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter Management Password"
                            />
                            <span className="eye-icon" onClick={() => togglePasswordVisibility("parent_password")} style={{ position: "absolute", right: "10%", top: "50%", cursor: "pointer" }}>
                                {showPassword.parent_password ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <Button className="saffron-btn w-100" type="submit">
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddDirectorPopup;
