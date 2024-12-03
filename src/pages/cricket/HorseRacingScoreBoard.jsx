import React from "react";

import { Images } from "../../images";

function HorseRacingScoreBoard() {
  return (
    <div className="d-flex flex-center flex-column w-100">
      <div className="football-scoreboard-bg p-3 w-100 text-white">
        <div className="flex-column w-100">
          <div className="row d-flex align-items-center py-2">
            <div className="col-3">
              <div className="w-75  small-font text-center p-2 rounded dashed-grey-bg">
                Lay Enabled
              </div>
            </div>
            <div className="col-6">
              <div className="medium-font fw-600">
                Bathurst (AUS) 6th Sep / R8 1730m Pace M
              </div>
            </div>
            <div className="col-3">
              <div className="w-75  small-font text-center p-2 rounded dashed-grey-bg">
                Box Market
              </div>
            </div>
          </div>

          <div className="hor-white-top my-1"> </div>
          <div className="row d-flex align-items-center">
            <div className="col-5">
              <div className="w-100 d-flex py-2">
                <div className="d-flex small-font align-items-center">
                  <img
                    src={Images.TourPrize}
                    alt=""
                    style={{ height: "15px", width: "18px" }}
                    className="mx-1"
                  />
                  No of Winners - <span className="mx-2">1</span>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="w-100 green-bg text-center small-font rounded-2 py-1">
                INPLAY
              </div>
            </div>
            <div className="col-5">
              {" "}
              <div className="w-100 d-flex py-2 align-items-center justify-content-end">
                <div className="d-flex small-font align-items-center">
                  <img
                    src={Images.TourMarket}
                    alt=""
                    style={{ height: "15px", width: "18px" }}
                    className="mx-1"
                  />
                  Market Liability - <span className="mx-2 clr-red">0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorseRacingScoreBoard;
