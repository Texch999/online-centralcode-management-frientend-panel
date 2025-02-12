import React from "react";
import { imgUrl } from "../api/baseUrl";

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
    if (userRole === "director") {
      actionType === "Deposit" || "Withdraw"
        ? handleDepositAndWithdraw(card)
        : handleAddModal(card?.id, card?.country_id, card?.avil_modes);
    } else {
      handleAddModal(card?.id, card?.country_id, card?.avil_modes);
    }
  }


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
                      <div className="card h-100">
                        <div
                          className="card-img-top d-flex align-items-center justify-content-center"
                          style={{
                            height: "80%",
                            overflow: "hidden",
                            backgroundColor: "#F5F7FF",
                          }}
                        >
                          <img
                            onClick={() =>
                              handleModelActions(card)
                            }
                            src={`${imgUrl}/offlinepaymentsMode/${card?.image}`}
                            alt={card?.name}
                            className="w-60 h-100 text-nowrap"
                            style={{
                              objectFit: "contain",
                              objectPosition: "center",
                            }}
                          />
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