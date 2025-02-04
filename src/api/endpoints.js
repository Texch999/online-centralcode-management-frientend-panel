const userID = () => localStorage.getItem("user_id");
const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  createWebsite: { method: "post", url: `/user/${userID()}/website/website` },
  updateWebsite: {
    method: "put",
    url: (id) => `/user/${userID()}/website/update/websiteby/${id}`,
  },
  getWebsiteDetails: {
    method: "get",
    url: (id) => `/user/${userID()}/website/websiteby/${id}`,
  },
  getWebsitesList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/website/websites?${query}`;
    },
  },
  getAllCountires: { method: "get", url: `/user/${userID()}/countries` },
  blockAndUnblock: {
    method: "put",
    url: (id) => `/user/${userID()}/website/block-unblock/${id}`,
  },
  getPromotionsTypes: {
    method: "get",
    url: `/user/${userID()}/promotionsTypes`,
  },
  statusPromotionsTypes: {
    method: "put",
    url: (id) => `/user/${userID()}/promotionTypes/${id}`,
  },
  getPromotionsImage: {
    method: "get",
    url: `/user/${userID()}/promotionsImages`,
  },
  createPromotionImages: {
    method: "post",
    url: `/user/${userID()}/promotionImage`,
  },
  deletePromotionsImages: {
    method: "delete",
    url: (id) => `/user/${userID()}/promotionImage/${id}`,
  },
  getBanner: {
    method: "get",
    url: `/user/${userID()}/banners`,
  },
  createBanner: {
    method: "post",
    url: `/user/${userID()}/banner`,
  },
  editBanner: {
    method: "put",
    url: (id) => `/user/${userID()}/banner/${id}`,
  },
  deleteBanner: {
    method: "delete",
    url: (id) => `/user/${userID()}/banner/${id}`,
  },
  statusUpdateBanner: {
    method: "put",
    url: (id) => `/user/${userID()}/bannerStatus/${id}`,
  },
  addManagemnentTeam: { method: "post", url: `/user/${userID()}/employee` },

  getRoles: { method: "get", url: `/user/${userID()}/rolesList` },
  getEmployees: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString(); // Dynamically build the query with parameters
      return `/user/${userID()}/employees?${query}`;
    },
  },
  getDirectors: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/directors?${query}`;
    },
  },
  resetEmployeePassword: {
    method: "post",
    url: (id) => `/user/${userID()}/employeeUpdatePassword/${id}`,
  },
  resetDirectorPassword: {
    method: "post",
    url: (id) => `/user/${userID()}/directorUpdatePassword/${id}`,
  },
  blockEmploye: {
    method: "post",
    url: (id) => `/user/${userID()}/employeeBlockUnblock/${id}`,
  },
  blockDirector: {
    method: "post",
    url: (id) => `/user/${userID()}/directorBlockUnblock/${id}`,
  },

  updateEmployeeByID: {
    method: "post",
    url: (id) => `/user/${userID()}/employee/${id}`,
  },
  getEmployeeDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/employee/${id}`,
  },

  //security questions
  createSecurityQuestions: {
    method: "post",
    url: `/user/${userID()}/secQuestion`,
  },
  getAllSecurityQuestions: {
    method: "get",
    url: `/user/${userID()}/secQuestion/`,
  },
  getSecQusetionsById: {
    method: "get",
    url: (id) => `/user/${userID()}/secQuestion/${id}`,
  },
  updateSecurityQuestions: {
    method: "put",
    url: (id) => `/user/${userID()}/secQuestion/${id}`,
  },
  //rejection reasons
  getAllRejectionReasons: {
    method: "get",
    url: `/user/${userID()}/rejectionReasons/`,
  },
  createRejReasons: {
    method: "post",
    url: `/user/${userID()}/rejectionReasons/`,
  },
  updateRejReasons: {
    method: "put",
    url: (id) => `/user/${userID()}/rejectionReasons/${id}`,
  },
  getRejReasonsById: {
    method: "get",
    url: (id) => `/user/${userID()}/rejectionReasons/${id}`,
  },
  // privacy policy
  getPrivacyPolicy: {
    method: "get",
    url: `/user/${userID()}/privacypolicies/`,
  },
  getPrivacyPolicyById: {
    method: "get",
    url: (id) => `/user/${userID()}/privacypolicies/${id}`,
  },
  createPrivacyPolicy: {
    method: "post",
    url: `/user/${userID()}/privacypolicies/`,
  },
  updatePrivacyPolicyById: {
    method: "put",
    url: (id) => `/user/${userID()}/privacypolicies/${id}`,
  },
  privacyPolicyStatusUpdate: {
    method: "patch",
    url: (data) =>
      `/user/${userID()}/privacypolicies/${data.id}/status/${data.status}`,
  },

  getCountries: {
    method: "get",
    url: `/user/${userID()}/countries`,
  },
  getWebsites: { method: "get", url: `/user/${userID()}/website/websites` },
  getDirectorEmployeesLoginLogsList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/directorEmployeeloginLogsbyDirector?${query}`;
    },
  },
  getDirectorEmployeesLoginLogsByEmployeeId: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/DirectorEmploginLogsbyEmployeeId?${query}`;
    },
  },
  // getWebsites: { method: "get", url: `user/${userID()}/website/websites` },
  getAvailableWebsites: {
    method: "get",
    url: (id) => `user/${userID()}/privacypolicies/${id}/websites`,
  },
  createDirector: { method: "post", url: `/user/${userID()}/create` },
  createBroadCasting: {
    method: "post",
    url: `/user/${userID()}/broadcasting`,
  },
  getBroadCasting: {
    method: "get",
    url: `/user/${userID()}/broadcasting`,
  },
  statusBroadcastUpdate: {
    method: "put",
    url: (id) => `/user/${userID()}/broadcasting/statusBroadcastUpdate/${id}`,
  },
  editBroadCasting: {
    method: "put",
    url: (id) => `/user/${userID()}/broadcasting/${id}`,
  },

  getDirectorAccessWebites: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/directorAccessedWebsite/${userID()}?${query}`;
    },
  },

  loginDirector: { method: "post", url: "/director/login" },

  getLoggedInLogs: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/loginLogs?${query}`;
    },
  },
  getLoggedInLogsById: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/loginLogsById?${query}`;
    },
  },
  getDirectorLoginLogs: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/getParentLoginLogs?${query}`;
    },
  },
  getDirectorLoginLogsById: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/getParentLoginLogsById?${query}`;
    },
  },
  // director created SA list
  getDirectorDwnList: {
    method: "get",
    url: `/user/${userID()}/directors`,
  },
  getDirectorDwnListById: {
    method: "get",
    url: (id) => `/user/${userID()}/director/${id}`,
  },
  updateDirectorDwnlnPswd: {
    method: "post",
    url: (id) => `/user/${userID()}/directorUpdatePassword/${id}`,
  },
  unblockBlockDirectorDwnln: {
    method: "post",
    url: (id) => `/user/${userID()}/directorBlockUnblock/${id}`,
  },

  getAdminWebsites: {
    method: "get",
    url: `/user/${userID()}/website/adminWebsites`,
  },
  getUserWebsites: {
    method: "get",
    url: `/user/${userID()}/website/userWebsites`,
  },

  // statusBanner: {
  //   method: "put",
  //   url: (id) => `/user/${userID()}/broadcasting/${id}`,
  // },
  
};

export default endpoints;
