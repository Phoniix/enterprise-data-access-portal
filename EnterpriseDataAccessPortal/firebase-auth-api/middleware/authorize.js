const rolePermissions = require("../utils/permissions");

function authorize(action) {
  return function (req, res, next) {
    const user = req.user;

    if (!user || !user.role) {
      return res.status(403).json({ error: "Access denied. No user role found." });
    }

    const allowedActions = rolePermissions[user.role];

    if (!allowedActions || !allowedActions.includes(action)) {
      return res.status(403).json({ error: "Insufficient permissions." });
    }

    next();
  };
}

module.exports = authorize;

