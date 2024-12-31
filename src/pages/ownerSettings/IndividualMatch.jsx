import Table from "../../components/Table";
import { FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";

const IndividualMatch = () => {
  const { matchName } = useParams();
  const RISK_COLUMNS = [
    { header: "Date & Time", field: "dateTime" },
    { header: "Series Name", field: "seriesName" },
    { header: "Match Name", field: "matchName" },
    { header: "Fancy Result", field: "result" },
    { header: "Runs", field: "runs" },
    { header: "Result Date & Time", field: "resultDateTime" },
  ];

  const RISK_DATA = [
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div>
          New Zealand Wo <br /> vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo , 10 overs</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: <div className="green-font">Runs:120</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <BsEye />
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div>
          New Zealand Wo <br /> vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo , 10 overs</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: <div className="green-font">Runs:120</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <BsEye />
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div>
          New Zealand Wo <br /> vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo , 10 overs</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: <div className="green-font">Runs:120</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <BsEye />
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div>
          New Zealand Wo <br /> vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo , 10 overs</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: <div className="green-font">Runs:120</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <BsEye />
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div>
          New Zealand Wo <br /> vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo , 10 overs</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: <div className="green-font">Runs:120</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <BsEye />
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          1-10-2024
          <br />
          16:11:00
        </div>
      ),
      sports: <div>Cricket</div>,
      seriesName: (
        <div>
          ICICI T20 Women World Cup <br /> 2024
          <br />
          M. ID: 1.11045677544
        </div>
      ),
      oddsRiskLoss: <div>1000000000</div>,
      matchName: (
        <div>
          New Zealand Wo <br /> vs South Africa Wo
          <br />M ID: 11023843754858
        </div>
      ),

      result: (
        <div>
          <span className="green-font"> New Zealand Wo , 10 overs</span>
          <br />R ID: 12345678943323
        </div>
      ),
      runs: <div className="green-font">Runs:120</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
      viewFancy: (
        <div className="flex-center large-font">
          <BsEye />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-between w-100 mt-2 mb-3">
        <div className="d-flex align-items-center">
          <h6 className="mb-0">Result</h6>
          <FiChevronRight size={18} />
          <h6 className="mb-0">Cricket</h6>
          <FiChevronRight className="saffron-clr" size={18} />
          <h6 className="saffron-clr mb-0">{matchName}</h6>
        </div>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <Table columns={RISK_COLUMNS} data={RISK_DATA} itemsPerPage={4} />
    </div>
  );
};

export default IndividualMatch;
