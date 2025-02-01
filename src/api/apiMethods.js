import apiRequest from "./apiRequest";

const loginUser = (data) => {
  return apiRequest("loginUser", data);
};
const loginDirector = (data) => {
  return apiRequest("loginDirector", data);
};
const addManagemnentTeam = (data) => {
  return apiRequest("addManagemnentTeam", data);
};
const createDirector = (data) => {
  return apiRequest("createDirector", data);
};
const getRoles = (data) => {
  return apiRequest("getRoles", data);
};
const getCountries = (data) => {
  return apiRequest("getCountries", data);
};
const getAdminWebsites = (data) => {
  return apiRequest("getAdminWebsites", data);
};
const getUserWebsites = (data) => {
  return apiRequest("getUserWebsites", data);
};
// const getEmployees = (data) => {
//   return apiRequest("getEmployees", data);
// };
// const getEmployees = ({ limit = 10, offset = 0 }) => {
//   return apiRequest("getEmployees", null, { limit, offset });
// };
// const getEmployees = (params) => {
//   return apiRequest("getEmployees", {}, params);
// };
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
const deletePromotionsImages = (id) => {
  return apiRequest("deletePromotionsImages", id);
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
export {
  loginUser,
  addManagemnentTeam,
  getRoles,
  getEmployees,
  getPromotionsTypes,
  getPromotionsImage,
  createPromotionImages,
  statusPromotionsTypes,
  deletePromotionsImages,
  resetEmployeePassword,
  blockEmploye,
  updateEmployeeByID,
  getEmployeeDetailsById,
  getDirectors,
  loginDirector,
  createDirector,
  getCountries,
  getAdminWebsites,
  getUserWebsites,
  blockDirector,
  resetDirectorPassword,
};
