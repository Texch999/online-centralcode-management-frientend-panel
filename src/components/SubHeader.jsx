import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import EditProfilePopup from "../pages/popups/EditProfilePopup";
import ResetPasswordPopup from "../pages/popups/ResetPasswordPopup";

function SubHeader() {
  const navigate = useNavigate();
  const role_code = localStorage.getItem("role_code");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [editProfilePopup, setEditProfilePopup] = useState(false);
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);

  const menuConfig = {
    management: [
      {
        label: "Adding",
        options: [
          { label: "Management Team", path: "/management-team" },
          { label: "Director & Super Admin", path: "/director-admin" },
          // { label: "View Downline List", path: "/downline-list" },
          { label: "Offline Payment Cards", path: "/offline-payment-modes" },
          { label: "Payment Details", path: "/payment-details" },
          { label: "Websites", path: "/websites" },
        ],
      },
      {
        label: "Live/Block",
        options: [
          { label: "Sports", path: "/live-block-sports" },
          { label: "Casino", path: "/management-casino" },
          { label: "Set Limits", path: "/set-limits" },
          { label: "Active/In-Active Users", path: "/inactive-users" },
          { label: "Bet Block Users", path: "/bet-block-users" },
        ],
      },
      {
        label: "Risk Management",
        options: [
          { label: "Sports & Casino Risk Limit Set", path: "/risk-limit-set" },
          { label: "Sports", path: "/risk-sports" },
          { label: "Casino", path: "/risk-casino" },
          { label: "Live Bet List(Sports/Casino)", path: "/live-bet-list" },
          { label: "Deleted Bet History", path: "/deleted-bet-history" },
          { label: "Cheat/Alert Bets", path: "/cheat-alert-bets" },
        ],
      },
      {
        label: "Wallet",
        options: [
          { label: "My Vendors Account", path: "/my-vendors-account" },
          // { label: "My Deposit/Withdraw", path: "/deposit-withdraw" },
          // {
          //   label: "Offline Deposit/Withdraw",
          //   path: "/offline-deposit-withdraw",
          // }, // new screens 
          {
            // label: "Offline Deposit/Withdraw",
            label: "Credit & Settlement",
            path: "/credit-settlement",
          }, // new screens 
          { label: "Downline Tickets", path: "/tickets" },
          { label: "Gateway Transactions", path: "/gateway-transactions" },
          // {label:"Settlement Transaction",path:"/settlement-transaction"}
        ],
      },
      {
        label: "Reports",
        options: [
          { label: "My Statement", path: "/my-statement" },
          { label: "P/L Report Downline Admins", path: "/pl-report-downline" },
          { label: "P/L Casino Report", path: "/pl-casino-report" },
          { label: "P/L Report Sports Wise", path: "/pl-report-sports" },
          { label: "P/L Report by Users", path: "/pl-report-users" },
          { label: "Match Wise P/L", path: "/match-wise-pl" },
          { label: "Client Rental Sheet", path: "/client-rental-sheet" },
        ],
      },
      {
        label: "Owner Settings",
        options: [
          { label: "Results", path: "/results" },
          { label: "Reference Data", path: "/reference-data" },
          { label: "Privacy Policy", path: "/privacy-policy" },
          { label: "Activity Logs", path: "/activity-logs" },
        ],
      },
      {
        label: "Promotions",
        options: [
          {
            label: "Create Promotions Type",
            path: "/create-promotion-type",
          },

          { label: "Banners (Casino/Sports)", path: "/banners" },
          { label: "Broadcasting", path: "/broadcasting" },
        ],
      },
    ],

    director: [
      {
        label: "Adding",
        options: [
          { label: "Director Team", path: "/director-team" },
          { label: "Add Super Admin", path: "/director-admin" },
          { label: "View Downline List", path: "/downline-list" },
          { label: "Payment Details", path: "/payment-details" },
          { label: "Available Websites", path: "/websites" },
        ],
      },
      {
        label: "Live/Block",
        options: [
          { label: "Sports", path: "/live-block-sports" },
          { label: "Casino", path: "/management-casino" },
          { label: "Set Limits", path: "/set-limits" },
          { label: "In-active Users", path: "/inactive-users" },
          { label: "Bet Block Users", path: "/bet-block-users" },
        ],
      },
      {
        label: "Risk Management",
        options: [
          { label: "Sports & Casino Risk Limit Set", path: "/risk-limit-set" },
          { label: "Sports", path: "/risk-sports" },
          { label: "Casino", path: "/risk-casino" },
          { label: "Live Bet List(Sports/Casino)", path: "/live-bet-list" },
          { label: "Deleted Bet History", path: "/deleted-bet-history" },
          { label: "Cheat/Alert Bets", path: "/cheat-alert-bets" },
        ],
      },
      {
        label: "Wallet",
        options: [
          { label: "My Deposit/Withdraw", path: "/deposit-withdraw" },
          { label: "Downline Tickets", path: "/tickets" },
          { label: "Gateway Transactions", path: "/gateway-transactions" },
          {
            label: "Offline Deposit/Withdraw",
            path: "/offline-deposit-withdraw",
          },
        ],
      },
      {
        label: "Reports",
        options: [
          { label: "My Statement", path: "/my-statement" },
          { label: "P/L Report Downline Admins", path: "/pl-report-downline" },
          { label: "P/L Casino Report", path: "/pl-casino-report" },
          { label: "P/L Report Sports Wise", path: "/pl-report-sports" },
          { label: "P/L Report by Users", path: "/pl-report-users" },
          { label: "Match Wise P/L", path: "/match-wise-pl" },
          { label: "Client Rental Sheet", path: "/client-rental-sheet" },
        ],
      },
      {
        label: "Director Settings",
        options: [
          { label: "Edit Profile" },
          {
            label: "Reset Password",
          },
          { label: "Activity Logs", path: "/activity-logs" },
        ],
      },
      {
        label: "Promotions",

        options: [
          {
            label: "Create Promotions Type",
            path: "/create-promotion-type",
          },

          { label: "Banners (Casino/Sports)", path: "/banners" },
          { label: "Broadcasting", path: "/broadcasting" },
        ],
      },
    ],

    super_admin: [
      {
        label: "Adding",
        options: [
          { label: "Add Admin", path: "/director-admin" },
          { label: "View Downline List", path: "/downline-list" },
          { label: "Payment Details", path: "/payment-details" },
          { label: "Available Websites", path: "/websites" },
        ],
      },
      {
        label: "Live/Block",
        options: [
          { label: "In-active Users", path: "/inactive-users" },
          { label: "Bet Block Users", path: "/bet-block-users" },
        ],
      },
      {
        label: "Risk Management",
        options: [
          { label: "Sports", path: "/risk-sports" },
          { label: "Casino", path: "/risk-casino" },
          { label: "Live Bet List(Sports/Casino)", path: "/live-bet-list" },
          { label: "Deleted Bet History", path: "/deleted-bet-history" },
          { label: "Cheat/Alert Bets", path: "/cheat-alert-bets" },
        ],
      },
      {
        label: "Wallet",
        options: [
          { label: "My Deposit/Withdraw", path: "/deposit-withdraw" },
          { label: "Tickets", path: "/tickets" },
          { label: "Gateway Transactions", path: "/gateway-transactions" },
          { label: "Bonus Chips", path: "/bonus-chips" },
        ],
      },
      {
        label: "Reports",
        options: [
          { label: "My Statement", path: "/my-statement" },
          {
            label: "P/L Report Downline Admins",
            path: "/pl-report-downline",
          },
          { label: "P/L Casino Report", path: "/pl-casino-report" },
          { label: "P/L Report Sports Wise", path: "/pl-report-sports" },
          { label: "P/L Report by Users", path: "/pl-report-users" },
          { label: "Match Wise P/L", path: "/match-wise-pl" },
        ],
      },
      {
        label: "SA Settings",
        options: [
          { label: "Edit Profile", path: "/edit-profile" },
          { label: "Reset Password", path: "/reset-password" },
          { label: "Activity Logs", path: "/activity-logs" },
        ],
      },
      {
        label: "Promotions",
        options: [
          { label: "Sports Promotions", path: "/sports-promotions" },
          { label: "Casino Promotions", path: "/casino-promotions" },
        ],
      },
    ],

    promotions: [
      {
        label: "Settings",
        options: [{ label: "Edit Profile" }, { label: "Reset Password" }],
      },
      {
        label: "Promotions",
        options: [
          {
            label: "Create Promotions Type",
            path: "/create-promotion-type",
          },
          { label: "Sports Promotions", path: "/sports-promotions" },
          { label: "Casino Promotions", path: "/casino-promotions" },
          { label: "Banners (Casino/Sports)", path: "/banners" },
          { label: "Broadcasting", path: "/broadcasting" },
        ],
      },
    ],

    "risk management": [
      {
        label: "Live/Block",
        options: [
          { label: "Sports", path: "/live-block-sports" },
          { label: "Casino", path: "/casino" },
          { label: "Set Limits", path: "/set-limits" },
          { label: "In-active Users", path: "/inactive-users" },
          { label: "Bet Block Users", path: "/bet-block-users" },
        ],
      },
      {
        label: "Risk Management",
        options: [
          { label: "Sports & Casino Risk Limit Set", path: "/risk-limit-set" },
          { label: "Sports", path: "/risk-sports" },
          { label: "Casino", path: "/risk-casino" },
          { label: "Live Bet List(Sports/Casino)", path: "/live-bet-list" },
          { label: "Deleted Bet History", path: "/deleted-bet-history" },
          { label: "Cheat/Alert Bets", path: "/cheat-alert-bets" },
        ],
      },
      {
        label: "Reports",
        options: [
          { label: "P/L Report Downline Admins", path: "/pl-report-downline" },
          { label: "P/L Casino Report", path: "/pl-casino-report" },
          { label: "P/L Report Sports Wise", path: "/pl-report-sports" },
          { label: "P/L Report by Users", path: "/pl-report-users" },
          { label: "Match Wise P/L", path: "/match-wise-pl" },
        ],
      },
      {
        label: "Settings",
        options: [
          { label: "Results", path: "/results" },
          { label: "Edit Profile" },
          { label: "Reset Password" },
          { label: "Activity Logs", path: "/activity-logs" },
        ],
      },
    ],

    accounts: [
      {
        label: "Wallet",
        options: [
          { label: "My Deposit/Withdraw", path: "/deposit-withdraw" },
          {
            label: "Offline Deposit/Withdraw",
            path: "/offline-deposit-withdraw",
          },
          { label: "Tickets", path: "/tickets" },
          { label: "Gateway Transactions", path: "/gateway-transactions" },
        ],
      },
      {
        label: "Reports",
        options: [
          { label: "Client Rental Sheet", path: "/client-rental-sheet" },
        ],
      },
      {
        label: "Settings",
        options: [{ label: "Edit Profile" }, { label: "Reset Password" }],
      },
    ],
    designing_team: [
      {
        label: "Settings",
        options: [{ label: "Edit Profile" }, { label: "Reset Password" }],
      },
      {
        label: "Promotions",
        options: [
          {
            label: "Create Promotions Type",
            path: "/create-promotion-type",
          },
          { label: "Sports Promotions", path: "/sports-promotions" },
          { label: "Casino Promotions", path: "/casino-promotions" },
          { label: "Banners (Casino/Sports)", path: "/banners" },
          { label: "Broadcasting", path: "/broadcasting" },
        ],
      },
    ],
  };
  const menuItems = menuConfig[role_code] || [];

  const handleDropdownToggle = (index, isOpen) => {
    setActiveIndex(index);
    setActiveDropdown(isOpen ? index : null);
  };

  const handleMenuItemClick = (option) => {
    if (option.label === "Edit Profile") {
      setEditProfilePopup(true);
    } else if (option.label === "Reset Password") {
      setResetPasswordPopup(true);
    } else if (option.path) {
      navigate(option.path);
    }
  };

  return (
    <div className="w-100 d-flex grey-bg3">
      {menuItems.map((menu, index) => (
        <div
          className={
            ["management", "director", "super_admin"].includes(role_code)
              ? "col"
              : "col-2"
          }
          key={index}
        >
          <Dropdown
            className="w-100"
            onClick={(isOpen) => handleDropdownToggle(index, isOpen)}
          >
            <Dropdown.Toggle
              variant="none"
              className={`${activeIndex === index ? "grey-btn" : "balck-btn"
                } br-0px flex-center w-100`}
              id={`dropdown-${index}`}
            >
              <span className="medium-font">{menu.label}</span>
              {activeDropdown === index ? (
                <FaChevronUp size={16} className="ms-2" />
              ) : (
                <FaChevronDown size={16} className="ms-2" />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100 br-0px p-0 text-ellipsis">
              {menu?.options?.map((option, optIndex) => (
                <Dropdown.Item
                  key={optIndex}
                  className="w-100 white-btn yellow-hover small-font"
                  onClick={() => handleMenuItemClick(option)}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ))}
      <EditProfilePopup
        editProfilePopup={editProfilePopup}
        setEditProfilePopup={setEditProfilePopup}
      />
      <ResetPasswordPopup
        resetPasswordPopup={resetPasswordPopup}
        setResetPasswordPopup={setResetPasswordPopup}
      />
    </div>
  );
}

export default SubHeader;
