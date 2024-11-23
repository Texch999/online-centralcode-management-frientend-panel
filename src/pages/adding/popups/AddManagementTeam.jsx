import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddManagementTeam.css'; // Custom CSS for additional styling if needed

const AddManagementTeam = () => {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    loginName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    managementPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
    managementPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation logic can be added here

    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="add-management-team-popup p-4">
      <div className="popup-header d-flex justify-content-between align-items-center mb-3">
        <h2>Add Management Team</h2>
        <button className="btn-close" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Row 1: Role, Name, Login Name */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Role:</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              className="form-control"
            >
              <option value="">Select</option>
              <option value="Accounts">Accounts</option>
              <option value="Designer">Designer</option>
              <option value="Company Team">Company Team</option>
            </select>
          </div>
          <div className="col-md-4">
            <label>Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Enter"
            />
          </div>
          <div className="col-md-4">
            <label>Login Name:</label>
            <input 
              type="text" 
              name="loginName" 
              value={formData.loginName} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Enter"
            />
          </div>
        </div>

        {/* Row 2: Phone Number, Password, Confirm Password */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Phone Number:</label>
            <input 
              type="text" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Enter"
            />
          </div>
          <div className="col-md-4 position-relative">
            <label>Password:</label>
            <input 
              type={showPassword.password ? 'text' : 'password'} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Enter Password"
            />
            <span 
              className="eye-icon" 
              onClick={() => togglePasswordVisibility('password')}
              style={{ position: 'absolute', right: '20px', top: '50%', cursor: 'pointer' }}
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="col-md-4 position-relative">
            <label>Confirm Password:</label>
            <input 
              type={showPassword.confirmPassword ? 'text' : 'password'} 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Re-enter Password"
            />
            <span 
              className="eye-icon" 
              onClick={() => togglePasswordVisibility('confirmPassword')}
              style={{ position: 'absolute', right: '20px', top: '50%', cursor: 'pointer' }}
            >
              {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Row 3: Email, Management Password, Submit */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Enter"
            />
          </div>
          <div className="col-md-4 position-relative">
            <label>Management Password:</label>
            <input 
              type={showPassword.managementPassword ? 'text' : 'password'} 
              name="managementPassword" 
              value={formData.managementPassword} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Enter Password"
            />
            <span 
              className="eye-icon" 
              onClick={() => togglePasswordVisibility('managementPassword')}
              style={{ position: 'absolute', right: '20px', top: '50%',  cursor: 'pointer' }}
            >
              {showPassword.managementPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button type="submit" className="btn btn-warning w-100">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddManagementTeam;
