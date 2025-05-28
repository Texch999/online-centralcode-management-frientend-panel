import { data } from "react-router";
import apiRequest from "./apiRequest";

const loginManagement = (data) => {
  return apiRequest("loginManagement", data);
};
// security Questions
const createSecurityQuestions = (data) => {
  return apiRequest("createSecurityQuestions", data);
};
const getAllSecurityQuestions = (params) => {
  return apiRequest("getAllSecurityQuestions", {}, params);
};
const updateSecurityQuestions = (id, data) => {
  return apiRequest("updateSecurityQuestions", data, id);
};
const getSecQusetionsById = (id, data) => {
  return apiRequest("getSecQusetionsById", data, id);
};

// manage team
const loginDirector = (data) => {
  return apiRequest("loginDirector", data);
};
const loginDirectorEmployee = (data) => {
  return apiRequest("loginDirectorEmployee", data);
};
const addManagemnentTeam = (data) => {
  return apiRequest("addManagemnentTeam", data);
};
const addDirectorTeam = (data) => {
  return apiRequest("addDirectorTeam", data);
};

const createDirector = (data) => {
  return apiRequest("createDirector", data);
};
const createSuperAdmin = (data) => {
  return apiRequest("createSuperAdmin", data);
};
const getRoles = (data) => {
  return apiRequest("getRoles", data);
};
const getAdminWebsites = (data) => {
  return apiRequest("getAdminWebsites", data);
};
const getUserWebsites = (data) => {
  return apiRequest("getUserWebsites", data);
};
const getEmployees = (params) => {
  return apiRequest("getEmployees", {}, params);
};
const getDirectors = (params) => {
  return apiRequest("getDirectors", {}, params);
};
const resetEmployeePassword = (id, data) => {
  return apiRequest("resetEmployeePassword", data, id);
};
const resetDirectorPassword = (id, data) => {
  return apiRequest("resetDirectorPassword", data, id);
};
const resetSuperAdminPassword = (id, data) => {
  return apiRequest("resetSuperAdminPassword", data, id);
};
const blockEmploye = (id, data) => {
  return apiRequest("blockEmploye", data, id);
};
const blockDirectorEmployee = (id, data) => {
  return apiRequest("blockDirectorEmployee", data, id);
};
const blockDirector = (id, data) => {
  return apiRequest("blockDirector", data, id);
};

const updateEmployeeByID = (id, data) => {
  return apiRequest("updateEmployeeByID", data, id);
};
const updateDirectorByID = (id, data) => {
  return apiRequest("updateDirectorByID", data, id);
};
const updateSuperAdminByID = (id, data) => {
  return apiRequest("updateSuperAdminByID", data, id);
};
// updateDirectorEmployeeByID
const updateDirectorEmployeeByID = (id, data) => {
  return apiRequest("updateDirectorEmployeeByID", data, id);
};
const getEmployeeDetailsById = (id) => {
  return apiRequest("getEmployeeDetailsById", null, id);
};

const getDirectorEmployeeDetailsById = (id) => {
  return apiRequest("getDirectorEmployeeDetailsById", null, id);
};
const getDirectorDetailsById = (id) => {
  return apiRequest("getDirectorDetailsById", null, id);
};
const getSuperAdminDetailsById = (id) => {
  return apiRequest("getSuperAdminDetailsById", null, id);
};
const resetDirectorPasswordInProfile = (id, data) => {
  return apiRequest("resetDirectorPasswordInProfile", data, id);
};

const getDirectorEmployees = (params) => {
  return apiRequest("getDirectorEmployees", {}, params);
};
// const getWebsitesList = (params) => {
const getDirectorAccountDetails = (params) => {
  return apiRequest("getDirectorAccountDetails", {}, params);
};

const postDirectorAccountDetails = (data) => {
  return apiRequest("postDirectorAccountDetails", data);
};
const suspendDirectorAccountPaymentDetails = (id, status) => {
  return apiRequest("suspendDirectorAccountPaymentDetails", id, { id, status });
};
const updateDirectorAccountDetails = (id, data) => {
  return apiRequest("updateDirectorAccountDetails", data, id);
};
const getDirectorAccountById = (id, data) => {
  return apiRequest("getDirectorAccountById", data, id);
};

const updateDirectorProfileDetails = (id, data) => {
  return apiRequest("updateDirectorProfileDetails", data, id);
};

const getCountries = (data) => {
  return apiRequest("getCountries", data);
};
// getCurrencies
const getCurrencies = (data) => {
  return apiRequest("getCurrencies", data);
};
export const getWebsitesList = (params) => {
  return apiRequest("getWebsitesList", {}, params);
};
export const getAllCountires = (data) => {
  return apiRequest("getAllCountires", data);
};
export const createWebsite = (data) => {
  return apiRequest("createWebsite", data);
};
export const updateWebsite = (id, data) =>
  apiRequest("updateWebsite", data, id);

export const getWebsiteDetails = (id, data) =>
  apiRequest("getWebsiteDetails", data, id);

export const getAdminWebsiteDetails = () =>
  apiRequest("getAdminWebsiteDetails");

export const getUserWebsiteDetails = () => apiRequest("getUserWebsiteDetails");

export const blockAndUnblock = (id, data) =>
  apiRequest("blockAndUnblock", data, id);

//VijayaLakshmi
const getPromotionsTypes = (params) => {
  return apiRequest("getPromotionsTypes", {}, params);
};
export const getPromotionsTypesDirector = (params) => {
  return apiRequest("getPromotionsTypesDirector", {}, params);
};
const getPromotionsImage = (params) => {
  return apiRequest("getPromotionsImage", {}, params);
};
const createPromotionImages = (data) => {
  return apiRequest("createPromotionImages", data);
};
const statusPromotionsTypes = (id, data) => {
  return apiRequest("statusPromotionsTypes", data, id);
};
const deletePromotionsImages = (id, data) => {
  return apiRequest("deletePromotionsImages", data, id);
};
export const getBroadCasting = (params) => {
  return apiRequest("getBroadCasting", {}, params);
};

export const createBroadCasting = (data) => {
  return apiRequest("createBroadCasting", data);
};
export const editBroadCasting = (id, data) => {
  return apiRequest("editBroadCasting", data, id);
};
export const statusBroadCasting = (id, data) => {
  return apiRequest("statusBroadcastUpdate", data, id);
};

export const getLoggedInLogs = (params) => {
  return apiRequest("getLoggedInLogs", {}, params);
};
export const getLoggedInLogsById = (params) => {
  return apiRequest("getLoggedInLogsById", {}, params);
};

export const getDirectorLoginLogs = (params) => {
  return apiRequest("getDirectorLoginLogs", {}, params);
};

export const getDirectorLoginLogsById = (params) => {
  return apiRequest("getDirectorLoginLogsById", {}, params);
};

// rejection reasons
// const getAllRejectionReasons = (data) => {
//   return apiRequest("getAllRejectionReasons", data);
// };

const getAllRejectionReasons = (params) => {
  return apiRequest("getAllRejectionReasons", {}, params);
};

const createRejReasons = (data) => {
  return apiRequest("createRejReasons", data);
};
const updateRejReasons = (id, data) => {
  return apiRequest("updateRejReasons", data, id);
};
const getRejReasonsById = (id, data) => {
  return apiRequest("getRejReasonsById", data, id);
};
//priavacy policy
// const getPrivacyPolicy = (data) => {
//   return apiRequest("getPrivacyPolicy", data);
// };
const getPrivacyPolicy = (params) => {
  return apiRequest("getPrivacyPolicy", {}, params);
};
const getPrivacyPolicyById = (id, data) => {
  return apiRequest("getPrivacyPolicyById", data, id);
};
const getWebsites = (data) => {
  return apiRequest("getWebsites", data);
};
const createPrivacyPolicy = (data) => {
  return apiRequest("createPrivacyPolicy", data);
};
const updatePrivacyPolicyById = (id, data) => {
  return apiRequest("updatePrivacyPolicyById", data, id);
};
const privacyPolicyStatusUpdate = (id, status) => {
  return apiRequest("privacyPolicyStatusUpdate", id, { status, id });
};
const getAvailableWebsites = (id, data) => {
  return apiRequest("getAvailableWebsites", data, id);
};

const getDirectorEmployeesLoginLogsList = (params) => {
  return apiRequest("getDirectorEmployeesLoginLogsList", {}, params);
};
const getDirectorEmployeesLoginLogsByEmployeeId = (params) => {
  return apiRequest("getDirectorEmployeesLoginLogsByEmployeeId", {}, params);
};

const getDirectorDwnList = (data) => {
  return apiRequest("getDirectorDwnList", data);
};
const getDirectorDwnListById = (id, data) => {
  return apiRequest("getDirectorDwnListById", data, id);
};
const updateDirectorDwnlnPswd = (id, data) => {
  return apiRequest("updateDirectorDwnlnPswd", data, id);
};
const unblockBlockDirectorDwnln = (id, data) => {
  return apiRequest("unblockBlockDirectorDwnln", data, id);
};
const getBanner = () => {
  return apiRequest("getBanner");
};
const getBannerByUserId = (params) => {
  return apiRequest("getBannerByUserId", {}, params);
};

const createBanner = (data) => {
  return apiRequest("createBanner", data);
};
const editBannerApi = (id, data) => {
  return apiRequest("editBanner", data, id);
};
const deleteBanner = (id, data) => {
  return apiRequest("deleteBanner", data, id);
};
const statusUpdateBanner = (id, data) => {
  return apiRequest("statusUpdateBanner", data, id);
};

const getDirectorAccessWebites = (params) => {
  return apiRequest("getDirectorAccessWebites", {}, params);
};
export const getDirectorAccessWebitesForBanners = (params) => {
  return apiRequest("getDirectorAccessWebitesForBanners", {}, params);
};
const resetDirectorEmployeePassword = (id, data) => {
  return apiRequest("resetDirectorEmployeePassword", data, id);
};

const addWebsiteToPrivacyPolicy = (id, data) => {
  return apiRequest("addWebsiteToPrivacyPolicy", data, id);
};
const getManagementPaymentDetails = (params) => {
  return apiRequest("getManagementPaymentDetails", {}, params);
};
const suspendManagementPaymentDetails = (id, data) => {
  return apiRequest("suspendManagementPaymentDetails", data, id);
};
const getManagementPaymentDetailsById = (id, data) => {
  return apiRequest("getManagementPaymentDetailsById", data, id);
};
const createManagementPaymentDetails = (data) => {
  return apiRequest("createManagementPaymentDetails", data);
};
const updateManagementPaymentDetails = (id, data) => {
  return apiRequest("updateManagementPaymentDetails", data, id);
};
const createManagementOfflinePaymentModes = (data) => {
  return apiRequest("createManagementOfflinePaymentModes", data);
};
const getManagementOfflinePaymentModes = (params) => {
  return apiRequest("getManagementOfflinePaymentModes", {}, params);
};
const suspenManagementOfflinePaymentModes = (id, status) => {
  return apiRequest("suspenManagementOfflinePaymentModes", id, { id, status });
};
const getManagementOfflinePaymentModeById = (id, data) => {
  return apiRequest("getManagementOfflinePaymentModeById", data, id);
};
const updateManagementOfflinePaymentDetails = (id, data) => {
  return apiRequest("updateManagementOfflinePaymentDetails", data, id);
};

const managementPaymentDetails = (data) => {
  return apiRequest("managementPaymentDetails", data);
};

const ownersAvailablePaymentsModes = (data) => {
  return apiRequest("ownersAvailablePaymentsModes", data);
};

const DirectorUpLinePaymentDetails = (data) => {
  return apiRequest("DirectorUpLinePaymentDetails", data);
};

const getDirectorSites = (data) => {
  return apiRequest("getDirectorSites", data);
};
// const managementDwnProfileDirPaymentDetails = (id, data) => {
//   return apiRequest("managementDwnProfileDirPaymentDetails", data, id);
// };

const managementDwnProfileDirPaymentDetails = (params) => {
  return apiRequest("managementDwnProfileDirPaymentDetails", {}, params);
};

const UpdateProfileDirpaymentDetailsByMan = (id, data) => {
  return apiRequest("UpdateProfileDirpaymentDetailsByMan", data, id);
};
const getDirPayDetailsByIdProfile = (id, data) => {
  return apiRequest("getDirPayDetailsByIdProfile", data, id);
};
const DirectorAvailablePaymentsModes = (data) => {
  return apiRequest("DirectorAvailablePaymentsModes", data);
};

const getNotificationsforManagement = (data) => {
  return apiRequest("getNotificationsforManagement", data);
};
const getNotificationsforDirector = (data) => {
  return apiRequest("getNotificationsforDirector", data);
};
const readNotificationsforManagement = (id, status) => {
  return apiRequest("readNotificationsforManagement", id, { id, status });
};

const readNotificationsforDirector = (id, status) => {
  return apiRequest("readNotificationsforDirector", id, { id, status });
};
const DirectorOffilneDepositTicket = (data) => {
  return apiRequest("DirectorOffilneDepositTicket", data);
};

const getDirectorDepositeTicketsList = (params) => {
  return apiRequest("getDirectorDepositeTicketsList", {}, params);
};

const getOwnerDownlineDepositeTicketsList = (params) => {
  return apiRequest("getOwnerDownlineDepositeTicketsList", {}, params);
};

const depositTikcetDetailsById = (id, data) => {
  return apiRequest("depositTikcetDetailsById", data, id);
};

const managementDepositTikcetDetailsById = (id, data) => {
  return apiRequest("managementDepositTikcetDetailsById", data, id);
};

const DeleteDirectorTicketsById = (id, data) => {
  return apiRequest("DeleteDirectorTicketsById", data, id);
};

const ownerTicketApprove = (id, data) => {
  return apiRequest("ownerTicketApprove", data, id);
};

const ownerTicketRejection = (id, data) => {
  return apiRequest("ownerTicketRejection", data, id);
};

const DirectorWithdrawPaymentDetails = (id, data) => {
  return apiRequest("DirectorWithdrawPaymentDetails", data, id);
};

const DirectorWithdrawTicketCreation = (data) => {
  return apiRequest("DirectorWithdrawTicketCreation", data);
};

const ownerWithdrawTicketRejection = (id, data) => {
  return apiRequest("ownerWithdrawTicketRejection", data, id);
};

const ownerWithdrawTicketApprove = (id, data) => {
  return apiRequest("ownerWithdrawTicketApprove", data, id);
};

const getOwnerCurrencies = (data) => {
  return apiRequest("getOwnerCurrencies", data);
};

// const ownerDowlineDirAndSADetails = (data) => {
//   return apiRequest("ownerDowlineDirAndSADetails", data);
// };

const ownerDowlineDirAndSADetails = (params) => {
  return apiRequest("ownerDowlineDirAndSADetails", {}, params);
};

const ManagementOfflineDepositeTicketCreation = (id, data) => {
  return apiRequest("ManagementOfflineDepositeTicketCreation", data, id);
};

const ManagementOfflineWithdrawTicketCreation = (id, data) => {
  return apiRequest("ManagementOfflineWithdrawTicketCreation", data, id);
};
const managemnetViewDownlinelist = (data) => {
  return apiRequest("managemnetViewDownlinelist", data);
};
const dwnlineDSASuspend = (id, data) => {
  return apiRequest("dwnlineDSASuspend", data, id);
};
const getDwnlineWebsiteList = (id, websiteId) => {
  return apiRequest("getDwnlineWebsiteList", id, { id, websiteId });
};
const dwnlineUserWebsites = (id, data) => {
  return apiRequest("dwnlineUserWebsites", data, id);
};
const resetPasswordMan = (data) => {
  return apiRequest("resetPasswordMan", data);
};
const resetPswdDirector = (data) => {
  return apiRequest("resetPswdDirector", data);
};
const dirEmployeeResetPswd = (data) => {
  return apiRequest("dirEmployeeResetPswd", data);
};
const managementEditProfile = (data) => {
  return apiRequest("managementEditProfile", data);
};
const dirEmpEditProfile = (data) => {
  return apiRequest("dirEmpEditProfile", data);
};
const dirEditProfile = (data) => {
  return apiRequest("dirEditProfile", data);
};
const getInActiveUsers = (params) => {
  return apiRequest("getInActiveUsers", {}, params);
};
const getAdminUserWebsites = (id, data) => {
  return apiRequest("getAdminUserWebsites", data, id);
};
const suspendInActiveUsers = (websiteId, id) => {
  return apiRequest("suspendInActiveUsers", websiteId, { websiteId, id });
};
const getOfflineDWDirectors = (params) => {
  return apiRequest("getOfflineDWDirectors", {}, params);
};
const getDirById = (params) => {
  return apiRequest("getDirById", {}, params);
};
const getSettlementTransactionById = (params) => {
  return apiRequest("getSettlementTransactionById", {}, params);
};

const creditSettlements = (id, data) => {
  return apiRequest("creditSettlements", data, id);
};

const getSettlementSummeryById = (id, data) => {
  return apiRequest("getSettlementSummeryById", data, id);
};
const dirProfileBlockUnblock = (id, data) => {
  return apiRequest("dirProfileBlockUnblock", data, id);
};

const getDownlineTransactionById = (params) => {
  return apiRequest("getDownlineTransactionById", {}, params);
};

const getCreditUSersList = (params) => {
  return apiRequest("getCreditUSersList", {}, params);
};

const returnCreditChips = (id, data) => {
  return apiRequest("returnCreditChips", data, id);
};
const creditFullSettlement = (data) => {
  return apiRequest("creditFullSettlement", data);
};
const getMultiMarket = (id, data) => {
  return apiRequest("getMultiMarket", data, id);
};
const suspendWebsiteProfile = (id, data) => {
  return apiRequest("suspendWebsiteProfile", data, id);
};
const getAdminUserWebsitesListProfile = (dirId, adminPanelId) => {
  return apiRequest("getAdminUserWebsitesListProfile", dirId, {
    dirId,
    adminPanelId,
  });
};
const getSportsList = (data) => {
  return apiRequest("getSportsList", data);
};
const addSportsControl = (data) => {
  return apiRequest("addSportsControl", data);
};
const gameControlById = (websiteId, data) => {
  return apiRequest("gameControlById", data, websiteId);
};
const getSportsListCentral = (params) => {
  return apiRequest("getSportsListCentral", {}, params);
};
const getAllMatches = (params) => {
  return apiRequest("getAllMatches", {}, params);
};
const suspendMatchCentral = (id, data) => {
  return apiRequest("suspendMatchCentral", data, id);
};
const getFancyResults = (sportId, matchId) => {
  return apiRequest("getFancyResults", sportId, { sportId, matchId });
};
const setFancyResults = (id, data) => {
  return apiRequest("setFancyResults", data, id);
};
const suspendFancyResult = (id, data) => {
  return apiRequest("suspendFancyResult", data, id);
};
const announceCricketResults = (id, data) => {
  return apiRequest("announceCricketResults", data, id);
};

const getMatchesList = (sportId, data) => {
  return apiRequest("getMatchesList", data, sportId);
};

const createVendor = (data) => {
  return apiRequest("createVendor", data);
};
const getVendorById = (id, data) => {
  return apiRequest("getVendorById", data, id);
};
const getAllVendors = (data) => {
  return apiRequest("getAllVendors", data);
};
const getMarketOptions = (data) => {
  return apiRequest("getMarketOptions", data);
};
const updateVendor = (id, data) => {
  return apiRequest("updateVendor", data, id);
};
const suspendProvider = (id, data) => {
  return apiRequest("suspendProvider", data, id);
};
const getProvidersById = (vId, mId) => {
  return apiRequest("getProvidersById", vId, { vId, mId });
};
const createProvider = (data) => {
  return apiRequest("createProvider", data);
};
const getOldMatchesHistory = (params) => {
  return apiRequest("getOldMatchesHistory", {}, params);
};
const vendorPayment = (data) => {
  return apiRequest("vendorPayment", data);
};
const getVendorAccounts = (data) => {
  return apiRequest("getVendorAccounts", data);
};
const getSettledHistory = (data) => {
  return apiRequest("getSettledHistory", data);
};
const deleteVendorpayment = (vId, payId) => {
  return apiRequest("deleteVendorpayment", vId, { vId, payId });
};
const getPyamentById = (payId, data) => {
  return apiRequest("getPyamentById", data, payId);
};
const updatePayment = (id, data) => {
  return apiRequest("updatePayment", data, id);
};

export {
  managementDwnProfileDirPaymentDetails,
  UpdateProfileDirpaymentDetailsByMan,
  getDirPayDetailsByIdProfile,
  loginManagement,
  createSecurityQuestions,
  getAllSecurityQuestions,
  updateSecurityQuestions,
  addManagemnentTeam,
  getRoles,
  getEmployees,
  getAllRejectionReasons,
  createRejReasons,
  updateRejReasons,
  getSecQusetionsById,
  getRejReasonsById,
  getPrivacyPolicy,
  getWebsites,
  getPrivacyPolicyById,
  updateDirectorProfileDetails,
  createPrivacyPolicy,
  updatePrivacyPolicyById,
  privacyPolicyStatusUpdate,
  getPromotionsTypes,
  getPromotionsImage,
  createPromotionImages,
  statusPromotionsTypes,
  deletePromotionsImages,
  resetEmployeePassword,
  blockEmploye,
  updateEmployeeByID,
  getEmployeeDetailsById,
  getDirectorAccountDetails,
  postDirectorAccountDetails,
  getDirectorAccountById,
  updateDirectorAccountDetails,
  suspendDirectorAccountPaymentDetails,
  getDirectors,
  loginDirector,
  createDirector,
  getCountries,
  getAdminWebsites,
  getUserWebsites,
  blockDirector,
  resetDirectorPassword,
  getDirectorDetailsById,
  getDirectorEmployees,
  addDirectorTeam,
  getDirectorEmployeesLoginLogsList,
  getDirectorEmployeesLoginLogsByEmployeeId,
  getAvailableWebsites,
  getDirectorDwnList,
  getDirectorDwnListById,
  updateDirectorDwnlnPswd,
  unblockBlockDirectorDwnln,
  getDirectorAccessWebites,
  getBanner,
  createBanner,
  editBannerApi,
  deleteBanner,
  statusUpdateBanner,
  resetDirectorEmployeePassword,
  blockDirectorEmployee,
  getDirectorEmployeeDetailsById,
  updateDirectorEmployeeByID,
  addWebsiteToPrivacyPolicy,
  getManagementPaymentDetails,
  suspendManagementPaymentDetails,
  getManagementPaymentDetailsById,
  createManagementPaymentDetails,
  updateManagementPaymentDetails,
  createManagementOfflinePaymentModes,
  getManagementOfflinePaymentModes,
  suspenManagementOfflinePaymentModes,
  getManagementOfflinePaymentModeById,
  updateManagementOfflinePaymentDetails,
  managementPaymentDetails,
  ownersAvailablePaymentsModes,
  getCurrencies,
  loginDirectorEmployee,
  resetDirectorPasswordInProfile,
  updateDirectorByID,
  DirectorUpLinePaymentDetails,
  getBannerByUserId,
  getDirectorSites,
  createSuperAdmin,
  getSuperAdminDetailsById,
  resetSuperAdminPassword,
  updateSuperAdminByID,
  DirectorAvailablePaymentsModes,
  getNotificationsforManagement,
  getNotificationsforDirector,
  DirectorOffilneDepositTicket,
  getDirectorDepositeTicketsList,
  getOwnerDownlineDepositeTicketsList,
  depositTikcetDetailsById,
  managementDepositTikcetDetailsById,
  DeleteDirectorTicketsById,
  readNotificationsforDirector,
  readNotificationsforManagement,
  ownerTicketApprove,
  ownerTicketRejection,
  DirectorWithdrawPaymentDetails,
  DirectorWithdrawTicketCreation,
  ownerWithdrawTicketRejection,
  ownerWithdrawTicketApprove,
  getOwnerCurrencies,
  ownerDowlineDirAndSADetails,
  ManagementOfflineDepositeTicketCreation,
  ManagementOfflineWithdrawTicketCreation,
  managemnetViewDownlinelist,
  dwnlineDSASuspend,
  getDwnlineWebsiteList,
  dwnlineUserWebsites,
  resetPasswordMan,
  resetPswdDirector,
  dirEmployeeResetPswd,
  managementEditProfile,
  dirEmpEditProfile,
  dirEditProfile,
  getInActiveUsers,
  getAdminUserWebsites,
  suspendInActiveUsers,
  getOfflineDWDirectors,
  getDirById,
  getSettlementTransactionById,
  creditSettlements,
  getSettlementSummeryById,
  dirProfileBlockUnblock,
  getDownlineTransactionById,
  getCreditUSersList,
  returnCreditChips,
  creditFullSettlement,
  getMultiMarket,
  suspendWebsiteProfile,
  getAdminUserWebsitesListProfile,
  getSportsList,
  addSportsControl,
  gameControlById,
  getSportsListCentral,
  getAllMatches,
  suspendMatchCentral,
  getFancyResults,
  setFancyResults,
  suspendFancyResult,
  announceCricketResults,
  getMatchesList,
  createVendor,
  getVendorById,
  getAllVendors,
  getMarketOptions,
  updateVendor,
  getProvidersById,
  suspendProvider,
  createProvider,
  getOldMatchesHistory,
  vendorPayment,
  getVendorAccounts,
  getSettledHistory,
  deleteVendorpayment,
  getPyamentById,
  updatePayment,
};
