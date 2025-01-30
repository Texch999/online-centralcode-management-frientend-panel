import apiRequest from "./apiRequest";

const loginUser = (data) => {
  return apiRequest("loginUser", data);
};
const addManagemnentTeam = (data) => {
  return apiRequest("addManagemnentTeam", data);
};
const getRoles = (data) => {
  return apiRequest("getRoles", data);
};
const getEmployees = (data) => {
  return apiRequest("getEmployees", data);
};
const resetEmployeePassword = (id, data) => {
  return apiRequest("resetEmployeePassword", data, id);
};
const blockEmploye = (id, data) => {
  return apiRequest("blockEmploye", data, id);
};

const updateEmployeeByID = (id, data) => {
  return apiRequest("updateEmployeeByID", data, id);
};
const getEmployeeDetailsById = (id) => {
  return apiRequest("getEmployeeDetailsById", null, id);
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
};
