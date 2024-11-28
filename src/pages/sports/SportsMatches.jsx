import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { MdBlock, MdDeleteOutline } from "react-icons/md";
import BlockPopup from "../popups/BlockPopup";
import DeletePopup from "../popups/DeletePopup";

const SportsMatches = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendor, provider, match } = location.state || {};
  const [blockModal, setBlockModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleBlockModal = () => {
    setBlockModal(!blockModal);
  };
  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const cols = [
    { header: <div className="flex-center">S No</div>, field: "sno" },
    { header: "Upcoming Matches", field: "upmatches" },
    { header: "Live Matches", field: "livematches" },
    { header: "Status", field: "status" },
    { header: "Profit & Loss", field: "pl" },
    { header: <div className="flex-center">Action</div>, field: "action" },
  ];

  const data = [
    {
      sno: <div className="flex-center">1</div>,
      upmatches: <div className="pointer">India vs Srilanka </div>,
      livematches: <div>New Zealand vs Pakistan</div>,
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>Active
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="d-flex flex-center">
          <div onClick={handleBlockModal}>
            <MdBlock className="font-20 dark-orange-clr mx-2" />
          </div>
          <div onClick={handleDeleteModal}>
            <MdDeleteOutline className="font-20" />
          </div>
        </div>
      ),
    },
    {
      sno: <div className="flex-center">2</div>,
      upmatches: <div className="pointer">Australia vs South Africa </div>,
      livematches: <div>Bangladesh vs England</div>,
      status: (
        <div className="dark-orange-clr">
          <span className="round-red-dot mx-1"></span>Blocked
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="d-flex flex-center">
         <div onClick={handleBlockModal}>
            <MdBlock className="font-20 dark-orange-clr mx-2" />
          </div>
          <div onClick={handleDeleteModal}>
            <MdDeleteOutline className="font-20" />
          </div>
        </div>
      ),
    },
    {
      sno: <div className="flex-center">3</div>,
      upmatches: <div className="pointer">New Zealand vs India</div>,
      livematches: <div>Australia vs India</div>,
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>Active
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="d-flex flex-center">
          <div onClick={handleBlockModal}>
            <MdBlock className="font-20 dark-orange-clr mx-2" />
          </div>
          <div onClick={handleDeleteModal}>
            <MdDeleteOutline className="font-20" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="pointer large-font" onClick={() => navigate(-1)}>
        <span className="grey-clr">
          Sports <span className="mx-1 font-20">{">"}</span>
        </span>
        <span className="grey-clr">{vendor}</span>
        <span className="grey-clr">
          <span className="mx-1 font-20 grey-clr">{">"}</span>
          {provider}
        </span>
        <span>
          <span className="mx-1 font-20">{">"}</span>
          {match}
        </span>
      </div>
      <div className="radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
      <BlockPopup show={blockModal} setShow={setBlockModal} title={"Match"}/>
      <DeletePopup show={deleteModal} setShow={setDeleteModal} title={"Match"}/>
    </div>
  );
};

export default SportsMatches;
