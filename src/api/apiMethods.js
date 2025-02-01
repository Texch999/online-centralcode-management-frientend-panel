import apiRequest from "./apiRequest";

const loginUser = (data) => {
  return apiRequest("loginUser", data);
};
// security Questions
const createSecurityQuestions = (data) => {
  return apiRequest("createSecurityQuestions", data);
};
const getAllSecurityQuestions = (data) => {
  return apiRequest("getAllSecurityQuestions", data);
};
const updateSecurityQuestions = (id, data) => {
  return apiRequest("updateSecurityQuestions", data, id);
};
const getSecQusetionsById = (id, data) => {
  return apiRequest("getSecQusetionsById", data, id);
};

// manage team
const addManagemnentTeam = (data) => {
  return apiRequest("addManagemnentTeam", data);
};
const getRoles = (data) => {
  return apiRequest("getRoles", data);
};
const getEmployees = (data) => {
  return apiRequest("getEmployees", data);
};

// rejection reasons
const getAllRejectionReasons = (data) => {
  return apiRequest("getAllRejectionReasons", data);
};
const createRejReasons = (data) => {
  return apiRequest("createRejReasons", data);
};
const updateRejReasons = (id, data) => {
  return apiRequest("updateRejReasons", data, id);
};
const getRejReasonsById = (id, data) => {
  return apiRequest("getRejReasonsById", data, id);
};
//priavacy policy
const getPrivacyPolicy = (data) => {
  return apiRequest("getPrivacyPolicy", data);
};
const getPrivacyPolicyById = (id, data) => {
  return apiRequest("getPrivacyPolicyById", data, id);
};
const getCountries = (data) => {
  return apiRequest("getCountries", data);
};
const getWebsites = (data) => {
  return apiRequest("getWebsites", data);
};
const createPrivacyPolicy = (data) => {
  return apiRequest("createPrivacyPolicy", data);
};
const updatePrivacyPolicyById = (id, data) => {
  return apiRequest("updatePrivacyPolicyById", data, id);
};
// const createPaymentGateway = (data) => {
//   return apiRequest("createPaymentGateway", data);
// };
// const getPaymentGateways = (data) => {
//   return apiRequest("getPaymentGateways", data);
// };
const privacyPolicyStatusUpdate = (id,status) => {
  return apiRequest("privacyPolicyStatusUpdate", id, {status,id});
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
  getPrivacyPolicy,
  getCountries,
  getWebsites,
  getPrivacyPolicyById,
  createPrivacyPolicy,
  // createPaymentGateway,
  // getPaymentGateways,
  updatePrivacyPolicyById,
  privacyPolicyStatusUpdate,
};
