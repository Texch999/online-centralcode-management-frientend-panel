import React, { useState } from "react";
import ScrollTable from "../../components/ScrollTable";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function DownLineAdmins() {
  const [activeSport, setActiveSport] = useState("My Statements");
  const [settleBalance,setSettleBalance]=useState(false)
  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };
  const navigation = useNavigate();
  const handleMatchClick = (matchName) => {
    
    navigation(`/match/${encodeURIComponent(matchName)}`); 
  };
 



  
  const GATEWAY_COLUMNS = [
    { header: "Admin Details", field: "adminDetails" },
    { header: "Type", field: "type" },
    { header: "Sp Rental", field: "spRental" },
    { header: "Casino Share/Royalty", field: "casinoShareRoyalty" },
    { header: "Sp & Ca Share/Royalty", field: "spCaShareRoyalty" },
    { header: "Withdraw", field: "withdraw" },
    { header: "Total P/L", field: "totalPL" },
    { header: "Upper Payments", field: "upperPayments" },
    { header: "Net P/L", field: "netPL" },
    { header: "Downline", field: "downline" },
  ];

  const GATEWAY_DATA = [
    {
        adminDetails:"Jayanta Director",
        type: "Share/Royalty",
        spRental: <div>10000</div>,
        casinoShareRoyalty: <div >10000</div>,
        spCaShareRoyalty: <div >500000</div>,
        withdraw: <div  className="red-font">500000</div>,
        totalPL: <div className="green-font">500000</div>,
        upperPayments: <div className="red-font">500000</div>,
        netPL: <div className="green-font">500000</div>,
        downline:  <div className="  w-60  flex-center">
        <MdOutlineRemoveRedEye
          size={18}
          onClick={() =>
            handleMatchClick("Owner - Jayanta (Director)")
          }
          className="pointer"
        />
      </div>,
    },
    {
        adminDetails:"Jayanta Director",
        type: "Share/Royalty",
        spRental: <div>10000</div>,
        casinoShareRoyalty: <div >10000</div>,
        spCaShareRoyalty: <div >500000</div>,
        withdraw: <div  className="red-font">500000</div>,
        totalPL: <div className="green-font">500000</div>,
        upperPayments: <div className="red-font">500000</div>,
        netPL: <div className="green-font">500000</div>,
        downline:  <div className="  w-60  flex-center">
        <MdOutlineRemoveRedEye
          size={18}
          onClick={() =>
            handleMatchClick("Owner - Jayanta (Director)")
          }
          className="pointer"
        />
      </div>,
    },

    {
        adminDetails:"Jayanta Director",
        type: "Share/Royalty",
        spRental: <div>10000</div>,
        casinoShareRoyalty: <div >10000</div>,
        spCaShareRoyalty: <div >500000</div>,
        withdraw: <div  className="red-font">500000</div>,
        totalPL: <div className="green-font">500000</div>,
        upperPayments: <div className="red-font">500000</div>,
        netPL: <div className="green-font">500000</div>,
        downline:  <div className="  w-60  flex-center">
        <MdOutlineRemoveRedEye
          size={18}
          onClick={() =>
            handleMatchClick("Owner - Jayanta (Director)")
          }
          className="pointer"
        />
      </div>,
    },

    {
        adminDetails:"Jayanta Director",
        type: "Share/Royalty",
        spRental: <div>10000</div>,
        casinoShareRoyalty: <div >10000</div>,
        spCaShareRoyalty: <div >500000</div>,
        withdraw: <div  className="red-font">500000</div>,
        totalPL: <div className="green-font">500000</div>,
        upperPayments: <div className="red-font">500000</div>,
        netPL: <div className="green-font">500000</div>,
        downline:  <div className="  w-60  flex-center">
        <MdOutlineRemoveRedEye
          size={18}
          onClick={() =>
            handleMatchClick("Owner - Jayanta (Director)")
          }
          className="pointer"
        />
      </div>,
    },

    {
        adminDetails:"Jayanta Director",
        type: "Share/Royalty",
        spRental: <div>10000</div>,
        casinoShareRoyalty: <div >10000</div>,
        spCaShareRoyalty: <div >500000</div>,
        withdraw: <div  className="red-font">500000</div>,
        totalPL: <div className="green-font">500000</div>,
        upperPayments: <div className="red-font">500000</div>,
        netPL: <div className="green-font">500000</div>,
        downline:  <div className="  w-60  flex-center">
        <MdOutlineRemoveRedEye
          size={18}
          onClick={() =>
            handleMatchClick("Owner - Jayanta (Director)")
          }
          className="pointer"
        />
      </div>,
    },

    {
        adminDetails:"Jayanta Director",
        type: "Share/Royalty",
        spRental: <div>10000</div>,
        casinoShareRoyalty: <div >10000</div>,
        spCaShareRoyalty: <div >500000</div>,
        withdraw: <div  className="red-font">500000</div>,
        totalPL: <div className="green-font">500000</div>,
        upperPayments: <div className="red-font">500000</div>,
        netPL: <div className="green-font">500000</div>,
        downline:  <div className="  w-60  flex-center">
        <MdOutlineRemoveRedEye
          size={18}
          onClick={() =>
            handleMatchClick("Owner - Jayanta (Director)")
          }
          className="pointer"
        />
      </div>,
    },



    
   

  ];

  const GATEWAY_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: ""},
    { header:"" },
    { header: "" },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div>},
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: ""},
  ];

  return (
    <div>
     
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex yellow-font mb-0">
        P/L Reports Downline Admins
        </h6>
      </div>
     
        <div className="d-flex w-80 mb-3">
        <div className="col-2 flex-column mx-2">
            <label className="black-text4 small-font mb-1">From</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="col-2 flex-column mx-2">
            <label className="black-text4 small-font mb-1">To</label>
            <input className="input-css2 small-font" type="date" />
          </div>

          <div className="col-2 flex-column me-3">
            <label className="black-text4 small-font mb-1">Admins</label>
            <select className="input-css2 small-font">
              <option>Select</option>
            </select>
          </div>
          <div className="saffron-btn2 small-font pointer mt-3 col-1">
            Submit
          </div>
        </div>
    
      <div className="d-flex  w-80">
        <div className="w-100 flex-between flex-wrap mb-3 py-3 grey-bg2 rounded">
          <div className="col-6 px-3">
            <div className="white-btn2 flex-between">
              <span className="small-font">
               
              Sp Rental
              </span>
              <span className="medium-font green-font">1000000000</span>
            </div>
          </div>
          <div className="col-6 px-3">
            <div className="white-btn2 flex-between">
              <span className="small-font">
              Withdraw
              </span>
              <span className="medium-font red-font">1000000000</span>
            </div>
          </div>
          <div className="col-6 px-3 mt-2">
            <div className="white-btn2 flex-between">
              <span className="small-font">
              Casino Share/Royalty
              </span>
              <span className="medium-font green-font">2000000000</span>
            </div>
          </div>
          <div className="col-6 px-3 mt-2">
            <div className="white-btn2 flex-between">
              <span className="small-font">
              Total P/L
              </span>
              <span className="medium-font red-font">2000000000</span>
            </div>
          </div>
          <div className="col-6 px-3 mt-2">
            <div className="white-btn2 flex-between">
              <span className="small-font">
              Sp & Ca Share/Royalty
              </span>
              <span className="medium-font red-font">2000000000</span>
            </div>
          </div>
          <div className="col-6 px-3 mt-2">
            <div className="white-btn2 flex-between">
              <span className="small-font">
              Upper Payments
              </span>
              <span className="medium-font red-font">2000000000</span>
            </div>
          </div>
        </div>

        <div className="flex-end mb-3 ms-3 pointer" onClick={()=>setSettleBalance(true  )}>
            <div className="white-btn2 medium-font  ">Settlements</div>
          </div>
      </div>
      

      <div>
         
          <div>
            <ScrollTable
              columns={GATEWAY_COLUMNS}
              data={GATEWAY_DATA}
              footer={GATEWAY_FOOTER}
              itemsPerPage={1}
              greyBackground="footer-bg"
            />
          </div>
        </div>
  
    </div>
  );
}

export default DownLineAdmins;


