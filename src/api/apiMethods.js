import { data } from "react-router";
import apiRequest from "./apiRequest";

const loginUser = (data) => {
  return apiRequest("loginUser", data);
};
const createSecurityQuestions = (data) => {
  return apiRequest("createSecurityQuestions", data);
};
const getAllSecurityQuestions = (data) => {
  return apiRequest("getAllSecurityQuestions", data);
};
const updateSecurityQuestions = (id, data) => {
  return apiRequest("updateSecurityQuestions", data, id);
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

export {
  loginUser,
  createSecurityQuestions,
  getAllSecurityQuestions,
  updateSecurityQuestions,
  loginUser,
  addManagemnentTeam,
  getRoles,
  getEmployees,
};
