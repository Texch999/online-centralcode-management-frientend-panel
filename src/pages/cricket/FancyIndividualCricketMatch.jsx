import React from "react";
import Table from "../../components/Table";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const FancyIndividualCricketMatch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vendor, provider, match, individualMatch } = useParams();
  const cols = [
    { header: <div className="ms-3">Fancy Odds</div>, field: "fancyodds" },
    { header: <div className="flex-center">No</div>, field: "no" },
    { header: <div className="flex-center">Yes</div>, field: "yes" },
    { header: "No", field: "no1" },
    { header: "Yes", field: "yes1" },
    { header: <div className="flex-center">Position</div>, field: "position" },
    { header: "Profit & Loss", field: "pl" },
  ];

  const data = [
    {
      fancyodds: <div className="ms-3 my-2">10 Over New Zealand Adv</div>,
      no: (
        <div className="d-flex flex-column back-box py-1 text-center">
          <span>53</span>
          <span>100</span>
        </div>
      ),
      yes: (
        <div className="d-flex flex-column lay-box py-1 text-center">
          <span>1.58</span>
          <span>16.3k</span>
        </div>
      ),
      no1: <div className="my-2">10000000</div>,
      yes1: <div className="my-2">10000000</div>,
      position: (
        <div className="flex-center ">
          <div className="w-fit green-btn">declared</div>
        </div>
      ),
      pl: <div className="green-clr my-2">10000000</div>,
    },

    {
      fancyodds: <div className="ms-3 my-2">10 Over India Adv</div>,
      no: (
        <div className="d-flex flex-column back-box py-1 text-center">
          <span>53</span>
          <span>100</span>
        </div>
      ),
      yes: (
        <div className="d-flex flex-column lay-box py-1 text-center">
          <span>1.58</span>
          <span>16.3k</span>
        </div>
      ),
      no1: <div className="my-2">10000000</div>,
      yes1: <div className="my-2">10000000</div>,
      position: (
        <div className="flex-center ">
          <div className="w-fit red-btn">Live</div>
        </div>
      ),
      pl: <div className="green-clr my-2">-</div>,
    },

    {
      fancyodds: <div className="ms-3 my-2">15 Over New Zealand Adv</div>,
      no: (
        <div className="d-flex flex-column back-box py-1 text-center">
          <span>53</span>
          <span>100</span>
        </div>
      ),
      yes: (
        <div className="d-flex flex-column lay-box py-1 text-center">
          <span>1.58</span>
          <span>16.3k</span>
        </div>
      ),
      no1: <div className="my-2">0</div>,
      yes1: <div className="my-2">0</div>,
      position: (
        <div className="flex-center ">
          <div className="w-fit red-btn">Live</div>
        </div>
      ),
      pl: <div className="green-clr my-2">-</div>,
    },
    {
      fancyodds: <div className="ms-3 my-2">20 Over New Zealand Adv</div>,
      no: (
        <div className="d-flex flex-column back-box py-1 text-center">
          <span>53</span>
          <span>100</span>
        </div>
      ),
      yes: (
        <div className="d-flex flex-column lay-box py-1 text-center">
          <span>1.58</span>
          <span>16.3k</span>
        </div>
      ),
      no1: <div className="my-2">10000000</div>,
      yes1: <div className="my-2">10000000</div>,
      position: (
        <div className="flex-center ">
          <div className="w-fit red-btn">Live</div>
        </div>
      ),
      pl: <div className="green-clr my-2">10000000</div>,
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between mb-3">
        <div className="pointer large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Sports <span className="mx-1 font-20">{">"}</span>
          </span>
          <span className="grey-clr">{vendor}</span>
          <span className="grey-clr">
            <span className="mx-1 font-20 grey-clr">{">"}</span>
            {provider}
          </span>
          <span className="grey-clr">
            <span className="mx-1 font-20 grey-clr">{">"}</span>
            {match}
          </span>
          <span>
            <span className="mx-1 font-20">{">"}</span>
            <span className="fw-600">{individualMatch}</span>
          </span>
        </div>
        <div className="medium-font">
          <span
            className="white-bg rounded-pill me-4 px-3 grey-border py-1 hover-orange-clr pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Back
          </span>
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>

      <div>
        <Table columns={cols} data={data} itemsPerPage={4} />
      </div>
    </div>
  );
};

export default FancyIndividualCricketMatch;
