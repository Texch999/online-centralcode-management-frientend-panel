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
const getDirectorAccountDetails = (data) => {
  return apiRequest("getDirectorAccountDetails");
};

const postDirectorAccountDetails = (data) => {
  return apiRequest("postDirectorAccountDetails", data);
}

const getCountries = (data) => {
  return apiRequest("getCountries", data);
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
  getDirectorAccountDetails,
  getCountries,
  postDirectorAccountDetails
};
