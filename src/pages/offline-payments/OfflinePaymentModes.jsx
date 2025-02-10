import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { FaPlus, FaSearch } from "react-icons/fa";
import { SlPencil } from "react-icons/sl";
import { Images } from "../../images";
import AddNewOfflinePaymentModal from "./AddNewOfflinePaymentModal";
import {
  getAllCountires,
  getManagementOfflinePaymentModeById,
  getManagementOfflinePaymentModes,
  suspenManagementOfflinePaymentModes,
} from "../../api/apiMethods";
import { useRef } from "react";
import { CircleLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import ConfirmationPopup from "./../popups/ConfirmationPopup";
import { imgUrl } from "../../api/baseUrl";

const OfflinePaymentModes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [paymentModes, setPaymentModes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const role_code = localStorage.getItem("role_code");
  const dataFetched = useRef(false);
  const [countries, setCountries] = useState([]);
  // const allCountries = useSelector((item) => item?.allCountries);
  const [searchInput, setSearchInput] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [offlinePaymnetModeId, setOfflinePaymentModeId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [totalRecords, setTotalRecords] = useState(null);
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

  const getAllCountries = () => {
    getAllCountires()
      .then((response) => {
        if (response?.status === true) {
          setCountries(response?.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "API request failed");
      });
  };

  const getCountryName = (id) => {
    const country = countries.find((c) => c.id === id);
    console.log(country);
    return country ? country.name : "Unknown";
  };
  const getCurrencyName = (id) => {
    const currency = countries.find((c) => c.id === id);
    console.log(currency);
    return currency ? currency.currency_name : "Unknown";
  };

  const getAllManPaymentModes = () => {
    setLoading(true);
    getManagementOfflinePaymentModes()
      .then((response) => {
        console.log("response", response);
        if (response.status === true) {
          setPaymentModes(response.data);
          setTotalRecords(response?.data.length);
          console.log(response.data, "success");
        } else {
          console.log(response.message, "error");
        }
      })
      .catch((error) => {
        setError(error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (role_code === "management") {
      if (dataFetched.current) return;
      dataFetched.current = true;
      getAllManPaymentModes();
      getAllCountries();
    }
  }, []);

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

  const suspendStatus = () => {
    suspenManagementOfflinePaymentModes(offlinePaymnetModeId, statusId)
      .then((response) => {
        console.log(response);
        if (response.status === true) {
          console.log(response, "Suspended");
        } else {
          console.log(response.message);
        }
      })
      .catch((error) => {
        setError(error?.message);
        console.log(error);
      });
  };

  const columns = [
    { header: "Country", field: "country", width: "10%" },
    { header: "Currency ", field: "currency", width: "10%" },
    { header: "Name", field: "name", width: "20%" },
    { header: "Image", field: "image", width: "15%" },
    { header: "type", field: "type", width: "15%" },
    { header: "Status", field: "status", width: "10%" },
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
        <div className="d-flex gap-2">
          {item?.status === 1 ? (
            <span>
              <SlPencil
                size={20}
                className="me-2 pointer"
                onClick={() => handleEditModal(item?.id)}
              />
            </span>
          ) : (
            <span title="this gateway is inactivated you can't updated it!">
              <SlPencil size={20} className="me-2 pointer" />
            </span>
          )}

          <span>
            <RiDeleteBinLine
              size={18}
              className="pointer ms-1"
              onClick={() => handleManagementSuspend(item?.id, item.status)}
            />
          </span>
        </div>
      ),
    };
  });
  const handlePageChange = () => {
    console.log("page changed");
  };
  console.log(totalRecords, "======>handlePageChange");
  return (
    <div>
      <div className="row justify-content-between align-items-center mb-3 mt-2">
        <h6 className="col-2 yellow-font medium-font mb-0">
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
            {/* <IoClose size={16} className="grey-clr me-2" onClick={}/> */}
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
            itemsPerPage={6}
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
        countries={countries}
        getAllManPaymentModes={getAllManPaymentModes}
      />
      <ConfirmationPopup
        confirmationPopupOpen={confirmationModal}
        setConfirmationPopupOpen={() => setConfirmationModal(false)}
        discription={`Are you sure you want to ${
          statusId === 1 ? "In-Active" : "Active"
        } this Payment Mode?`}
        submitButton={`${statusId === 1 ? "In-Active" : "Active"}`}
        onSubmit={suspendStatus}
      />
    </div>
  );
};

export default OfflinePaymentModes;
