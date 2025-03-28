import React, { useEffect, useRef, useState } from "react";
import Table from "../../../components/Table";
import { IoAdd } from "react-icons/io5";
import { MdBlock, MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getMultiMarket } from "../../../api/apiMethods";
import WebsiteContrl from "./../WebsiteContrl";
import UnblockBlockWebsiteModal from "../UnblockBlockWebsiteModal";

const MultimarketDashboard = ({ dwnlnId }) => {
  const navigate = useNavigate();
  const [blockWebsiteModal, setBlockWebsiteModal] = useState(false);
  const [webMarketDtls, setWebMarketDtls] = useState([]);
  const [webList, setWebList] = useState([]);
  const [adminWebsiteId, setAdminWebsiteId] = useState(null);
  const dataFetched = useRef(false);
  const handleBlock = (id) => {
    setBlockWebsiteModal(true);
    setAdminWebsiteId(id);
  };
  const getWebMarketDtls = () => {
    getMultiMarket(dwnlnId)
      .then((res) => {
        setWebMarketDtls(res.data);
        setWebList(res?.data?.accessWebsites);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getWebMarketDtls();
  }, [dwnlnId]);
  const columns = [
    {
      header: (
        <div className="d-flex flex-between">
          <div className="">Website Name</div>
          <div className="">Share/Rent</div>
          <div className="">Last Updated</div>
        </div>
      ),
      field: "name",
      width: "40%",
    },

    {
      header: <div className="flex-center w-100"></div>,
      field: "last",
      width: "10%",
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

  const data = webMarketDtls?.accessWebsites?.map((website) => ({
    name: (
      <div className="d-flex flex-column">
        <div className="fw-700 medium-font">{website.admin_panel_name}</div>
        <div>User websites:</div>
        <div className="d-flex flex-column">
          {website.user_panels?.map((panel) => (
            <div key={panel.user_panel_id} className="flex-border-bottom">
              <span>{panel.user_panel_name}</span>
              <span>{panel.share}%</span>
              <span>{new Date(panel.updated_date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    ),

    last: (
      <div className="d-flex flex-column">
        {/* {website.user_panels?.map((panel) => (
          <div
            key={panel.user_panel_id}
            className="d-flex flex-column align-items-center flex-border-bottom"
          >
            <span>{new Date(panel.updated_date).toLocaleDateString()}</span>
          </div>
        ))} */}
      </div>
    ),
    status: (
      <div>
        {website?.user_panels[0]?.status === 1 ? (
          <div className="badge payment-gateway-status-badge p-2">Active</div>
        ) : (
          <div className="red-btn p-2">In-Active</div>
        )}
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

        <span
          className="pointer"
          onClick={() => handleBlock(website?.admin_panel_id)}
        >
          <MdBlock size={20} />
        </span>
      </div>
    ),
  }));

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
      <UnblockBlockWebsiteModal
        show={blockWebsiteModal}
        setShow={setBlockWebsiteModal}
        dwnlnId={dwnlnId}
        webList={webMarketDtls}
        adminWebsiteId={adminWebsiteId}
        getWebMarketDtls={getWebMarketDtls}
      />
    </div>
  );
};

export default MultimarketDashboard;
