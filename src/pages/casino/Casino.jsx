import React from "react";
import Table from "../../components/Table";

function Casino() {
  const cols =[
    {header:"S No", field:"sno"},
    {header:"Vendor Name", field:"vendor"},
    {header:"vendor Percentage", field:"vendorper"},
    {header:"Vendor Country", field:"country"},
    {header:"Providers", field:"providers"},
    {header:"Action", field:"action"},
    {header:"Profit & Loss", field:"pl"},
    {header:"Status", field:"status"},
  ];

  const data =[
    {
      sno:<div>1</div>,
      vendor:<div className="orange-clr">Lokesh</div>,
      vendorper:<div>10%</div>,
      country:<div>India</div>,
      providers:<div className="d-flex flex-column">
        <div>Ezugi</div>
        <div>Evolution</div>
        <div>Asian Games</div>
        <div>Pragmatic Play</div>
        <div>Sexy Gaming</div>
      </div>,
      action:<div className="d-flex flex-column">
        <div>
          <input type="checkbox"/>
        </div>
        <div>
          <input type="checkbox"/>
        </div>
        <div>
          <input type="checkbox"/>
        </div>
        <div>
          <input type="checkbox"/>
        </div>
        <div>
          <input type="checkbox"/>
        </div>
      </div>,
      pl:<div className="d-flex flex-column">
      <div className="green-clr">50000</div>
      <div className="dark-orange-clr">60000</div>
      <div className="green-clr">20000</div>
      <div className="green-clr">40000</div>
      <div className="dark-orange-clr">65000</div>
    </div>,
      status:<div className="d-flex flex-column">
      <div className="active-btn">active</div>
      <div className="active-btn">active</div>
      <div className="active-btn">active</div>
      <div className="inactive-btn">in-active</div>
      <div className="inactive-btn">in-active</div>
    </div>,
    }
  ]
  return (
    <div>
      <div className="d-flex flex-between align-items-center">
      <h4>Casino</h4>
      <div className="small-font">Total P/L : <span className="green-clr mx-1">20000</span></div>
      </div>
      <div className="white-bg radius">
        <Table columns={cols} data={data} itemsPerPage={5}/>
      </div>
    </div>
  );
}

export default Casino;
