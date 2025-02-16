import React from "react";
import { imgUrl } from "../api/baseUrl";
import { HiCheckBadge } from "react-icons/hi2";

const PaymentModes = ({
  modes,
  filteredPaymentModes,
  userRole,
  actionType,
  handleDepositAndWithdraw,
  handleAddModal,
  selectedTab,
}) => {
  const handleModelActions = (card) => {
    // If actionType is "Deposit" or "Withdraw" and isEnabled is false, do nothing
    if (
      (actionType === "Deposit" || actionType === "Withdraw") &&
      !card.isEnabled
    ) {
      return;
    }

    if (userRole === "director") {
      if (actionType === "Deposit") {
        handleDepositAndWithdraw(card);
      } else if (actionType === "Withdraw") {
        handleDepositAndWithdraw(card);
      } else {
        handleAddModal(card?.id, card?.country_id, card?.avil_modes);
      }
    } else {
      handleAddModal(card?.id, card?.country_id, card?.avil_modes);
    }
  };

  return (
    <>
      {modes
        .filter(({ mode }) => (selectedTab === 0 ? mode !== 5 : mode === 5))
        .map(({ title, mode }) => {
          const filteredPayments = filteredPaymentModes?.filter(
            (card) => card.avil_modes === mode
          );
          return (
            filteredPayments.length > 0 && (
              <div className="mb-3" key={mode}>

                <h1 className="large-font fw-600">{title}</h1>
                <div className="row g-1">
                  {filteredPayments.map((card) => (
                    <div key={card.id} className="col-2">
                      {console.log(card, "===card")}
                      <div
                        className="card h-100"
                        style={{
                          opacity: (actionType === "Deposit" || actionType === "Withdraw") && !card.isEnabled ? 0.5 : 1, // Reduce opacity if disabled
                          pointerEvents: (actionType === "Deposit" || actionType === "Withdraw") && !card.isEnabled ? "none" : "auto", // Disable click if disabled
                        }}
                      >
                        <div
                          className="card-img-top d-flex align-items-center justify-content-center"
                          style={{
                            height: "80%",
                            overflow: "hidden",
                            backgroundColor: "#F5F7FF",
                          }}
                        >
                          <img
                            onClick={() => handleModelActions(card)}
                            src={`${imgUrl}/offlinepaymentsMode/${card?.image}`}
                            alt={card?.name}
                            className="text-nowrap"
                            style={{
                              height: "5vh",
                              width: "20vw",
                              objectFit: "contain",
                              objectPosition: "center",
                            }}
                          />
                          {(actionType === "Deposit" || actionType === "Withdraw") && card.isEnabled && (
                            <div>
                              <HiCheckBadge
                                style={{
                                  position: "absolute",
                                  top: "0px",
                                  right: "0px",
                                  color: "green",
                                  fontSize: "1.5rem",
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div
                          className="card-body d-flex align-items-center justify-content-center tag-bg"
                          style={{
                            height: "20%",
                            color: "#fff",
                          }}
                        >
                          <span className="text-center large-font text-nowrap">
                            {card.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          );
        })}
    </>
  );
};

export default PaymentModes;