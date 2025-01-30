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
  getSecQuestionsPagination: {
    method: "get",
    url: (queryParams) =>
      `/secQuestion/?page=${queryParams.page}&pageSize=${queryParams.pageSize}`,
  },
};

export default endpoints;
