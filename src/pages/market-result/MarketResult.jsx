import React from "react";
import { FaSearch } from "react-icons/fa";
import ScrollTable from "../../components/ScrollTable";

const MarketResult = () => {
  const sportcols = [
    { header: <div className="flex-center">Sport</div>, field: "sport" ,width:"10%",},
    { header: "Date & Time", field: "date", width:"15%",},
    { header: "MatchName/Id", field: "match" ,width:"35%",},
    { header: "Market", field: "mar",width:"10%", },
    { header: "Winner", field: "winner",width:"10%", },
    {
      header: <div className="flex-center">IP</div>,
      field: "ip",width:"10%",
    },
    { header: <div className="flex-center">Action</div>, field: "action",width:"10%", },
  ];

  const data = [
    {
      sport: <div className="mb-1 flex-center">Cricket</div>,
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
        <div className="d-flex flex-center pointer">
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
      sport: <div className="mb-1 flex-center">Cricket</div>,
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
        <div className="d-flex flex-center  pointer">
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
      sport: <div className="mb-1 flex-center">Cricket</div>,
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
      sport: <div className="mb-1 flex-center">Cricket</div>,
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
      sport: <div className="mb-1 flex-center">Cricket</div>,
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
      sport: <div className="mb-1 flex-center">Cricket</div>,
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
      sport: <div className="mb-1 flex-center">Cricket</div>,
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
    <div className="p-1">
      <h6 className="mb-2 mt-3">Market Result</h6>

      <div className="row w-100 text-black small-font">
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
        <div className="col-3 d-flex flex-column">
          <label className="mb-1">Select Market</label>
          <select className="input-css2 small-font">
            <option>Select</option>
            <option>Cricket</option>
            <option>sport1</option>
            <option>sport1</option>
          </select>
        </div>
        <div className="col-3 d-flex flex-column">
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
        <div className="col-2 flex-end flex-center">
          <div className="white-bg px-2 border py-1 rounded-pill w-100 white-space px-3">
            <FaSearch size={15} className="grey-clr me-2" />
            <input
              className="all-none small-font"
              placeholder="Search Match..."
            />
          </div>
        </div>
      </div>

      <div className="my-4">
        <ScrollTable columns={sportcols} data={data} tableHeight={"table-50vh"} />
      </div>
    </div>
  );
};

export default MarketResult;
