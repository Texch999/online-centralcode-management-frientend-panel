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

const directorEmployees = Object.freeze({
  1: "Accounts",
  2: "Risk management",
  3: "Designing team (Promotion)",
});

// Correct way to export both objects
module.exports = { Roles, adminRoles, directorEmployees };
