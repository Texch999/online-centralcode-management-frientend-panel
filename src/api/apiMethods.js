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
const getDirectorDetailsById = (id) => {
  return apiRequest("getDirectorDetailsById", null, id);
};

const getDirectorEmployees = (params) => {
  return apiRequest("getDirectorEmployees", {}, params);
};
export {
  loginUser,
  addManagemnentTeam,
  getRoles,
  getEmployees,
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
  getDirectorDetailsById,
  getDirectorEmployees,
};
