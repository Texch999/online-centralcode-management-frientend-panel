import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { Images } from "../../images/index";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { useSelector } from "react-redux";

function DepositWithdrawPopup({
  depositWithdrawPopupOpen,
  setDepositWithdrawPopupOpen,
  userDetails,
  userDetails2,
  ticketData,
  setTicketDetails,
  rejectionReasons
}) {
  const handleCancel = () => {
    setTicketDetails(null)
    setDepositWithdrawPopupOpen(false);
  };
  const userRole = localStorage.getItem("role_code");
  const allCountries = useSelector((item) => item?.allCountries);
  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name
  };

  const reasonOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];
  console.log(ticketData, " ======>ticketData ")

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
          <div className="col-6 mt-2">
            <div className="grey-box flex-between">
              <span>Tnr ID</span>
              <span>{ticketData?.transacId}</span>
            </div>
          </div>
          <div className="col-6 mt-2">
            {console.log(ticketData?.uploadedFile === null)}
            <div className="grey-box flex-between">
              <span>Ref ID</span>
              <span>{ticketData?.transacId}</span>
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
              <span>{ticketData?.totCur}</span>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="grey-box flex-between">
              <span>Amt INR</span>
              <span className="yellow-font">84000</span>
            </div>
          </div>
        </div>
        <div className="input-bg rounded small-font mt-2">
          <div className="flex-between p-2">
            <span>Payment Method</span>
            <span>{ticketData?.totCur}</span>
          </div>
          <hr className="m-0" />
          <div className="flex-between p-2">
            <span>From</span>
            <span>{ticketData?.dirName}-{userRole === "management" ? ticketData?.dirName : userRole}</span>
          </div>
          <hr className="m-0" />
          <div className="flex-between p-2">
            <span>To</span>
            <span>Owner</span>
          </div>
          <hr className="m-0" />
          <div className="flex-between p-2">
            <span>Date & Time</span>
            <span>{ticketData?.date}</span>
          </div>
        </div>
        {ticketData?.uploadedFile !== null ? <div className="w-100 border mt-2">
          <img className="w-100 h-10vh" src={ticketData?.uploadedFile} alt="" />
        </div> : null}

        <div className="row small-font">

          {ticketData?.shareType !== 1 ?
            <div className="col-12 mt-2">
              <div className="grey-box flex-between">
                <span>Sports & Casino Chips</span>
                <span className="yellow-font">{ticketData?.requChips}</span>
              </div>
            </div> : <div className="col-12 mt-2">
              <div className="grey-box flex-between">
                <span>Sports Chips</span>
                <span>{ticketData?.requChips}</span>
              </div>
            </div>}

          {userRole === "management" ?
            <>
              <div className="col-12 mt-2">
                <Select
                  className="small-font"
                  options={rejectionReasons}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                />
              </div>
              <div className="col-6 mt-3">
                <button className="w-100 saffron-btn2">Approved</button>
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
