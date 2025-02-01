const UserId = localStorage.getItem("user_id");
const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  addManagemnentTeam: { method: "post", url: "/employee" },
  getRoles: { method: "get", url: "/rolesList" },
  // getEmployees: { method: "get", url: "/employees" },
  createWebsite: { method: "post", url: `/user/${UserId}/website/website` },
  updateWebsite: {
    method: "put",
    url: (id) => `/user/${UserId}/website/update/websiteby/${id}`,
  },
  getWebsiteDetails: {
    method: "get",
    url: (id) => `/user/${UserId}/website/websiteby/${id}`,
  },
  getWebsitesList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${UserId}/website/websites?${query}`;
    },
  },
  getAllCountires: { method: "get", url: `/user/${UserId}/countries` },
  blockAndUnblock: {
    method: "put",
    url: (id) => `/user/${UserId}/website/block-unblock/${id}`,
  },
  getPromotionsTypes: {
    method: "get",
    url: `/user/${UserId}/api/getPromotionsTypes`,
  },
  getPromotionsImage: {
    method: "get",
    url: `/user/${UserId}/api/getPromotionsImages`,
  },
  createPromotionImages: {
    method: "post",
    url: `/user/${UserId}/api/createPromotionImages`,
  },
  statusPromotionsTypes: {
    method: "put",
    url: (id) => `/user/${UserId}/api/statusPromotionsTypes/${id}`,
  },
  deletePromotionsImages: {
    method: "delete",
    url: (id) => `/user/${UserId}/api/deletePromotionsImages/${id}`,
  },
  getBroadCasting: {
    method: "get",
    url: `/user/${UserId}/broadcasting`
  },
  createBroadCasting: {
    method: "post",
    url: `/user/${UserId}/broadcasting`
  },
  editBroadCasting: {
    method: "put",
    url: (id) => `/user/${UserId}/broadcasting/${id}`
  },
  statusBroadcastUpdate: {
    method: "put",
    url: (id) => `/user/${UserId}/broadcasting/statusBroadcastUpdate/${id}`
  },



  loginUser: { method: "post", url: "/master/login" },
  // addManagemnentTeam: { method: "post", url: "/employee" },
  addManagemnentTeam: { method: "post", url: `/user/${UserId}/employee` },

  getRoles: { method: "get", url: `/user/${UserId}/rolesList` },
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
      return `/user/${UserId}/employees?${query}`;
    },
  },
  resetEmployeePassword: {
    method: "post",
    url: (id) => `/user/${UserId}/employeeUpdatePassword/${id}`,
  },
  blockEmploye: {
    method: "post",
    url: (id) => `/user/${UserId}/employeeBlockUnblock/${id}`,
  },

  updateEmployeeByID: {
    method: "post",
    url: (id) => `/user/${UserId}/employee/${id}`,
  },
  getEmployeeDetailsById: {
    method: "get",
    url: (id) => `/user/${UserId}/employee/${id}`,
  },
};

export default endpoints;
