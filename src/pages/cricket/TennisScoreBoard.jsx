import React from "react";
import { Images } from "../../images";

function TennisScoreBoard() {
  return (
    <div className="football-scoreboard-bg px-3 w-100 text-white">
      <div className="w-100 d-flex py-3">
        <div className="col-5 flex-center">
          <h6 className="mb-0">Santos</h6>
        </div>
        <div className="col-2 flex-center">
          <h2 className="fw-600 mb-0" style={{ color: "#3DA5FF" }}>
            2
          </h2>
          <h3 className="fw-600 mb-0 mx-2">:</h3>
          <h2 className="fw-600 mb-0" style={{ color: "#A6E537" }}>
            0
          </h2>
        </div>
        <div className="col-5 flex-center">
          <h6 className="mb-0">Cruzeiro</h6>
        </div>
      </div>

      <div className="w-100 flex-center hor-white-top py-1">
        <div className="col-4 d-flex align-items-center">
          <div className="d-flex align-items-center me-2">
            1
            <img
              src={Images.TourBlueFlag}
              alt=""
              style={{ height: "15px", width: "15px" }}
              className="ms-1"
            />
          </div>
          <div className="d-flex align-items-center me-2">
            1
            <img
              src={Images.TourYellowCard}
              alt=""
              style={{ height: "15px", width: "15px" }}
              className="ms-1"
            />
          </div>
          <div className="d-flex align-items-center me-2">
            1
            <img
              src={Images.TourSportsSoccer}
              alt=""
              style={{ height: "15px", width: "15px" }}
              className="ms-1"
            />
          </div>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-around">
          <span>2 Half</span>
          <img
            src={Images.TourScheduleClock}
            alt=""
            style={{ height: "15px", width: "15px" }}
          />{" "}
          <span>54:03</span>
        </div>
        <div className="col-4  d-flex align-items-center justify-content-end">
          <div className="d-flex align-items-center ms-2">
            1
            <img
              src={Images.TourYellowCard}
              alt=""
              style={{ height: "15px", width: "15px" }}
              className="ms-1"
            />
          </div>
          <div className="d-flex align-items-center ms-2">
            1
            <img
              src={Images.TourGreenFlag}
              alt=""
              style={{ height: "15px", width: "15px" }}
              className="ms-1"
            />
          </div>
        </div>
      </div>

      <div className="hor-white-top py-1">
        <div className="d-flex align-items-center">
          <span>San</span>
          <img
            src={Images.TourYellowCard}
            alt=""
            style={{ height: "15px", width: "15px" }}
            className="ms-2"
          />{" "}
          <img
            src={Images.TourSportsSoccer}
            alt=""
            style={{ height: "15px", width: "15px" }}
            className="ms-2"
          />
        </div>
        <progress value="70" max="100" className="w-100" />
        <div className="d-flex align-items-center">
          <span>San</span>
          <img
            src={Images.TourYellowCard}
            alt=""
            style={{ height: "15px", width: "15px" }}
            className="ms-2"
          />{" "}
          <img
            src={Images.TourSportsSoccer}
            alt=""
            style={{ height: "15px", width: "15px" }}
            className="ms-2"
          />
        </div>
      </div>

      <div className="w-100 d-flex align-items-center hor-white-top py-2">
        <div className="col-5 d-flex align-items-center">
          <img
            src={Images.TourPrize}
            alt=""
            style={{ height: "15px", width: "15px" }}
            className="me-2"
          />
          No of Winners - 1
        </div>
        <div className="col-2 flex-center">
          <div className="green-bg rounded-pill py-1 px-3 fw-600 white-space">
            IN PLAY
          </div>
        </div>
        <div className="col-5 d-flex align-items-center justify-content-end">
          <img
            src={Images.TourMarket}
            style={{ height: "15px", width: "15px" }}
            className="me-2"
            alt=""
          />
          Market Liability - <span className="clr-red ms-1">0.00</span>
        </div>
      </div>
    </div>
  );
}

export default TennisScoreBoard;
