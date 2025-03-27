import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { IoAdd } from "react-icons/io5";
import { MdBlock, MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getMultiMarket } from "../../../api/apiMethods";
import WebsiteContrl from "./../WebsiteContrl";

const MultimarketDashboard = (dwnlnId) => {
  const navigate = useNavigate();
  console.log("dwnlnId===>", dwnlnId.dwnlnId);
  const [webMarketDtls, setWebMarketDtls] = useState([]);
  console.log(webMarketDtls, "webMarketDtls");
  const getWebMarketDtls = (id) => {
    getMultiMarket(id)
      .then((res) => {
        setWebMarketDtls(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getWebMarketDtls(dwnlnId.dwnlnId);
  }, []);
  const columns = [
    {
      header: (
        <div className="d-flex flex-between">
          <div className="">Website Name</div>
          <div className="">Share/Rent</div>
        </div>
      ),
      field: "name",
      width: "43%",
    },

    {
      header: <div className="flex-center w-100">Last Updated</div>,
      field: "last",
      width: "40%",
    },
    {
      header: <div className="">Status</div>,
      field: "status",
      width: "10%",
    },
    {
      header: <div className="text-center w-100">Action</div>,
      field: "action",
      width: "20%",
    },
  ];
  const [websiteModal, setWebisteModal] = useState(false);

  const data = webMarketDtls?.accessWebsites?.map((website) => ({
    name: (
      <div className="d-flex flex-between">
        <div className="d-flex flex-column">
          <div className="fw-700">{website.admin_panel_name}</div>
          <div>User website:</div>
          <div className="d-flex flex-column">
            {website.user_panels?.map((panel) => (
              <div key={panel.user_panel_id}>{panel.user_panel_name}</div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <div>{website.user_panels[0]?.share}%</div>
          </div>
        </div>
      </div>
    ),
    last: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div>
          {new Date(website.user_panels[0]?.updated_date).toLocaleDateString()}
        </div>
      </div>
    ),
    status: (
      <div className="badge payment-gateway-status-badge p-2">
        {website.user_panels[0]?.status === 1 ? "Active" : "Inactive"}
      </div>
    ),
    action: (
      <div className="d-flex gap-2 flex-center">
        <span className="pointer">
          <MdOutlineModeEdit
            size={20}
            onClick={() => navigate("/director-admin/editDirector")}
          />
        </span>

        <span className="pointer" onClick={() => setWebisteModal(true)} >
          <MdBlock size={20} />
        </span>
        <span>
          <MdDelete size={20} />
        </span>
      </div>
    ),
  }));

  // const data = [
  //   {
  //     name: (
  //       <div>
  //         <div className="d-flex flex-between">
  //           <div className="d-flex flex-column">
  //             <div className="fw-700">Brahma</div>

  //             <div>User website:</div>
  //             <div className="d-flex flex-column">
  //               <div>diamondexchangenew.com</div>
  //               <div>starsports247.com</div>
  //             </div>
  //           </div>
  //           <div className="d-flex flex-column ">
  //             <div className="fw-700"></div>
  //             <div></div>
  //             <div className="d-flex flex-column">
  //               <div>10%</div>
  //               <div>5000</div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="d-flex my-2 flex-between">
  //           <div className="d-flex flex-column">
  //             <div className="fw-700">Ravana</div>
  //             <div>User website:</div>
  //             <div className="d-flex flex-column">
  //               <div>diamondexchangenew.com</div>
  //               <div>starsports247.com</div>
  //             </div>
  //           </div>
  //           <div className="d-flex flex-column ">
  //             <div className="fw-700"></div>
  //             <div></div>
  //             <div className="d-flex flex-column">
  //               <div>10%</div>
  //               <div>5000</div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),

  //     last: (
  //       <div className="d-flex flex-column justify-content-center align-items-center">
  //         <div>26/09/2024</div>
  //       </div>
  //     ),
  //     status: (
  //       <div className="badge payment-gateway-status-badge p-2">active</div>
  //     ),
  //     action: (
  //       <div className="d-flex gap-2 flex-center">
  //         <span className="pointer">
  //           <MdOutlineModeEdit
  //             size={20}
  //             onClick={() => navigate("/director-admin/editDirector")}
  //           />
  //         </span>
  //         <span>
  //           <MdBlock size={20} />
  //         </span>
  //         <span>
  //           <MdDelete size={20} />
  //         </span>
  //       </div>
  //     ),
  //   },
  // ];
  return (
    <div>
      <div className="py-4 bg-white shadow rounded">
        <div className="px-3 d-flex justify-content-between align-items-center mb-3">
          <h6 className="medium-font">Multimarket</h6>
          <div
            className="d-flex gap-2 align-items-center small-font rounded-pill input-pill blue-font px-1 py-1"
            onClick={() => navigate("/director-admin/editDirector")}
          >
            <IoAdd className="blue-font" size={16} />
            Add New
          </div>
        </div>

        <div className="table-parent-container mt-2">
          <Table data={data} columns={columns} itemsPerPage={3} />
        </div>
      </div>
      <WebsiteContrl show={websiteModal} setShow={setWebisteModal} />
    </div>
  );
};

export default MultimarketDashboard;
