import React from "react";
import Table from "../../components/Table";
import "../casino/style.css";
import { useNavigate, useParams } from 'react-router-dom';
import { GiClick } from "react-icons/gi";

function Casino() {
 const navigate = useNavigate();
  const params = useParams();

  const handleProviderClick=(vendor, provider)=>{
    navigate("/casino-vendor",{state:{vendor, provider}})

  }
  const cols = [
    { header: "S No", field: "sno" },
    { header: "Vendor Name", field: "vendor" },
    { header: "vendor Percentage", field: "vendorper" },
    { header: "Vendor Country", field: "country" },
    { header: "Providers", field: "providers" },
    { header: "Action", field: "action" },
    { header: "Profit & Loss", field: "pl" },
    { header: "Status", field: "status" },
  ];

  const data = [
    {
      sno: <div>1</div>,
      vendor: <div className="orange-clr">Lokesh</div>,
      vendorper: <div>10%</div>,
      country: <div>India</div>,
      providers: (
        <div className="d-flex flex-column pointer">
          <div className="mb-2" onClick={()=>handleProviderClick("Lokesh", "Ezugi")}>Ezugi <span className="mx-1 orange-clr"><GiClick/></span></div>
          <div className="mb-2" onClick={()=>handleProviderClick("Lokesh", "Evolution")}>Evolution<span className="mx-1 orange-clr"><GiClick/></span></div>
          <div className="mb-2" onClick={()=>handleProviderClick("Lokesh", "Asian Games")}>Asian Games<span className="mx-1 orange-clr"><GiClick/></span></div>
          <div className="mb-2" onClick={()=>handleProviderClick("Lokesh", "Praggmatic Play")}>Pragmatic Play<span className="mx-1 orange-clr"><GiClick/></span></div>
          <div className="mb-2" onClick={()=>handleProviderClick("Lokesh", "Sexy Gaming")}>Sexy Gaming<span className="mx-1 orange-clr"><GiClick/></span></div>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column">
          <div className="green-clr mb-2">50000</div>
          <div className="dark-orange-clr mb-2">60000</div>
          <div className="green-clr mb-2">20000</div>
          <div className="green-clr mb-2">40000</div>
          <div className="dark-orange-clr mb-2"></div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
        </div>
      ),
    },
    {
      sno: <div>2</div>,
      vendor: <div className="orange-clr">Jitendra</div>,
      vendorper: <div>15%</div>,
      country: <div>UK</div>,
      providers: (
        <div className="d-flex flex-column">
          <div className="mb-2">Ezugi</div>
          <div className="mb-2">Evolution</div>
          <div className="mb-2">Asian Games</div>
          <div className="mb-2">Pragmatic Play</div>
          <div className="mb-2">Sexy Gaming</div>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column">
          <div className="green-clr mb-2">50000</div>
          <div className="dark-orange-clr mb-2">60000</div>
          <div className="green-clr mb-2">20000</div>
          <div className="green-clr mb-2">40000</div>
          <div className="dark-orange-clr mb-2">65000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>

          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
        </div>
      ),
    },
    {
      sno: <div>3</div>,
      vendor: <div className="orange-clr">Ram</div>,
      vendorper: <div>20%</div>,
      country: <div>USA</div>,
      providers: (
        <div className="d-flex flex-column">
          <div className="mb-2">Ezugi</div>
          <div className="mb-2">Evolution</div>
          <div className="mb-2">Asian Games</div>
          <div className="mb-2">Pragmatic Play</div>
          <div className="mb-2">Sexy Gaming</div>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column">
          <div className="green-clr mb-2">50000</div>
          <div className="dark-orange-clr mb-2">60000</div>
          <div className="green-clr mb-2">20000</div>
          <div className="green-clr mb-2">40000</div>
          <div className="dark-orange-clr mb-2">65000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>

          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
        </div>
      ),
    },
    {
      sno: <div>2</div>,
      vendor: <div className="orange-clr">Jitendra</div>,
      vendorper: <div>15%</div>,
      country: <div>UK</div>,
      providers: (
        <div className="d-flex flex-column">
          <div className="mb-2">Ezugi</div>
          <div className="mb-2">Evolution</div>
          <div className="mb-2">Asian Games</div>
          <div className="mb-2">Pragmatic Play</div>
          <div className="mb-2">Sexy Gaming</div>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column">
          <div className="green-clr mb-2">50000</div>
          <div className="dark-orange-clr mb-2">60000</div>
          <div className="green-clr mb-2">20000</div>
          <div className="green-clr mb-2">40000</div>
          <div className="dark-orange-clr mb-2">65000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>

          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
        </div>
      ),
    },
    {
      sno: <div>3</div>,
      vendor: <div className="orange-clr">Ram</div>,
      vendorper: <div>20%</div>,
      country: <div>USA</div>,
      providers: (
        <div className="d-flex flex-column">
          <div className="mb-2">Ezugi</div>
          <div className="mb-2">Evolution</div>
          <div className="mb-2">Asian Games</div>
          <div className="mb-2">Pragmatic Play</div>
          <div className="mb-2">Sexy Gaming</div>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column">
          <div className="green-clr mb-2">50000</div>
          <div className="dark-orange-clr mb-2">60000</div>
          <div className="green-clr mb-2">20000</div>
          <div className="green-clr mb-2">40000</div>
          <div className="dark-orange-clr mb-2">65000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>

          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
        </div>
      ),
    },
    {
      sno: <div>2</div>,
      vendor: <div className="orange-clr">Jitendra</div>,
      vendorper: <div>15%</div>,
      country: <div>UK</div>,
      providers: (
        <div className="d-flex flex-column">
          <div className="mb-2">Ezugi</div>
          <div className="mb-2">Evolution</div>
          <div className="mb-2">Asian Games</div>
          <div className="mb-2">Pragmatic Play</div>
          <div className="mb-2">Sexy Gaming</div>
        </div>
      ),
      action: (
        <div className="d-flex flex-column">
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
          <div className="mb-2">
            <input type="checkbox" />
          </div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column">
          <div className="green-clr mb-2">50000</div>
          <div className="dark-orange-clr mb-2">60000</div>
          <div className="green-clr mb-2">20000</div>
          <div className="green-clr mb-2">40000</div>
          <div className="dark-orange-clr mb-2">65000</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column">
          <div className="active-btn-table mb-2">active</div>

          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
          <div className="active-btn-table mb-2">active</div>
          <div className="inactive-btn-table mb-2">in-active</div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between align-items-center">
        <h4>Casino</h4>
        <div className="small-font">
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>
      <div className="white-bg radius">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
    </div>
  );
}

export default Casino;
