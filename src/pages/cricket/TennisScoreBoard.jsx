import React from "react";
import { Images } from "../../images";

function TennisScoreBoard() {
  return (
    <div className="d-flex flex-center flex-column w-100">
      <div className="football-scoreboard-bg p-1 w-100 text-white">
        <div className="flex-column w-100">
          <div className="row d-flex align-items-center">
            <div className="col-5">
              <div className="w-100 text-end">
                <h6>Evgeny Donskoy</h6>
              </div>
            </div>
            <div className="col-2">
              <div className="d-flex w-100 justify-content-between">
                <h2 style={{ color: "#3DA5FF" }}>2</h2>
                <h3>:</h3>
                <h2 style={{ color: "#A6E537" }}>4</h2>
              </div>
            </div>
            <div className="col-5">
              <div className="w-100 text-start">
                <h6> Omar Jasika</h6>
              </div>
            </div>
          </div>
          <div className="hor-white-top my-1"></div>
          <div className="row d-flex align-items-center">
            <div className="col-4">
              <div className="w-100 text-end d-flex justify-content-start align-items-center">
                <div className="d-flex small-font align-items-center mx-1">
                  1
                  <img
                    src={Images.TourBlueFlag}
                    alt=""
                    style={{ height: "15px", width: "15px" }}
                    className="mx-1"
                  />
                </div>
                <div className="d-flex small-font align-items-center mx-1">
                  1
                  <img
                    src={Images.TourYellowCard}
                    alt=""
                    style={{ height: "15px", width: "15px" }}
                    className="mx-1"
                  />
                </div>{" "}
                <div className="d-flex small-font align-items-center mx-1">
                  1
                  <img
                    src={Images.TourSportsSoccer}
                    alt=""
                    style={{ height: "15px", width: "15px" }}
                    className="mx-1"
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex w-100 medium-font justify-content-around align-items-center">
                <span>2 Half</span>
                <img
                  src={Images.TourScheduleClock}
                  alt=""
                  style={{ height: "15px", width: "15px" }}
                  className="mx-1"
                />{" "}
                <span>54:03</span>
              </div>
            </div>
            <div className="col-4">
              <div className="w-100 text-end d-flex justify-content-end align-items-center">
                <div className="d-flex small-font align-items-center mx-1">
                  1
                  <img
                    src={Images.TourYellowCard}
                    alt=""
                    style={{ height: "15px", width: "15px" }}
                    className="mx-1"
                  />
                </div>{" "}
                <div className="d-flex small-font align-items-center mx-1">
                  1
                  <img
                    src={Images.TourGreenFlag}
                    alt=""
                    style={{ height: "15px", width: "15px" }}
                    className="mx-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hor-white-top my-1"></div>

          <div className="d-flex flex-column flex-between px-2 my-1">
            <div className="w-100 d-flex"></div>
            <progress value="63" max="100" className="w-100 mx-1"></progress>
          </div>
          <div className="hor-white-top my-1">
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
                    Market Liability -{" "}
                    <span className="mx-2 clr-red">0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TennisScoreBoard;
