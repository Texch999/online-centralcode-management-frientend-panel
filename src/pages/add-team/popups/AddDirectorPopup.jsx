import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import { directorEmployees } from "../../../utils/enum";
import { addDirectorTeam, getDirectorEmployeeDetailsById, updateDirectorDwnlnPswd } from "../../../api/apiMethods";

function AddDirectorPopup({ onClose, onSubmit, show, isEditMode, directorEmployeeId }) {

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm_password: false,
        parent_password: false,
    });
    const [error, setError] = useState(null);
    const [selectedUrls, setSelectedUrls] = useState({}); // Track selected URLs dynamically

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

    const password = watch("password");

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleRoleChange = (selectedOption) => {
        setValue("role", selectedOption.value);
    };

    const handleCheckboxChange = (userId) => {
        setSelectedUrls((prevState) => {
            const newState = { ...prevState };
            // Toggle the URL of the selected user
            if (newState[userId]) {
                delete newState[userId];
            } else {
                newState[userId] = `https://user${userId}.com`; // or any other dynamic URL you want
            }
            return newState;
        });
    };

    const onSubmitHandler = (data) => {
        console.log("clicked")
        addDirectorTeam(data)
            .then((response) => {
                if (response?.status === true) {
                    console.log(response, "response from API");
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
                    <h5 className="yellow-font mb-0 py-2 border-bottom-grey">
                        {isEditMode ? "Edit Director Team" : "Add Director Team"}
                    </h5>
                    <MdOutlineClose size={20} type="button" onClick={onClose} aria-label="Close" />
                </div>
                <form className="add-management-popup-form mt-2" onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="small-font mb-1">Role</label>
                            <Select
                                className="small-font"
                                options={roleOptions}
                                placeholder="Select"
                                styles={customStyles}
                                onChange={handleRoleChange}
                            />
                            {errors.role && <p className="text-danger small-font">{errors.role.message}</p>}
                        </div>

                        <div className="col">
                            <label className="small-font mb-1">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter"
                            />
                        </div>

                        <div className="col">
                            <label className="small-font mb-1">Login Name</label>
                            <input
                                type="text"
                                {...register("login_name", { required: "Login Name is required" })}
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
                                {...register("phone_no", {})}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter"
                            />
                            {errors.phone_no && <p className="text-danger small-font">{errors.phone_no.message}</p>}
                        </div>

                        {!isEditMode && (
                            <>
                                <div className="col-md-4 position-relative">
                                    <label className="small-font mb-1">Password</label>
                                    <input
                                        type={showPassword.password ? "text" : "password"}
                                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
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
                                        className="small-font rounded all-none input-css w-100"
                                        placeholder="Re-enter Password"
                                    />
                                    <span className="eye-icon" onClick={() => togglePasswordVisibility("confirm_password")} style={{ position: "absolute", right: "10%", top: "50%", cursor: "pointer" }}>
                                        {showPassword.confirm_password ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="small-font mb-1">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter"
                            />
                        </div>
                        <div className="col-md-4 position-relative">
                            <label className="small-font mb-1">Parent Password</label>
                            <input
                                type={showPassword.parent_password ? "text" : "password"}
                                {...register("parent_password", {
                                    required: "Parent Password is required",
                                    validate: (value) => value === password || "Passwords do not match",
                                })}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter Password"
                            />
                            <span className="eye-icon" onClick={() => togglePasswordVisibility("parent_password")} style={{ position: "absolute", right: "10%", top: "50%", cursor: "pointer" }}>
                                {showPassword.parent_password ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* Example of selecting a user and toggling their URL */}
                    <div className="row mb-3">
                        <div className="col">
                            <label className="small-font mb-1">Select User URL</label>
                            <div>
                                {Object.keys(directorEmployees).map((userId) => (
                                    <div key={userId}>
                                        <input
                                            type="checkbox"
                                            checked={!!selectedUrls[userId]}
                                            onChange={() => handleCheckboxChange(userId)}
                                        />
                                        <span>User {userId}</span>
                                        {selectedUrls[userId] && <div>{selectedUrls[userId]}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <button className="saffron-btn w-100" type="submit" >
                                {isEditMode ? "Update" : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddDirectorPopup;
