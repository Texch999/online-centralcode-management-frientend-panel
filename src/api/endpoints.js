const userID = localStorage.getItem("user_id");

const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  // addManagemnentTeam: { method: "post", url: "/employee" },
  addManagemnentTeam: { method: "post", url: `/user/${userID}/employee` },

  getRoles: { method: "get", url: `/user/${userID}/rolesList` },
  // getEmployees: { method: "get", url: `/user/${userID}/employees` },
  // getEmployees: ({ limit, offset }) => ({
  //   method: "get",
  //   url: `/user/${userID}/employeeeees?limit=${limit}&offset=${offset}`,
  // }),

  // getEmployees: {
  //   method: "get",
  //   url: (params) => {
  //     const query = new URLSearchParams(params).toString();
  //     return `/user/${userID}/employees?${query}`;
  //   },
  // },
  getEmployees: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString(); // Dynamically build the query with parameters
      return `/user/${userID}/employees?${query}`;
    },
  },
  resetEmployeePassword: {
    method: "post",
    url: (id) => `/user/${userID}/employeeUpdatePassword/${id}`,
  },
  blockEmploye: {
    method: "post",
    url: (id) => `/user/${userID}/employeeBlockUnblock/${id}`,
  },

  updateEmployeeByID: {
    method: "post",
    url: (id) => `/user/${userID}/employee/${id}`,
  },
  getEmployeeDetailsById: {
    method: "get",
    url: (id) => `/user/${userID}/employee/${id}`,
  },
  getDirectorAccountDetails:{
    method: "get",
    url: "/user/2/directorAccount/",
  },
  getCountries:{
    method:"get",
    url:`/user/${userID}/countries/countries`,
  },
  postDirectorAccountDetails:{
    method:"post",
    url:`/user/2/directorAccount/`,
  }

}

export default endpoints;
