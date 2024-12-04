import React, { useState } from "react";
import Table from "../../components/Table";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationPopup from './../popups/ConfirmationPopup';

function InActiveUsers() {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const INACTIVE_USER_COLUMNS = [
    { header: "Role/Name", field: "roleName" },
    { header: "User/Login Name", field: "userloginname" },
    { header: "Website", field: "website" },
    { header: "Deposit", field: "deposit" },
    { header: "Withdraw", field: "withdraw" },
    { header: "Wallet Bal.", field: "walletbal" },
    { header: "P/L", field: "pl" },
    { header: "Login Date", field: "logindate" },
    { header: "Active Days", field: "activedays" },
    { header: "Action", field: "action" },
  ];

  const INACTIVE_USER_DATA = [
    {
      roleName: (
        <div className="flex-column red-font">
          <span>Admin - Ray</span>
          <span>Sub Admin - Sri</span>
          <span>Agent - Ranjit</span>
        </div>
      ),
      userloginname: (
        <div className="flex-column red-font">
          <span>User - Jitendra</span>
          <span>Login - Jitendra</span>
        </div>
      ),
      website: <div className="red-font">texchange.com</div>,
      deposit: <div className="red-font">100000</div>,
      withdraw: <div className="red-font">12000000</div>,
      walletbal: <div className="red-font">12000000</div>,
      pl: <div className="red-font">5000000</div>,
      logindate: <div className="red-font">04-10-2024</div>,
      activedays: <div className="red-font">60 Days</div>,
      action: (
        <div className="d-flex align-items-center justify-content-around w-100">
          <div className="red-btn">In-Active</div>
          <MdDelete
            className="large-font cursor-pointer"
            onClick={() => setShowDeletePopup(true)}
          />
        </div>
      ),
    },
    {
      roleName: (
        <div className="flex-column">
          <span>Admin - Ray</span>
          <span>Sub Admin - Sri</span>
          <span>Agent - Ranjit</span>
        </div>
      ),
      userloginname: (
        <div className="flex-column">
          <span>User - Jitendra</span>
          <span>Login - Jitendra</span>
        </div>
      ),
      website: <div>texchange.com</div>,
      deposit: <div>100000</div>,
      withdraw: <div>12000000</div>,
      walletbal: <div>12000000</div>,
      pl: <div>5000000</div>,
      logindate: <div>04-10-2024</div>,
      activedays: <div>60 Days</div>,
      action: (
        <div className="d-flex align-items-center justify-content-around w-100">
          <div className="green-btn">Active</div>
          <MdDelete className="large-font cursor-pointer" />
        </div>
      ),
    },
    {
      roleName: (
        <div className="flex-column red-font">
          <span>Admin - Ray</span>
          <span>Sub Admin - Sri</span>
          <span>Agent - Ranjit</span>
        </div>
      ),
      userloginname: (
        <div className="flex-column red-font">
          <span>User - Jitendra</span>
          <span>Login - Jitendra</span>
        </div>
      ),
      website: <div className="red-font">texchange.com</div>,
      deposit: <div className="red-font">100000</div>,
      withdraw: <div className="red-font">12000000</div>,
      walletbal: <div className="red-font">12000000</div>,
      pl: <div className="red-font">5000000</div>,
      logindate: <div className="red-font">04-10-2024</div>,
      activedays: <div className="red-font">60 Days</div>,
      action: (
        <div className="d-flex align-items-center justify-content-around w-100">
          <div className="red-btn">In-Active</div>
          <MdDelete className="large-font cursor-pointer" />
        </div>
      ),
    },
    {
      roleName: (
        <div className="flex-column">
          <span>Admin - Ray</span>
          <span>Sub Admin - Sri</span>
          <span>Agent - Ranjit</span>
        </div>
      ),
      userloginname: (
        <div className="flex-column">
          <span>User - Jitendra</span>
          <span>Login - Jitendra</span>
        </div>
      ),
      website: <div>texchange.com</div>,
      deposit: <div>100000</div>,
      withdraw: <div>12000000</div>,
      walletbal: <div>12000000</div>,
      pl: <div>5000000</div>,
      logindate: <div>04-10-2024</div>,
      activedays: <div>60 Days</div>,
      action: (
        <div className="d-flex align-items-center justify-content-around w-100">
          <div className="green-btn">Active</div>
          <MdDelete className="large-font cursor-pointer" />
        </div>
      ),
    },
    {
      roleName: (
        <div className="flex-column red-font">
          <span>Admin - Ray</span>
          <span>Sub Admin - Sri</span>
          <span>Agent - Ranjit</span>
        </div>
      ),
      userloginname: (
        <div className="flex-column red-font">
          <span>User - Jitendra</span>
          <span>Login - Jitendra</span>
        </div>
      ),
      website: <div className="red-font">texchange.com</div>,
      deposit: <div className="red-font">100000</div>,
      withdraw: <div className="red-font">12000000</div>,
      walletbal: <div className="red-font">12000000</div>,
      pl: <div className="red-font">5000000</div>,
      logindate: <div className="red-font">04-10-2024</div>,
      activedays: <div className="red-font">60 Days</div>,
      action: (
        <div className="d-flex align-items-center justify-content-around w-100">
          <div className="red-btn">In-Active</div>
          <MdDelete className="large-font cursor-pointer" />
        </div>
      ),
    },
    {
      roleName: (
        <div className="flex-column">
          <span>Admin - Ray</span>
          <span>Sub Admin - Sri</span>
          <span>Agent - Ranjit</span>
        </div>
      ),
      userloginname: (
        <div className="flex-column">
          <span>User - Jitendra</span>
          <span>Login - Jitendra</span>
        </div>
      ),
      website: <div>texchange.com</div>,
      deposit: <div>100000</div>,
      withdraw: <div>12000000</div>,
      walletbal: <div>12000000</div>,
      pl: <div>5000000</div>,
      logindate: <div>04-10-2024</div>,
      activedays: <div>60 Days</div>,
      action: (
        <div className="d-flex align-items-center justify-content-around w-100">
          <div className="green-btn">Active</div>
          <MdDelete className="large-font cursor-pointer" />
        </div>
      ),
    },
    {
      roleName: (
        <div className="flex-column red-font">
          <span>Admin - Ray</span>
          <span>Sub Admin - Sri</span>
          <span>Agent - Ranjit</span>
        </div>
      ),
      userloginname: (
        <div className="flex-column red-font">
          <span>User - Jitendra</span>
          <span>Login - Jitendra</span>
        </div>
      ),
      website: <div className="red-font">texchange.com</div>,
      deposit: <div className="red-font">100000</div>,
      withdraw: <div className="red-font">12000000</div>,
      walletbal: <div className="red-font">12000000</div>,
      pl: <div className="red-font">5000000</div>,
      logindate: <div className="red-font">04-10-2024</div>,
      activedays: <div className="red-font">60 Days</div>,
      action: (
        <div className="d-flex align-items-center justify-content-around w-100">
          <div className="red-btn">In-Active</div>
          <MdDelete className="large-font cursor-pointer" />
        </div>
      ),
    },
    {
      roleName: (
        <div className="flex-column">
          <span>Admin - Ray</span>
          <span>Sub Admin - Sri</span>
          <span>Agent - Ranjit</span>
        </div>
      ),
      userloginname: (
        <div className="flex-column">
          <span>User - Jitendra</span>
          <span>Login - Jitendra</span>
        </div>
      ),
      website: <div>texchange.com</div>,
      deposit: <div>100000</div>,
      withdraw: <div>12000000</div>,
      walletbal: <div>12000000</div>,
      pl: <div>5000000</div>,
      logindate: <div>04-10-2024</div>,
      activedays: <div>60 Days</div>,
      action: (
        <div className="d-flex align-items-center justify-content-around w-100">
          <div className="green-btn">Active</div>
          <MdDelete className="large-font cursor-pointer" />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font my-2">In-Active Users</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      <div className="w-100 d-flex align-items-center justify-content-between my-3">
        <div className="w-50 row">
          <div className="col flex-column">
            <label className="black-text4 small-font mb-1">Admin</label>
            <select className="input-css2 small-font">
              <option>admin1</option>
              <option>admin1</option>
              <option>admin1</option>
            </select>
          </div>
          <div className="col flex-column">
            <label className="black-text4 small-font mb-1">User</label>
            <select className="input-css2 small-font">
              <option>user1</option>
              <option>user1</option>
              <option>user1</option>
            </select>
          </div>
          <div className="col flex-column d-flex align-items-end justify-content-end">
            <button className="w-100 saffron-btn2 small-font">Submit</button>
          </div>
        </div>
      </div>
      <Table
        columns={INACTIVE_USER_COLUMNS}
        data={INACTIVE_USER_DATA}
        itemsPerPage={4}
      />
    

      <ConfirmationPopup
        confirmationPopupOpen={showDeletePopup}
        setConfirmationPopupOpen={setShowDeletePopup}
        discription={"Are You Sure to Delete this Match"}
        submitButton={"Delete"}
      />
    </div>
  );
}

export default InActiveUsers;
