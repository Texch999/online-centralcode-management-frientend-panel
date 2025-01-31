const UserId = localStorage.getItem("user_id");
const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  addManagemnentTeam: { method: "post", url: "/employee" },
  getRoles: { method: "get", url: "/rolesList" },
  getEmployees: { method: "get", url: "/employees" },

  getPromotionsTypes: {
    method: "get",
    url: `/user/${UserId}/api/getPromotionsTypes`,
  },
  getPromotionsImage: {
    method: "get",
    url: `/user/${UserId}/api/getPromotionsImages`,
  },
  createPromotionImages: {
    method: "post",
    url: `/user/${UserId}/api/createPromotionImages`,
  },
  statusPromotionsTypes: {
    method: "put",
    url: (id) => `/user/${UserId}/api/statusPromotionsTypes/${id}`,
  },
  deletePromotionsImages: {
    method: "delete",
    url: (id) => `/user/${UserId}/api/deletePromotionsImages/${id}`,
  },
  getBroadCasting: {
    method: "get",
    url: `/user/${UserId}/broadcasting`
  },
  createBroadCasting: {
    method: "post",
    url: `/user/${UserId}/broadcasting`
  },
  editBroadCasting: {
    method: "post",
    url: (id) => `/user/${UserId}/broadcasting/${id}`
  },
  statusBroadCasting: {
    method: "post",
    url: (id) => `/user/${UserId}/broadcasting/${id}`
  }
};

export default endpoints;
