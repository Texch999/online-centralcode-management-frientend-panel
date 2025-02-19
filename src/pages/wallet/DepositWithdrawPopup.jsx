import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { Images } from "../../images/index";
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
  fromPath
}) {
  const handleCancel = () => {
    setTicketDetails(null)
    setRejectionReasons(null)
    setDepositWithdrawPopupOpen(false);
  };
  const userRole = localStorage.getItem("role_code");
  const allCountries = useSelector((item) => item?.allCountries);
  const [selectedOption, setSelectedOption] = useState(null);

  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name
  };

  const options = rejectionReasons?.map((reason) => ({
    value: reason.id, // Use id as the value
    label: reason.questions, // Use questions as the label
  }));

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption); // Store the selected option
    console.log("Selected Reason ID:", selectedOption.value); // For debugging
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
      hour12: false, // Ensures 24-hour format
    });

    return `${formattedDate} | ${formattedTime}`;
  };

  return (
    <Modal show={depositWithdrawPopupOpen} centered>
      <div className="d-flex justify-content-between black-text4 p-3">
        <div className="flex-column">
          <h6 className="fw-600 mb-0">
            {`${ticketData?.dirName} - `}{" "}
            {ticketData?.shareType === 1
              ? `(Rental ${ticketData?.sharePer}%)`
              : `(Share/Royalty: ${ticketData?.sharePer}%)`}
          </h6>
          <div className="d-flex ">
            <div className="yellow-bg py-1 px-2 rounded small-font white-text w-fit">
              {ticketData?.dirName}
            </div>
            <h6 className="ms-2 mb-0">{userDetails2}</h6>
          </div>
        </div>
        <div className="green-btn small-font h-fit">{ticketData?.ticketType === 1 ? "Deposit" : "Withdraw"}</div>
        <IoCloseSharp size={20} onClick={handleCancel} />
      </div>
      <hr className="m-0" />
      <div className="px-3 pb-3 pt-1">
        <div className="row small-font">
          <div className="col-8 mt-2">
            <div className="grey-box flex-between">
              <span>UTR NO</span>
              <span>{ticketData?.transacId}</span>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="grey-box flex-between">
              <span className="green-font">{getCurrency(ticketData?.reqCurrency)} To INR </span>
              <span>{Math.floor(ticketData?.totCur)}</span>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="grey-box flex-between">
              <span>Currency</span>
              <span>{getCurrency(ticketData?.reqCurrency)}</span>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="grey-box flex-between">
              <span>Cur Amt.</span>
              <span>{Math.floor(ticketData?.totCur)}</span>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="grey-box flex-between">
              <span>Amt INR</span>
              <span className="yellow-font">{Math.floor(Number(ticketData?.totCur))}</span>
            </div>
          </div>
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
              <div className="grey-box flex-between">
                <span>Sports & Casino Chips</span>
                <span className="yellow-font">{ticketData?.requChips}</span>
              </div>
              <div className="grey-box flex-between mt-1">
                <span>Sports & Casino Chips - {getCurrency(ticketData?.reqCurrency)} </span>
                <span className="yellow-font">{ticketData?.requChips}</span>
              </div>
              <div className="grey-box flex-between mt-1">
                <span>Sports & Casino Chips - INR</span>
                <span className="yellow-font">{Math.floor(ticketData?.totCur)}</span>
              </div>
            </div> : <div className="col-12 mt-2">
              <div className="grey-box flex-between">
                <span>Sports Chips - {getCurrency(ticketData?.reqCurrency)} </span>
                <span className="yellow-font">{ticketData?.requChips}</span>
              </div>
              <div className="grey-box flex-between">
                <span>Sports Chips - INR</span>
                <span className="yellow-font">{Math.floor(ticketData?.totCur)}</span>
              </div>
            </div>}

          <div className="col-12 mt-2">
            <Select
              className="small-font"
              options={options} // Pass transformed options
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              onChange={handleChange} // Handle selection change
              value={selectedOption} // Control the selected value displayed in the selector
            />
          </div>
          {fromPath === "tickets" ? <>
            <div className="col-6 mt-3">
              <button className="w-100 saffron-btn2" >Approved</button>
            </div>
            <div className="col-6 mt-3">
              <button className="w-100 white-btn3">Rejected</button>
            </div>
          </> : null}


        </div>
      </div>
    </Modal>
  );
}

export default DepositWithdrawPopup;
