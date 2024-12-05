import React, { useState } from "react";
import Table from "../../../components/Table";
import Form from "react-bootstrap/Form";
import { AiOutlineEye } from "react-icons/ai";
import SlipShareDirector from "../popups/SlipShareDirector";
import SlipRentalDirector from "../popups/SlipRentalDirector";
import "../style.css";

const columns = [
  { header: "Name/Role", field: "nameRole" },
  { header: "Txn ID / Date & Time", field: "txnIdDateTime" },
  { header: "Share/Rental", field: "shareRental" },
  { header: "Sports / Casino Wallet", field: "sportsCasinoWallet" },
  { header: "Sports & Casino Wallet", field: "sportsCasinoWalletPercent" },
  { header: "Purchase Chips", field: "purchaseChips" },
  { header: "Amount", field: "amount" },
  { header: "Paid / Currency", field: "paidCurrency" },
  { header: "Balance", field: "balance" },
  { header: <div className="text-center w-100">Status</div>, field: "status" },
];

const Transaction = () => {
  const [isModalShareOpen, setIsModalShareOpen] = useState(false);
  const [isModalRentalOpen, setIsModalRentalOpen] = useState(false);

  const data = [
    {
      nameRole: (
        <>
          <div>Srinivas</div>
          <div>Director</div>
        </>
      ),
      txnIdDateTime: (
        <>
          <div>TXN3789600600000</div>
          <div>27-09-2024, 19:13:00</div>
        </>
      ),
      shareRental: "Share",
      sportsCasinoWallet: "Sports & Casino",
      sportsCasinoWalletPercent: "10%",
      purchaseChips: "500000",
      amount: <span style={{ color: "orange" }}>50000</span>,
      paidCurrency: (
        <>
          <div style={{ color: "green" }}>50000</div>
          <div>INR</div>
        </>
      ),
      balance: "0.00",
      status: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="badge payment-gateway-status-badge p-2 mb-1">
            Success
          </div>
          <div>
            <AiOutlineEye
              size={25}
              onClick={() => setIsModalShareOpen(true)}
              className="pointer"
            />
          </div>
        </div>
      ),
    },
    {
      nameRole: (
        <>
          <div>Jayanta</div>
          <div>Director</div>
        </>
      ),
      txnIdDateTime: (
        <>
          <div>TXN3789600456890</div>
          <div>27-09-2024, 19:13:00</div>
        </>
      ),
      shareRental: (
        <>
          <div>Rental</div>
          <div>Exp. 27-10-2024</div>
        </>
      ),
      sportsCasinoWallet: (
        <>
          <div>Sports</div>
          <div>Casino</div>
        </>
      ),
      sportsCasinoWalletPercent: (
        <>
          <div>10%</div>
          <div>10%</div>
        </>
      ),
      purchaseChips: (
        <>
          <div>500000</div>
          <div>100000</div>
        </>
      ),
      amount: (
        <>
          <div style={{ color: "orange" }}>50000</div>
          <div style={{ color: "orange" }}>10000</div>
        </>
      ),
      paidCurrency: (
        <>
          <div style={{ color: "green" }}>60000</div>
          <div>INR</div>
        </>
      ),
      balance: "0.00",
      status: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="badge payment-gateway-status-badge p-2 mb-1">
            Success
          </div>
          <div>
            <AiOutlineEye
              size={25}
              onClick={() => setIsModalRentalOpen(true)}
              className="pointer"
            />
          </div>
        </div>
      ),
    },
    {
      nameRole: (
        <>
          <div>Lokesh</div>
          <div>Super Admin</div>
        </>
      ),
      txnIdDateTime: (
        <>
          <div>TXN3789600456890</div>
          <div>27-09-2024, 19:13:00</div>
        </>
      ),
      shareRental: (
        <>
          <div>Rental</div>
          <div>Exp. 27-10-2024</div>
        </>
      ),
      sportsCasinoWallet: (
        <>
          <div>Sports</div>
          <div>Casino</div>
        </>
      ),
      sportsCasinoWalletPercent: (
        <>
          <div>10%</div>
          <div>10%</div>
        </>
      ),
      purchaseChips: (
        <>
          <div>500000</div>
          <div>100000</div>
        </>
      ),
      amount: (
        <>
          <div style={{ color: "orange" }}>0.00</div>
          <div style={{ color: "orange" }}>10000</div>
        </>
      ),
      paidCurrency: (
        <>
          <div style={{ color: "green" }}>10000</div>
          <div>INR</div>
        </>
      ),
      balance: "0.00",
      status: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="badge payment-gateway-status-badge p-2 mb-1">
            Success
          </div>
          <div>
            <AiOutlineEye
              size={25}
              onClick={() => setIsModalRentalOpen(true)}
              className="pointer"
            />
          </div>
        </div>
      ),
    },
    {
      nameRole: (
        <>
          <div>Sangram</div>
          <div>Super Admin</div>
        </>
      ),
      txnIdDateTime: (
        <>
          <div>TXN3789600600000</div>
          <div>27-09-2024, 19:13:00</div>
        </>
      ),
      shareRental: "Share",
      sportsCasinoWallet: "Sports & Casino",
      sportsCasinoWalletPercent: "10%",
      purchaseChips: "500000",
      amount: <span style={{ color: "orange" }}>50000</span>,
      paidCurrency: (
        <>
          <div style={{ color: "green" }}>50000</div>
          <div>INR</div>
        </>
      ),
      balance: "0.00",
      status: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="badge payment-gateway-status-badge p-2 mb-1">
            Success
          </div>
          <div>
            <AiOutlineEye
              size={25}
              onClick={() => setIsModalRentalOpen(true)}
              className="pointer"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="py-4 bg-white shadow rounded">
      <div className="px-3 d-flex justify-content-between align-items-center mb-3">
        <h6 className="medium-font">Trasaction</h6>
        <div className="d-flex align-items-center">
          <span className="me-2 black-text small-font">Active</span>
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              className="director-admin-profile-toggle-btn"
            />
          </Form>
          <span className="me-2 small-font black-text small-font">In-active</span>
        </div>
      </div>

      <div className="table-parent-container mt-2">
        <Table data={data} columns={columns} itemsPerPage={3} />
      </div>

      {isModalShareOpen && (
        <SlipShareDirector
          show={isModalShareOpen}
          onHide={() => setIsModalShareOpen(false)}
        />
      )}

      {isModalRentalOpen && (
        <SlipRentalDirector
          show={isModalRentalOpen}
          onHide={() => setIsModalRentalOpen(false)}
        />
      )}
    </div>
  );
};

export default Transaction;
