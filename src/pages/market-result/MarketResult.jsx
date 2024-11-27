import React from "react";
import { FaSearch } from "react-icons/fa";
import ScrollTable from "../../components/ScrollTable";

const MarketResult = () => {
  const sportcols = [
    { header: "Sport", field: "sport" },
    { header: "Date & Time", field: "date" },
    { header: "MatchName/Id", field: "match" },
    { header: "Market", field: "mar" },
    { header: "Winner", field: "winner" },
    {
      header: <div className="flex-center">IP</div>,
      field: "ip",
    },
    { header: <div className="flex-center">Action</div>, field: "action" },
  ];

  const data = [
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: (
        <div className="mb-1 flex-column">
          India vs Sri Lanka
          <div>M ID: 1234567366</div>
        </div>
      ),
      mar: <div>Book Maker 1</div>,
      winner: <div>India</div>,
      ip: <div className="flex-center">23.434.56.239</div>,
      action: (
        <div className="d-flex flex-center">
          <div className="flex-center me-2">
            <div className="red-btn">Rollback</div>
          </div>
          <div className="flex-center">
            <div className="green-btn">Active</div>
          </div>
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: (
        <div className="mb-1 flex-column">
          India vs Sri Lanka
          <div>M ID: 1234567366</div>
        </div>
      ),
      mar: <div>Book Maker 1</div>,
      winner: <div>India</div>,
      ip: <div className="flex-center">23.434.56.239</div>,
      action: (
        <div className="d-flex flex-center">
          <div className="flex-center me-2">
            <div className="red-btn">Rollback</div>
          </div>
          <div className="flex-center">
            <div className="green-btn">Active</div>
          </div>
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: (
        <div className="mb-1 flex-column">
          India vs Sri Lanka
          <div>M ID: 1234567366</div>
        </div>
      ),
      mar: <div>Book Maker 1</div>,
      winner: <div>India</div>,
      ip: <div className="flex-center">23.434.56.239</div>,
      action: (
        <div className="d-flex flex-center">
          <div className="flex-center me-2">
            <div className="red-btn">Rollback</div>
          </div>
          <div className="flex-center">
            <div className="green-btn">Active</div>
          </div>
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: (
        <div className="mb-1 flex-column">
          India vs Sri Lanka
          <div>M ID: 1234567366</div>
        </div>
      ),
      mar: <div>Book Maker 1</div>,
      winner: <div>India</div>,
      ip: <div className="flex-center">23.434.56.239</div>,
      action: (
        <div className="d-flex flex-center">
          <div className="flex-center me-2">
            <div className="red-btn">Rollback</div>
          </div>
          <div className="flex-center">
            <div className="green-btn">Active</div>
          </div>
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: (
        <div className="mb-1 flex-column">
          India vs Sri Lanka
          <div>M ID: 1234567366</div>
        </div>
      ),
      mar: <div>Book Maker 1</div>,
      winner: <div>India</div>,
      ip: <div className="flex-center">23.434.56.239</div>,
      action: (
        <div className="d-flex flex-center">
          <div className="flex-center me-2">
            <div className="red-btn">Rollback</div>
          </div>
          <div className="flex-center">
            <div className="green-btn">Active</div>
          </div>
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: (
        <div className="mb-1 flex-column">
          India vs Sri Lanka
          <div>M ID: 1234567366</div>
        </div>
      ),
      mar: <div>Book Maker 1</div>,
      winner: <div>India</div>,
      ip: <div className="flex-center">23.434.56.239</div>,
      action: (
        <div className="d-flex flex-center">
          <div className="flex-center me-2">
            <div className="red-btn">Rollback</div>
          </div>
          <div className="flex-center">
            <div className="green-btn">Active</div>
          </div>
        </div>
      ),
    },
    {
      sport: <div className="mb-1">Cricket</div>,
      date: <div className="">14-10-2024 13:33:00</div>,
      match: (
        <div className="mb-1 flex-column">
          India vs Sri Lanka
          <div>M ID: 1234567366</div>
        </div>
      ),
      mar: <div>Book Maker 1</div>,
      winner: <div>India</div>,
      ip: <div className="flex-center">23.434.56.239</div>,
      action: (
        <div className="d-flex flex-center">
          <div className="flex-center me-2">
            <div className="red-btn">Rollback</div>
          </div>
          <div className="flex-center">
            <div className="green-btn">Active</div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <h4>Market Result</h4>

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
          <label className="mb-1">Select Match</label>
          <select className="input-css2 small-font">
            <option>Select</option>
            <option>Cricket</option>
            <option>sport1</option>
            <option>sport1</option>
          </select>
        </div>
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">Select Market</label>
          <select className="input-css2 small-font">
            <option>Select</option>
            <option>Cricket</option>
            <option>sport1</option>
            <option>sport1</option>
          </select>
        </div>
        <div className="col-2 d-flex flex-column">
          <label className="mb-1">Select Winner</label>
          <select className="input-css2 small-font">
            <option>Select</option>
            <option>Cricket</option>
            <option>sport1</option>
            <option>sport1</option>
          </select>
        </div>

        <div className="col-2 flex-end">
          <div className="w-100 saffron-btn br-5 small-font">Set Result</div>
        </div>
        {/* <div className="col-2"></div> */}
      </div>
      <div className="hor-grey-line my-4"></div>

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
          <div className="w-100 saffron-btn br-5 small-font">Submit</div>
        </div>
        <div className="col-2"></div>
        <div className="col-2 flex-end">
          <div className="white-input rounded-pill w-100">
            <FaSearch size={15} className="grey-clr me-2" />
            <input
              className="all-none small-font"
              placeholder="Search Match..."
            />
          </div>
        </div>
      </div>

      <div className="my-4">
        <ScrollTable columns={sportcols} data={data} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default MarketResult;
