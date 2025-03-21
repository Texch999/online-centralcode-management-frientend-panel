import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoArrowBack, IoArrowDown, IoEye, IoEyeOff } from "react-icons/io5";

const GameControl = () => {
  const [active, setActive] = useState(0);
  const handleActive = (index) => {
    setActive(index);
  };
  const [pswdVisible, setPswdVisible] = useState(false);
  const [showProviders, setShowProviders] = useState({});

  const handleToggleProvider = (provider) => {
    setShowProviders((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  const providergames = [
    "33948587 - Karnataka vs Vidarbha",
    "43484964 - Bookmaker 0 Commission",
    "1.238346329 - Match Odds",
    "33948587 - Karnataka vs Vidarbha",
    "43484964 - Bookmaker 0 Commission",
    "1.238346329 - Match Odds",
  ];

  const userwebsites = [
    "10328858 - Twenty20 Big Bash",
    "10957170 - Vijay Hazare Trophy",
    "11365612 - Test Match",
    "12547929 - International League T20",
  ];
  const games = [
    "Cricket",
    "Football",
    "Soccer",
    "Basket Ball",
    "Kabadi",
    "Grey Hound",
    "Ice Hockey",
    "Horse Racing",
  ];
  const types = [
    "All odds",
    "Bookmaker",
    "Soccer",
    "Betfair fancy",
    "Other fancy",
  ];

  const market = [
    "Match Odds",
    "Bookmaker",
    "Special Maker",
    "Tournament Winner",
    "To Win the Toss",
    "1st Innings Runs",
    "1st Innings Runs",
    "1st Inning 6 Over Line",
    "1st Inning 10 Over Line",
    "Batsman",
    "2nd Inning 6 Over Line",
    "Odd Even",
    "Three Selection",
  ];

  const buttons = [
    "cricket",
    "Soccer",
    "Tennis",
    "Horse Racing",
    "Basket Ball",
    "Ice Hockey",
    "Grey Hound Racing",
    "Volley Ball",
    "Table Tennis",
    "Badminton",
  ];
  return (
    <div>
      <span className="d-flex align-items-center yellow-font">
        <IoIosArrowBack />
        Game Control
      </span>
      <div className="d-flex flex-column py-1 mt-2">
        <div className="white-bg box-shadow br-5 mb-2 p-2">
          <div className="small-font my-1 fw-800">Event Type</div>
          <div className="d-flex flex-wrap small-font">
            {games.map((game) => (
              <label
                key={game}
                className="white-btn br-5 p-2 me-2 pointer flex-between mb-2"
              >
                <span>{game}</span>
                <input type="checkbox" className="ms-2" />
              </label>
            ))}
          </div>
        </div>

        <div className="white-bg box-shadow my-2 br-5 p-2">
          <div className="small-font my-1 fw-800">Type</div>
          <div className="d-flex flex-wrap small-font">
            {types.map((game) => (
              <label
                key={game}
                className="white-btn br-5 p-2 me-2 pointer flex-between mb-2"
              >
                <span>{game}</span>
                <input type="checkbox" className="ms-2" />
              </label>
            ))}
          </div>
        </div>

        <div className="white-bg box-shadow my-2 br-5 p-2">
          <div className="small-font my-1 fw-800">Market Type</div>
          <div className="d-flex gap-3 my-2">
            {buttons?.map((item, index) => (
              <div
                className={`input-css pointer small-font ${
                  active == index ? "saffron-btn" : ""
                }`}
                key={index}
                onClick={() => handleActive(index)}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="d-flex flex-column">
            <div className="my-1 small-font">Cricket</div>
            <div className="d-flex flex-wrap small-font">
              {market.map((game) => (
                <label
                  key={game}
                  className="white-btn br-5 p-2 me-2 pointer flex-between mb-2"
                >
                  <span>{game}</span>
                  <input type="checkbox" className="ms-2" />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="white-bg box-shadow my-2 br-5 p-2">
          <div className="d-flex flex-between px-1">
            <div className="small-font my-1 fw-800">
              Competition/Event/Market
            </div>
            <div className="input-css balck-border small-font">
              <select className="all-none small-font">
                <option>January 18, 2025</option>
                <option>January 18, 2025</option>
                <option>January 18, 2025</option>
                <option>January 18, 2025</option>
              </select>
            </div>
          </div>
          <div className="d-flex gap-3 my-2">
            {buttons?.map((item, index) => (
              <div
                className={`input-css pointer small-font ${
                  active == index ? "saffron-btn" : ""
                }`}
                key={index}
                onClick={() => handleActive(index)}
              >
                <div className="small-font">
                  {active === index ? (
                    <span className="d-flex gap-1 align-items-center">
                      {item}
                      <span className="white-bg mx-1 black-font px-1 br-50">
                        10
                      </span>
                    </span>
                  ) : (
                    <span>{item}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex flex-column">
            <div className="my-1 small-font">Cricket - January 18, 2025</div>
            <div className="d-flex flex-column">
              {userwebsites.map((provider) => (
                <div
                  key={provider}
                  className="d-flex flex-column input-bg br-5 my-1 py-1 px-2 small-font"
                >
                  <div className="flex-between align-items-center">
                    <div>{provider}</div>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input w-40"
                          type="checkbox"
                          role="switch"
                          id={`switch-${provider}`}
                          onClick={() => handleToggleProvider(provider)}
                        />
                      </div>

                      <span onClick={() => handleToggleProvider(provider)}>
                        {showProviders[provider] ? (
                          <IoIosArrowUp size={18} />
                        ) : (
                          <IoIosArrowDown size={18} />
                        )}
                      </span>
                    </div>
                  </div>

                  {showProviders[provider] && (
                    <div className="d-flex flex-column">
                      <hr />
                      <div className="d-flex flex-column col-3 small-font">
                        {providergames.map((game) => (
                          <label
                            key={game}
                            className="white-btn br-5 p-2 me-2 pointer flex-between mb-2"
                          >
                            <span>{game}</span>
                            <input type="checkbox" className="ms-2" />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2">
        
          <div className="row small-font align-items-center">

          <div className="small-font my-1 col-2">Management Password</div>

            <div className="col-6">
              <div className="input-bg d-flex br-5 py-2 px-2 flex-between">
                <input
                  className="all-none w-100"
                  type={pswdVisible ? "text" : "password"}
                  placeholder="Enter Password"
                />
                {pswdVisible ? (
                  <IoEye
                    className="black-font"
                    size={15}
                    onClick={() => setPswdVisible(false)}
                  />
                ) : (
                  <IoEyeOff
                    className="black-font"
                    size={15}
                    onClick={() => setPswdVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="saffron-btn2 pointer">Submit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControl;
