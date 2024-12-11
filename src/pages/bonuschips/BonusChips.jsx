import React, { useState } from "react";
import Table from "../../components/Table";
import { FaSearch } from "react-icons/fa";
import { BsEye } from "react-icons/bs";

function BonusChips() {
  const BONUS_COLUMNS = [
    { header: "Date & Time", field: "dateTime" },
    { header: "Trn ID", field: "trnid" },
    { header: "Type", field: "type" },
    { header: "Used/Credit", field: "usedcredit" },
    { header: "Bonus Use By", field: "bonus" },
    { header: "Bonus Credit form", field: "bonuscredit" },
    { header: "Bonus Chips Amt", field: "bonuschipsamnt" },
  ];

  const BONUS_DATA = [
    {
      dateTime: "07-10-2024, 17:17:00",
      trnid: <div>123456781234</div>,
      type: "1st Deposit Bonus",
      usedcredit: "used",
      bonus: "Texchange - Sports",
      bonuscredit: <div>-</div>,
      bonuschipsamnt: <div className="red-font">2000</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      trnid: <div>123456781234</div>,
      type: "Cashback Bonus",
      usedcredit: "Credit",
      bonus: "-",
      bonuscredit: <div>T Casino Park</div>,
      bonuschipsamnt: <div className="green-font">2000</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      trnid: <div>123456781234</div>,
      type: "1st Deposit Bonus",
      usedcredit: "used",
      bonus: "Texchange - Sports",
      bonuscredit: <div>-</div>,
      bonuschipsamnt: <div className="red-font">2000</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      trnid: <div>123456781234</div>,
      type: "Cashback Bonus",
      usedcredit: "Credit",
      bonus: "-",
      bonuscredit: <div>T Casino Park</div>,
      bonuschipsamnt: <div className="green-font">2000</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      trnid: <div>123456781234</div>,
      type: "1st Deposit Bonus",
      usedcredit: "used",
      bonus: "Texchange - Sports",
      bonuscredit: <div>-</div>,
      bonuschipsamnt: <div className="red-font">2000</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      trnid: <div>123456781234</div>,
      type: "Cashback Bonus",
      usedcredit: "Credit",
      bonus: "-",
      bonuscredit: <div>T Casino Park</div>,
      bonuschipsamnt: <div className="green-font">2000</div>,
    },
  ];
  const buttons = ["All Bonus", "1st Deposit Bonus", "Cashback", "Promotions"];
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <div className="flex-column mb-3 mt-2">
        <h6 className="d-flex yellow-font my-2">Bonus Chips</h6>
        <div className="d-flex small-font">
          {buttons.map((btn, index) => (
            <div
              key={index}
              className={`me-3 ${
                activeIndex === index ? "saffron-btn2" : "white-btn2"
              }`}
              onClick={() => handleActiveIndex(index)}
            >
              {btn}
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              Total Bonus Chips
            </div>
            <div className="white-bg p-2 text-center green-font rounded-bottom">
              10000000
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              Used Bonus Chips
            </div>
            <div className="white-bg p-2 text-center red-font rounded-bottom">
              10000000
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              Available Bonus Chips
            </div>
            <div className="white-bg p-2 text-center green-font rounded-bottom">
              10000000
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 d-flex align-items-center justify-content-between my-3">
        <div className="w-50 row">
          <div className="col flex-column">
            <label className="black-text4 small-font mb-1">From</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="col flex-column">
            <label className="black-text4 small-font mb-1">To</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="col flex-column d-flex align-items-end justify-content-end">
            <button className="w-100 saffron-btn2 small-font">Submit</button>
          </div>
        </div>
        <div className="w-25 input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <Table columns={BONUS_COLUMNS} data={BONUS_DATA} itemsPerPage={2} />
    </div>
  );
}

export default BonusChips;
