const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

/**
 * GET /auth/github
 * Redirects the user to GitHub to authenticate
 */
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * GET /auth/github/callback
 * GitHub redirects here after the user approves or denies access.
 * On success → redirect to /auth/profile
 * On failure → redirect to /auth/login-failed
 */
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login-failed' }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

/**
 * GET /auth/profile
 * Returns the logged-in user's GitHub profile info (protected).
 */
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Not logged in. Visit /auth/github to log in.'
    });
  }
  res.status(200).json({
    message: 'Logged in successfully',
    user: req.user
  });
});

/**
 * GET /auth/logout
 * Destroys the session and logs the user out.
 */
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.status(200).json({ message: 'Logged out successfully.' });
    });
  });
});

/**
 * GET /auth/login-failed
 * Returned when GitHub OAuth fails.
 */
router.get('/login-failed', (req, res) => {
  res.status(401).json({ message: 'GitHub login failed. Please try again at /auth/github.' });
});

module.exports = router;