import React from "react";
import Table from "../../components/Table";
import { MdBlock, MdDeleteOutline } from "react-icons/md";

const Cricket = () => {
  const cols = [
    { header: "", field: "watch" },
    { header: "Date & Time", field: "date" },
    { header: "Matches/ID", field: "match" },
    { header: "Series Name/ID", field: "series" },
    { header: <div className="flex-end">Back</div>, field: "back" },
    { header: <div className="flex-start">Lay</div>, field: "lay" },
    { header: <div className="flex-center">Back/Lay</div>, field: "bl" },
    { header: <div className="flex-center">Action</div>, field: "action" },
  ];
  const data = [
    {
      watch: <div className="green-btn w-fit ms-2">In Play</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: (
        <div className="d-flex flex-column">
          <div>New Zealand vs India</div>
          <div>12345678912343455</div>
        </div>
      ),
      series: (
        <div className="d-flex flex-column">
          <div>ICC Women T20 world cup</div>
          <div>12345678912343455</div>
        </div>
      ),
      back: (
        <div className="d-flex">
          <div className="d-flex flex-column back-box flex-center">
            <span>3.05</span>
            <span>2k</span>
          </div>
          <div className="d-flex flex-column back-box flex-center">
            <span>3.05</span>
            <span>2k</span>
          </div>
          <div className="d-flex flex-column back-box flex-center">
            <span>3.05</span>
            <span>2k</span>
          </div>
        </div>
      ),
      lay: (
        <div className="d-flex">
          <div className="d-flex flex-column lay-box flex-center">
            <span>3.05</span>
            <span>2k</span>
          </div>
          <div className="d-flex flex-column lay-box flex-center">
            <span>3.05</span>
            <span>2k</span>
          </div>
          <div className="d-flex flex-column lay-box flex-center">
            <span>3.05</span>
            <span>2k</span>
          </div>
        </div>
      ),
      bl: (
        <div className="d-flex flex-center">
          <div className="">
            <div>Back</div>
            <div className="">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 mb-1 ms-2">10000</div>
            <div className="lay-btn-cricket px-2 ms-2  ">30000</div>
          </div>
        </div>
      ),
      action: (
        <div class="d-flex flex-center">
          <div>
            <MdBlock className="font-20 dark-orange-clr mx-2" />
          </div>
          <div>
            <MdDeleteOutline className="font-20" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="p-2">
      <h4>Cricket</h4>

      <div>
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default Cricket;
