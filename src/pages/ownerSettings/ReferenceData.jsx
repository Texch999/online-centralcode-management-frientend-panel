import React, { useCallback, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import AddNewPopUp from "./AddNewPopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import {
  getAllRejectionReasons,
  getAllSecurityQuestions,
} from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";

const ReferenceData = () => {
  const [activeBtn, setActiveBtn] = useState("Rejection Reasons");
  const ACTIVE_BTNS = ["Rejection Reasons", "Security Questions"];
  const [addNewModalRejection, setAddNewModalRejection] = useState(false);
  const [addNewModalSecurity, setAddNewModalSecurity] = useState(false);
  const [error, setError] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState([]);
  const [selectedQnsId, setSelectedSecQnsId] = useState(null);
  const [rejReasonsData, setRejReasonsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState("");
  const [selectedRejReasonId, setSelectedRejReasonId] = useState(null);

  const handleSportClick = (item) => {
    setActiveBtn(item);
  };

  const getSecurityQuestions = () => {
    setLoading(true);
    getAllSecurityQuestions()
      .then((response) => {
        console.log(response?.status, "get sec qns");
        setSecurityQuestions(response?.data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error, "get sec qns erorr occur");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getSecurityQuestions();
  }, []);

  console.log(selectedRejReasonId, "selectedRejReasonId");

  const getRejReasons = () => {
    setLoading(true);
    getAllRejectionReasons()
      .then((response) => {
        console.log(response.status, "response get rej reasons");
        setRejReasonsData(response?.data);
      })
      .catch((error) => {
        setError(error?.message);
        console.log("error occur");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getRejReasons();
  }, []);
  console.log(rejReasonsData, "rejReasonsData");

  const selectOptions = [
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
        <span
          onClick={() => {
            setSelectedSecQnsId(item?.id);
            setAddNewModalSecurity(true);
            isEdit(true);
          }}
        >
          <SlPencil size={18} />
        </span>
        <span className="ms-2" onClick={() => setShowDeleteModal(true)}>
          <FaRegTrashCan size={18} />
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
        <span
          onClick={() => {
            setAddNewModalRejection(true);
            setSelectedRejReasonId(item?.id);
            setIsEdit(true);
          }}
        >
          <SlPencil size={18} />
        </span>
        <span className="ms-2">
          <FaRegTrashCan size={18} />
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
        {/* Title Section */}
        <div className="col-7 fw-600">
          {activeBtn === "Rejection Reasons"
            ? "Rejection Reasons"
            : "Security Questions"}
        </div>

        {/* Action Section */}
        <div className="col-5 d-flex justify-content-between align-items-center">
          {/* Select Dropdown */}
          <div className="col-5">
            <Select
              className="small-font"
              options={selectOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>

          <div className="saffron-btn2 small-font pointer col-3 mx-2">
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
                setSelectedSecQnsId(null);
                isEdit(false);
              }
            }}
          >
            <IoAddOutline className="large-font" /> Add new
          </div>
        </div>
      </div>

      <div className="mt-3">
        {activeBtn === "Rejection Reasons" ? (
          loading ? (
            <div className="d-flex flex-column flex-center mt-10rem align-items-center">
              <CircleLoader color="#3498db" size={40} />
              <div className="medium-font black-font my-3">
                Just a moment... great things take time ⏳
              </div>
            </div>
          ) : (
            <Table
              columns={REJECTION_COLUMNS}
              data={REJECTION_DATA}
              itemsPerPage={4}
            />
          )
        ) : loading ? (
          <div className="d-flex flex-column flex-center mt-10rem align-items-center">
            <CircleLoader color="#3498db" size={40} />
            <div className="medium-font black-font my-3">
              Just a moment... great things take time ⏳
            </div>
          </div>
        ) : (
          <Table
            columns={SECURITY_COLUMNS}
            data={SECURITY_DATA}
            itemsPerPage={4}
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
    </div>
  );
};

export default ReferenceData;
