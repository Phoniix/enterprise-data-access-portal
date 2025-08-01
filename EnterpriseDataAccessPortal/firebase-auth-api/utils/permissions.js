const rolePermissions = {
  admin: ["view_data", "analyze_data", "upload_files", "edit_articles", "delete_users"],
  user: ["view_data", "analyze_data"],
  guest: ["view_data"],
};

module.exports = rolePermissions;
