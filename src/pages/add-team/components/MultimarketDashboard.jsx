import React, { useEffect, useRef, useState } from "react";
import Table from "../../../components/Table";
import { IoAdd } from "react-icons/io5";
import { MdBlock, MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getMultiMarket } from "../../../api/apiMethods";
import WebsiteContrl from "./../WebsiteContrl";
import UnblockBlockWebsiteModal from "../UnblockBlockWebsiteModal";
import { CgUnblock } from "react-icons/cg";
import { SlPencil } from "react-icons/sl";

const MultimarketDashboard = ({ dwnlnId }) => {
  const navigate = useNavigate();
  const [blockWebsiteModal, setBlockWebsiteModal] = useState(false);
  const [webMarketDtls, setWebMarketDtls] = useState([]);
  const [webList, setWebList] = useState([]);
  const [adminWebsiteId, setAdminWebsiteId] = useState(null);
  const [adminStatusId, setAdminStatusId] = useState(null);
  const [dirId, setDirId] = useState(null);
  const dataFetched = useRef(false);
  const handleBlock = (id, status, dir) => {
    setBlockWebsiteModal(true);
    setAdminWebsiteId(id);
    setAdminStatusId(status);
    setDirId(dir);
  };
  const getWebMarketDtls = () => {
    getMultiMarket(dwnlnId)
      .then((res) => {
        setWebMarketDtls(res.data);
        setWebList(res?.data?.accessWebsites);
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
        <div className="d-flex flex-between w-100">
          <div className="w-25">Website Name</div>
          <div className="d-flex flex-center w-55">Share/Rent</div>
          <div className="w-10 white-space">Last Updated</div>
        </div>
      ),
      field: "name",
      width: "50%",
    },

    {
      header: <div className="flex-center w-100"></div>,
      field: "last",
      width: "5%",
    },
    {
      header: <div className="d-flex flex-center">Status</div>,
      field: "status",
      width: "20%",
    },
    {
      header: <div className="text-center w-100">Action</div>,
      field: "action",
      width: "15%",
    },
  ];

  const data = webMarketDtls?.accessWebsites?.map((website) => ({
    name: (
      <div className="d-flex flex-column">
        <div className="fw-700 medium-font">{website.admin_panel_name}</div>
        <div>User websites:</div>
        <div className="d-flex flex-column">
          {website.user_panels?.map((panel) => (
            <div key={panel.user_panel_id} className="flex-border-bottom w-100">
              <span className="w-20">{panel.user_panel_name}</span>
              <span className="d-flex  flex-center w-30">{panel.share}%</span>
              <span>{new Date(panel.updated_date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    last: <div className="d-flex flex-column"></div>,
    status: (
      <div className="d-flex flex-center mb-5 pb-2rem">
        {webMarketDtls?.status === 1 ? (
          <div className="green-btn">Active</div>
        ) : (
          <div className="red-btn">In-Active</div>
        )}
      </div>
    ),
    action: (
      <div className="d-flex gap-2 pb-2rem mb-5 flex-center">
        <span
          className="pointer"
          onClick={() =>
            handleBlock(website?.admin_panel_id, webMarketDtls?.status, dwnlnId)
          }
        >
          {webMarketDtls?.status === 1 ? (
            <span className="green-font">
              <MdBlock size={20} />
            </span>
          ) : (
            <span className="red-font">
              <MdBlock size={20} />
            </span>
          )}
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
            className="d-flex gap-2 align-items-center small-font pointer rounded-pill input-pill blue-font px-1 py-1"
            onClick={() =>
              navigate(`/director-admin/editDirector`, {
                state: { userId: dwnlnId, mode: "add" },
              })
            }
          >
            <IoAdd className="blue-font" size={16} />
            Add More
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
        adminStatusId={adminStatusId}
        dirId={dirId}
      />
    </div>
  );
};

export default MultimarketDashboard;
