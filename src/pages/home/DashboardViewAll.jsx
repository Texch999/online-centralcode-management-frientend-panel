import React from "react";
import { Bar } from "react-chartjs-2";
import ScrollTable from "../../components/ScrollTable";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { whiteReactSelect } from "../../components/ReactSelectStyles";
import Select from "react-select";

const DashboardViewAll = () => {
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );
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
    maintainAspectRatio: false,
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

  const FILTER_OPTIONS = [
    { value: "all", label: "All" },
    { value: "casino", label: "Casino" },
    { value: "sports", label: "Sports" },
    { value: "casino_sports", label: "Casino & Sports" },
  ];

  const customerCols = [
    {
      header: <div className="flex-center">Customer Name</div>,
      field: "customer",
    },
    { header: <div className="flex-center">Role</div>, field: "role" },
    { header: <div className="flex-center">Casino (%)</div>, field: "casino" },
    { header: <div className="flex-center">Sports (R)</div>, field: "sports" },
    {
      header: <div className="flex-center">Sports & Casino (%)</div>,
      field: "sc",
    },
    { header: <div className="flex-center">Pay</div>, field: "pay" },
  ];

  const customerData = [
    {
      customer: (
        <div className="d-flex flex-column flex-center">
          <div>Srinivas</div>
          <div>S&C-5%</div>
        </div>
      ),
      role: <div className="flex-center">Direcor</div>,
      casino: <div className="flex-center">-</div>,
      sports: <div className="flex-center">70000</div>,
      sc: <div className="flex-center">100000</div>,
      pay: <div className="flex-center">209888</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column flex-center">
          <div>Srinivas</div>
          <div>S&C-5%</div>
        </div>
      ),
      role: <div className="flex-center">Direcor</div>,
      casino: <div className="flex-center">-</div>,
      sports: <div className="flex-center">70000</div>,
      sc: <div className="flex-center">100000</div>,
      pay: <div className="flex-center">209888</div>,
    },
    {
      customer: (
        <div className="d-flex flex-column flex-center">
          <div>Srinivas</div>
          <div>S&C-5%</div>
        </div>
      ),
      role: <div className="flex-center">Direcor</div>,
      casino: <div className="flex-center">-</div>,
      sports: <div className="flex-center">70000</div>,
      sc: <div className="flex-center">100000</div>,
      pay: <div className="flex-center">209888</div>,
    },
  ];
  return (
    <div className="p-2">
      <h4 className="blck-text">Welcome Sri</h4>
      <div className="medium-font grey-clr">
        In facilisis vitae metus molestie vestibulum. Nulla molestie..
      </div>

      <div className="mt-2">
        <div className="d-flex flex-column">
          <div className="dashboard-white-bg box-shadow pb-2">
            <div className="d-flex flex-column p-2">
              <div className="large-font black-text">Sales Report</div>

              <div className="small-font grey-clr">
                In facilisis vitae metus molestie vestibulum. Nulla molestie..
              </div>
            </div>
            <div className="hor-grey-line mt-1"></div>
            <div className="w-100 px-3 py-2 h-50vh scroll-x">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <div className="d-flex w-100 align-items-center">
              <div className="w-60 d-flex">
                <div className="col-3 ">
                  <div className="d-flex flex-column text-white blue-bg-box px-1">
                    <div className="small-font py-1">Casino Sales</div>
                    <h6 className="py-1">50000000</h6>
                  </div>
                </div>
                <div className="col-3 px-2">
                  <div className=" voilet-bg-box d-flex flex-column text-white px-1">
                    <div className="small-font py-1">Sports Sales</div>
                    <h6 className="py-1">50000000</h6>
                  </div>
                </div>
                <div className="col-3 px-2">
                  <div className="box-3 d-flex flex-column text-white px-1">
                    <div className="small-font py-1">S+C Sales</div>
                    <h6 className="py-1">5000000</h6>
                  </div>
                </div>
                <div className="col-3">
                  <div className="pink-bg-box d-flex flex-column text-white px-1">
                    <div className="small-font py-1">Total Profit</div>
                    <h6 className="py-1">500000000</h6>
                  </div>
                </div>
              </div>

              <div className="w-40 flex-between">
                <div className="col-4 flex-column px-2">
                  <lable className="small-font mb-1">Date</lable>
                  <input
                    type="date"
                    placeholder="date"
                    className="all-none input-css2 small-font"
                  />
                </div>
                <div className="col-4 flex-column px-2">
                  <lable className="small-font mb-1 white-space">
                    Customer Name
                  </lable>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="all-none input-css2 small-font"
                  />
                </div>
                <div className="col-4 flex-column pe-2">
                  <lable className="small-font mb-1">Sales Type</lable>
                  <Select
                    className="w-100 small-font"
                    options={FILTER_OPTIONS}
                    placeholder="Select"
                    styles={whiteReactSelect}
                    menuPlacement="auto"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 ">
              <ScrollTable
                columns={customerCols}
                data={customerData}
                tableHeight={"table-50vh"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardViewAll;
