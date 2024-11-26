import React from "react";
import { MdLockReset, MdRemoveRedEye } from "react-icons/md";
import { FaUserTie, FaMapMarkerAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { RiArrowUpLine } from "react-icons/ri";
import { Images } from "../../images";
import "../add-team/style.css";

const UserProfileDashboard = () => {
  return (
    <div className="gap-3 p-3 bg-gradient rounded">
      <div className="d-flex w-100 justify-content-end mb-3 gap-4">
        <div className="d-flex align-items-center gap-4 p-2 px-3 bg-dark text-white rounded-pill">
          <span className="fw-bold">User Name</span>
          <span>Jayanta</span>
        </div>

        <div className="d-flex align-items-center gap-1 p-2 bg-dark text-white rounded-pill px-2">
          <div className="d-flex align-items-center gap-4 px-2">
            <span className="fw-bold">Password</span>
            <span>1234567823</span>
          </div>

          <div className="d-flex align-items-center gap-1">
            <MdRemoveRedEye className="text-warning" />
            <MdLockReset className="text-warning" />
          </div>
        </div>
      </div>
      <div className="p-3 bg-dark text-white rounded">

        <div className="row">
          <div className="col-2"></div>
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex gap-3 align-items-center">
                <FaUserTie />
                <span>Director</span>
                <FaMapMarkerAlt />
                <span>India</span>
              </div>
              <span className="badge bg-success p-3">Active</span>
            </div>
            <div className="row">
              <div className="col-3 mb-3">
                <div className="mini-container">
                  <div
                    className="top-section rounded-top d-flex justify-content-between align-items-center p-3"
                    style={{ backgroundColor: "#7DA0FA" }}
                  >
                    <h6 className="mb-0">Share Revenue</h6>
                    <RiArrowUpLine size={24} />
                  </div>
                  <div className="bottom-section rounded-bottom bg-white p-2">
                    <p className="mb-0 fw-bold text-dark">500000000</p>
                  </div>
                </div>
              </div>

              <div className="col-3 mb-3">
                <div className="mini-container">
                  {/* Top Section */}
                  <div
                    className="rounded-top top-section d-flex justify-content-between align-items-center p-3"
                    style={{ backgroundColor: "#7DA0FA" }}
                  >
                    <h6 className="mb-0">Rental Revenue</h6>
                    <RiArrowUpLine size={24} />
                  </div>
                  {/* Bottom Section */}
                  <div className="rounded-bottom bottom-section bg-white p-2">
                    <p className="mb-0 fw-bold text-dark">500000000</p>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="mini-container">
                  {/* Top Section */}
                  <div
                    className="rounded-top top-section d-flex justify-content-between align-items-center p-3"
                    style={{ backgroundColor: "#7DA0FA" }}
                  >
                    <h6 className="mb-0">Total Paid</h6>
                    <MdAttachMoney size={24} />
                  </div>
                  {/* Bottom Section */}
                  <div className="rounded-bottom bottom-section bg-white p-2">
                    <p className="mb-0 fw-bold text-danger">500000000</p>
                  </div>
                </div>
              </div>

              <div className="col-3 mb-3">
                <div className="mini-container">
                  {/* Top Section */}
                  <div
                    className="rounded-top top-section d-flex justify-content-between align-items-center p-3"
                    style={{ backgroundColor: "#7DA0FA" }}
                  >
                    <h6 className="mb-0">Net Profit/Loss</h6>
                    <RiArrowUpLine size={24} />
                  </div>
                  {/* Bottom Section */}
                  <div className="rounded-bottom bottom-section bg-white p-2">
                    <p className="mb-0 fw-bold text-success">500000000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDashboard;
