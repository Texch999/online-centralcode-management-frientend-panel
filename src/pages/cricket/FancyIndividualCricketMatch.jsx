import React from "react";
import Table from "../../components/Table";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const FancyIndividualCricketMatch = () => {
  const navigate = useNavigate();
  const { vendor, provider, match, individualMatch } = useParams();
  const cols = [
    { header: <div>Fancy Odds</div>, field: "fancyodds" },
    { header: <div className="flex-center">No</div>, field: "no", width: "9%" },
    {
      header: <div className="flex-center">Yes</div>,
      field: "yes",
      width: "9%",
    },
    { header: "No", field: "no1" },
    { header: "Yes", field: "yes1" },
    { header: <div className="flex-center">Position</div>, field: "position" },
    { header: "Profit & Loss", field: "pl" },
  ];

  const data = [
    {
      fancyodds: <div>10 Over New Zealand Adv</div>,
      no: (
        <div className="flex-column back-box p-1 text-center">
          <span className="fw-600">53</span>
          <span>100</span>
        </div>
      ),
      yes: (
        <div className="flex-column lay-box p-1 text-center">
          <span className="fw-600">1.58</span>
          <span>1638k</span>
        </div>
      ),
      no1: <div>10000000</div>,
      yes1: <div>10000000</div>,
      position: (
        <div className="flex-center">
          <div className="w-fit green-btn">Declared</div>
        </div>
      ),
      pl: <div className="green-clr">10000000</div>,
    },
    {
      fancyodds: <div>10 Over India Adv</div>,
      no: (
        <div className="flex-column back-box p-1 text-center">
          <span className="fw-600">53</span>
          <span>100</span>
        </div>
      ),
      yes: (
        <div className="flex-column lay-box p-1 text-center">
          <span className="fw-600">1.58</span>
          <span>16.3k</span>
        </div>
      ),
      no1: <div>10000000</div>,
      yes1: <div>10000000</div>,
      position: (
        <div className="flex-center ">
          <div className="w-fit red-btn">LIVE</div>
        </div>
      ),
      pl: <div className="green-clr">-</div>,
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between my-3">
        <div className="pointer large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Sports <MdKeyboardArrowRight />
            {vendor}
            <MdKeyboardArrowRight /> {provider} <MdKeyboardArrowRight /> {match}
          </span>
          <span className="black-text4">
            <MdKeyboardArrowRight />
            {individualMatch}
          </span>
        </div>
        <div className="small-font flex-center">
          <span
            className="flex-center white-bg rounded-pill me-3 px-2 grey-border py-1 hover-orange-clr pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2 d-flex" />
            Back
          </span>
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>
      <Table columns={cols} data={data} itemsPerPage={4} />
    </div>
  );
};

export default FancyIndividualCricketMatch;
