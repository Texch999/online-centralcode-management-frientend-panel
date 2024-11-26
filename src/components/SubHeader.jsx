import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

function SubHeader() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const menuItems = [
    {
      label: "Adding",
      options: [
        { label: "Management Team", path: "/management-team" },
        { label: "Director & Super Admin", path: "/director-admin" },
        { label: "View Downline List", path: "/downline-list" },
        { label: "Payment Details", path: "/payment-details" },
        { label: "Websites", path: "/websites" },
      ],
    },
    {
      label: "Live/Block",
      options: [
        { label: "Sports", path: "/sports" },
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
        { label: "Reference Data", path: "/reference-data" },
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Activity Logs", path: "/activity-logs" },
      ],
    },
    {
      label: "Promotions",
      options: [
        { label: "Sports Promotions", path: "/sports-promotions" },
        { label: "Casino Promotions", path: "/casino-promotions" },
        { label: "Banners (Casino/Sports)", path: "/banners" },
        { label: "Broadcasting", path: "/broadcasting" },
      ],
    },
  ];

  const handleDropdownToggle = (index, isOpen) => {
    setActiveDropdown(isOpen ? index : null);
    setActiveIndex(index);
  };

  return (
    <div className="w-100 d-flex">
      {menuItems.map((menu, index) => (
        <div className="col" key={index}>
          <Dropdown
            onToggle={(isOpen) => handleDropdownToggle(index, isOpen)}
            className="w-100"
          >
            <Dropdown.Toggle
              variant="none"
              className={`${
                activeIndex === index ? "grey-btn" : "balck-btn"
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
            <Dropdown.Menu className="w-100 br-0px p-0 medium-font text-ellipsis">
              {menu.options.map((option, optIndex) => (
                <Dropdown.Item
                  key={optIndex}
                  className="white-btn yellow-hover medium-font"
                  onClick={() => navigate(option.path)}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ))}
    </div>
  );
}

export default SubHeader;
