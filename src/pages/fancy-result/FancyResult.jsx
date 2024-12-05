import React from "react";
import ScrollTable from "./../../components/ScrollTable";
import { FaSearch } from "react-icons/fa";
import { BsEye } from "react-icons/bs";

const FancyResult = () => {
  const cols = [
    { header: <div className="ms-2">Sport</div>, field: "sport" },
    { header: "Fancy Id", field: "fid" },
    { header: "Fancy Name", field: "fname" },
    { header: "MatchName", field: "match" },
  ];
  const data = [
    {
      sport: (
        <div className="d-flex flex-column small-font ms-2">
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
          <div className="saffron-btn br-5 w-fit px-3">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit px-3">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
    {
      sport: (
        <div className="d-flex flex-column small-font ms-2">
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
          <div className="saffron-btn br-5 w-fit px-3">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit px-3">Suspended</div>
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
          <div className="saffron-btn br-5 w-fit px-3">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit px-3">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
    {
      sport: (
        <div className="d-flex flex-column small-font ms-2">
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
          <div className="saffron-btn br-5 w-fit px-3">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit px-3">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
    {
      sport: (
        <div className="d-flex flex-column small-font ms-2">
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
          <div className="saffron-btn br-5 w-fit px-3">Set</div>
        </div>
      ),
      fname: (
        <div className="d-flex flex-column small-font">
          <div className="mb-1">
            T20 Women’s World Cup (New Zealand vs South Africa) adv
          </div>
          <div className="rust-red-btn w-fit px-3">Suspended</div>
        </div>
      ),
      match: <div>New Zealand vs South Africa</div>,
    },
  ];

  const sportcols = [
    { header: <div className="flex-center">Sport</div>, field: "sport" , width:"10%"},
    { header: "Date & Time", field: "date",width:"10%" },
    { header: "MatchName", field: "match", width:"40%" },
    { header: <div className="flex-center">Event Id</div>, field: "eid" ,width:"10%"},
    { header: "Market Id", field: "mid" ,width:"10%",},
    {
      header: <div className="flex-center">Result Status</div>,
      field: "resstatus",width:"10%",
    },
    { header: <div className="flex-center">Action</div>, field: "action", width:"10%" },
  ];

  const sportData = [
    {
      sport: <div className="mb-1 flex-center">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div className="flex-center">12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: (
        <div className="flex-center">
          <div className="active-btn-table px-2">Open</div>
        </div>
      ),
      action: (
        <div className="flex-center">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
    {
      sport: <div className="mb-1 flex-center">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div className="flex-center">12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: (
        <div className="flex-center">
          <div className="active-btn-table px-2">Open</div>
        </div>
      ),
      action: (
        <div className="flex-center">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
    {
      sport: <div className="mb-1 flex-center">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div className="flex-center">12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: (
        <div className="flex-center">
          <div className="active-btn-table px-2">Open</div>
        </div>
      ),
      action: (
        <div className="flex-center">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
    {
      sport: <div className="mb-1 flex-center">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div className="flex-center">12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: (
        <div className="flex-center">
          <div className="active-btn-table px-2">Open</div>
        </div>
      ),
      action: (
        <div className="flex-center">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
    {
      sport: <div className="mb-1 flex-center">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: <div className="mb-1">India vs Sri Lanka</div>,
      eid: <div className="flex-center">12345673</div>,
      mid: <div>1.234567366</div>,
      resstatus: (
        <div className="flex-center">
          <div className="active-btn-table px-2">Open</div>
        </div>
      ),
      action: (
        <div className="flex-center">
          <BsEye className="font-15 text-black" />
        </div>
      ),
    },
  ];

  return (
    <div className="p-1">
      <h6 className="mt-3 mb-2">Fancy Result</h6>
      <div className="mb-3 row w-100 text-black small-font ">
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">Select Sport</label>
          <select className="white-input">
            <option>Select</option>
            <option>sport1</option>
            <option>sport1</option>
            <option>sport1</option>
          </select>
        </div>
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">Select Match</label>
          <select className="white-input">
            <option>Select</option>
            <option>match1</option>
            <option>match1</option>
            <option>match1</option>
          </select>
        </div>
        <div className="col-2 flex-end">
          <div className="white-input rounded-pill w-100 white-space">
            <FaSearch size={15} className="grey-clr me-2" />
            <input
              className="all-none small-font"
              placeholder="Search Match..."
            />
          </div>
        </div>
      </div>

      <div className="">
        <ScrollTable columns={cols} data={data}  tableHeight={"table-50vh"} />
      </div>

      <div className="row mt-3 w-100 text-black small-font">
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">Select Sport</label>
          <select className="input-css2 small-font">
            <option>Select</option>
            <option>Cricket</option>
            <option>sport1</option>
            <option>sport1</option>
          </select>
        </div>
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-2 flex-end">
          <div className="w-100 saffron-btn2 br-5 small-font">Submit</div>
        </div>
        <div className="col-2"></div>
        <div className="col-2 flex-end flex-center">
          <div className="white-bg2 border px-2 py-1 rounded-pill w-100 white-space">
            <FaSearch size={15} className="grey-clr me-2" />
            <input
              className="all-none small-font"
              placeholder="Search Match..."
            />
          </div>
        </div>
      </div>

      <div className="my-3">
        <ScrollTable columns={sportcols} data={sportData}  tableHeight={"table-50vh"} />
      </div>
    </div>
  );
};

export default FancyResult;
