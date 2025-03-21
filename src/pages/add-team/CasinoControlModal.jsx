// import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";

// const CasinoControlModal = ({ show, setShow }) => {
//   const [pswdVisible, setPswdVisible] = useState(false);
//   const handlePswd = () => {
//     setPswdVisible((prev) => !prev);
//   };
//   const [showProviders, setShowProviders] = useState(false);
//   const handleData = () => {
//     setShowProviders((prev) => !prev);
//   };

//   const providergames = [
//     "ezugi",
//     "Baccarat",
//     "Bet on Numbers",
//     "Roulette",
//     "Teen pati",
//     "ezugi",
//     "Baccarat",
//     "Bet on Numbers",
//     "Roulette",
//     "Teen pati",
//     "cards",
//     "Lucky 7",
//     "Poker",
//   ];
//   const userwebsites = [
//     {
//       name: "Evaluation",
//       control: (
//         <div class="form-check form-switch" onClick={handleData}>
//           <input
//             class="form-check-input w-40"
//             type="checkbox"
//             role="switch"
//             id="flexSwitchCheckDefault"
//           />
//         </div>
//       ),
//       dropangle: showProviders ? (
//         <span onClick={handleData}>
//           <IoIosArrowUp size={18} />
//         </span>
//       ) : (
//         <span onClick={handleData}>
//           <IoIosArrowDown size={18} />
//         </span>
//       ),
//     },
//     {
//       name: "Asian Games",
//       control: (
//         <div class="form-check form-switch">
//           <input
//             class="form-check-input w-40"
//             type="checkbox"
//             role="switch"
//             id="flexSwitchCheckDefault"
//           />
//         </div>
//       ),
//       dropangle: <IoIosArrowDown size={18} />,
//     },
//     {
//       name: "Pragmatic Play",
//       control: (
//         <div class="form-check form-switch">
//           <input
//             class="form-check-input w-40"
//             type="checkbox"
//             role="switch"
//             id="flexSwitchCheckDefault"
//           />
//         </div>
//       ),
//       dropangle: <IoIosArrowDown size={18} />,
//     },
//     {
//       name: "Vivo Games",
//       control: (
//         <div class="form-check form-switch">
//           <input
//             class="form-check-input w-40"
//             type="checkbox"
//             role="switch"
//             id="flexSwitchCheckDefault"
//           />
//         </div>
//       ),
//       dropangle: <IoIosArrowDown size={18} />,
//     },
//   ];
//   return (
//     <Modal centered size="md" show={show} onHide={setShow}>
//       <div className="p-2">
//         <div className="d-flex flex-between medium-font">
//           <div>Casino Control</div>
//           <div>
//             <IoClose size={23} onClick={() => setShow(false)} />
//           </div>
//         </div>
//         <div className="small-font my-1">Providers</div>
//         <div className="d-flex flex-column">
//           {userwebsites?.map((item) => (
//             <div className="d-flex flex-column input-bg br-5 my-1 py-1 px-2 small-font">
//               <div className="flex-between align-items-center ">
//                 <div>{item?.name}</div>
//                 <div className="d-flex gap-3 align-items-center">
//                   <div>{item?.control}</div>
//                   <div>{item?.dropangle}</div>
//                 </div>
//               </div>
//               {showProviders === true && (
//                 <div className="d-flex flex-column">
//                   <hr />
//                   <div className="d-flex flex-wrap small-font">
//                     {providergames?.map((item) => (
//                       <div className="">
//                         <label
//                           htmlFor="ezugi"
//                           className="white-btn br-5 p-2 me-2 pointer flex-between mb-2"
//                         >
//                           <input type="checkbox" id="ezugi" className="me-2" />
//                           <span>{item}</span>
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="small-font my-1">Management Password</div>
//         <div className="row small-font">
//           <div className="col-6">
//             <div className="input-bg d-flex br-5 py-2 px-2 flex-between ">
//               <input
//                 className="all-none"
//                 type={pswdVisible ? "text" : "password"}
//                 placeholder="Enetr Password"
//               />
//               {pswdVisible ? (
//                 <IoEye className="black-font" size={15} onClick={handlePswd} />
//               ) : (
//                 <IoEyeOff
//                   className="black-font"
//                   size={15}
//                   onClick={handlePswd}
//                 />
//               )}
//             </div>
//           </div>
//           <div className="col-6">
//             <div className="saffron-btn2 pointer">Submit</div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CasinoControlModal;

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";

const CasinoControlModal = ({ show, setShow }) => {
  const [pswdVisible, setPswdVisible] = useState(false);
  const [showProviders, setShowProviders] = useState({});

  const handleToggleProvider = (provider) => {
    setShowProviders((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  const providergames = [
    "ezugi",
    "Baccarat",
    "Bet on Numbers",
    "Roulette",
    "Teen pati",
    "cards",
    "Lucky 7",
    "Poker",
  ];

  const userwebsites = [
    "Evaluation",
    "Asian Games",
    "Pragmatic Play",
    "Vivo Games",
  ];

  return (
    <Modal centered size="md" show={show} onHide={() => setShow(false)}>
      <div className="p-2">
        <div className="d-flex flex-between medium-font">
          <div>Casino Control</div>
          <div>
            <IoClose size={23} onClick={() => setShow(false)} />
          </div>
        </div>
        <div className="small-font my-1">Providers</div>
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
                  <div className="d-flex flex-wrap small-font">
                    {providergames.map((game) => (
                      <label
                        key={game}
                        className="white-btn br-5 p-2 me-2 pointer flex-between mb-2"
                      >
                        <input type="checkbox" className="me-2" />
                        <span>{game}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="small-font my-1">Management Password</div>
        <div className="row small-font">
          <div className="col-6">
            <div className="input-bg d-flex br-5 py-2 px-2 flex-between">
              <input
                className="all-none"
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
          <div className="col-6">
            <div className="saffron-btn2 pointer">Submit</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CasinoControlModal;
