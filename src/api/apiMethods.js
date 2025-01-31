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
const getWebsitesList = (params) => {
  return apiRequest("getWebsitesList", {}, params);
};
const getAllCountires = (data) => {
  return apiRequest("getAllCountires", data);
};
const createWebsite = (data) => {
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
const statusPromotionsTypes = (id,data) => {
  return apiRequest("statusPromotionsTypes",data,id);
};
const deletePromotionsImages = (id, data) => {
  return apiRequest("deletePromotionsImages",data,id);
};
const getBroadCasting = () => {
  return apiRequest("getBroadCasting");
};
const createBroadCasting = (data) => {
  return apiRequest("createBroadCasting", data);
};
const editBroadCasting = (id,data) => {
  return apiRequest("editBroadCasting",data,id);
};
const statusBroadCasting = (id, data) => {
  return apiRequest("deletePromotionsImages",data,id);
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
  getWebsitesList,
  getAllCountires,
  createWebsite,
  updateWebsite,
  getWebsiteDetails,
  blockAndUnblock
  getBroadCasting,
  createBroadCasting,
  editBroadCasting,
  statusBroadCasting
};
