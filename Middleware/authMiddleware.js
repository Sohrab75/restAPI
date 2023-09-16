exports.requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); // User is an admin, proceed
    } else {
      res.status(403).json({ message: 'Access denied' }); // User is not an admin
    }
  };
  