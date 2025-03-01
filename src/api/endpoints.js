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
  createSuperAdmin: {
    method: "post",
    url: () => `/director/${userID()}/superAdmin`,
  },

  getRoles: { method: "get", url: () => `/user/${userID()}/rolesList` },
  getCountries: { method: "get", url: () => `/user/${userID()}/countries` },
  getCurrencies: {
    method: "get",
    url: () => `/director/${userID()}/countries/currency-name`,
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

  getBannerByUserId: {
    method: "get",
    url: (params) => {
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

  loginUser: { method: "post", url: () => "/master/login" },

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
  getDirectorDwnList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/director/${userID()}/superAdmins`;
    },
  },
  // getDirectorDwnList: {
  //   method: "get",
  //   url: () => `/director/${userID()}/superAdmins`,
  // },
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
  //   "/director/:id/superAdmin/:userId/newPassword",

  resetDirectorPassword: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/newPassword`,
  },
  resetSuperAdminPassword: {
    method: "post",
    url: (id) => `/director/${userID()}/superAdmin/${id}/newPassword`,
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
    url: (id) => `/user/${userID()}/director/${id}`,
  },
  updateSuperAdminByID: {
    method: "post",
    url: (id) => `/director/${userID()}/superAdmin/${id}`,
  },
  updateDirectorEmployeeByID: {
    method: "post",
    url: (id) => `/director/${userID()}/updateEmployee/${id}`,
  },
  getEmployeeDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/employee/${id}`,
  },

  getDirectorEmployeeDetailsById: {
    method: "get",
    url: (id) => `/director/${userID()}/employee/${id}`,
  },
  getDirectorDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/director/${id}`,
  },
  // getSuperAdminDetailsById
  getSuperAdminDetailsById: {
    method: "get",
    url: (id) => `/director/${userID()}/superAdmin/${id}`,
  },
  createSecurityQuestions: {
    method: "post",
    url: () => `/user/${userID()}/secQuestion`,
  },

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
    url: (id) => `/user/${userID()}/privacypolicy/${id}`,
  },
  createPrivacyPolicy: {
    method: "post",
    url: () => `/user/${userID()}/privacypolicy`,
  },
  updatePrivacyPolicyById: {
    method: "put",
    url: (id) => `/user/${userID()}/privacypolicy/${id}`,
  },
  privacyPolicyStatusUpdate: {
    method: "patch",
    url: (data) =>
      `/user/${userID()}/privacypolicy/${data.id}/status/${data.status}`,
  },

  addWebsiteToPrivacyPolicy: {
    method: "post",
    url: (id) => `/user/${userID()}/privacypolicy/${id}/addwebsites`,
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
    url: (id) => `/user/${userID()}/privacypolicy/${id}/websites`,
  },

  createBroadCasting: {
    method: "post",
    url: () => `/user/${userID()}/broadcasting`,
  },
  getBroadCasting: {
    method: "get",
    url: (params) => {
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

  getDirectorAccountDetails: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/director/${userID()}/directorAccounts?${query}`;
    },
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
    url: (id) => `/user/${userID()}/directorProfileUpdate/${id}`,
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
      return `/director/${userID()}/directorAccessedWebsite/${userID()}?${query}`;
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
  // /director/:id/superAdmin

  getDirectorDwnListById: {
    method: "get",
    url: (id) => `/director/${userID()}/superAdmin/${id}`,
  },

  //...................//

  updateDirectorDwnlnPswd: {
    method: "post",
    url: (id) => `/user/${userID()}/directorUpdatePassword/${id}`,
  },
  unblockBlockDirectorDwnln: {
    method: "post",
    url: (data) => `/director/${userID()}/superAdmin/${data.id}/status`,
    // url: (data) =>
    //   `/director/${userID()}/superAdmin/${data.id}/status`,
  },
  getUserWebsites: {
    method: "get",
    url: () => `/user/${userID()}/website/userWebsites`,
  },
  getAdminWebsites: {
    method: "get",
    url: () => `/user/${userID()}/website/all-admin/websites`,
  },

  getManagementPaymentDetails: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/offlinePayments?${query}`;
    },
  },

  suspendManagementPaymentDetails: {
    method: "post",
    url: (id) => `/user/${userID()}/offlinePayment/${id}/suspend`,
  },

  getManagementPaymentDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/offlinePayment/${id}`,
  },

  createManagementPaymentDetails: {
    method: "post",
    url: () => `/user/${userID()}/offlinePayment`,
  },

  updateManagementPaymentDetails: {
    method: "post",
    url: (id) => `/user/${userID()}/offlinePayment/${id}`,
  },

  //offline payment modessssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

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
  },
  getManagementOfflinePaymentModeById: {
    method: "get",
    url: (id) => `/user/${userID()}/offlinePaymentMode/${id}`,
  },
  suspenManagementOfflinePaymentModes: {
    method: "patch",
    url: (data) =>
      `/user/${userID()}/offlinePaymentMode/${data.id}/status/${data.status}`,
  },
  updateManagementOfflinePaymentDetails: {
    method: "put",
    url: (id) => `/user/${userID()}/offlinePaymentMode/${id}`,
  },
  managementPaymentDetails: {
    method: "get",
    url: () => `/director/${userID()}/Payments`,
  },
  ownersAvailablePaymentsModes: {
    method: "get",
    url: () => `/user/${userID()}/offlinePaymentModes`,
  },
  DirectorUpLinePaymentDetails: {
    method: "get",
    url: () => `/director/${userID()}/PaymentModes`,
  },

  getDirectorSites: {
    method: "get",
    url: () => `/director/${userID()}/details/${userID()}`,
  },
  //show dir payment details in man
  // managementDwnProfileDirPaymentDetails: {
  //   method: "get",
  //   url: (id) => `/user/${userID()}/offlineAccounts/${id}`,
  // },

  managementDwnProfileDirPaymentDetails: {
    method: "get",
    url: (params) => {
      const { dwnlnId, ...filteredParams } = params;
      const query = new URLSearchParams(filteredParams).toString();
      return `/user/${userID()}/offlineAccounts/${dwnlnId}?${query}`;
    },
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
  getNotificationsforManagement: {
    method: "get",
    url: () => `/user/${userID()}/notifications`,
  },
  getNotificationsforDirector: {
    method: "get",
    url: () => `/director/${userID()}/notifications`,
  },

  readNotificationsforManagement: {
    method: "patch",
    url: (data) =>
      `/user/${userID()}/notifications/${data.id}/readStatus/${data.status}`,
  },
  readNotificationsforDirector: {
    method: "patch",
    url: (data) =>
      `/director/${userID()}/notifications/${data.id}/readStatus/${
        data.status
      }`,
  },
  DirectorOffilneDepositTicket: {
    method: "post",
    url: () => `/director/${userID()}/offlineDeposit`,
  },
  // DirectorOffilneDepositTicket: {
  //   method: "post",
  //   url: () => `/director/${userID()}/offlineDeposit`,
  // },
  getDirectorDepositeTicketsList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/director/${userID()}/offlineDeposits?${query}`;
    },
  },

  getOwnerDownlineDepositeTicketsList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/offlineDeposits?${query}`;
    },
  },

  depositTikcetDetailsById: {
    method: "get",
    url: (id) => `/director/${userID()}/offlineDeposits/${id}`,
  },

  managementDepositTikcetDetailsById: {
    method: "get",
    url: (id) => `/user/${userID()}/offlineDeposits/${id}`,
  },

  DeleteDirectorTicketsById: {
    method: "delete",
    url: (id) => `/director/${userID()}/offlineDeposit/${id}`,
  },

  ownerTicketApprove: {
    method: "post",
    url: (id) => `/user/${userID()}/offlineDeposits/${id}/approve`,
  },

  ownerTicketRejection: {
    method: "post",
    url: (id) => `/user/${userID()}/offlineDeposits/${id}/reject`,
  },

  DirectorWithdrawPaymentDetails: {
    method: "get",
    url: (id) => `/director/${userID()}/offlineAccounts/${id}`,
  },

  DirectorWithdrawTicketCreation: {
    method: "post",
    url: (id) => `/director/${userID()}/offlineWithdraw`,
  },

  ownerWithdrawTicketRejection: {
    method: "post",
    url: (id) => `/user/${userID()}/offlineWithdraw/${id}/reject`,
  },

  ownerWithdrawTicketApprove: {
    method: "post",
    url: (id) => `/user/${userID()}/offlineWithdraw/${id}/approve`,
  },

  getOwnerCurrencies: {
    method: "get",
    url: () => `/user/${userID()}/countries/currency-name`,
  },

  // ownerDowlineDirAndSADetails: {
  //   method: "get",
  //   url: () => `/user/${userID()}/offlineDeposits/directors`,
  // },

  ownerDowlineDirAndSADetails: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/offlineDeposits/directors?${query}`;
    },
  },

  ManagementOfflineDepositeTicketCreation: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/offlineDeposits`,
  },

  ManagementOfflineWithdrawTicketCreation: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/offlineWithdraw`,
  },
  managemnetViewDownlinelist: {
    method: "get",
    url: `/user/${userID()}/downlinelist`,
  },
  dwnlineDSASuspend: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/status`,
  },
  getDwnlineWebsiteList: {
    method: "get",
    url: (data) =>
      `/user/${userID()}/director/${data?.id}/adminweb/${data?.websiteId}`,
  },
  dwnlineUserWebsites: {
    method: "put",
    url: (id) => `/user/${userID()}/website/block-unblock/${id}`,
  },
};

export default endpoints;
