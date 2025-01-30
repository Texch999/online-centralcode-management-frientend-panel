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

export {
  loginUser, addManagemnentTeam, getRoles,
  getEmployees, getWebsitesList, getAllCountires,
  createWebsite
};
