// rolePermissions.js
const rolePermissions = {
  admin: [
    "view_data",
    "analyze_data",
    "upload_files",
    "edit_articles",
    "delete_users",
  ],
  user: ["view_data", "analyze_data"],
  guest: ["view_data"],
};

module.exports = rolePermissions;
// auth.js
const rolePermissions = require("./rolePermissions");

function isAuthorized(role, action) {
  const permissions = rolePermissions[role];
  if (!permissions) return false;
  return permissions.includes(action);
}

// Example usage:
console.log(isAuthorized("admin", "upload_files"));  // true
console.log(isAuthorized("user", "delete_users"));   // false
console.log(isAuthorized("guest", "view_data"));     // true
// middleware/authorize.js
const rolePermissionsMiddleware = require("../rolePermissions");

function authorize(action) {
  return function (req, res, next) {
    const role = req.user?.role; // Assume req.user is set by auth middleware

    if (!role || !rolePermissionsMiddleware[role]) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (!rolePermissionsMiddleware[role].includes(action)) {
      return res.status(403).json({ message: "Insufficient permissions." });
    }

    next();
  };
}

module.exports = authorize;
const express = require("express");
const authorize = require("./middleware/authorize");

const router = express.Router();

router.post("/upload", authorize("upload_files"), (req, res) => {
  // Handle file upload
});

router.delete("/user/:id", authorize("delete_users"), (req, res) => {
  // Handle user deletion
});
