import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import { creditSettlements, getSettlementSummeryById } from "../../api/apiMethods";
const SettlementTransModal = ({ setSettleModalShow, settleModalShow, selectedDirSAId, getApi }) => {
  const [settleDetails, setSettleDetails] = useState({})
  const [netCreditBalance, setNetCreditBalance] = useState(settleDetails?.creditBalance);
  const GetAllDirectors = (id) => {
    getSettlementSummeryById(id)
      .then((response) => {
        if (response?.message) {
          const data = response?.message
          setSettleDetails(...data);
          console.log(...data, "==>...data")
        } else {
          console.error("Something Went Wrong");
        }
      })
      .catch((error) => {
        console.error(error?.message || "Failed to fetch directors");
      });
  };

  useEffect(() => {
    GetAllDirectors(selectedDirSAId)
  }, [selectedDirSAId]);

  const validationSchema = Yup.object({
    enterPaidAmount: Yup.number()
      .typeError("Only numbers (0-9) are allowed")
      .min(0, "Amount must be at least 0")
      .max(settleDetails?.creditBalance, `Amount cannot be more than ${settleDetails?.creditBalance}`)
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

      creditSettlements(selectedDirSAId, payload)
        .then((response) => {
          setSettleModalShow(false)
          getApi()
        })
        .catch((error) => {
          console.error("Failed to submit settlement:", error);
        });
    },

  });

  React.useEffect(() => {
    const paidAmount = parseFloat(formik.values.enterPaidAmount) || 0;
    setNetCreditBalance(settleDetails?.creditBalance > 0 ? settleDetails?.creditBalance - paidAmount : 0);
  }, [formik.values.enterPaidAmount, settleDetails?.creditBalance]);

  return (
    <Modal
      show={settleModalShow}
      onHide={() => setSettleModalShow(false)}
      centered
    >
      <div className="white-bg p-4 br-10">
        <div className="d-flex flex-between align-items-center">
          <div className="d-flex gap-3 align-items-center">
            <div className="green-font fw-bold light-bg br-5 medium-font px-3 py-2">
              Settlement
            </div>
          </div>
          <IoClose
            size={24}
            className="pointer"
            onClick={() => setSettleModalShow(false)}
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row mt-3">
            <div className="col-6">
              <label className="small-font">Total Credit </label>
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
                  max="999"
                  {...formik.getFieldProps("enterPaidAmount")}
                />
              </div>
              {formik.touched.enterPaidAmount &&
                formik.errors.enterPaidAmount && (
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
                className="saffron-btn br-5 px-4 pointer small-font"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SettlementTransModal;