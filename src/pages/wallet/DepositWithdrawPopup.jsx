import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { useSelector } from "react-redux";
import { useState } from "react";
import { imgUrl } from "../../api/baseUrl";

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
  handleWithdrwaTicketApproveRejection
}) {
  const handleCancel = () => {
    setTicketDetails(null)
    setRejectionReasons(null)
    setDepositWithdrawPopupOpen(false);
  };

  const userRole = localStorage.getItem("role_code");
  const allCountries = useSelector((item) => item?.allCountries);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rejectionError, setRejectionError] = useState(null);

  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name
  };

  const options = rejectionReasons?.map((reason) => ({
    value: reason.id,
    label: reason.reason,
  }));

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    console.log("Selected Reason ID:", selectedOption);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    // Format date as DD-MM-YYYY
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '-');

    // Format time as HH:MM (24-hour format)
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return `${formattedDate} | ${formattedTime}`;
  };

  const handleTicket = (action) => {

    if (userRole === "management") {
      // management deposit and withdraw aprrove & rejection
      if (action === "REJECT") {
        if (selectedOption === null) {
          setRejectionError("Please select a reason for rejection.");
        } else {
          if (ticketData?.ticketType === 1) {
            //deposite rejection
            handleTikcetApproveRejection(action, selectedOption, "Deposit")

          } else {
            // withdraw rejection
            handleWithdrwaTicketApproveRejection(action, selectedOption, "Withdraw")

          }
        }
      } else {
        if (ticketData?.ticketType === 2) {
          // deposit approve
          handleTikcetApproveRejection(action, selectedOption, "Deposit")
        } else {
          // withdrwa approve
          handleWithdrwaTicketApproveRejection(action, selectedOption, "Withdraw")
        }

      }
    } else {
      // director deposit and withdraw aprrove & rejection
      if (action === "REJECT") {
        if (selectedOption === null) {
          setRejectionError("Please select a reason for rejection.");
        } else {
          if (ticketData?.ticketType === 1) {
            //deposite rejection
            handleTikcetApproveRejection(action, selectedOption, "Deposit")

          } else {
            // withdraw rejection
            handleTikcetApproveRejection(action, selectedOption, "Withdraw")

          }
        }
      } else {
        if (ticketData?.ticketType === 2) {
          // deposit approve
          handleTikcetApproveRejection(action, selectedOption, "Deposit")
        } else {
          // withdrwa approve
          handleTikcetApproveRejection(action, selectedOption, "Withdraw")
        }

      }
    }
  }

  // const handleTicket = (action) => {
  //   const isManagement = userRole === "management";
  //   const isDepositTicket = ticketData?.ticketType === 1;
  //   const isWithdrawTicket = ticketData?.ticketType === 2;

  //   const handleRejection = () => {
  //     if (selectedOption === null) {
  //       setRejectionError("Please select a reason for rejection.");
  //       return;
  //     }

  //     if (isDepositTicket) {
  //       handleTikcetApproveRejection(action, selectedOption, "Withdraw"); // Deposit rejection
  //     } else if (isWithdrawTicket) {
  //       isManagement
  //         ? handleWithdrwaTicketApproveRejection(action, selectedOption, "Withdraw") // Management withdraw rejection
  //         : handleTikcetApproveRejection(action, selectedOption, "Withdraw"); // Director withdraw rejection
  //     }
  //   };

  //   const handleApproval = () => {
  //     if (isDepositTicket) {
  //       handleTikcetApproveRejection(action, selectedOption, "Deposite"); // Deposit approval
  //     } else if (isWithdrawTicket) {
  //       isManagement
  //         ? handleWithdrwaTicketApproveRejection(action, selectedOption, "Deposite") // Management withdraw approval
  //         : handleTikcetApproveRejection(action, selectedOption, "Deposite"); // Director withdraw approval
  //     }
  //   };

  //   if (action === "REJECT") {
  //     handleRejection();
  //   } else {
  //     handleApproval();
  //   }
  // };

  return (
    <Modal show={depositWithdrawPopupOpen} centered>
      <div className="d-flex justify-content-between black-text4 p-3">
        <div className="flex-column">
          <h6 className="fw-600 mb-0">
            {`${ticketData?.dirName} - `}{" "}
            {ticketData?.shareType === 1
              ? `(Rental ${ticketData?.sharePer}% - Ext ${ticketData?.extraSharePer}%)`
              : `(Share/Royalty: ${ticketData?.sharePer}%)`}
          </h6>
          <div className="d-flex ">
            <div className="yellow-bg py-1 px-2 rounded small-font white-text w-fit">
              {ticketData?.dirName}
            </div>
            <h6 className="ms-2 mb-0">{userDetails2}</h6>
          </div>
        </div>
        <div className="  d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-column align-items-start ">
            <div className="yellow-font medium-font">{ticketData?.usePanNam} </div>
            <div className="green-btn small-font h-fit me-2">{ticketData?.ticketType === 1 || ticketData?.ticketType === 0 ?
              "Deposit" : "Withdraw"} in {getCurrency(ticketData?.reqCurrency)}</div>
          </div>
          <div> <IoCloseSharp size={24} onClick={handleCancel} /></div>
        </div>
      </div>
      <hr className="m-0" />
      <div className="px-3 pb-3 pt-1">

        <div className="row small-font">
          <div className={`${userRole === "management" ? "col-8 mt-2" : "col-12 mt-2"}`}>
            <div className="grey-box flex-between">
              <span>UTR NO</span>
              <span>{ticketData?.transacId}</span>
            </div>
          </div>
          {userRole === "management" ?
            <div className="col-4 mt-2">
              <div className="grey-box flex-between">
                <span className="green-font">{getCurrency(ticketData?.reqCurrency)} To INR </span>
                <span>{ticketData?.totCur ? Math.floor(Number(ticketData?.totCur).toFixed(2)) : 0}</span>
              </div>
            </div> : null}

          <div className={`${userRole === "management" ? "col-4 mt-2" : "col-6 mt-2"}`}>
            <div className="grey-box flex-between">
              <span>Currency</span>
              <span>{getCurrency(ticketData?.reqCurrency)}</span>
            </div>
          </div>
          <div className={`${userRole === "management" ? "col-4 mt-2" : "col-6 mt-2"}`}>
            <div className="grey-box flex-between">
              <span>Cur Amt.</span>
              <span>{ticketData?.paidAmount ? ticketData?.paidAmount : 0}</span>
            </div>
          </div>
          {userRole === "management" ? <div className="col-4 mt-2">
            <div className="grey-box flex-between">
              <span>Amt INR</span>
              <span className="yellow-font">{Math.floor(Number(ticketData?.totCur).toFixed(2))}</span>
            </div>
          </div> : null}
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
            <span>{ticketData?.date ? formatDateTime(ticketData?.date) : null}</span>
          </div>
        </div>

        {ticketData?.uploadedFile ? <div className="w-100 border mt-2">
          <img className="w-100 h-10vh" src={`${imgUrl}/deposits/${ticketData?.uploadedFile}`} alt="" />
        </div> : null}

        <div className="row small-font">
          {ticketData?.shareType !== 1 ?
            <div className="col-12 mt-2">
              <div className="grey-box flex-between mt-1">
                <span>Sports & Casino Chips - {getCurrency(ticketData?.reqCurrency)} </span>
                <span className="yellow-font">{ticketData?.requChips}</span>
              </div>
              <div className="grey-box flex-between mt-1">
                <span>Sports & Casino Chips - INR</span>
                <span className="yellow-font">{Math.floor(Number(ticketData?.inrChips).toFixed(2))}</span>
              </div>
            </div> : <div className="col-12 mt-2">
              <div className="grey-box flex-between">
                <span>Sports Chips - {getCurrency(ticketData?.reqCurrency)} </span>
                <span className="yellow-font">{ticketData?.requChips}</span>
              </div>
              <div className="grey-box flex-between mt-2">
                <span>Sports Chips - INR</span>
                <span className="yellow-font">{Math.floor(Number(ticketData?.totCur).toFixed(2))}</span>
              </div>
            </div>}

          {fromPath === "tickets" ? <>
            {ticketData?.status === 0 ? (
              <>
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
                  {!selectedOption && <p className="text-danger small-font">{rejectionError}</p>}

                </div>
                <div className="col-6 mt-3">
                  <button className="w-100 saffron-btn2" onClick={() => handleTicket("APPROVE")}>Approve</button>
                </div>
                <div className="col-6 mt-3">
                  <button className="w-100 white-btn3" onClick={() => handleTicket("REJECT")}>Reject</button>
                </div>
              </>) : <button className="w-100 saffron-btn2 pointer-events-none cursor-not-allowed" disabled>{ticketData?.status === 1 ? "Approved" : "Rejected"}</button>
            }
          </> : null}

        </div>
      </div>
    </Modal>
  );
}

export default DepositWithdrawPopup;
