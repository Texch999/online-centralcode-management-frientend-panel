import React from "react";
import { Bar } from "react-chartjs-2";
import ScrollTable from "../../components/ScrollTable";
const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DashboardViewAll = () => {
  const barData = {
    labels: labels,
    datasets: [
      {
        label: "Casino Sales",
        backgroundColor: "#98BDFF",
        borderColor: "",
        borderRadius: 5,
        data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80],
      },

      {
        label: "Sports Sales",
        backgroundColor: "#4B49AC",
        borderColor: "",
        borderRadius: 5,
        data: [15, 20, 25, 30, 35, 40, 50, 55, 60, 70, 80, 90],
      },
      {
        label: "casino & Sports Sales",
        backgroundColor: "#F3797E",
        borderColor: "",
        borderRadius: 5,
        data: [15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90],
      },
    ],
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
  return (
    <div className="p-2">
      <h5 className="blck-text">Welcome sri</h5>
      <div className="medium-font grey-clr">
        In facilisis vitae metus molestie vestibulum. Nulla molestie..
      </div>

      <div className="d-flex w-100 mt-2">
        <div className="col-12 pe-2">
          <div className="d-flex flex-column">
            <div className="dashboard-white-bg pb-2">
              <div className="d-flex flex-column p-2">
                <div className="medium-font black-text">Sales Report</div>

                <div className="small-font grey-clr">
                  In facilisis vitae metus molestie vestibulum. Nulla molestie..
                </div>
              </div>
              <div className="hor-grey-line mt-1"></div>

              {/* <div className="d-flex flex-between w-100 black-text small-font p-2">
                <div className="col-3 d-flex align-items-center">
                  <div className="light-blue-btn "></div>
                  <div className="white-space mx-2">Casino Sales</div>
                </div>
                <div className="col-3 d-flex align-items-center">
                  <div className="blue-btn"></div>
                  <div className="white-space mx-2">Sports Sales</div>
                </div>
                <div className="col-3 d-flex align-items-center">
                  <div className="pink-btn"></div>
                  <div className="mx-2 white-space">Casino & Sports Sales</div>
                </div>
              </div> */}

              <div>
                <Bar data={barData} />
              </div>
            </div>

            <div className="d-flex flex-column mt-3">
              <div className="d-flex w-100 align-items-center">
                <div className="col-6 d-flex">
                  <div className="col pe-1">
                    <div className="d-flex flex-column text-white px-2 blue-bg-box">
                      <div className="small-font py-1">Casino Sales</div>
                      <h6 className="py-1">50000000000</h6>
                    </div>
                  </div>
                  <div className="col pe-1">
                    <div className=" voilet-bg-box d-flex flex-column text-white px-2">
                      <div className="small-font py-1">Sports Sales</div>
                      <h6 className="py-1">50000000000</h6>
                    </div>
                  </div>
                  <div className="col pe-1">
                    <div className="box-3 d-flex flex-column text-white px-2">
                      <div className="small-font py-1">S+C Sales</div>
                      <h6 className="py-1">50000000000</h6>
                    </div>
                  </div>
                  <div className="col pe-2 ">
                    <div className="pink-bg-box d-flex flex-column text-white px-2">
                      <div className="small-font py-1">Total Profit</div>
                      <h6 className="py-1">50000000000</h6>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex">
                  <div className="col pe-1 flex-column">
                    <lable className="small-font mb-1">Date</lable>

                    <input
                      type="date"
                      placeholder="date"
                      className="all-none input-css2 small-font"
                    />
                  </div>

                  <div className="col pe-1 flex-column">
                    <lable className="small-font mb-1">Customer Name</lable>

                    <input
                      type="text"
                      placeholder="Enter"
                      className="all-none input-css2 small-font"
                    />
                  </div>

                  <div className="col flex-column">
                    <lable className="small-font mb-1">Sales Type</lable>
                    <select className="input-css2 small-font text-black">
                      <option>All</option>
                      <option>Casino</option>
                      <option>Sports</option>
                      <option>Sports & Casino</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <ScrollTable
                  columns={customerCols}
                  data={customerData}
                  tableHeight={"h-fill"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardViewAll;
