import { data } from "react-router";
import apiRequest from "./apiRequest";

const loginUser = (data) => {
  return apiRequest("loginUser", data);
};
const createSecurityQuestions = (data) => {
  return apiRequest("createSecurityQuestions", data);

};
const getAllSecurityQuestions=(data)=>{
  return apiRequest("getAllSecurityQuestions",data)
};
const updateSecurityQuestions=(id,data)=>{
  return apiRequest("updateSecurityQuestions",data,id);
}

export { loginUser, createSecurityQuestions,getAllSecurityQuestions,updateSecurityQuestions };
