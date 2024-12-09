import React, { useState } from "react";
import Table from "../../components/Table";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../../pages/add-team/style.css";

function BetBlockUsers() {
  const adminOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const userOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const BLOCK_USER_COLUMNS = [
    { header: "Role/Name", field: "roleName" },
    { header: "User/Login Name", field: "userloginname" },
    { header: "Website", field: "website" },
    { header: "Deposit", field: "deposit" },
    { header: "Withdraw", field: "withdraw" },
    { header: "Wallet Bal.", field: "walletbal" },
    { header: "P/L", field: "pl" },
    { header: "Login Date", field: "logindate" },
    { header: "Bet Log Days", field: "betlogdays" },
    { header: "Action", field: "action" },
  ];

  const BLOCK_USER_DATA = [
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
      betlogdays: <div className="red-font">60 Days</div>,
      action: <div className="red-btn">Locked</div>,
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
      betlogdays: <div>60 Days</div>,
      action: <div className="red-btn">Locked</div>,
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
      betlogdays: <div>60 Days</div>,
      action: <div className="red-btn">Locked</div>,
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
      betlogdays: <div>60 Days</div>,
      action: <div className="red-btn">Locked</div>,
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
      betlogdays: <div>60 Days</div>,
      action: <div className="red-btn">Locked</div>,
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
      betlogdays: <div>60 Days</div>,
      action: <div className="red-btn">Locked</div>,
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
      betlogdays: <div>60 Days</div>,
      action: <div className="red-btn">Locked</div>,
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
      betlogdays: <div>60 Days</div>,
      action: <div className="red-btn">Locked</div>,
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font my-2">Bet Block Users</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      <div className="w-100 d-flex align-items-center justify-content-between my-3">
        <div className="w-50 row">
          <div className="col flex-column">
            <label className="black-text4 small-font mb-1">Admin</label>
            <Select
              className="small-font"
              options={adminOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>
          <div className="col flex-column">
            <label className="black-text4 small-font mb-1">To</label>
            <Select
              className="small-font"
              options={userOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>
          <div className="col flex-column d-flex align-items-end justify-content-end">
            <button className="w-100 saffron-btn2 small-font">Submit</button>
          </div>
        </div>
      </div>
      <Table
        columns={BLOCK_USER_COLUMNS}
        data={BLOCK_USER_DATA}
        itemsPerPage={4}
      />
    </div>
  );
}

export default BetBlockUsers;
