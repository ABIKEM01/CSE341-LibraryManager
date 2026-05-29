const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      // We don't store users in DB — just pass the GitHub profile through the session
      return done(null, profile);
    }
  )
);

// Serialize: store only what we need in the session
passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    username: user.username,
    displayName: user.displayName
  });
});

// Deserialize: attach the user object to req.user on every request
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;