const endpoints = {
  loginUser: { method: "post", url: "/login" },
  createSecurityQuestions: { method: "post", url: "/secQuestion/" },
  getAllSecurityQuestions: { method: "get", url: "/secQuestion/" },
  getSecQusetionsById: { method: "get", url: (id) => `/secQuestion/${id}` },
  updateSecurityQuestions: { method: "put", url: (id) => `/secQuestion/${id}` },
  addManagemnentTeam: { method: "post", url: "/employee" },
  getRoles: { method: "get", url: "/rolesList" },
  getEmployees: { method: "get", url: "/employees" },
  getAllRejectionReasons: { method: "get", url: "/rejectionReasons/" },
  createRejReasons: { method: "post", url: "/rejectionReasons/" },
  updateRejReasons: { method: "put", url: (id) => `/rejectionReasons/${id}` },
  getRejReasonsById: { method: "get", url: (id) => `/rejectionReasons/${id}` },
  getSecQuestionsPagination: {
    method: "get",
    url: (queryParams) =>
      `/secQuestion/?page=${queryParams.page}&pageSize=${queryParams.pageSize}`,
  },
};

export default endpoints;
