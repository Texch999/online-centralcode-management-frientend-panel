const endpoints = {
  loginUser: { method: "post", url: "/login" },
  createSecurityQuestions:{method:"post",url:"/secQuestion/"},
  getAllSecurityQuestions:{method:"get",url:"/secQuestion/"},
  updateSecurityQuestions :{method:"put",url:"/secQuestion/:id"}
};

export default endpoints;
