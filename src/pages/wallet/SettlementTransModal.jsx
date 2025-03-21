import React from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";

const SettlementTransModal = ({ setSettleModalShow, settleModalShow }) => {

  const validationSchema = Yup.object({
    totalCredit: Yup.string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Total Credit is required"),
    paid: Yup.string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Paid amount is required"), 
    balanceCredit: Yup.string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Balance Credit is required"),
    netBalCredit: Yup.string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Balance Credit is required"),
    enterPaidAmount: Yup.number()
    .typeError("Only numbers (0-999) are allowed")
    .min(0, "Amount must be at least 0")
    .max(999, "Amount cannot be more than 999")
    .required("Enter Paid Amount is required"),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9]{6,15}$/,
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
      totalCredit: "",
      paid: "",
      balanceCredit: "",
      netBalCredit: "",
      enterPaidAmount: "",
      password: "",
      remarks: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });
  // {
  //   "currency": 107,
  //  "oldCredit": 500,
  //  "paidAmount": 500,
  //  "totalCredit": 0,
  //  "remarks": "dfgdfgdfg",
  //  "parentPassword": "Owner&123"
  //  }
  return (
    <Modal
      show={settleModalShow}
      onHide={() => setSettleModalShow(false)}
      centered
    >
      <div className="white-bg p-4 br-10">
        <div className="d-flex flex-between align-items-center">
          <div className="black-br-btn px-2 py-2 br-5 small-font">
            Director - Abhi
          </div>
          <div className="d-flex gap-3 align-items-center">
            <div className="green-font fw-bold light-bg br-5 medium-font px-3 py-2">
              Settlement
            </div>
            <IoClose
              size={24}
              className="pointer"
              onClick={() => setSettleModalShow(false)}
            />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row mt-3">
            <div className="col-6">
              <label className="small-font">Credit Limit</label>
              <div className="light-bg br-5 mt-1 px-2 py-2">
                <input
                  type="number"
                  placeholder="1000"
                  className="all-none small-font"
                  {...formik.getFieldProps("totalCredit")}
                  readOnly
                />
              </div>
              {formik.touched.totalCredit && formik.errors.totalCredit && (
                <div className="text-danger small-font">
                  {formik.errors.totalCredit}
                </div>
              )}
            </div>
            <div className="col-6">
              <label className="small-font">Credit Balance</label>
              <div className="light-bg br-5 mt-1 px-2 py-2">
                <input
                  type="number"
                  placeholder="1000"
                  className="all-none small-font"
                  {...formik.getFieldProps("paid")}
                  readOnly
                />
              </div>
              {formik.touched.paid && formik.errors.paid && (
                <div className="text-danger small-font">
                  {formik.errors.paid}
                </div>
              )}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <label className="small-font">Due Credit Balance</label>
              <div className="light-bg br-5 mt-1 px-2 py-2">
                <input
                  type="number"
                  placeholder="1000"
                  className="all-none red-font small-font small-font"
                  {...formik.getFieldProps("balanceCredit")}
                  readOnly
                />
              </div>
              {formik.touched.balanceCredit && formik.errors.balanceCredit && (
                <div className="text-danger small-font">
                  {formik.errors.balanceCredit}
                </div>
              )}
            </div>
            <div className="col-6">
              <label className="small-font">Enter Paid Amount</label>
              <div className="light-bg br-5 mt-1 px-2 py-2">
                <input
                  type="number"
                  placeholder="1000"
                  className="all-none small-font w-100"
                  min="0"
                  max="3"
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

          <div className="col-12 mt-2 flex-column d-flex">
            <label className="small-font">Net Credit Bal.</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input
                type="text"
                placeholder="1000"
                className="all-none small-font small-font"
                {...formik.getFieldProps("netBalCredit")}
                readOnly
              />
            </div>
            {formik.touched.netBalCredit && formik.errors.netBalCredit && (
              <div className="text-danger small-font">
                {formik.errors.netBalCredit}
              </div>
            )}
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
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SettlementTransModal;
