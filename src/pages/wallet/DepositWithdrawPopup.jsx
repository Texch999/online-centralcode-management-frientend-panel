import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { imgUrl } from "../../api/baseUrl";
import { rfloor } from "../../utils/mathFunctions";
import utcDate from "../../utils/utcDateConversion";

function DepositWithdrawPopup({
  depositWithdrawPopupOpen,
  setDepositWithdrawPopupOpen,
  setRejectionReasons,
  userDetails2,
  ticketData,
  setTicketDetails,
  rejectionReasons,
  fromPath,
  handleTikcetApproveRejection,
  handleWithdrwaTicketApproveRejection,
  spinner,
  setSpinner,
}) {
  const handleCancel = () => {
    setTicketDetails(null);
    setRejectionReasons(null);
    setDepositWithdrawPopupOpen(false);
  };

  const userRole = localStorage.getItem("role_code");
  const allCountries = useSelector((item) => item?.allCountries);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rejectionError, setRejectionError] = useState(null);

  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name;
  };

  const options = rejectionReasons?.map((reason) => ({
    value: reason.id,
    label: reason.reason,
  }));

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    console.log("Selected Reason ID:", selectedOption);
  };

  // const handleTicket = (action, DepOrWit) => {

  //   if (userRole === "management") {
  //     // management deposit and withdraw aprrove & rejection
  //     console.log(ticketData, "====>ticketData")
  //     if (action === "REJECT") {
  //       if (selectedOption === null) {
  //         setRejectionError("Please select a reason for rejection.");
  //       } else {
  //         if (ticketData?.ticketType === 1) {
  //           //deposite rejection
  //           handleTikcetApproveRejection(action, selectedOption, DepOrWit)

  //         } else {
  //           // withdraw rejection
  //           handleWithdrwaTicketApproveRejection(action, selectedOption, DepOrWit)

  //         }
  //       }
  //     } else {
  //       if (ticketData?.ticketType === 1) {
  //         // deposit approve
  //         handleTikcetApproveRejection(action, selectedOption, DepOrWit)
  //       } else {
  //         // withdrwa approve
  //         handleWithdrwaTicketApproveRejection(action, selectedOption, DepOrWit)
  //       }

  //     }
  //   } else {
  //     // director deposit and withdraw aprrove & rejection
  //     // user role id director
  //     if (action === "REJECT") {
  //       if (selectedOption === null) {
  //         setRejectionError("Please select a reason for rejection.");
  //       } else {
  //         if (ticketData?.ticketType === 1) {
  //           //deposite rejection
  //           handleTikcetApproveRejection(action, selectedOption, DepOrWit)

  //         } else {
  //           // withdraw rejection
  //           handleTikcetApproveRejection(action, selectedOption, DepOrWit)

  //         }
  //       }
  //     } else {
  //       if (ticketData?.ticketType === 1) {
  //         // deposit approve
  //         handleTikcetApproveRejection(action, selectedOption, DepOrWit)
  //       } else {
  //         // withdrwa approve
  //         handleTikcetApproveRejection(action, selectedOption, DepOrWit)
  //       }

  //     }
  //   }
  // }
  // useEffect(() => {
  //   setSpinner(false)
  // }, [])
  const [ticketaction, setTicketAction] = useState("");
  const handleTicket = (action, DepOrWit) => {
    // Validate rejection reason if action is "REJECT"
    setTicketAction(action);
    if (action === "REJECT" && selectedOption === null) {
      setRejectionError("Please select a reason for rejection.");
      return; // Exit early if validation fails
    }

    const isDeposit = ticketData?.ticketType === 1;

    if (userRole === "management") {
      // Management-specific logic
      if (isDeposit) {
        setSpinner(true);
        handleTikcetApproveRejection(action, selectedOption, DepOrWit);
      } else {
        setSpinner(true);
        handleWithdrwaTicketApproveRejection(action, selectedOption, DepOrWit);
      }
    } else {
      // Director-specific logic
      handleTikcetApproveRejection(action, selectedOption, DepOrWit);
    }
  };

  return (
    <Modal show={depositWithdrawPopupOpen} centered>
      <div className="d-flex justify-content-between black-text4 p-3">
        <div className="flex-column">
          <h6 className="fw-600 mb-0">
            {`${ticketData?.dirName} - `}{" "}
            {ticketData?.shareType === 1
              ? `(Rental ${ticketData?.sharePer}% )`
              : `(Share/Royalty: ${ticketData?.sharePer}%)`}
          </h6>
          <div className="d-flex ">
            <div className="yellow-bg py-1 px-2 rounded small-font white-text w-fit">
              {ticketData?.dirName}
            </div>
          </div>
        </div>
        <div className="  d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-column align-items-start ">
            <div className="yellow-font medium-font">
              {ticketData?.usePanNam}{" "}
            </div>
            <div className="green-btn small-font h-fit me-2">
              {ticketData?.ticketType === 1 || ticketData?.ticketType === 0
                ? "Deposit"
                : "Withdraw"}{" "}
              in {getCurrency(ticketData?.reqCurrency)}
            </div>
          </div>
          <div>
            {" "}
            <IoCloseSharp size={24} onClick={handleCancel} />
          </div>
        </div>
      </div>
      <hr className="m-0" />
      <div className="px-3 pb-3 pt-1">
        <div className="row small-font">
          <div
            className={`${
              userRole === "management" ? "col-8 mt-2" : "col-12 mt-2"
            }`}
          >
            <div className="grey-box flex-between">
              <span>UTR NO</span>
              <span>{ticketData?.transacId}</span>
            </div>
          </div>
          {userRole === "management" ? (
            <div className="col-4 mt-2">
              <div className="grey-box flex-between">
                <span className="green-font">
                  {getCurrency(ticketData?.reqCurrency)} To INR{" "}
                </span>
                <span>
                  {ticketData?.curRate ? rfloor(ticketData?.curRate, -5) : 0}
                </span>
              </div>
            </div>
          ) : null}

          <div
            className={`${
              userRole === "management" ? "col-4 mt-2" : "col-6 mt-2"
            }`}
          >
            <div className="grey-box flex-between">
              <span>Currency</span>
              <span>{getCurrency(ticketData?.reqCurrency)}</span>
            </div>
          </div>
          <div
            className={`${
              userRole === "management" ? "col-4 mt-2" : "col-6 mt-2"
            }`}
          >
            <div className="grey-box flex-between">
              <span>Cur Amt.</span>
              <span>{ticketData?.paidAmount ? ticketData?.paidAmount : 0}</span>
            </div>
          </div>
          {userRole === "management" ? (
            <div className="col-4 mt-2">
              <div className="grey-box flex-between">
                <span>Amt INR</span>
                <span className="yellow-font">
                  {ticketData?.totCur ? rfloor(ticketData?.totCur, -2) : 0}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="input-bg rounded small-font mt-2">
          <div className="flex-between p-2">
            <span>Payment Method</span>
            <span>{ticketData?.accDtl}</span>
          </div>
          <hr className="m-0" />
          <div className="flex-between p-2">
            <span>From</span>
            <span>{ticketData?.dirName}</span>
          </div>
          <hr className="m-0" />
          <div className="flex-between p-2">
            <span>To</span>
            <span>{userRole}</span>
          </div>
          <hr className="m-0" />
          <div className="flex-between p-2">
            <span>Date & Time</span>
            <span>{ticketData?.date ? utcDate(ticketData?.date) : null}</span>
          </div>
        </div>

        {ticketData?.uploadedFile ? (
          <div className="w-100 border mt-2">
            <img
              className="w-100 h-50"
              src={`${imgUrl}/deposits/${ticketData?.uploadedFile}`}
              alt=""
            />
          </div>
        ) : null}

        <div className="row small-font">
          {ticketData?.shareType !== 1 ? (
            <div className="col-12 mt-2">
              <div className="grey-box flex-between mt-1">
                <span>
                  Sports & Casino Chips - {getCurrency(ticketData?.reqCurrency)}{" "}
                </span>
                <span className="yellow-font">{ticketData?.requChips}</span>
              </div>
              {userRole === "management" ? (
                <div className="grey-box flex-between mt-1">
                  <span>Sports & Casino Chips - INR</span>
                  <span className="yellow-font">
                    {ticketData?.inrChips
                      ? rfloor(ticketData?.inrChips, -2)
                      : 0}
                  </span>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <div className="col-12 mt-2">
                <div className="grey-box flex-between">
                  <span>
                    Total Chips
                    {/* - 
                    {getCurrency(ticketData?.reqCurrency)}{" "} */}
                  </span>
                  <span className="yellow-font">{ticketData?.requChips}</span>
                </div>
                {/* {userRole === "management" ?
                <div className="grey-box flex-between mt-2">
                  <span>Sports Chips - INR</span>
                  <span className="yellow-font">{ticketData?.inrSportsChips ? rfloor(ticketData?.inrSportsChips, -2) : 0}</span>
                </div> : null} */}
              </div>

              <div className="col-12 mt-2">
                <div className="grey-box flex-between">
                  <span>Paid Amount</span>
                  <span>{ticketData?.paidAmount ?? 0}</span>
                </div>
              </div>
            </div>
          )}

          {ticketData?.isCredit ||
            (ticketData?.credit > 0 && ticketData?.ticketType == 1 && (
              <div className="d-flex flex-column ">
                <h6 className="mt-2 red-block small-font">Credit Request</h6>

                <div className="d-flex flex-row my-2">
                  <div className="col-6 me-2">
                    <div className="grey-box flex-between">
                      <span>Old Credit Amount</span>
                      <span>{ticketData?.oldCredit ?? 0}</span>
                    </div>
                  </div>

                  <div className={` col-6 me-2`}>
                    <div className="grey-box flex-between">
                      <span>New Credit Request</span>
                      <span>{ticketData?.credit ?? 0}</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row ">
                  <div className={` col-6 me-2`}>
                    <div className="grey-box flex-between">
                      <span>Credit Limit</span>
                      <span>{ticketData?.maxCreditLimit ?? 0}</span>
                    </div>
                  </div>

                  <div className="col-6 me-1">
                    <div className="grey-box flex-between">
                      <span>Total Credit</span>
                      <span>{(ticketData?.credit ?? 0) + (ticketData?.oldCredit ?? 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {ticketData?.tmpErr && ticketData?.ticketType == 1 && (
            <div>
              <h6 className="mt-2 red-block small-font">Rejection Reason</h6>
              <div className="grey-box flex-between m-1 col">
                {ticketData?.tmpErr.description}
              </div>
            </div>
          )}

          {fromPath === "tickets" ? (
            <>
              {ticketData?.status === 0 ? (
                <>
                  <h6 className="mt-2 red-block small-font">
                    Rejection Reason
                  </h6>
                  <div className="col-12 mt-2">
                    <Select
                      className="small-font"
                      options={options}
                      placeholder="Select"
                      styles={customStyles}
                      maxMenuHeight={120}
                      menuPlacement="auto"
                      onChange={handleChange}
                      value={selectedOption?.value}
                    />
                    {!selectedOption && (
                      <p className="text-danger small-font">{rejectionError}</p>
                    )}
                  </div>
                  <div className="col-6 mt-3">
                    <button
                      className="w-100 saffron-btn2"
                      onClick={() =>
                        handleTicket(
                          "APPROVE",
                          ticketData?.ticketType === 1 ? "Deposit" : "Withdraw"
                        )
                      }
                    >
                      {spinner && ticketaction == "APPROVE" ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          <span> {` Approve ...`}</span>{" "}
                        </>
                      ) : (
                        <span>Approve</span>
                      )}
                    </button>
                  </div>
                  <div className="col-6 mt-3">
                    <button
                      className="w-100 white-btn3"
                      onClick={() =>
                        handleTicket(
                          "REJECT",
                          ticketData?.ticketType === 1 ? "Deposit" : "Withdraw"
                        )
                      }
                    >
                      {spinner && ticketaction == "REJECT" ? (
                        <>
                          {" "}
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          <span> {` Reject ...`}</span>{" "}
                        </>
                      ) : (
                        <span>Reject</span>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="w-100 mt-3 saffron-btn2 pointer-events-none cursor-not-allowed"
                  disabled
                >
                  {ticketData?.status === 1 ? "Approved" : "Rejected"}
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

export default DepositWithdrawPopup;
