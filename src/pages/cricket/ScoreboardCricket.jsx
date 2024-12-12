import { MdSportsCricket } from "react-icons/md";
import { IoTennisballOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

const ScoreboardCricket = () => {
  const [statsOpen, setStatsOpen] = useState(true);
  const handleStatsOpen = () => {
    setStatsOpen(!statsOpen);
  };
  return (
    <div className="flex-column w-100 text-white">
      <div className="rounded-grey-box my-2 px-1 py-1 w-100">
        <div className="d-flex flex-between">
          <span className="rounded-white-box">
            <MdSportsCricket className="orange-clr fw-800 icon" />
          </span>
          <span className="medium-font text-white fw-600">NZ</span>
          <span className="medium-font text-white">14-2</span>
          <span className="small-font text-white">3.3 ov</span>
          <span className="rounded-black-box text-white px-3 medium-font py-1 fw-600">
            Ball Start
          </span>
          <span className="medium-font text-white fw-600  ">0-0</span>
          <span className="small-font text-white">0.0 ov</span>
          <span className="medium-font text-white fw-600">IND</span>
          <span className="rounded-white-box">
            <IoTennisballOutline className="orange-clr fw-800 icon" />
          </span>
        </div>
      </div>
      <div className="black-score-box flex-column w-100">
        <div className="d-flex justify-content-between w-100">
          <div className="col w-100 px-2">
            <div className="d-flex w-100 py-1">
              <div className="col-4">Batsmen</div>
              <div className="col flex-center">R</div>
              <div className="col flex-center">B</div>
              <div className="col flex-center">4s</div>
              <div className="col flex-center">6s</div>
              <div className="col-2 flex-center">SR</div>
            </div>
            <div className="d-flex w-100 hor-white-top py-1">
              <div className="col-4">David</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col-2 flex-center">100</div>
            </div>
            <div className="d-flex w-100 py-1">
              <div className="col-4">Sachin</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col-2 flex-center">100</div>
            </div>
          </div>
          <div className="col-3 grey-box-table flex-column flex-center my-2 rounded">
            <div className="flex-center flex-wrap w-100">
              <div className="yellow-round text-black px-2 py-1 mt-1 mx-1">
                6
              </div>
              <div className="dark-blue-round px-2 py-1 mt-1 mx-1">0</div>
              <div className="green-round px-2 py-1 mt-1 mx-1">4</div>
              <div className="dark-blue-round px-2 py-1 mt-1 mx-1">0</div>
              <div className="light-blue-round px-2 py-1 mt-1 mx-1">2</div>
              <div className="red-round px-2 py-1 mt-1 mx-1">w</div>
            </div>
            <div className="medium-font fw-600 mt-2">CRR.6.50</div>
          </div>
          <div className="col w-100 px-2">
            <div className="d-flex w-100 py-1">
              <div className="col-4">Bowler</div>
              <div className="col flex-center">O</div>
              <div className="col flex-center">M</div>
              <div className="col flex-center">R</div>
              <div className="col flex-center">W</div>
              <div className="col-2 flex-center">ECO</div>
            </div>
            <div className="d-flex w-100 hor-white-top py-1">
              <div className="col-4">Kyle</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col-2 flex-center">100</div>
            </div>
            <div className="d-flex w-100 py-1">
              <div className="col-4">Jasprith</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col flex-center">100</div>
              <div className="col-2 flex-center">100</div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-between p-2 hor-white-top">
         <div>70%</div>
          <progress value="70" max="100" className="w-100 mx-1"></progress>
          <div>30%</div>
        </div>
      </div>
    </div>

    // <div className="w-100">
    //   <div className="w-100 d-flex grey-box-table rounded-pill p-1 white-text">
    //     <div className="col flex-between w-100">
    //       <MdSportsCricket
    //         size={24}
    //         className="white-bg orange-clr p-1 rounded-circle"
    //       />
    //       <span className="fw-600">IND</span>
    //       <span>
    //         <div className="fw-600">100-10</div>
    //         <div>100.0</div>
    //       </span>
    //     </div>
    //     <div className="col-3 flex-center mx-2">
    //       <div className="w-100 rounded-black-box p-1 flex-center">
    //         Ball Start
    //       </div>
    //     </div>
    //     <div className="col flex-between w-100">
    //       <span>
    //         <div className="fw-600">100-10</div>
    //         <div>100.0</div>
    //       </span>
    //       <span className="fw-600">PAK</span>
    //       <IoTennisballOutline
    //         size={24}
    //         className="white-bg orange-clr p-1 rounded-circle"
    //       />
    //     </div>
    //   </div>
    //   <div className="w-100 black-score-box p-1 mt-1 white-text">
    //     <div className="d-flex w-100 my-2">
    //       <div className="col d-flex align-items-center">CRR 2.67</div>
    //       <div className="col-6 flex-between">
    //         <div className="yellow-round text-black px-2 py-1">6</div>
    //         <div className="dark-blue-round px-2 py-1">0</div>
    //         <div className="green-round px-2 py-1">4</div>
    //         <div className="dark-blue-round px-2 py-1">0</div>
    //         <div className="light-blue-round px-2 py-1">2</div>
    //         <div className="red-round px-2 py-1">W</div>
    //       </div>
    //       <div className="col d-flex align-items-center justify-content-end">
    //         RRR 8.11
    //       </div>
    //     </div>
    //     <div className="flex-between">
    //       <div>70%</div>
    //       <progress value="70" max="100" className="w-100 mx-1"></progress>
    //       <div>30%</div>
    //     </div>
    //     <div className="flex-column flex-center">
    //       <span className="my-1">CRR. 6.50</span>
    //       <span onClick={handleStatsOpen} className="pointer">
    //         {statsOpen ? (
    //           <FaChevronUp size={14} />
    //         ) : (
    //           <FaChevronDown size={14} />
    //         )}
    //       </span>
    //     </div>
    //   </div>
    //   {statsOpen && (
    //     <div className="w-100 black-score-box p-1 mt-1 white-text">
    //       <div className="d-flex w-100 grey-border2">
    //         <div className="col-6 py-1">Batsmen</div>
    //         <div className="col-1 flex-center">R</div>
    //         <div className="col-1 flex-center">B</div>
    //         <div className="col-1 flex-center">4s</div>
    //         <div className="col-1 flex-center">6s</div>
    //         <div className="col-2 flex-center">SR</div>
    //       </div>
    //       <div className="flex-column w-100 grey-border2">
    //         <div className="d-flex w-100">
    //           <div className="col-6 py-1">David Malan</div>
    //           <div className="col-1 flex-center">100</div>
    //           <div className="col-1 flex-center">100</div>
    //           <div className="col-1 flex-center">100</div>
    //           <div className="col-1 flex-center">100</div>
    //           <div className="col-2 flex-center">100</div>
    //         </div>
    //         <div className="d-flex w-100">
    //           <div className="col-6 py-1">Ben Stokes*</div>
    //           <div className="col-1 flex-center">100</div>
    //           <div className="col-1 flex-center">100</div>
    //           <div className="col-1 flex-center">100</div>
    //           <div className="col-1 flex-center">100</div>
    //           <div className="col-2 flex-center">100</div>
    //         </div>
    //       </div>
    //       <div className="d-flex w-100 grey-border2">
    //         <div className="col-6 py-1">Bowler</div>
    //         <div className="col-1 flex-center">O</div>
    //         <div className="col-1 flex-center">M</div>
    //         <div className="col-1 flex-center">R</div>
    //         <div className="col-1 flex-center">W</div>
    //         <div className="col-2 flex-center">ECO</div>
    //       </div>
    //       <div className="d-flex w-100">
    //         <div className="col-6 py-1">Kyle Jamieson*</div>
    //         <div className="col-1 flex-center">100</div>
    //         <div className="col-1 flex-center">100</div>
    //         <div className="col-1 flex-center">100</div>
    //         <div className="col-1 flex-center">100</div>
    //         <div className="col-2 flex-center">4.00</div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default ScoreboardCricket;
