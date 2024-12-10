import { MdSportsCricket } from "react-icons/md";
import { IoTennisballOutline } from "react-icons/io5";

const ScoreboardCricket = () => {
  return (
    <div className="d-flex flex-center flex-column w-100">
      <div className="rounded-grey-box my-2 px-1 py-1 w-100 small-font">
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
      <div className="black-score-box w-100 text-white small-font">
        <div className="d-flex flex-column w-100">
          <div className="d-flex flex-between px-2">
            <div className="flex-column w-100 small-font">
              <div className="row">
                <div className="col-2">Batsmen</div>
                <div className="col-2">R</div>
                <div className="col-2">B</div>
                <div className="col-2">4s</div>
                <div className="col-2">6s</div>
                <div className="col-2">SR</div>
              </div>
              <div className="hor-white-top my-1"></div>
              <div className="row">
                <div className="col-2">David Malan</div>
                <div className="col-2">100</div>
                <div className="col-2">10</div>
                <div className="col-2">2</div>
                <div className="col-2">0</div>
                <div className="col-2">800</div>
              </div>

              <div className="row">
                <div className="col-2">Ben Stokes*</div>
                <div className="col-2">0</div>
                <div className="col-2">4</div>
                <div className="col-2">0</div>
                <div className="col-2">0</div>
                <div className="col-2">0</div>
              </div>
            </div>
            <div className="grey-box-table flex-column flex-center py-3 w-50 px-2 small-font">
              <div className="d-flex">
                <div className="yellow-round text-black px-2 py-1 mx-1">6</div>
                <div className="dark-blue-round text-white px-2 py-1 mx-1">
                  0
                </div>
                <div className="green-round text-white px-2 py-1 mx-1">4</div>
                <div className="dark-blue-round text-white px-2 py-1 mx-1">
                  0
                </div>
                <div className="light-blue-round text-white px-2 py-1 mx-1">
                  2
                </div>
                <div className="red-round text-white px-2 py-1 mx-1">w</div>
              </div>
              <div className="medium-font fw-600 pt-3 text-white">CRR.6.50</div>
            </div>
            <div className="flex-column w-100 small-font">
              <div className="row ps-2">
                <div className="col-2">Bowler</div>
                <div className="col-2">O</div>
                <div className="col-2">M</div>
                <div className="col-2">R</div>
                <div className="col-2">W</div>
                <div className="col-2">ECO</div>
              </div>
              <div className="hor-white-top my-1"></div>
              <div className="row ps-2">
                <div className="col-2">Kyle Jamieson</div>
                <div className="col-2">1.3</div>
                <div className="col-2">0</div>
                <div className="col-2">20</div>
                <div className="col-2">1</div>
                <div className="col-2">4.00</div>
              </div>

              <div className="row ps-2">
                <div className="col-2">Ben Stokes*</div>
                <div className="col-2">0</div>
                <div className="col-2">4</div>
                <div className="col-2">0</div>
                <div className="col-2">0</div>
                <div className="col-2">0</div>
              </div>
            </div>
          </div>
          <div className="hor-white-top my-1">
            <div className="d-flex flex-between px-2 my-1">
              <div>63%</div>
              <progress value="63" max="100" className="w-100 mx-1"></progress>
              <div>36%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreboardCricket;
