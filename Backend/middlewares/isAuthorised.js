const isAdmin = (req, res, next) => {
  if (req.userSchema.role.toLowerCase() === "admin") {
    return next();
  }
  if (req.userSchema._id === req.params.id) {
    return next();
  }

  return res.status(403).json({ message: "Access Denied: Admins only!" });
};

module.exports = { isAdmin };


