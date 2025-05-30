import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { FaPlus, FaSearch } from "react-icons/fa";
import { SlPencil } from "react-icons/sl";
import AddNewOfflinePaymentModal from "./AddNewOfflinePaymentModal";
import {
  getManagementOfflinePaymentModes,
  suspenManagementOfflinePaymentModes,
} from "../../api/apiMethods";
import { useRef } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import ConfirmationPopup from "./../popups/ConfirmationPopup";
import { imgUrl } from "../../api/baseUrl";
import { useSearchParams } from "react-router-dom";
import ErrorPopup from "../popups/ErrorPopup";
import { useSelector } from "react-redux";
import SuccessPopup from "../popups/SuccessPopup";

const OfflinePaymentModes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [paymentModes, setPaymentModes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const role_code = localStorage.getItem("role_code");
  const dataFetched = useRef(false);
  const [searchInput, setSearchInput] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [offlinePaymnetModeId, setOfflinePaymentModeId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [editId, setEditId] = useState(null);
  const itemsPerPage = 4;
  const [totalRecords, setTotalRecords] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const intialpage = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(intialpage);
  const page = currentPage;
  const pageSize = itemsPerPage;
  const [currentLimit, setCurrentLimit] = useState(4);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [errorPopup, setErrorPopup] = useState(false);
  const status_id = statusId === 1 ? 2 : 1;
  const allCountries = useSelector((item) => item?.allCountries);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [blockLoader, setBlockLoader] = useState(false);

  const hanldeAddModal = () => {
    setShowAddModal(true);
    setIsEdit(false);
    setEditId(null);
  };

  const handleEditModal = (id) => {
    setEditId(id);
    setIsEdit(true);
    setShowAddModal(true);
  };

  const typeOptions = {
    1: "NEFT",
    2: "UPI",
    3: "QR Code",
    4: "Cash",
  };

  const getCountryName = (id) => {
    const country = allCountries.find((c) => c.id === id);
    return country ? country.name : "Unknown";
  };
  const getCurrencyName = (id) => {
    const currency = allCountries.find((c) => c.id === id);
    return currency ? currency.currency_name : "Unknown";
  };

  const getAllManPaymentModes = (page, pageSize, bankName) => {
    setLoading(true);
    getManagementOfflinePaymentModes({ page, pageSize, bankName })
      .then((response) => {
        if (response.status === true) {
          setPaymentModes(response.data);
          setTotalRecords(response?.totalCount);
        }
      })
      .catch((error) => {
        setError(error?.message);
        setErrorPopup(true);
        setTimeout(() => {
          setErrorPopup(false);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (role_code === "management" || role_code === "accounts") {
      if (dataFetched.current) return;
      dataFetched.current = true;
      getAllManPaymentModes(page, pageSize);
      // getAllCountries();
    }
  }, []);

  useEffect(() => {
    const pagee = intialpage;
    const pageSizee = itemsPerPage;
    if (searchInput.trim() === "") {
      getAllManPaymentModes(pagee, pageSizee);
    }
  }, [searchInput]);

  const handlePageChange = ({ limit, offset }) => {
    setCurrentLimit(limit);
    setCurrentOffset(offset);
    if (role_code === "management" || role_code === "accounts") {
      getAllManPaymentModes(intialpage, pageSize, searchInput);
    }
  };

  const handleManagementSuspend = (id, status) => {
    setConfirmationModal(true);
    setOfflinePaymentModeId(id);
    setStatusId(status);
  };

  const suspendStatus = () => {
    setBlockLoader(true);
    setConfirmationModal(true);
    suspenManagementOfflinePaymentModes(offlinePaymnetModeId, status_id)
      .then((response) => {
        if (response.status === true) {
          setBlockLoader(false);
          setConfirmationModal(false);
          setSuccessPopupOpen(true);

          getAllManPaymentModes(page, pageSize);
          setMsg(response?.message);
        }
      })
      .catch((error) => {
        setError(error?.message[0]?.message);
        setConfirmationModal(false);
        setErrorPopup(true);
        setBlockLoader(false);
        setTimeout(() => {
          setErrorPopup(false);
        }, 2000);
      });
  };

  const columns = [
    { header: "Country", field: "country", width: "15%" },
    { header: "Currency ", field: "currency", width: "10%" },
    { header: "Name", field: "name", width: "15%" },
    { header: "Image", field: "image", width: "15%" },
    { header: "type", field: "type", width: "10%" },
    { header: <div className="">Status</div>, field: "status", width: "12%" },
    {
      header: <div className="">Actions</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = paymentModes?.map((item) => {
    return {
      country: getCountryName(item?.country_id),
      currency: getCurrencyName(item?.currency),
      name: <div>{item?.name}</div>,
      type: <div>{typeOptions[item?.avil_modes]}</div>,
      image: (
        <img
          src={`${imgUrl}/offlinepaymentsMode/${item?.image}`}
          className="w-70 h-7vh"
          loading="lazy"
        />
      ),
      status:
        item?.status === 1 ? (
          <span className="green-btn badge py-2 px-3">Active</span>
        ) : (
          <span className="red-btn badge py-2 px-3">In-Active</span>
        ),

      action: (
        <div className="d-flex gap-2 my-1">
          {item?.status === 1 ? (
            <span>
              <SlPencil
                size={22}
                className="me-2 pointer font-20"
                onClick={() => handleEditModal(item?.id)}
              />
            </span>
          ) : (
            <span title="this gateway is inactivated you can't updated it!">
              <SlPencil size={22} className="me-2 pointer disabled" />
            </span>
          )}

          <span>
            <RiDeleteBinLine
              size={22}
              className="pointer ms-1"
              onClick={() => handleManagementSuspend(item?.id, item.status)}
            />
          </span>
        </div>
      ),
    };
  });

  const handleFiltration = async (e) => {
    const pageSiz = itemsPerPage;
    const pag = 1;
    if (e.key === "Enter") {
      setError(null);
      getAllManPaymentModes(pag, pageSiz, searchInput);
    }
  };

  return (
    <div>
      {!loading && (
        <div className="row justify-content-between align-items-center mb-3 mt-2">
          <h6 className="col-2 yellow-font medium-font mb-0 white-space">
            Offline Payment Cards
          </h6>

          <div className="col-6 d-flex justify-content-end gap-3 medium-font">
            <div className="input-pill d-flex align-items-center rounded-pill px-2 w-50">
              <FaSearch size={16} className="grey-clr me-2" />
              <input
                className="small-font all-none"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.trim())}
                onKeyDown={handleFiltration}
              />
            </div>
            <button
              className="rounded-pill input-pill blue-font small-font px-2"
              onClick={hanldeAddModal}
            >
              <FaPlus /> Add New
            </button>
          </div>
        </div>
      )}

      <div className="mt-2">
        {loading ? (
          <div className="spinner">
            <div className="spinner-circle"></div>
          </div>
        ) : (
          <Table
            data={data}
            columns={columns}
            itemsPerPage={itemsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {showAddModal && (
        <AddNewOfflinePaymentModal
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editId={editId}
          setEditId={setEditId}
          countries={allCountries}
          getAllManPaymentModes={getAllManPaymentModes}
          setSuccessPopupOpen={setSuccessPopupOpen}
          setMsg={setMsg}
        />
      )}

      {confirmationModal && (
        <ConfirmationPopup
          confirmationPopupOpen={confirmationModal}
          setConfirmationPopupOpen={() => setConfirmationModal(false)}
          discription={`Are you sure you want to ${statusId === 1 ? "In-Active" : "Active"
            } this Payment Mode?`}
          submitButton={`${statusId === 1 ? "In-Active" : "Active"}`}
          onSubmit={suspendStatus}
          blockLoader={blockLoader}
          setBlockLoader={setBlockLoader}
        />
      )}

      {error && (
        <ErrorPopup
          discription={error}
          errorPopupOpen={errorPopup}
          setErrorPopupOpen={setErrorPopup}
        />
      )}

      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={msg}
        />
      )}
    </div>
  );
};

export default OfflinePaymentModes;
