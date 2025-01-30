const userID = localStorage.getItem("user_id");

const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  // addManagemnentTeam: { method: "post", url: "/employee" },
  addManagemnentTeam: { method: "post", url: `/user/${userID}/employee` },

  getRoles: { method: "get", url: `/user/${userID}/rolesList` },
  getEmployees: { method: "get", url: `/user/${userID}/employees` },
  resetEmployeePassword: {
    method: "post",
    url: (id) => `/user/${userID}/employeeUpdatePassword/${id}`,
  },
  blockEmploye: {
    method: "post",
    url: (id) => `/user/${userID}/employeeBlockUnblock/${id}`,
  },

  updateEmployeeByID: {
    method: "post",
    url: (id) => `/user/${userID}/employee/${id}`,
  },
  getEmployeeDetailsById: {
    method: "get",
    url: (id) => `/user/${userID}/employee/${id}`,
  },
};

export default endpoints;
