const userID = localStorage.getItem("user_id");

const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  loginDirector: { method: "post", url: "/director/login" },

  addManagemnentTeam: { method: "post", url: `/user/${userID}/employee` },
  addDirectorTeam: { method: "post", url: `/user/${userID}/directorEmployee` },

  createDirector: { method: "post", url: `/user/${userID}/create` },

  getRoles: { method: "get", url: `/user/${userID}/rolesList` },
  getCountries: { method: "get", url: `/user/${userID}/countries` },
  getAdminWebsites: {
    method: "get",
    url: `/user/${userID}/website/adminWebsites`,
  },
  getUserWebsites: {
    method: "get",
    url: `/user/${userID}/website/userWebsites`,
  },

  getEmployees: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/employees?${query}`;
    },
  },
  getDirectors: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/directors?${query}`;
    },
  },
  getDirectorEmployees:{
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${userID}/directorEmployees?${query}`;
    },
  },
  resetEmployeePassword: {
    method: "post",
    url: (id) => `/user/${userID}/employeeUpdatePassword/${id}`,
  },
  resetDirectorPassword: {
    method: "post",
    url: (id) => `/user/${userID}/directorUpdatePassword/${id}`,
  },
  blockEmploye: {
    method: "post",
    url: (id) => `/user/${userID}/employeeBlockUnblock/${id}`,
  },
  blockDirector: {
    method: "post",
    url: (id) => `/user/${userID}/directorBlockUnblock/${id}`,
  },

  updateEmployeeByID: {
    method: "post",
    url: (id) => `/user/${userID}/employee/${id}`,
  },
  updateDirectorByID: {
    method: "post",
    url: (id) => `/user/${userID}/updateDirector/${id}`,
  },
  getEmployeeDetailsById: {
    method: "get",
    url: (id) => `/user/${userID}/employee/${id}`,
  },
  getDirectorDetailsById: {
    method: "get",
    url: (id) => `/user/${userID}/director/${id}`,
  },
};

export default endpoints;
