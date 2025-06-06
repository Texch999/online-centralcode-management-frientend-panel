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
      const id = localStorage.getItem("emp_role_id");
      const user = id === "1" ? "director" : "user";
      const query = new URLSearchParams(params).toString();
      return `/${user}/${userID()}/promotionsTypes?${query}`;
    },
  },

  statusPromotionsTypes: {
    method: "put",
    url: (id) => `/user/${userID()}/promotionTypes/${id}/status`,
  },
  getPromotionsImage: {
    method: "get",
    url: (params) => {
      const id = localStorage.getItem("emp_role_id");
      const user = id === "1" ? "director" : "user";
      const query = new URLSearchParams(params).toString();
      return `/${user}/${userID()}/promotionsImages?${query}`;
    },
  },
  createPromotionImages: {
    method: "post",
    url: () => {
      const id = localStorage.getItem("emp_role_id");
      const user = id === "1" ? "director" : "user";
      return `/${user}/${userID()}/promotionImage`;
    },
  },
  deletePromotionsImages: {
    method: "delete",
    url: (id) => {
      const userid = localStorage.getItem("emp_role_id");
      const user = userid === "1" ? "director" : "user";
      return `/${user}/${userID()}/promotionImage/${id}`;
    },
  },
  getBanner: {
    method: "get",
    url: () => `/user/${userID()}/banners`,
  },

  getBannerByUserId: {
    method: "get",
    url: (params) => {
      const userid = localStorage.getItem("emp_role_id");
      const user = userid === "1" ? "director" : "user";
      const { id, ...filteredParams } = params;
      const query = new URLSearchParams(filteredParams).toString();
      return `/${user}/${userID()}/banners/user/${id}${query ? `?${query}` : ""
        }`;
    },
  },

  createBanner: {
    method: "post",
    url: () => {
      const id = localStorage.getItem("emp_role_id");
      const user = id === "1" ? "director" : "user";
      return `/${user}/${userID()}/banner`;
    },
  },

  editBanner: {
    method: "put",
    url: (id) => {
      const userId = localStorage.getItem("emp_role_id");
      const user = userId === "1" ? "director" : "user";
      return `/${user}/${userID()}/banner/${id}`;
    },
  },
  deleteBanner: {
    method: "delete",
    url: (id) => {
      const userId = localStorage.getItem("emp_role_id");
      const user = userId === "1" ? "director" : "user";
      return `/${user}/${userID()}/banner/${id}`;
    },
  },
  statusUpdateBanner: {
    method: "put",
    url: (id) => {
      const userId = localStorage.getItem("emp_role_id");
      const user = userId === "1" ? "director" : "user";
      return `/${user}/${userID()}/banner/${id}/status`;
    },
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
    url: () => {
      const userid = localStorage.getItem("emp_role_id");
      const user = userid === "1" ? "director" : "user";
      return `/${user}/${userID()}/broadcasting`;
    },
  },

  getBroadCasting: {
    method: "get",
    url: (params) => {
      const userid = localStorage.getItem("emp_role_id");
      const user = userid === "1" ? "director" : "user";
      const { id, ...filteredParams } = params;
      const query = new URLSearchParams(filteredParams).toString();
      return `/${user}/${userID()}/broadcastings/${id}${query ? `?${query}` : ""
        }`;
    },
  },

  statusBroadcastUpdate: {
    method: "put",
    url: (id) => {
      const userid = localStorage.getItem("emp_role_id");
      const user = userid === "1" ? "director" : "user";
      return `/${user}/${userID()}/broadcasting/statusBroadcastUpdate/${id}`;
    },
  },

  editBroadCasting: {
    method: "put",
    url: (id) => {
      const userid = localStorage.getItem("emp_role_id");
      const user = userid === "1" ? "director" : "user";
      return `/${user}/${userID()}/broadcasting/${id}`;
    },
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
  getDirectorAccessWebitesForBanners: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/director/${userID()}/directorEncodedAccessedWebsite/${userID()}?${query}`;
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
      `/director/${userID()}/notifications/${data.id}/readStatus/${data.status
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
  resetPasswordMan: {
    method: "put",
    url: `/user/${userID()}/resetPassword`,
  },
  resetPswdDirector: {
    method: "put",
    url: `/director/${userID()}/directorresetPassword`,
  },

  dirEmployeeResetPswd: {
    method: "put",
    url: `/director/${userID()}/dirEmpresetPassword`,
  },

  managementEditProfile: {
    method: "put",
    url: `/user/${userID()}/updateProfilePhoto`,
  },
  dirEmpEditProfile: {
    method: "put",
    url: `/director/${userID()}/editProfilePhoto`,
  },
  dirEditProfile: {
    method: "put",
    url: `/director/${userID()}/directorProfileUpdate`,
  },
  getInActiveUsers: {
    method: "get",
    url: (params) => {
      const { websiteId, ...filteredParams } = params;
      const query = new URLSearchParams(filteredParams).toString();
      return `/user/${userID()}/website/${websiteId}?${query}`;
    },
  },
  getAdminUserWebsites: {
    method: "get",
    url: (id) => `/user/${userID()}/adminPanel/${id}`,
  },
  suspendInActiveUsers: {
    method: "post",
    url: (data) =>
      `/user/${userID()}/website/${data.websiteId}/blockUser/${data.id}/status`,
  },
  getOfflineDWDirectors: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/offlineDeposits/directors?${query}`;
    },
  },
  // http://localhost:9001/rest2/0.1/user/1/offlineDeposits/directors/1/websites

  getDirById: {
    method: "get",
    url: (params) => {
      const { userId, ...filteredParams } = params;
      const query = new URLSearchParams(params.params).toString();
      return `/user/${userID()}/offlineDeposits/directors/${userId}/websites?${query}`;
    },

    // url:(id,...params)=>`/user/${userID()}/offlineDeposits/directors/${id}/websites?${query}
    // adminPanId=1&userPanId=2`
  },

  getSettlementTransactionById: {
    method: "get",
    url: (params) => {
      const { userId } = params;
      const query = new URLSearchParams(params.params).toString();
      return `/user/${userID()}/director/${userId}/settlements?${query}`;
    },
  },

  creditSettlements: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/settleCredit`,
  },

  getSettlementSummeryById: {
    method: "get",
    url: (id) => `/user/${userID()}/director/${id}/accountsSummery`,
  },
  // http://localhost:9001/rest2/0.1/user/1/director/45621125/accountsSummery
  dirProfileBlockUnblock: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/status`,
  },

  getDownlineTransactionById: {
    method: "get",
    url: (params) => {
      const { id } = params;
      const query = new URLSearchParams(params.params).toString();
      return `/user/${userID()}/director/${id}/transactionHistory?${query}`;
    },
  },

  getCreditUSersList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/creditSettlement?${query}`;
    },
  },

  returnCreditChips: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/returnCreditChips`,
  },

  creditFullSettlement: {
    method: "post",
    url: (id) => `/user/${userID()}/directors/fullSettlement`,
  },
  getMultiMarket: {
    method: "get",
    url: (id) => `/user/${userID()}/director/websiteAcss/${id}`,
  },
  suspendWebsiteProfile: {
    method: "post",
    url: (id) => `/user/${userID()}/director/${id}/suspend/website`,
  },
  getAdminUserWebsitesListProfile: {
    method: "get",
    url: (data) =>
      `/user/${userID()}/director/${data?.dirId}/adminPanel/${data?.adminPanelId
      }`,
  },
  //sports
  getSportsList: {
    method: "get",
    url: `/user/${userID()}/sportsList`,
    // url: `/user/${userID()}/gameList`,
  },
  addSportsControl: {
    method: "post",
    url: `/user/${userID()}/website/gameControl`,
  },
  gameControlById: {
    method: "get",
    url: (websiteId) => `/user/${userID()}/website/${websiteId}`,
  },
  getSportsListCentral: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/sportsList?${query}`;
    },
  },
  getAllMatches: {
    method: "get",
    url: (params) => {
      const { id, ...filteredParams } = params;
      const query = new URLSearchParams(filteredParams).toString();
      return `/user/${userID()}/sport/${id}/getAllMatches?${query}`;
    },
  },
  suspendMatchCentral: {
    method: "post",
    url: (id) => `/user/${userID()}/sport/${id?.sportId}/match/${id?.matchId}`,
  },
  getFancyResults: {
    method: "get",
    url: (data) =>
      `/user/${userID()}/sport/${data?.sportId}/match/${data?.matchId}`,
  },
  setFancyResults: {
    method: "post",
    url: (id) =>
      `/user/${userID()}/sport/${id?.sportId}/match/${id?.matchId
      }/announceFancyResult`,
  },
  suspendFancyResult: {
    method: "post",
    url: (id) =>
      `/user/${userID()}/sport/${id?.sportId}/match/${id?.matchId
      }/suspendFancyResult`,
  },
  announceCricketResults: {
    method: "post",
    url: (id) =>
      `/user/${userID()}/sport/${id?.sportId}/match/${id?.matchId
      }/announceCricketResult`,
  },
  getMatchesList: {
    method: "get",
    url: (sportId) => `/user/${userID()}/sport/${sportId}/getMatchesList`,
  },

  // vendor creation

  createVendor: {
    method: "post",
    url: `/user/${userID()}/vendor`,
  },
  getAllVendors: {
    method: "get",
    url: `/user/${userID()}/getVendorDetails`,
  },
  getVendorById: {
    method: "get",
    url: (id) => `/user/${userID()}/getVendorDetails/${id}`,
  },
  getMarketOptions: {
    method: "get",
    url: `/user/${userID()}/getOptions`,
  },
  updateVendor: {
    method: "post",
    url: (id) => `/user/${userID()}/vendor/${id}`,
  },
  suspendProvider: {
    method: "post",
    url: (id) =>
      `/user/${userID()}/vendor/${id?.vId}/status/${id?.statusId}/provider/${id?.prvId
      }`,
  },
  getProvidersById: {
    method: "get",
    url: (data) =>
      `/user/${userID()}/getVendorProviders/${data?.vId}/market/${data?.mId}`,
  },
  createProvider: {
    method: "post",
    url: `/user/${userID()}/createPrvOrGame`,
  },
  getOldMatchesHistory: {
    method: "get",
    // url: (id) => `/user/${userID()}/sport/${id}/getAllOldMatches`,
    url: (params) => {
      const { id, ...filteredParams } = params;
      const query = new URLSearchParams(filteredParams).toString();
      return `/user/${userID()}/sport/${id}/getAllOldMatches?${query}`;
    },
  },
  vendorPayment: {
    method: "post",
    url: `/user/${userID()}/vendorPayment`,
  },
  getVendorAccounts: {
    method: "get",
    url: `/user/${userID()}/getVendorAccounts`,
  },
  getSettledHistory: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID()}/vendorPayments?${query}`;
    },
    // url: `/user/${userID()}/vendorPayments?fromDate=2025-05-01&toDate=2025-05-29&offset=0&limit=10`,
  },
  deleteVendorpayment: {
    method: "post",
    url: (data) =>
      `/user/${userID()}/vendor/${data?.vId}/delete/vendorPayment/${data?.payId
      }`,
  },
  getPyamentById: {
    method: "get",
    url: (payId) => `/user/${userID()}/vendorPayment/${payId}`,
  },
  updatePayment: {
    method: "post",
    url: (id) => {
      return `/user/${userID()}/vendor/${id?.venId}/vendorPayment/${id?.editPaymentId
        }`;
    },
  },
  settleVendorById: {
    method: "get",
    url: (vId) => `/user/${userID()}/vendor/${vId}/getVendorAcc`,
  },

  getMatchesInSports: {
    method: "get",
    url: (params) => {
      const { sport, filter } = params
      const query = new URLSearchParams(filter).toString();
      return `/user/${userID()}/${sport}?${query}`;
    },
  },

  getIndividualMatchDetails: {
    method: "get",
    url: (matchId) => `/user/${userID()}/match/${matchId}`,
  },
};

export default endpoints;
