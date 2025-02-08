const userID = () => {
  const id = localStorage.getItem("user_id");
  if (!id) {
    console.error("User ID is not available.");
    return null;
  }
  return id;
};
const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  loginDirector: { method: "post", url: "/director/login" },

  addManagemnentTeam: {
    method: "post",
    url: () => `/user/${userID()}/employee`,
  },
  addDirectorTeam: {
    method: "post",
    url: () => `/user/${userID()}/directorEmployee`,
  },

  createDirector: { method: "post", url: () => `/user/${userID()}/director` },

  getRoles: { method: "get", url: () => `/user/${userID()}/rolesList` },
  getCountries: { method: "get", url: () => `/user/${userID()}/countries` },
  getCurrencies: {
    method: "get",
    url: () => `/user/${userID()}/countries/currency-name`,
  },

  createWebsite: {
    method: "post",
    url: () => `/user/${userID()}/website/website`,
  },
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
  blockAndUnblock: {
    method: "put",
    url: (id) => `/user/${userID()}/website/block-unblock/${id}`,
  },
  getPromotionsTypes: {
    method: "get",
    url: () => `/user/${userID()}/promotionsTypes`,
  },
  statusPromotionsTypes: {
    method: "put",
    url: (id) => `/user/${userID()}/promotionTypes/${id}`,
  },
  getPromotionsImage: {
    method: "get",
    url: () => `/user/${userID()}/promotionsImages`,
  },
  createPromotionImages: {
    method: "post",
    url: () => `/user/${userID()}/promotionImage`,
  },
  deletePromotionsImages: {
    method: "delete",
    url: (id) => `/user/${userID()}/promotionImage/${id}`,
  },
  getBanner: {
    method: "get",
    url: () => `/user/${userID()}/banners`,
  },
  createBanner: {
    method: "post",
    url: () => `/user/${userID()}/banner`,
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

  getEmployees: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
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
  getDirectorEmployees: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/directorEmployees?${query}`;
    },
  },
  resetEmployeePassword: {
    method: "post",
    url: (id) => `/user/${userID()}/employeeUpdatePassword/${id}`,
  },
  resetDirectorPassword: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/newPassword`,
  },
  resetDirectorEmployeePassword: {
    method: "post",
    url: (id) => `/user/${userID()}/directorEmployeeUpdatePassword/${id}`,
  },
  blockEmploye: {
    method: "post",
    url: (id) => `/user/${userID()}/employeeBlockUnblock/${id}`,
  },
  blockDirector: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/status`,
  },
  blockDirectorEmployee: {
    method: "post",
    url: (id) => `/user/${userID()}/directorEmployeeBlockUnblock/${id}`,
  },
  updateEmployeeByID: {
    method: "post",
    url: (id) => `/user/${userID()}/employee/${id}`,
  },
  updateDirectorByID: {
    method: "post",
    url: (id) => `/user/${userID()}/updateDirector/${id}`,
  },
  updateDirectorEmployeeByID: {
    method: "post",
    url: (id) => `/user/${userID()}/directorEmployee/${id}`,
  },
  getEmployeeDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/employee/${id}`,
  },
  getDirectorEmployeeDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/directorEmployee/${id}`,
  },
  getDirectorDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/director/${id}`,
  },

  createSecurityQuestions: {
    method: "post",
    url: () => `/user/${userID()}/secQuestion`,
  },
  getAllSecurityQuestions: {
    method: "get",
    url: () => `/user/${userID()}/secQuestion/`,
  },
  getSecQusetionsById: {
    method: "get",
    url: (id) => `/user/${userID()}/secQuestion/${id}`,
  },
  updateSecurityQuestions: {
    method: "put",
    url: (id) => `/user/${userID()}/secQuestion/${id}`,
  },

  getAllRejectionReasons: {
    method: "get",
    url: () => `/user/${userID()}/rejectionReasons/`,
  },
  createRejReasons: {
    method: "post",
    url: () => `/user/${userID()}/rejectionReasons/`,
  },
  updateRejReasons: {
    method: "put",
    url: (id) => `/user/${userID()}/rejectionReasons/${id}`,
  },
  getRejReasonsById: {
    method: "get",
    url: (id) => `/user/${userID()}/rejectionReasons/${id}`,
  },

  getPrivacyPolicy: {
    method: "get",
    url: () => `/user/${userID()}/privacypolicies/`,
  },
  getPrivacyPolicyById: {
    method: "get",
    url: (id) => `/user/${userID()}/privacypolicies/${id}`,
  },
  createPrivacyPolicy: {
    method: "post",
    url: () => `/user/${userID()}/privacypolicies/`,
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

  getWebsites: {
    method: "get",
    url: () => `/user/${userID()}/website/websites`,
  },
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

  getAvailableWebsites: {
    method: "get",
    url: (id) => `/user/${userID()}/privacypolicies/${id}/websites`,
  },

  createBroadCasting: {
    method: "post",
    url: () => `/user/${userID()}/broadcasting`,
  },
  getBroadCasting: {
    method: "get",
    url: () => `/user/${userID()}/broadcasting`,
  },

  statusBroadcastUpdate: {
    method: "put",
    url: (id) => `/user/${userID()}/broadcasting/statusBroadcastUpdate/${id}`,
  },

  editBroadCasting: {
    method: "put",
    url: (id) => `/user/${userID}/api/statusPromotionsTypes/${id}`,
  },

  getDirectorAccountDetails: {
    method: "get",
    url: () => `/user/${userID()}/directorAccount`,
  },
  postDirectorAccountDetails: {
    method: "post",
    url: () => `/user/${userID()}/directorAccount`,
  },
  suspendDirectorAccountPaymentDetails: {
    method: "patch",
    url: (data) =>
      `/user/${userID()}/directorAccount/${data.id}/status/${data.status}`,
  },
  updateDirectorAccountDetails: {
    method: "put",
    url: (id) => `/user/${userID()}/directorAccount/${id}`,
  },
  getDirectorAccountById: {
    method: "get",
    url: (id) => `/user/${userID()}/directorAccount/${id}`,
  },

  getDirectorAccessWebites: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/directorAccessedWebsite/${userID()}?${query}`;
    },
  },

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

  getDirectorDwnList: {
    method: "get",
    url: () => `/user/${userID()}/directors`,
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
    url: () => `/user/${userID()}/website/all-admin/websites`,
  },

  addWebsiteToPrivacyPolicy: {
    method: "post",
    url: (id) => `/user/${userID()}/privacypolicies/${id}/addwebsites`,
  },
  managementPaymentDetails: {
    method: "get",
    url: () => `/director/${userID()}/payments`,
  },
};

export default endpoints;
