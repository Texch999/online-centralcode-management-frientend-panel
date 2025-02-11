import { data } from "react-router";
import apiRequest from "./apiRequest";

const loginUser = (data) => {
  return apiRequest("loginUser", data);
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
const addManagemnentTeam = (data) => {
  return apiRequest("addManagemnentTeam", data);
};
const addDirectorTeam = (data) => {
  return apiRequest("addDirectorTeam", data);
};

const createDirector = (data) => {
  return apiRequest("createDirector", data);
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
const blockEmploye = (id, data) => {
  return apiRequest("blockEmploye", data, id);
};
const blockDirector = (id, data) => {
  return apiRequest("blockDirector", data, id);
};

const updateEmployeeByID = (id, data) => {
  return apiRequest("updateEmployeeByID", data, id);
};
const getEmployeeDetailsById = (id) => {
  return apiRequest("getEmployeeDetailsById", null, id);
};
const getDirectorDetailsById = (id) => {
  return apiRequest("getDirectorDetailsById", null, id);
};

const getDirectorEmployees = (params) => {
  return apiRequest("getDirectorEmployees", {}, params);
};
// const getWebsitesList = (params) => {
const getDirectorAccountDetails = (data) => {
  return apiRequest("getDirectorAccountDetails");
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

const getCountries = (data) => {
  return apiRequest("getCountries", data);
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

export const getUserWebsiteDetails = () =>
  apiRequest("getUserWebsiteDetails");

export const blockAndUnblock = (id, data) =>
  apiRequest("blockAndUnblock", data, id);

//VijayaLakshmi
const getPromotionsTypes = () => {
  return apiRequest("getPromotionsTypes");
};

const getPromotionsImage = () => {
  return apiRequest("getPromotionsImage");
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
export const getBroadCasting = () => {
  return apiRequest("getBroadCasting");
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
const addWebsiteToPrivacyPolicy = (id, data) => {
  return apiRequest("addWebsiteToPrivacyPolicy", data, id);
};
const getManagementPaymentDetails = (data) => {
  return apiRequest("getManagementPaymentDetails", data);
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
  return apiRequest("getManagementOfflinePaymentModes",{}, params);
};
const suspenManagementOfflinePaymentModes = (id, status) => {
  return apiRequest("suspenManagementOfflinePaymentModes", id, { id,status });
};
const getManagementOfflinePaymentModeById = (id, data) => {
  return apiRequest("getManagementOfflinePaymentModeById", data, id);
};
const updateManagementOfflinePaymentDetails=(id,data)=>{
  return apiRequest("updateManagementOfflinePaymentDetails",data,id);
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
export {
  loginUser,
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
  DirectorUpLinePaymentDetails,
};
