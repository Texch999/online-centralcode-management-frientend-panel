import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import { creditSettlements, getSettlementSummeryById } from "../../api/apiMethods";
import ErrorComponent from "../../components/ErrorComponent";
import { IoEye, IoEyeOff } from "react-icons/io5";

const SettlementTransModal = ({
  setSettleModalShow,
  settleModalShow,
  selectedDirSAId,
  getApi,
  setSuccessPopupOpen,
  setDiscription
}) => {
  const [settleDetails, setSettleDetails] = useState({});
  const [netCreditBalance, setNetCreditBalance] = useState(settleDetails?.creditBalance);
  const [apiErrors, setApiErrors] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pswdVisible, setPswdVisible] = useState(false);

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
        parentPassword: values.password,
      };
      if (values.remarks) {
        payload.remarks = values.remarks
      }
      setLoading(true)
      creditSettlements(selectedDirSAId, payload)
        .then((response) => {
          setLoading(false)
          setSuccessPopupOpen(true)
          setDiscription("Credit Settled Successfully")
          getApi();
          setSettleModalShow(false)
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
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter paid amount"
                  className="all-none small-font w-100"
                  value={formik.values.enterPaidAmount}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/[^0-9]/g, '');
                    value = value.replace(/^0+/, '') || '0';

                    if (settleDetails?.creditBalance) {
                      const numericValue = parseInt(value, 10);
                      if (numericValue > settleDetails.creditBalance) {
                        value = settleDetails.creditBalance.toString();
                      }
                    }
                    formik.setFieldValue("enterPaidAmount", value === '0' ? '' : value);
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      formik.setFieldValue("enterPaidAmount", 0);
                    }
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
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <label className="small-font">Enter Password</label>
              <div className="light-bg br-5 mt-1">
                <input
                  type={pswdVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  className="all-none small-font input-css4 p-1 "
                  {...formik.getFieldProps("password")}
                />
                {pswdVisible ? (
                  <IoEye
                    className="black-font"
                    size={15}
                    onClick={() => setPswdVisible(false)}
                  />
                ) : (
                  <IoEyeOff
                    className="black-font"
                    size={15}
                    onClick={() => setPswdVisible(true)}
                  />
                )}
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
                disabled={settleDetails?.creditBalance <= 0 || loading}
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
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={discription}
        />
      )} */}
    </Modal>
  );
};

export default SettlementTransModal;
