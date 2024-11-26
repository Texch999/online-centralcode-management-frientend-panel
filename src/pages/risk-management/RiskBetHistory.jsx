import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

function RiskBetHistory() {
  const { matchName } = useParams();
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center">
          <h5 className="black-font mb-0">Risk Management - Sports</h5>
          <h6 className="ms-3 d-flex align-items-center yellow-font mb-0">
            <FaAngleRight /> Risk Bet History({matchName})
          </h6>
        </div>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <div className="small-font ms-2">
            P/L : <span className="white-btn2 green-font">10000000</span>
          </div>
        </div>
      </div>
      <div className="d-flex w-50">
        <div className="col-4 flex-column me-3">
          <label className="black-text4 small-font mb-1">Bet Palced</label>
          <select className="input-css2 small-font">
            <option>Select</option>
          </select>
        </div>
        <div className="col-4 flex-column me-3">
          <label className="black-text4 small-font mb-1">Bet Position</label>{" "}
          <select className="input-css2 small-font">
            <option>Select</option>
          </select>
        </div>
        <div className="col-2  flex-column d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2 small-font">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default RiskBetHistory;
