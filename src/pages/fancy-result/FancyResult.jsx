import React from "react";
import ScrollTable from "./../../components/ScrollTable";
import { FaSearch } from "react-icons/fa";
import { BsEye } from "react-icons/bs";

const FancyResult = () => {
  const cols = [
    { header: "Sport", field: "sport" },
    { header: "Fancy Id", field: "fid" },
    { header: "Fancy Name", field: "fname" },
    { header: "MatchName", field: "match" },
  ];
  const data = [
    {
      sport: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">Cricket</div>
          <input
            type="text"
            placeholder="Enter Result"
            className="white-input w-fit"
          />
        </div>
      ),
      fid: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">2345632345-13FY</div>
          <div className="saffron-btn br-5 w-fit">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
    {
      sport: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">Cricket</div>
          <input
            type="text"
            placeholder="Enter Result"
            className="white-input w-fit"
          />
        </div>
      ),
      fid: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">2345632345-13FY</div>
          <div className="saffron-btn br-5 w-fit">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
    {
      sport: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">Cricket</div>
          <input
            type="text"
            placeholder="Enter Result"
            className="white-input w-fit"
          />
        </div>
      ),
      fid: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">2345632345-13FY</div>
          <div className="saffron-btn br-5 w-fit">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
    {
      sport: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">Cricket</div>
          <input
            type="text"
            placeholder="Enter Result"
            className="white-input w-fit"
          />
        </div>
      ),
      fid: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">2345632345-13FY</div>
          <div className="saffron-btn br-5 w-fit">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
    {
      sport: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">Cricket</div>
          <input
            type="text"
            placeholder="Enter Result"
            className="white-input w-fit"
          />
        </div>
      ),
      fid: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">2345632345-13FY</div>
          <div className="saffron-btn br-5 w-fit">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
  ];

  const sportcols = [
    { header: "Sport", field: "sport" },
    { header: "Date & Time", field: "date" },
    { header: "MatchName", field: "match" },
    { header: "Event Id", field: "eid" },
    { header: "Market Id", field: "mid" },
    { header: "Result Status", field: "resstatus" },
    { header: "Action", field: "action" },
  ];

  const sportData = [
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div>12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: <div className="green-btn">Open</div>,
      action: (
        <div className="">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div>12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: <div className="green-btn">Open</div>,
      action: (
        <div className="">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div>12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: <div className="green-btn">Open</div>,
      action: (
        <div className="">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div>12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: <div className="green-btn">Open</div>,
      action: (
        <div className="">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div>12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: <div className="green-btn">Open</div>,
      action: (
        <div className="">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
  ];

  return (
    <div className="p-2">
      <h4>Fancy Result</h4>
      <div className="my-3 d-flex w-100 align-items-center">
        <div className="col-12 d-flex">
          <div className="col-2 d-flex flex-column text-black small-font pe-2">
            <label className="mb-1">Select Sport</label>
            <select className="white-input">
              <option>Select</option>
              <option>sport1</option>
              <option>sport1</option>
              <option>sport1</option>
            </select>
          </div>
          <div className="col-2 d-flex flex-column text-black small-font px-2">
            <label className="mb-1">Select Match</label>
            <select className="white-input">
              <option>Select</option>
              <option>match1</option>
              <option>match1</option>
              <option>match1</option>
            </select>
          </div>
          <div className="col-2 mt-4 px-2">
            <div className="saffron-btn br-5 small-font">Search</div>
          </div>
        </div>
      </div>

      <div className="">
        <ScrollTable columns={cols} data={data} itemsPerPage={3} />
      </div>

      <div className="mt-3 d-flex w-100 align-items-center">
        <div className="col-12 d-flex">
          <div className="col-2 d-flex flex-column text-black small-font pe-2">
            <label className="mb-1">Select Sport</label>
            <select className="white-input">
              <option>Select</option>
              <option>Cricket</option>
              <option>sport1</option>
              <option>sport1</option>
            </select>
          </div>
          <div className="col-2 d-flex flex-column text-black small-font px-2">
            <label className="mb-1">From</label>
            <input className="white-input" type="date" />
          </div>
          <div className="col-2 d-flex flex-column text-black small-font px-2">
            <label className="mb-1">To</label>
            <input className="white-input" type="date" />
          </div>
          <div className="col-2 mt-3 px-2">
            <div className="saffron-btn br-5 small-font">Submit</div>
          </div>
          <div className="col-2"></div>

          <div className="col-2 mt-3">
            <div className="d-flex align-items-center white-input radius-50">
              <FaSearch size={18} className="grey-clr me-2" />
              <input
                className="all-none small-font"
                placeholder="Search Here..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-3">
        <ScrollTable columns={sportcols} data={sportData} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default FancyResult;
