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
import { CircleLoader } from "react-spinners";
import { RiDeleteBinLine } from "react-icons/ri";
import ConfirmationPopup from "./../popups/ConfirmationPopup";
import { imgUrl } from "../../api/baseUrl";
import { useSearchParams } from "react-router-dom";
import ErrorPopup from "../popups/ErrorPopup";
import { useSelector } from "react-redux";

const OfflinePaymentModes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [paymentModes, setPaymentModes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const role_code = localStorage.getItem("role_code");
  const dataFetched = useRef(false);
  const [countries, setCountries] = useState([]);
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

  // const getAllCountries = () => {
  //   getCountries()
  //     .then((response) => {
  //       if (response?.status === true) {
  //         setCountries(response?.data);
  //       } else {
  //         setError("Something Went Wrong");
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error?.message || "API request failed");
  //     });
  // };

  const getCountryName = (id) => {
    const country = allCountries.find((c) => c.id === id);
    console.log(country);
    return country ? country.name : "Unknown";
  };
  const getCurrencyName = (id) => {
    const currency = allCountries.find((c) => c.id === id);
    console.log(currency);
    return currency ? currency.currency_name : "Unknown";
  };

  const getAllManPaymentModes = (page, pageSize) => {
    setLoading(true);
    getManagementOfflinePaymentModes({ page, pageSize })
      .then((response) => {
        if (response.status === true) {
          setPaymentModes(response.data);
          setTotalRecords(response?.totalCount);
        } else {
          setError(response?.message);
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
    if (role_code === "management") {
      if (dataFetched.current) return;
      dataFetched.current = true;
      getAllManPaymentModes(page, pageSize);
      // getAllCountries();
    }
  }, []);

  const handlePageChange = ({ limit, offset }) => {
    setCurrentLimit(limit);
    setCurrentOffset(offset);
    if (role_code === "management") {
      getAllManPaymentModes(intialpage, pageSize);
    }
  };

  const handleManagementSuspend = (id, status) => {
    setConfirmationModal(true);
    setOfflinePaymentModeId(id);
    setStatusId(status);
  };

  const filteredManOfflinePayments = paymentModes.filter((item) => {
    const type = typeOptions[item?.avil_modes]?.toLowerCase();
    const currency = getCurrencyName(item?.currency)?.toLowerCase();
    const name = item?.name?.toLowerCase();
    const country = getCountryName(item?.country)?.toLowerCase();
    const searchTerm = searchInput.toLowerCase();
    return (
      type?.includes(searchTerm) ||
      currency?.includes(searchTerm) ||
      name?.includes(searchTerm) ||
      country?.includes(searchTerm)
    );
  });

  const suspendStatus = (currentLimit, currentOffset) => {
    suspenManagementOfflinePaymentModes(offlinePaymnetModeId, status_id)
      .then((response) => {
        console.log(response);
        if (response.status === true) {
          getAllManPaymentModes(currentLimit, currentOffset);
          console.log(response, "Suspended");
        } else {
          console.log(response.message);
        }
      })
      .catch((error) => {
        setError(error?.message);
        setConfirmationModal(false);
        setError(error?.message);
        setErrorPopup(true);
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

  const data = filteredManOfflinePayments?.map((item) => {
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
          {console.log(item?.status, Number(item?.status) === 1, "===>  item?.status === ")}
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

  return (
    <div>
      <div className="row justify-content-between align-items-center mb-3 mt-2">
        <h6 className="col-2 yellow-font medium-font mb-0 white-space">
          Offline Payment Modes
        </h6>

        <div className="col-6 d-flex justify-content-end gap-3 medium-font">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 w-50">
            <FaSearch size={16} className="grey-clr me-2" />
            <input
              className="small-font all-none"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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

      <div className="mt-2">
        {loading ? (
          <div className="d-flex flex-column flex-center mt-10rem align-items-center">
            <CircleLoader color="#3498db" size={40} />
            <div className="medium-font black-font my-3">
              Just a moment......⏳
            </div>
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

      <AddNewOfflinePaymentModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editId={editId}
        setEditId={setEditId}
        countries={allCountries}
        getAllManPaymentModes={getAllManPaymentModes}
      />
      <ConfirmationPopup
        confirmationPopupOpen={confirmationModal}
        setConfirmationPopupOpen={() => setConfirmationModal(false)}
        discription={`Are you sure you want to ${statusId === 1 ? "In-Active" : "Active"
          } this Payment Mode?`}
        submitButton={`${statusId === 1 ? "In-Active" : "Active"}`}
        onSubmit={suspendStatus}
      />
      <ErrorPopup
        discription={error}
        errorPopupOpen={errorPopup}
        setErrorPopupOpen={setErrorPopup}
      />
    </div>
  );
};

export default OfflinePaymentModes;
