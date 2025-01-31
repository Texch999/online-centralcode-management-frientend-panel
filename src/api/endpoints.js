const UserId = localStorage.getItem("user_id");
const endpoints = {
  loginUser: { method: "post", url: "/master/login" },
  addManagemnentTeam: { method: "post", url: "/employee" },
  getRoles: { method: "get", url: "/rolesList" },
  getEmployees: { method: "get", url: "/employees" },
  createWebsite: { method: "post", url: `/user/${UserId}/website/website` },
  updateWebsite: {
    method: "put",
    url: (id) => `/user/${UserId}/website/update/websiteby/${id}`,
  },
  getWebsiteDetails: {
    method: "get",
    url: (id) => `/user/${UserId}/website/websiteby/${id}`,
  },
  getWebsitesList: {
    method: "get",
    url: (params) => {
      const query = new URLSearchParams(params).toString();
      return `/user/${UserId}/website/websites?${query}`;
    },
  },
  getAllCountires: { method: "get", url: `/user/${UserId}/countries` },
  blockAndUnblock: {
    method: "put",
    url: (id) => `/user/${UserId}/website/block-unblock/${id}`,
  },
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
