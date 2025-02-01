const userID = localStorage.getItem("user_id");
const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  loginDirector: { method: "post", url: "/director/login" },

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
    url: (id) => `/user/${userID}/api/deletePromotionsImages/${id}`,
  },
  getBroadCasting: {
    method: "get",
    url: `/user/${userID}/broadcasting`
  },
  createBroadCasting: {
    method: "post",
    url: `/user/${userID}/broadcasting`
  },
  editBroadCasting: {
    method: "put",
    url: (id) => `/user/${userID}/broadcasting/${id}`
  },
  statusBroadcastUpdate: {
    method: "put",
    url: (id) => `/user/${userID}/broadcasting/statusBroadcastUpdate/${id}`
  },



  loginUser: { method: "post", url: "/master/login" },
  // addManagemnentTeam: { method: "post", url: "/employee" },
  addManagemnentTeam: { method: "post", url: `/user/${userID}/employee` },
  createDirector: { method: "post", url: `/user/${userID}/create` },

  getRoles: { method: "get", url: `/user/${userID}/rolesList` },
  getCountries: { method: "get", url: `/user/${userID}/countries` },
  getAdminWebsites: {
    method: "get",
    url: `/user/${userID}/website/adminWebsites`,
  },
  getUserWebsites: {
    method: "get",
    url: `/user/${userID}/website/userWebsites`,
  },

  getEmployees: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/employees?${query}`;
    },
  },
  getDirectors: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/directors?${query}`;
    },
  },
  resetEmployeePassword: {
    method: "post",
    url: (id) => `/user/${userID}/employeeUpdatePassword/${id}`,
  },
  resetDirectorPassword: {
    method: "post",
    url: (id) => `/user/${userID}/directorUpdatePassword/${id}`,
  },
  blockEmploye: {
    method: "post",
    url: (id) => `/user/${userID}/employeeBlockUnblock/${id}`,
  },
  blockDirector: {
    method: "post",
    url: (id) => `/user/${userID}/directorBlockUnblock/${id}`,
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
    url: `/user/${userID}/directorAccount/`,
  },
  getCountries:{
    method:"get",
    url:`/user/${userID}/countries/countries`,
  },
  postDirectorAccountDetails:{
    method:"post",
    url:`/user/${userID}/directorAccount/`,
  },
  suspendDirectorAccountPaymentDetails:{
    method:"patch",
    url:(data)=>`/user/${userID}/directorAccount/${data?.id}/status/${data?.status}`,
  },

}

export default endpoints;
