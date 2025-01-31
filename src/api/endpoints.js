const userID = localStorage.getItem("user_id");
const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  createWebsite: { method: "post", url: `/user/${userID}/website/website` },
  updateWebsite: {
    method: "put",
    url: (id) => `/user/${userID}/website/update/websiteby/${id}`,
  },
  getWebsiteDetails: {
    method: "get",
    url: (id) => `/user/${userID}/website/websiteby/${id}`,
  },
  getWebsitesList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/website/websites?${query}`;
    },
  },
  getAllCountires: { method: "get", url: `/user/${userID}/countries` },
  blockAndUnblock: {
    method: "put",
    url: (id) => `/user/${userID}/website/block-unblock/${id}`,
  },
  getPromotionsTypes: {
    method: "get",
    url: `/user/${userID}/api/getPromotionsTypes`,
  },
  getPromotionsImage: {
    method: "get",
    url: `/user/${userID}/api/getPromotionsImages`,
  },
  createPromotionImages: {
    method: "post",
    url: `/user/${userID}/api/createPromotionImages`,
  },
  statusPromotionsTypes: {
    method: "put",
    url: (id) => `/user/${userID}/api/statusPromotionsTypes/${id}`,
  },
  deletePromotionsImages: {
    method: "delete",
    url: (id) => `/user/${userID}/api/statusPromotionsTypes/${id}`,
  },


  getLoggedInLogs: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/loginLogs?${query}`;
    },
  },
  getLoggedInLogsById: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/loginLogsById?${query}`;
    },
  },
  getDirectorLoginLogs: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/getParentLoginLogs?${query}`;
    },
  },
  getDirectorLoginLogsById: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/getParentLoginLogsById?${query}`;
    },
  },

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
};

export default endpoints;
