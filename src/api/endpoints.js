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

  //security questions
  createSecurityQuestions: {
    method: "post",
    url: `user/${userID}/secQuestion`,
  },
  getAllSecurityQuestions: {
    method: "get",
    url: `user/${userID}/secQuestion/`,
  },
  getSecQusetionsById: {
    method: "get",
    url: (id) => `user/${userID}/secQuestion/${id}`,
  },
  updateSecurityQuestions: {
    method: "put",
    url: (id) => `user/${userID}/secQuestion/${id}`,
  },
  //rejection reasons
  getAllRejectionReasons: {
    method: "get",
    url: `user/${userID}/rejectionReasons/`,
  },
  createRejReasons: {
    method: "post",
    url: `user/${userID}/rejectionReasons/`,
  },
  updateRejReasons: {
    method: "put",
    url: (id) => `user/${userID}/rejectionReasons/${id}`,
  },
  getRejReasonsById: {
    method: "get",
    url: (id) => `user/${userID}/rejectionReasons/${id}`,
  },
  // privacy policy
  getPrivacyPolicy: {
    method: "get",
    url: `user/${userID}/privacypolicies/`,
  },
  getPrivacyPolicyById: {
    method: "get",
    url: (id) => `user/${userID}/privacypolicies/${id}`,
  },
  createPrivacyPolicy: {
    method: "post",
    url: `user/${userID}/privacypolicies/`,
  },
  updatePrivacyPolicyById: {
    method: "put",
    url: (id) => `user/${userID}/privacypolicies/${id}`,
  },
  privacyPolicyStatusUpdate: {
    method: "patch",
    url: (data) =>
      `user/${userID}/privacypolicies/${data.id}/status/${data.status}`,
  },

  getCountries: {
    method: "get",
    url: `user/${userID}/countries/countries`,
  },
  getWebsites: { method: "get", url: `user/${userID}/website/websites` },
  getAvailableWebsites: { method: "get", url:(id)=> `user/${userID}/privacypolicies/${id}/websites`},
};

export default endpoints;
