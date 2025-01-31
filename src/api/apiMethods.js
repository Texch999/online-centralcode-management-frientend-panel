import apiRequest from "./apiRequest";

export const loginUser = (data) => {
  return apiRequest("loginUser", data);
};
export const addManagemnentTeam = (data) => {
  return apiRequest("addManagemnentTeam", data);
};
export const getRoles = (data) => {
  return apiRequest("getRoles", data);
};
export const getEmployees = (data) => {
  return apiRequest("getEmployees", data);
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
export const getPromotionsTypes = () => {
  return apiRequest("getPromotionsTypes");
};

export const getPromotionsImage = () => {
  return apiRequest("getPromotionsImage");
};
export const createPromotionImages = (data) => {
  console.log("data", data)
  return apiRequest("createPromotionImages", data);
};
export const statusPromotionsTypes = (id,data) => {
  return apiRequest("statusPromotionsTypes",data,id);
};
export const deletePromotionsImages = (id, data) => {
  return apiRequest("deletePromotionsImages",data,id);
};
export const getBroadCasting = () => {
  return apiRequest("getBroadCasting");
};
export const createBroadCasting = (data) => {
  return apiRequest("createBroadCasting", data);
};
export const editBroadCasting = (id,data) => {
  return apiRequest("editBroadCasting",data,id);
};
export const statusBroadCasting = (id, data) => {
  return apiRequest("statusBroadcastUpdate",data,id);
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
