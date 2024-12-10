import { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../home/style.css";
import { IoMdTrendingUp } from "react-icons/io";
import { Bar } from "react-chartjs-2";
import ScrollTable from "../../components/ScrollTable";
import { useNavigate } from "react-router-dom";
import { PiHandCoinsFill } from "react-icons/pi";
import { FaCoins } from "react-icons/fa";
import Select from "react-select";
import { HiUserGroup } from "react-icons/hi";
import { roundedReactSelect } from "../../components/ReactSelectStyles";

function Homepage() {
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState(0);
  const BUTTONS = ["Casino Winners", "Casino Looser"];
  const FILTER_OPTIONS = [
    { value: "today", label: "Taday" },
    { value: "this_week", label: "This Week" },
    { value: "this_month", label: "This Month" },
  ];
  const handleClick = (index) => {
    setActiveBtn(index);
  };

  const customerCols = [
    { header: "Customer Name", field: "customer" },
    { header: "Role", field: "role" },
    { header: "Casino (%)", field: "casino" },
    { header: "Sports (R)", field: "sports" },
    { header: "Sports & Casino (%)", field: "sc" },
    { header: <div className="flex-center">Pay</div>, field: "pay" },
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
      pay: <div className="flex-center">209888</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column">
          <div>Srinivas</div>
          <div>S&C-5%</div>
        </div>
      ),
      role: <div>Super Admin</div>,
      casino: <div>10000000</div>,
      sports: <div>10000000</div>,
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
      pl: <div className="red-font">500000</div>,
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
  const MONTHS_DATA = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const barData = {
    labels: MONTHS_DATA,
    datasets: [
      {
        label: "Casino Sales",
        backgroundColor: "#98BDFF",
        borderRadius: 5,
        data: [
          10000, 2500000, 5000000, 10000000, 25000000, 50000000, 100000000,
        ],
      },
      {
        label: "Sports Sales",
        backgroundColor: "#4B49AC",
        borderRadius: 5,
        data: [
          5000000, 10000000, 25000000, 50000000, 75000000, 100000000, 150000000,
        ],
      },
      {
        label: "Casino & Sports Sales",
        backgroundColor: "#F3797E",
        borderRadius: 5,
        data: [
          6000000, 15000000, 30000000, 75000000, 100000000, 200000000,
          250000000,
        ],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: "flex",
      },
    },
    scales: {
      y: {
        type: "linear",
        ticks: {
          callback: function (value) {
            if (value >= 10000000) return `${value / 10000000}Cr`;
            if (value >= 100000) return `${value / 100000}L`;
            return value;
          },
        },
        beginAtZero: true,
      },
      x: {
        type: "category",
      },
    },
  };

  return (
    <div className="p-2">
      <h4 className="blck-text">Welcome Sri</h4>
      <div className="medium-font grey-clr">
        In facilisis vitae metus molestie vestibulum. Nulla molestie..
      </div>
      <div className="d-flex w-100 mt-2">
        <div className="col-6 pe-2">
          <div className="d-flex flex-column">
            <div className="dashboard-white-bg pb-2 box-shadow">
              <div className="d-flex flex-column p-2">
                <div className="d-flex flex-between align-items-center">
                  <div className="large-font black-text">Sales Report</div>
                  <div
                    className="border rounded-pill orange-clr small-font px-3 py-1 pointer fw-600"
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
              <div className="w-100 px-3 py-2 h-auto scroll-x">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
            <div className="d-flex flex-column mt-3">
              <div className="d-flex mb-3 w-100">
                <div className="col-3 pe-1">
                  <div className="d-flex flex-column text-white px-2 blue-bg-box">
                    <div className="small-font py-2">Casino Sales</div>
                    <h6 className="py-1">5000000</h6>
                  </div>
                </div>
                <div className="col-3 pe-1">
                  <div className=" voilet-bg-box d-flex flex-column text-white px-2">
                    <div className="small-font py-2">Sports Sales</div>
                    <h6 className="py-1">5000000</h6>
                  </div>
                </div>
                <div className="col-3 pe-1">
                  <div className="box-3 d-flex flex-column text-white px-2">
                    <div className="small-font py-2">S+C Sales</div>
                    <h6 className="py-1">5000000</h6>
                  </div>
                </div>
                <div className="col-3 ">
                  <div className="pink-bg-box d-flex flex-column text-white px-2">
                    <div className="small-font py-2">Total Profit</div>
                    <h6 className="py-1">5000000</h6>
                  </div>
                </div>
              </div>
              <ScrollTable
                columns={customerCols}
                data={customerData}
                tableHeight="table-50vh"
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
            <div className="d-flex flex-between small-font mt-3">
              <div className="d-flex pointer white-box rounded-pill">
                {BUTTONS.map((btn, index) => {
                  return (
                    <div
                      key={index}
                      className={`px-3 py-1  ${
                        activeBtn === index ? "active-saffron-btn" : ""
                      }`}
                      onClick={() => handleClick(index)}
                    >
                      {btn}
                    </div>
                  );
                })}
              </div>
              <div className="col-2 pointer">
                <Select
                  className="w-100 small-font"
                  options={FILTER_OPTIONS}
                  placeholder="Select"
                  styles={roundedReactSelect}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                />
              </div>
            </div>
            <div className="mt-3">
              {activeBtn === 0 && (
                <ScrollTable
                  columns={cols}
                  data={siteWinnerData}
                  tableHeight="table-50vh2"
                />
              )}

              {activeBtn === 1 && (
                <ScrollTable
                  columns={cols}
                  data={siteLooseData}
                  tableHeight="table-50vh2"
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
