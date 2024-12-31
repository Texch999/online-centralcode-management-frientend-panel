import { Images } from "../../images";

function HorseRacingScoreBoard() {
  return (
    <div className="football-scoreboard-bg px-3 w-100 text-white">
      <div className="w-100 flex-between py-3">
        <div className="p-2 rounded dashed-grey-bg white-space">
          Lay Enabled
        </div>
        <div className="medium-font fw-600 px-2 text-center">
          Bathurst (AUS) 6th Sep / R8 1730m Pace M
        </div>
        <div className="p-2 rounded dashed-grey-bg  white-space">
          Box Market
        </div>
      </div>

      <div className="w-100 flex-between py-3 hor-white-top">
        <div className="d-flex align-items-center">
          <img
            src={Images.TourPrize}
            alt=""
            style={{ height: "15px", width: "15px" }}
            className="me-1"
          />
          No of Winners - <span className="mx-2">1</span>
        </div>
        <div className="white-space green-bg rounded-pill py-1 px-3">
          IN PLAY
        </div>
        <div className="d-flex align-items-center">
          <img
            src={Images.TourMarket}
            alt=""
            style={{ height: "15px", width: "15px" }}
            className="me-1"
          />
          Market Liability - <span className="mx-2 clr-red">0.00</span>
        </div>
      </div>
    </div>
  );
}

export default HorseRacingScoreBoard;
