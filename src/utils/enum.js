const Roles = Object.freeze({
  1: "owner",
  2: "management",
  3: "accounts",
  4: "promotion",
  5: "digital marketing",
  6: "risk management",
});

const adminRoles = Object.freeze({
  1: "director",
  2: "SuperAdmin",
});
const directorDwnlns = Object.freeze({
  1: "Super Admin",
});
const commissionTypes = Object.freeze({
  1: "Rent",
  2: "Share",
  3: "Royalty",
});
// Correct way to export both objects
module.exports = { Roles, adminRoles, directorDwnlns };
