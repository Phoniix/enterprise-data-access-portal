const rolePermissions = require("../utils/permissions");

function authorize(action) {
  return function (req, res, next) {
    const role = req.user?.role;

    if (!role || !rolePermissions[role]) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (!rolePermissions[role].includes(action)) {
      return res.status(403).json({ message: "Insufficient permissions." });
    }

    next();
  };
}

module.exports = authorize;
