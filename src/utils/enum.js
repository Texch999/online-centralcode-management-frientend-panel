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

const directorEmployees = Object.freeze({
  1: "Accounts",
  2: "Risk management",
  3: "Designing team (Promotion)",
});

module.exports = { Roles, adminRoles, directorEmployees ,directorDwnlns};
