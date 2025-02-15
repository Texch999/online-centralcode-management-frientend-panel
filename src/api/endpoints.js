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
  getAdminWebsiteDetails: {
    method: "get",
    url: () => `/user/${userID()}/website/adminWebsites`,
  },
  getUserWebsiteDetails: {
    method: "get",
    url: () => `/user/${userID()}/website/userWebsites`,
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
    url: (params) => {
      console.log("params", params);
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/promotionsTypes?${query}`;
    },
  },
  statusPromotionsTypes: {
    method: "put",
    url: (id) => `/user/${userID()}/promotionTypes/${id}/status`,
  },
  getPromotionsImage: {
    method: "get",
    url: (params) => {
      console.log("params", params);
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/promotionsImages?${query}`;
    },
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
  // getBannerByUserId: {
  //   method: "get",
  //   url: (id) => `/user/${userID()}/banners/user/${id}`,
  // },

  getBannerByUserId: {
    method: "get",
    url: (params) => {
      console.log("params", params);

      const { id, ...filteredParams } = params;

      const query = new URLSearchParams(filteredParams).toString();

      return `/user/${userID()}/banners/user/${id}${query ? `?${query}` : ""}`;
    },
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
    url: (id) => `/user/${userID()}/banner/${id}/status`,
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
  // {{baseUrl}}/user/1/director/Abcd7222
  updateDirectorByID: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}`,
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
      return `/user/${userID()}/secQuestions/?${query}`;
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

  getAllRejectionReasons: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/rejectionReasons/?${query}`;
    },
  },
  createRejReasons: {
    method: "post",
    url: () => `/user/${userID()}/rejectionReason/`,
  },
  updateRejReasons: {
    method: "put",
    url: (id) => `/user/${userID()}/rejectionReason/${id}`,
  },
  getRejReasonsById: {
    method: "get",
    url: (id) => `/user/${userID()}/rejectionReason/${id}`,
  },
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

  // getCountries: {
  //   method: "get",
  //   url: () => `/user/${userID()}/website/websites`,
  // },
  getWebsites: {
    method: "get",
    url: () => `/user/${userID()}/website/websites`,
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
    url: (params) => {
      console.log("params", params);
      const { id, ...filteredParams } = params;

      const query = new URLSearchParams(filteredParams).toString();

      return `/user/${userID()}/broadcastings/${id}${query ? `?${query}` : ""}`;
    },
  },

  statusBroadcastUpdate: {
    method: "put",
    url: (id) => `/user/${userID()}/broadcasting/statusBroadcastUpdate/${id}`,
  },

  editBroadCasting: {
    method: "put",
    url: (id) => `/user/${userID()}/broadcasting/${id}`,
  },
  // dir payment methods

  getDirectorAccountDetails: {
    method: "get",
    url: () => `/director/${userID()}/directorAccounts`,
  },
  postDirectorAccountDetails: {
    method: "post",
    url: () => `/director/${userID()}/directorAccount`,
  },
  suspendDirectorAccountPaymentDetails: {
    method: "patch",
    url: (data) =>
      `/director/${userID()}/directorAccount/${data.id}/status/${data.status}`,
  },

  updateDirectorProfileDetails: {
    method: "put",
    url: (id) => `/director/${userID()}/directorProfileUpdate/${id}`,
  },
  updateDirectorAccountDetails: {
    method: "put",
    url: (id) => `/director/${userID()}/directorAccount/${id}`,
  },
  getDirectorAccountById: {
    method: "get",
    url: (id) => `/director/${userID()}/directorAccount/${id}`,
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

  resetDirectorPasswordInProfile: {
    method: "post",
    url: (id) => `/director/${userID()}/directorProfileResetPassword/${id}`,
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
  getUserWebsites: {
    method: "get",
    url: () => `/user/${userID()}/website/userWebsites`,
  },
  getAdminWebsites: {
    method: "get",
    url: () => `/user/${userID()}/website/all-admin/websites`,
  },

  // payment details in managementttttttttttttttttttttttttttttttttttttttttttttt
  getManagementPaymentDetails: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/paymentDetails?${query}`;
    },
    // url: () => `/user/${userID()}/paymentDetails`,
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
  //offline payment modessssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  createManagementOfflinePaymentModes: {
    method: "post",
    url: () => `/director/${userID()}/offlinePaymentMode`,
  },
  getManagementOfflinePaymentModes: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/director/${userID()}/totalOfflinePaymentModes?${query}`;
    },
  },
  getManagementOfflinePaymentModeById: {
    method: "get",
    url: (id) => `/director/${userID()}/offlinePaymentMode/${id}`,
  },
  suspenManagementOfflinePaymentModes: {
    method: "patch",
    url: (data) =>
      `/director/${userID()}/offlinePaymentMode/${data.id}/status/${data.status
      }`,
  },
  updateManagementOfflinePaymentDetails: {
    method: "put",
    url: (id) => `/director/${userID()}/offlinePaymentMode/${id}`,
  },
  managementPaymentDetails: {
    method: "get",
    url: () => `/director/${userID()}/payments`,
  },
  ownersAvailablePaymentsModes: {
    method: "get",
    url: () => `/user/${userID()}/offlinePaymentModes`,
  },
  DirectorUpLinePaymentDetails: {
    method: "get",
    url: () => `/director/${userID()}/payments`,
  },
  addWebsiteToPrivacyPolicy: {
    method: "post",
    url: (id) => `/user/${userID()}/privacypolicies/${id}/addwebsites`,
  },
  getDirectorSites: {
    method: "get",
    url: () => `/director/${userID()}/details/${userID()}`,
  },
  //show dir payment details in man
  managementDwnProfileDirPaymentDetails: {
    method: "get",
    url: (id) => `/user/${userID()}/offlineAccounts/${id}`,
  },
  UpdateProfileDirpaymentDetailsByMan: {
    method: "put",
    url: (id) => `/user/${userID()}/directorAccount/${id}`,
  },
  getDirPayDetailsByIdProfile: {
    method: "get",
    url: (id) => `/user/${userID()}/directorAccount/${id}`,
  },
  DirectorAvailablePaymentsModes: {
    method: "get",
    url: () => `/director/${userID()}/offlinePaymentModes`,
  },
};

export default endpoints;
