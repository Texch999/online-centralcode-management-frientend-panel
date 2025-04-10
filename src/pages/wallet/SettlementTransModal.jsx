import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import { creditSettlements, getSettlementSummeryById } from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorComponent from "../../components/ErrorComponent";

const SettlementTransModal = ({ setSettleModalShow, settleModalShow, selectedDirSAId, getApi }) => {
  const [settleDetails, setSettleDetails] = useState({});
  const [netCreditBalance, setNetCreditBalance] = useState(settleDetails?.creditBalance);
  const [apiErrors, setApiErrors] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discription, setDiscription] = useState("");

  const getSettlementSummery = (id) => {
    setApiLoading(true)
    getSettlementSummeryById(id)
      .then((response) => {
        setApiLoading(false)
        const data = response?.message;
        setSettleDetails(...data);

      })
      .catch((error) => {
        setApiLoading(false)
        console.error(error?.message || "Failed to fetch directors");
      });
  };

  useEffect(() => {
    getSettlementSummery(selectedDirSAId);
  }, [selectedDirSAId]);

  const validationSchema = Yup.object({
    enterPaidAmount: Yup.number()
      .typeError("Only numbers (0-9) are allowed")
      .min(0, "Amount must be at least 0")
      .max(
        settleDetails?.creditBalance,
        `Amount cannot be more than ${settleDetails?.creditBalance}`
      )
      .required("Enter Paid Amount is required"),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,36}$/,
        "Password must be 6-36 alphanumeric characters"
      )
      .required("Password is required"),
    remarks: Yup.string()
      .min(2, "Remarks must be at least 2 characters")
      .max(250, "Remarks cannot exceed 250 characters")
      .required("Remarks are required"),
  });

  const formik = useFormik({
    initialValues: {
      enterPaidAmount: "",
      password: "",
      remarks: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const oldCredit = settleDetails?.creditBalance;
      const paidAmount = parseFloat(values.enterPaidAmount);
      const totalCredit = oldCredit - paidAmount;

      const payload = {
        currency: settleDetails?.currencyId,
        oldCredit: oldCredit,
        paidAmount: paidAmount || 0,
        totalCredit: totalCredit,
        remarks: values.remarks,
        parentPassword: values.password,
      };
      setLoading(true)
      creditSettlements(selectedDirSAId, payload)
        .then((response) => {
          setLoading(false)
          setSettleModalShow(true);
          getApi();
          setSuccessPopupOpen(true)
          setTimeout(() => {
            setSettleModalShow(false);
            setSuccessPopupOpen(false);
          }, 3000);
          setDiscription("Credit Settled Successfully")
        })
        .catch((error) => {
          setLoading(false)
          setApiErrors(error.message)
          console.error("Failed to submit settlement:", error);
        });
    },
  });

  React.useEffect(() => {
    const paidAmount = parseFloat(formik.values.enterPaidAmount) || 0;
    setNetCreditBalance(
      settleDetails?.creditBalance > 0
        ? settleDetails?.creditBalance - paidAmount
        : 0
    );
  }, [formik.values.enterPaidAmount, settleDetails?.creditBalance]);

  return (
    <Modal show={settleModalShow} onHide={() => setSettleModalShow(false)} centered>
      {apiLoading && (
        <div className="my-load">
          <div className="loader "></div>
        </div>
      )}
      <div className="white-bg p-4 br-10">
        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{ padding: "0 16px" }}
        >
          <div style={{ width: "22px" }}>{` `}</div>
          <div className=" fw-600 mb-0 green-font text-center text-size px-2 rounded">
            Credit Settlement
          </div>
          <div>
            <IoClose
              size={22}
              className="pointer"
              onClick={() => setSettleModalShow(false)}
            />
          </div>
        </div>

        <div className="col w-100 small-font rounded input-css all-none white-bg input-border mb-2">
          {`SA - Harish - INR`}
        </div>
        {/* {apiErrors && (
          <div className="alert alert-danger pb-1">
            {Array.isArray(apiErrors) ? (
              <ul className="pb-1 ps-1">
                {apiErrors.map((error, index) => (
                  <li className="small-font" key={index}>{error.message || error}</li>
                ))}
              </ul>
            ) : (
              <p className="small-font ps-1">{apiErrors.message || apiErrors}</p>
            )}
          </div>
        )} */}
        <ErrorComponent error={apiErrors} />
        
        <form onSubmit={formik.handleSubmit}>
          <div className="row mt-2">
            <div className="col-6">
              <label className="small-font">Total Credit</label>
              <div className="light-bg br-5 mt-1 px-2 py-2">
                <input
                  type="number"
                  placeholder="1000"
                  className="all-none small-font"
                  value={settleDetails?.totalCredit}
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <label className="small-font">Paid</label>
              <div className="light-bg br-5 mt-1 px-2 py-2">
                <input
                  type="number"
                  placeholder="1000"
                  className="all-none small-font"
                  value={settleDetails?.settledCredit}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <label className="small-font">Bal Credit</label>
              <div className="light-bg br-5 mt-1 px-2 py-2">
                <input
                  type="number"
                  placeholder="1000"
                  className="all-none red-font small-font"
                  value={settleDetails?.creditBalance}
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <label className="small-font">Enter Paid Amount</label>
              <div className="light-bg br-5 mt-1 px-2 py-2">
                <input
                  type="number"
                  placeholder="1000"
                  className="all-none small-font w-100"
                  min="0"
                  max={settleDetails?.creditBalance}
                  value={formik.values.enterPaidAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    const maxAmount = settleDetails?.creditBalance;

                    // Cap the value to the maximum allowed amount
                    const cappedValue = Math.min(Number(value), maxAmount);

                    // Update the formik value
                    formik.setFieldValue("enterPaidAmount", cappedValue);
                  }}
                />
              </div>
              {formik.touched.enterPaidAmount && formik.errors.enterPaidAmount && (
                <div className="text-danger small-font">
                  {formik.errors.enterPaidAmount}
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            <label className="small-font">Net Credit Bal.</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input
                type="number"
                placeholder="1000"
                className="all-none small-font w-100"
                min={0}
                max={settleDetails?.creditBalance}
                value={netCreditBalance}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 flex-column mt-2 d-flex">
            <label className="small-font">Remarks</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <textarea
                type="text"
                placeholder="remarks"
                className="all-none small-font w-100"
                rows={2}
                {...formik.getFieldProps("remarks")}
              />
            </div>
            {formik.touched.remarks && formik.errors.remarks && (
              <div className="text-danger small-font">
                {formik.errors.remarks}
              </div>
            )}
          </div>
          <div className="row mt-2">
            <div className="col-6 flex-column d-flex">
              <label className="small-font">Enter Password</label>
              <div className="light-bg br-5 mt-1 px-2 py-2">
                <input
                  type="text"
                  placeholder="password"
                  className="all-none small-font"
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger small-font">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="col-6 flex-column mt-4">
              <button
                type="submit"
                className={`saffron-btn br-5 px-4 pointer small-font ${settleDetails?.creditBalance > 0 ? "" : "no-cursor"}`}
                disabled={settleDetails?.creditBalance <= 0}
              >
                {loading ? (
                  <div className="flex-row" role="status">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ps-2">Submitting...</span>
                  </div>
                ) : (
                  "Submit"
                )}
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={discription}
        />
      )}
    </Modal>
  );
};

export default SettlementTransModal;
