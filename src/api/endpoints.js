const Login_User_Id = localStorage.getItem("user_id");
const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  //security questions
  createSecurityQuestions: {
    method: "post",
    url: `user/${Login_User_Id}/secQuestion`,
  },
  getAllSecurityQuestions: {
    method: "get",
    url: `user/${Login_User_Id}/secQuestion/`,
  },
  getSecQusetionsById: {
    method: "get",
    url: (id) => `user/${Login_User_Id}/secQuestion/${id}`,
  },
  updateSecurityQuestions: {
    method: "put",
    url: (id) => `user/${Login_User_Id}/secQuestion/${id}`,
  },
  //employee management
  addManagemnentTeam: { method: "post", url: "/employee" },
  getRoles: { method: "get", url: "/rolesList" },
  getEmployees: { method: "get", url: "/employees" },
  //rejection reasons
  getAllRejectionReasons: {
    method: "get",
    url: `user/${Login_User_Id}/rejectionReasons/`,
  },
  createRejReasons: {
    method: "post",
    url: `user/${Login_User_Id}/rejectionReasons/`,
  },
  updateRejReasons: {
    method: "put",
    url: (id) => `user/${Login_User_Id}/rejectionReasons/${id}`,
  },
  getRejReasonsById: {
    method: "get",
    url: (id) => `user/${Login_User_Id}/rejectionReasons/${id}`,
  },

  // privacy policy
  getPrivacyPolicy: {
    method: "get",
    url: `user/${Login_User_Id}/privacypolicies/`,
  },
  getPrivacyPolicyById: {
    method: "get",
    url:(id)=> `user/${Login_User_Id}/privacypolicies/${id}`,
  },
  createPrivacyPolicy: {
    method: "post",
    url: `user/${Login_User_Id}/privacypolicies/`,
  },
  updatePrivacyPolicyById: {
    method: "put",
    url:(id)=> `user/${Login_User_Id}/privacypolicies/${id}`,
  },
  getCountries:{method:"get",url:`user/${Login_User_Id}/countries/countries`},
  getWebsites:{method:"get",url:`user/${Login_User_Id}/website/websites`},
};

export default endpoints;
