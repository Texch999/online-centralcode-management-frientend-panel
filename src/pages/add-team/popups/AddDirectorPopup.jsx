import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import { directorEmployees } from "../../../utils/enum";
import { addDirectorTeam, updateDirectorDwnlnPswd } from "../../../api/apiMethods";

function AddDirectorPopup({ onClose, onSubmit, show, editData, fetchEmployeeById,employeeData }) {
    useEffect(() => {
        if (show && editData) {
            fetchEmployeeById();
        }
    }, [show, editData, fetchEmployeeById]);
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm_password: false,
        parent_password: false,
    });
    const [error, setError] = useState(null);

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

    useEffect(() => {
        if (editData) {
            setValue("role", editData.role);
            setValue("name", editData.name);
            setValue("login_name", editData.login_name);
            setValue("phone_no", editData.phone_no);
            setValue("email", editData.email);
        }
    }, [editData, setValue]);

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleRoleChange = (selectedOption) => {
        setValue("role", selectedOption.value);
    };

    const onSubmitHandler = async (data) => {
        try {
            let response;
            if (editData) {
                response = await updateDirectorDwnlnPswd(editData.id, data);
            } else {
                response = await addDirectorTeam(data);
            }

            if (response?.status === true) {
                console.log("API Response:", response);
                if (onSubmit) onSubmit();
            } else {
                setError("Something Went Wrong");
            }
        } catch (error) {
            setError(error?.message || "Request failed");
        }
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="yellow-font mb-0 py-2 border-bottom-grey">
                        {editData ? "Edit Director Team" : "Add Director Team"}
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
                                value={roleOptions.find(option => option.value === editData?.role)}
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
                            {errors.name && <p className="text-danger small-font">{errors.name.message}</p>}
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
                                {...register("phone_no", {
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Enter a valid 10-digit phone number",
                                    },
                                })}
                                className="small-font rounded all-none input-css w-100"
                                placeholder="Enter"
                            />
                            {errors.phone_no && <p className="text-danger small-font">{errors.phone_no.message}</p>}
                        </div>

                        {!editData && (
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
                    </div>

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <Button className="saffron-btn w-100" type="submit">
                                {editData ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddDirectorPopup;
