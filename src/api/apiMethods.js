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
const getAllRejectionReasons = (data) => {
  return apiRequest("getAllRejectionReasons", data);
};
const createRejReasons=(data)=>{
  return apiRequest("createRejReasons",data);
};
const updateRejReasons=(id,data)=>{
  return apiRequest("updateRejReasons", data,id);
};
const getSecQusetionsById=(id,data)=>{
  return apiRequest("getSecQusetionsById", data, id);
};
const getRejReasonsById=(id,data)=>{
  return apiRequest("getRejReasonsById", data, id);
};
const getSecQuestionsPagination = (page = 1, pageSize = 10) => {
  return apiRequest("getSecQuestionsPagination", null, null, {
    page: page,
    pageSize: pageSize,
    status: 1, 
  });
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
  getSecQuestionsPagination,
};
