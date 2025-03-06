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
    if ((actionType === "Deposit" || actionType === "Withdraw") && !card.isEnabled) {
      return;
    }
    if (userRole === "director") {
      if (actionType === "Deposit" || actionType === "Withdraw") {
        handleDepositAndWithdraw(card);
      } else {
        handleAddModal(card.id, card.country_id, card.avil_modes);
      }
    } else {
      handleAddModal(card.id, card.country_id, card.avil_modes);
    }
  };

  return (
    <>
      {modes.map(({ title, mode }) => {
        const filteredPayments = filteredPaymentModes?.filter(
          (card) => card.avil_modes === mode
        );

        return (
          filteredPayments.length > 0 && (
            <div className="mb-3" key={mode}>
              <h1 className="large-font fw-600">{title}</h1>
              <div className="row g-1 ">
                {filteredPayments?.map((card, index) => (
                  <div key={`${card.id}-${index}`} className="col-2">
                    <div
                      className={`card h-100 pointer ${!card.isEnabled ? "no-cursor" : "cursor-pointer"}`}
                      onClick={() => handleModelActions(card)}
                      style={{
                        opacity:
                          (actionType === "Deposit" || actionType === "Withdraw") &&
                            !card.isEnabled
                            ? 0.5
                            : 1,
                        pointerEvents:
                          (actionType === "Deposit" || actionType === "Withdraw") &&
                            !card.isEnabled
                            ? "none"
                            : "auto",
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
                          src={`${imgUrl}/offlinepaymentsMode/${card.image}`}
                          alt={card.name}
                          className="text-nowrap"
                          style={{
                            maxHeight: "50px",
                            maxWidth: "80%",
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                        />
                        {(actionType === "Deposit" || actionType === "Withdraw") &&
                          card.isEnabled && (
                            <HiCheckBadge
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                color: "green",
                                fontSize: "1.5rem",
                              }}
                            />
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