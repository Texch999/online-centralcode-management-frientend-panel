import { getManagementPaymentDetails } from "./apiMethods";

const userID = () => {
  const id = localStorage.getItem("user_id");
  if (!id) {
    console.error("User ID is not available.");
    return null;
  }
  return id;
};
const endpoints = {
  loginManagement: { method: "post", url: "/master/login" },
  loginDirector: { method: "post", url: "/director/login" },
  loginDirectorEmployee: { method: "post", url: "/director/employee/login" },

  addManagemnentTeam: {
    method: "post",
    url: () => `/user/${userID()}/employee`,
  },
  addDirectorTeam: {
    method: "post",
    url: () => `/director/${userID()}/createEmployee`,
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
  // loginUser: { method: "post", url: "/master/login" },
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

  getRoles: { method: "get", url: `/user/${userID()}/rolesList` },

  loginUser: { method: "post", url: () => "/master/login" },
  // addManagemnentTeam: { method: "post", url: "/employee" },
  addManagemnentTeam: { method: "post", url: `/user/${userID()}/employee` },

  getRoles: { method: "get", url: () => `/user/${userID()}/rolesList` },
  // getEmployees: { method: "get", url: `/user/${userID()}/employees` },
  // getEmployees: ({ limit, offset }) => ({
  //   method: "get",
  //   url: `/user/${userID()}/employeeeees?limit=${limit}&offset=${offset}`,
  // }),

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
  // endpoint: http://localhost:901rest2/0.1/director/1/employees?limit=10?offset=0
  getDirectorEmployees: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/director/${userID()}/employees?${query}`;
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
    url: (id) => `/director/${userID()}/employeeUpdatePassword/${id}`,
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
    url: (id) => `/director/${userID()}/employeeBlockUnblock/${id}`,
  },
  updateEmployeeByID: {
    method: "post",
    url: (id) => `/user/${userID()}/employee/${id}`,
  },
  updateDirectorByID: {
    method: "post",
    url: (id) => `/user/${userID()}/updateDirector/${id}`,
  },
  // endpoint: http://localhost:901rest2/0.1/director/1/updateEmployee/Abcd1234

  updateDirectorEmployeeByID: {
    method: "post",
    url: (id) => `/director/${userID()}/updateEmployee/${id}`,
  },
  getEmployeeDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/employee/${id}`,
  },
  // http://localhost:901rest2/0.1/director/1/employee/Abcd1234
  getDirectorEmployeeDetailsById: {
    method: "get",
    url: (id) => `/director/${userID()}/employee/${id}`,
  },
  getDirectorDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/director/${id}`,
  },

  createSecurityQuestions: {
    method: "post",
    url: () => `/user/${userID()}/secQuestion`,
  },
  // getAllSecurityQuestions: {
  //   method: "get",
  //   url: () => `/user/${userID()}/secQuestion/`,
  // },

  getAllSecurityQuestions: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/secQuestion/?${query}`;
    },
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

  // getAllRejectionReasons: {
  //   method: "get",
  //   url: () => `/user/${userID()}/rejectionReasons/`,
  // },

  getAllRejectionReasons: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/rejectionReasons/?${query}`;
    },
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
  //privacy
  // getPrivacyPolicy: {
  //   method: "get",
  //   url: () => `/user/${userID()}/privacypolicies/`,
  // },
  getPrivacyPolicy: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/privacypolicies/?${query}`;
    },
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

  addWebsiteToPrivacyPolicy: {
    method: "post",
    url: (id) => `/user/${userID()}/privacypolicies/${id}/addwebsites`,
  },


  getWebsites: {
    method: "get",
    url: () => `/user/${userID()}/website/websites`,
  },
  getDirectorEmployeesLoginLogsList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/director/${userID()}/directorEmployeeloginLogsbyDirector?${query}`;
    },
  },

  getDirectorEmployeesLoginLogsByEmployeeId: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/director/${userID()}/DirectorEmploginLogsbyEmployeeId?${query}`;
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

  //DirectorAccountDetails
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

  updateDirectorProfileDetails: {
    method: "put",
    url: (id) => `/user/${userID()}/directorProfileUpdate/${id}`,
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
      return `/loginLogs?${query}`;
    },
  },
  getLoggedInLogsById: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/loginLogsById?${query}`;
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

  
  resetDirectorPasswordInProfile: {
    method: "post",
    url: (id) => `/user/${userID()}/directorProfileResetPassword/${id}`,
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

  // payment details in management
  getManagementPaymentDetails: {
    method: "get",
    url: () => `/user/${userID()}/paymentDetails`,
  },
  suspendManagementPaymentDetails: {
    method: "post",
    url: (id) => `/user/${userID()}/suspend/${id}`,
  },
  getManagementPaymentDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/payment/${id}`,
  },
  createManagementPaymentDetails: {
    method: "post",
    url: () => `/user/${userID()}/create`,
  },
  updateManagementPaymentDetails: {
    method: "post",
    url: (id) => `/user/${userID()}/update/${id}`,
  },
  //offline payment modes
  createManagementOfflinePaymentModes: {
    method: "post",
    url: () => `/user/${userID()}/offlinePaymentMode`,
  },
  getManagementOfflinePaymentModes: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/totalOfflinePaymentModes?${query}`;
    },
    // url: () => `/user/${userID()}/totalOfflinePaymentModes`,
  },
  getManagementOfflinePaymentModeById: {
    method: "get",
    url: (id) => `/user/${userID()}/offlinePaymentMode/${id}`,
  },
  suspenManagementOfflinePaymentModes: {
    method: "patch",
    url: (data) => `/user/${userID()}/offlinePaymentMode/${data.id}/status/${data.status}`,
  },
  updateManagementOfflinePaymentDetails: {
    method: "put",
    url: (id) => `/user/${userID()}/offlinePaymentMode/${id}`,
  },
  managementPaymentDetails: {
    method: "get",
    url: () => `/director/${userID()}/payments`,
  },
  ownersAvailablePaymentsModes: {
    method: "get",
    url: () => `/user/${userID()}/offlinePaymentModes`,
  },
};

export default endpoints;
