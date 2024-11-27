import React, { useState } from "react";
import "../home/style.css";
import { IoMdTrendingUp } from "react-icons/io";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ScrollTable from "../../components/ScrollTable";
import { useNavigate } from "react-router-dom";
import { PiHandCoinsFill } from "react-icons/pi";
import { FaCoins } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

function Homepage() {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState(0);

  const buttons = ["Casino Winners", "Casino Looser"];

  const handleClick = (index) => {
    setActiveBtn(index);
  };
  const customerCols = [
    { header: "Customer Name", field: "customer" },
    { header: "Role", field: "role" },
    { header: "Casino (%)", field: "casino" },
    { header: "Sports (R)", field: "sports" },
    { header: "Sports & Casino (%)", field: "sc" },
    { header: "Pay", field: "pay" },
  ];

  const customerData = [
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>S&C-5%</div>
        </div>
      ),
      role: <div>Direcor</div>,
      casino: <div>-</div>,
      sports: <div>-</div>,
      sc: <div>100000</div>,
      pay: <div>209888</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>S&C-5%</div>
        </div>
      ),
      role: <div>Direcor</div>,
      casino: <div>-</div>,
      sports: <div>-</div>,
      sc: <div>100000</div>,
      pay: <div>209888</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>S&C-5%</div>
        </div>
      ),
      role: <div>Direcor</div>,
      casino: <div>-</div>,
      sports: <div>-</div>,
      sc: <div>100000</div>,
      pay: <div>209888</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>S&C-5%</div>
        </div>
      ),
      role: <div>Direcor</div>,
      casino: <div>-</div>,
      sports: <div>-</div>,
      sc: <div>100000</div>,
      pay: <div>209888</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>S&C-5%</div>
        </div>
      ),
      role: <div>Direcor</div>,
      casino: <div>-</div>,
      sports: <div>-</div>,
      sc: <div>100000</div>,
      pay: <div>209888</div>,
    },
  ];

  const cols = [
    { header: "Customer Name", field: "customer" },
    { header: "Admin Name", field: "admin" },
    { header: "Site Name", field: "site" },
    { header: "Profit & Loss", field: "pl" },
  ];

  const siteLooseData = [
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="dark-orange-clr">-500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="dark-orange-clr">-500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="dark-orange-clr">-500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="dark-orange-clr">-500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="dark-orange-clr">-500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="dark-orange-clr">-500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="dark-orange-clr">-500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="dark-orange-clr">-500000</div>,
    },
  ];

  const siteWinnerData = [
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="green-clr">500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="green-clr">500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="green-clr">500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="green-clr">500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="green-clr">500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="green-clr">500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="green-clr">500000</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>Hyderabad</div>
        </div>
      ),
      admin: (
        <div className="d-flex flex-column">
          <div>Lokesh</div>
          <div>Sub Admin</div>
        </div>
      ),
      site: (
        <div className="d-flex flex-column">
          <div>T-Exchange</div>
          <div>Casino Park</div>
        </div>
      ),
      pl: <div className="green-clr">500000</div>,
    },
  ];

  const barData = {
    labels: labels,
    datasets: [
      {
        label: "Casino Sales",
        backgroundColor: "#98BDFF",
        borderColor: "",
        borderRadius: 5,
        data: [15, 20, 25, 30, 35, 40, 60],
      },

      {
        label: "Sports Sales",
        backgroundColor: "#4B49AC",
        borderColor: "",
        borderRadius: 5,
        data: [15, 20, 25, 30, 35, 40, 70],
      },
      {
        label: "casino & Sports Sales",
        backgroundColor: "#F3797E",
        borderColor: "",
        borderRadius: 5,
        data: [15, 20, 25, 30, 35, 40, 80],
      },
    ],
  };

  return (
    <div className="p-2">
      <h5 className="blck-text">Welcome sri</h5>
      <div className="medium-font grey-clr">
        In facilisis vitae metus molestie vestibulum. Nulla molestie..
      </div>

      <div className="d-flex w-100 mt-2">
        <div className="col-6 pe-2">
          <div className="d-flex flex-column">
            <div className="dashboard-white-bg pb-2 box-shadow">
              <div className="d-flex flex-column p-2">
                <div className="d-flex flex-between align-items-center">
                  <div className="medium-font black-text">Sales Report</div>
                  <div
                    className="viewall-btn orange-clr small-font px-2 py-1 pointer fw-800"
                    onClick={() => navigate("/dashboard-view-all")}
                  >
                    View All
                  </div>
                </div>
                <div className="small-font grey-clr">
                  In facilisis vitae metus molestie vestibulum. Nulla molestie..
                </div>
              </div>
              <div className="hor-grey-line"></div>
              <div>
                <Bar data={barData} />
              </div>
            </div>

            <div className="d-flex flex-column mt-3">
              <div className="d-flex mb-3">
                <div className="col-3 pe-1">
                  <div className="d-flex flex-column text-white px-2 blue-bg-box">
                    <div className="small-font py-2">Casino Sales</div>
                    <h6 className="py-1">50000000000</h6>
                  </div>
                </div>
                <div className="col-3 pe-1">
                  <div className=" voilet-bg-box d-flex flex-column text-white px-2">
                    <div className="small-font py-2">Sports Sales</div>
                    <h6 className="py-1">50000000000</h6>
                  </div>
                </div>
                <div className="col-3 pe-1">
                  <div className="box-3 d-flex flex-column text-white px-2">
                    <div className="small-font py-2">S+C Sales</div>
                    <h6 className="py-1">50000000000</h6>
                  </div>
                </div>
                <div className="col-3 ">
                  <div className="pink-bg-box d-flex flex-column text-white px-2">
                    <div className="small-font py-2">Total Profit</div>
                    <h6 className="py-1">50000000000</h6>
                  </div>
                </div>
              </div>

              <ScrollTable
                columns={customerCols}
                data={customerData}
                tableHeight="h-50vh"
              />
            </div>
          </div>
        </div>

        <div className="col-6 ps-2">
          <div className="d-flex flex-column">
            <div className="d-flex w-100 mb-2">
              <div className="col-6 blue-bg-box p-2 me-2">
                <div className="d-flex flex-column ">
                  <div className="d-flex flex-between align-items-center">
                    <div className="white-text medium-font">
                      Total Sale Revenue
                    </div>
                    <div>
                      <FaCoins className="white-text w-100 h-5vh" />
                    </div>
                  </div>
                  <h5 className="white-text">500000000</h5>
                </div>
                <div className="grey-dot-line"></div>
                <div className="d-flex flex-column my-1">
                  <div className="white-text small-font my-1">
                    Credit Balance
                  </div>
                  <h5 className="white-text">1345600</h5>
                </div>
              </div>
              <div className="col-6 voilet-bg-box p-2">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-between align-items-center">
                    <div className="white-text medium-font">
                      Total Vendor Payment
                    </div>
                    <div>
                      <PiHandCoinsFill className="white-text w-100 h-5vh" />
                    </div>
                  </div>
                  <h5 className="white-text">30000000</h5>
                </div>
                <div className="grey-dot-line"></div>
                <div className="d-flex flex-column my-1">
                  <div className="white-text small-font my-1">
                    Total Balance
                  </div>
                  <h5 className="white-text">12000000000</h5>
                </div>
              </div>
            </div>
            <div className="d-flex w-100">
              <div className="col-6 box-3 p-2 me-2">
                <div className="d-flex flex-column ">
                  <div className="d-flex flex-between align-items-center">
                    <div className="white-text medium-font">Total Admins</div>
                    <div>
                      <HiUserGroup className="white-text w-100 h-5vh" />
                    </div>
                  </div>
                  <h5 className="white-text">50000</h5>
                </div>
                <div className="grey-dot-line"></div>
                <div className="d-flex flex-column my-1">
                  <div className="white-text small-font my-1">Total Users</div>
                  <h5 className="white-text">245600</h5>
                </div>
              </div>
              <div className="col-6 pink-bg-box p-2">
                <div className="d-flex flex-between align-items-center">
                  <div className="white-text medium-font">Total Profit</div>
                  <div>
                    <IoMdTrendingUp className="white-text w-100 h-5vh" />
                  </div>
                </div>

                <div className="d-flex flex-column mt-5">
                  <h5 className="white-text">200000000</h5>
                </div>
              </div>
            </div>
            <div className="d-flex flex-between small-font mt-4">
              <div className="d-flex pointer medium-font">
                {buttons.map((btn, index) => {
                  return (
                    <div
                      key={index}
                      className={`px-2 py-1 me-1 white-box ${
                        activeBtn === index ? "active-saffron-btn " : ""
                      }`}
                      onClick={() => handleClick(index)}
                    >
                      {btn}
                    </div>
                  );
                })}
              </div>
              <div className=" pointer">
                <select className="all-none w-100 input-css2 px-2 py-2 radius-20 text-black">
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>yesterday</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              {activeBtn === 0 && (
                <ScrollTable
                  columns={cols}
                  data={siteWinnerData}
                  tableHeight="h-50vh"
                />
              )}

              {activeBtn === 1 && (
                <ScrollTable
                  columns={cols}
                  data={siteLooseData}
                  tableHeight="h-50vh"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
