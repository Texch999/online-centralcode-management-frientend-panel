const endpoints = {
  loginUser: { method: "post", url: "/login" },
  createSecurityQuestions:{method:"post",url:"/secQuestion/"},
  getAllSecurityQuestions:{method:"get",url:"/secQuestion/"},
  updateSecurityQuestions :{method:"put",url:"/secQuestion/:id"},
  addManagemnentTeam: { method: "post", url: "/employee" },
  getRoles: { method: "get", url: "/rolesList" },
  getEmployees: { method: "get", url: "/employees" },
};

export default endpoints;
