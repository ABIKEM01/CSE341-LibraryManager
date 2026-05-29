/**
 * isAuthenticated
 * Middleware that protects routes — only allows access if the user
 * has an active session (i.e. they logged in via GitHub OAuth).
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    message: 'Unauthorized. Please log in at /auth/github to access this route.'
  });
};

module.exports = { isAuthenticated };