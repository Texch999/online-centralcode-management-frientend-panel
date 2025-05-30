import React, { useEffect, useRef, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import AddNewPopUp from "./AddNewPopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import {
  getAllRejectionReasons,
  getAllSecurityQuestions,
} from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import ErrorPopup from "../popups/ErrorPopup";
import { useSearchParams } from "react-router-dom";

const ReferenceData = () => {
  const [activeBtn, setActiveBtn] = useState("Rejection Reasons");
  const ACTIVE_BTNS = ["Rejection Reasons", "Security Questions"];
  const [addNewModalRejection, setAddNewModalRejection] = useState(false);
  const [addNewModalSecurity, setAddNewModalSecurity] = useState(false);
  const [error, setError] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [selectedQnsId, setSelectedSecQnsId] = useState(null);
  const [rejReasonsData, setRejReasonsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState("");
  const [selectedRejReasonId, setSelectedRejReasonId] = useState(null);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dataFetched = useRef(false);
  const [selectStatus, setSelectStatus] = useState(
    searchParams.get("status") || "0"
  );
  const [totalRecords, setTotalRecords] = useState(null);
  const [totalRecordsSecQns, setTotalRecordsSecQns] = useState(null);
  const intialpage = parseInt(searchParams.get("page") || 1);
  const handleSportClick = (item) => {
    setActiveBtn(item);
  };
  const role_code = localStorage.getItem("role_code");
  const itemsPerPage = 2;
  const page = intialpage;
  const pageSize = itemsPerPage;
  const status = selectStatus;

  const handleStatusChange = (selectedOption) => {
    setSelectStatus(selectedOption?.value);
  };

  const handlePageChange = () => {
    if (activeBtn === "Rejection Reasons") {
      getRejReasons(intialpage, pageSize);
    } else {
      getSecurityQuestions(intialpage, pageSize);
    }
  };

  const getSecurityQuestions = (page, pageSize) => {
    setLoading(true);
    const params = { page, pageSize };
    if (status !== "0") {
      params.status = status;
    }
    getAllSecurityQuestions(params)
      .then((response) => {
        setSecurityQuestions(response?.data);
        setTotalRecordsSecQns(response?.totalCount);
      })
      .catch((error) => {
        setError(error?.message);
        setErrorPopupOpen(true);
        setTimeout(() => {
          setErrorPopupOpen(false);
        }, 1000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (page, pageSize) => {
    if (activeBtn === "Rejection Reasons") {
      getRejReasons(page, pageSize);
    } else {
      getSecurityQuestions(page, pageSize);
    }
  };

  const getRejReasons = (page, pageSize) => {
    setLoading(true);
    const params = { page, pageSize };
    if (status !== "0") {
      params.status = status;
    }
    getAllRejectionReasons(params)
      .then((response) => {
        setRejReasonsData(response?.data);
        setTotalRecords(response?.totalCount);
      })
      .catch((error) => {
        setError(error?.message);
        setErrorPopupOpen(true);
        setTimeout(() => {
          setErrorPopupOpen(false);
        }, 1000);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (role_code === "management") {
      if (dataFetched.current) return;
      dataFetched.current = true;
      getRejReasons(page, pageSize);
      getSecurityQuestions(page, pageSize);
    }
  }, []);

  const selectOptions = [
    { value: "0", label: "All" },
    { value: "1", label: "Active" },
    { value: "2", label: "In-Active" },
  ];

  const SECURITY_COLUMNS = [
    { header: "Questions", field: "questions", width: "80%" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Action", field: "action", width: "10%" },
  ];

  const SECURITY_DATA = securityQuestions.map((item, index) => ({
    questions: <div>{item?.questions}</div>,
    status:
      item?.status === 1 ? (
        <div className="green-btn w-fill">Active</div>
      ) : (
        <div className="red-btn w-fill">In-Active</div>
      ),
    action: (
      <div className="large-font d-flex w-50 flex-between">
        <span className="pointer">
          <SlPencil
            size={18}
            onClick={() => {
              setSelectedSecQnsId(item?.id);
              setAddNewModalSecurity(true);
              setIsEdit(true);
            }}
          />
        </span>
      </div>
    ),
    resultDateTime: (
      <div>
        {item?.created_date}
        <br />
        {item?.updated_date}
      </div>
    ),
  }));
  const REJECTION_COLUMNS = [
    { header: "Reason", field: "reason", width: "15%" },
    { header: "Discriptions", field: "discriptions", width: "55%" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Action", field: "action", width: "10%" },
  ];

  const REJECTION_DATA = rejReasonsData.map((item, index) => ({
    reason: <div>{item?.reason}</div>,

    discriptions: <div>{item?.description}</div>,

    status:
      item?.status === 1 ? (
        <div className="green-btn w-fill">Active</div>
      ) : (
        <div className="red-btn w-fill">In-Active</div>
      ),

    action: (
      <div className="large-font d-flex w-50 flex-between">
        <span className="pointer">
          <SlPencil
            size={18}
            onClick={() => {
              setAddNewModalRejection(true);
              setSelectedRejReasonId(item?.id);
              setIsEdit(true);
            }}
          />
        </span>
      </div>
    ),
    tableNumber: <div className="green-font">T ID: 12345678943323</div>,
    resultDateTime: (
      <div>
        02-10-2024
        <br />
        10:34:00
      </div>
    ),
  }));

  return (
    <div className="">
      <h6 className="yellow-font mt-2 mb-3">Reference Data</h6>
      <div className="d-flex col small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item ? "saffron-btn2" : "white-btn2 pointer"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <hr className="my-3" />

      <div className="d-flex align-items-center justify-content-between">
        <div className="col-5 fw-600">
          {activeBtn === "Rejection Reasons"
            ? "Rejection Reasons"
            : "Security Questions"}
        </div>

        <div className="col-5 d-flex justify-content-between align-items-center">
          <div className="col-5">
            <Select
              className="small-font"
              options={selectOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
              // value={selectOptions.find((opt) => opt.value === setSelectStatus)}
              Copyvalue={selectOptions.find(
                (opt) => opt.value === selectStatus
              )}
              onChange={handleStatusChange}
              isSearchable={false} // Disable typing

            />
          </div>
          <div
            title="please select a option"
            className={`saffron-btn2 small-font pointer col-3 mx-2 ${
              !selectStatus ? "disabled-btn" : ""
            }`}
            onClick={() => {
              if (selectStatus) {
                handleSubmit();
              }
            }}
          >
            Submit
          </div>

          <div
            className="bg-white small-font pointer col-3 p-2 blue-font grey-border rounded d-flex justify-content-center align-items-center"
            onClick={() => {
              if (activeBtn === "Rejection Reasons") {
                setAddNewModalRejection(true);
                setIsEdit(false);
                setSelectedRejReasonId(null);
              } else {
                setAddNewModalSecurity(true);
                setIsEdit(false);
                setSelectedSecQnsId(null);
              }
            }}
          >
            <IoAddOutline className="medium-font fw-800" />
            <span className="small-font mx-1">Add New</span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        {activeBtn === "Rejection Reasons" ? (
          loading ? (
            <div className="d-flex flex-column flex-center mt-10rem align-items-center">
              <CircleLoader color="#3498db" size={40} />
              <div className="medium-font black-font my-3">
                Just a moment...... ⏳
              </div>
            </div>
          ) : (
            <Table
              columns={REJECTION_COLUMNS}
              data={REJECTION_DATA}
              itemsPerPage={itemsPerPage}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
            />
          )
        ) : loading ? (
          <div className="d-flex flex-column flex-center mt-10rem align-items-center">
            <CircleLoader color="#3498db" size={40} />
            <div className="medium-font black-font my-3">
              Just a moment......⏳
            </div>
          </div>
        ) : (
          <Table
            columns={SECURITY_COLUMNS}
            data={SECURITY_DATA}
            itemsPerPage={itemsPerPage}
            totalRecords={totalRecordsSecQns}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <AddNewPopUp
        setAddNewModalRejection={setAddNewModalRejection}
        addNewModalRejection={addNewModalRejection}
        setAddNewModalSecurity={setAddNewModalSecurity}
        addNewModalSecurity={addNewModalSecurity}
        getSecurityQuestions={getSecurityQuestions}
        setRejReasonsData={setRejReasonsData}
        rejReasonsData={rejReasonsData}
        selectedQnsId={selectedQnsId}
        setSelectedSecQnsId={setSelectedSecQnsId}
        selectedRejReasonId={selectedRejReasonId}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setSelectedRejReasonId={setSelectedRejReasonId}
        getRejReasons={getRejReasons}
      />
      <ErrorPopup
        discription={error}
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
      />
    </div>
  );
};

export default ReferenceData;
