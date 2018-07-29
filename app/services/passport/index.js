const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../../models/user');

const serializedProfile = (profile) => {
  return {
    googleId: profile.id,
    displayName: profile.displayName,
    name: profile.name,
    photos: profile.photos,
    accessToken,
    refreshToken
  };
};

module.exports = (app) => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, cb) => {
      let user = null;
      try {
        user = await User.findOne( { googleId: profile.id });

        if(user) return cb(null, user);

        user = await User.create(serializedProfile(profile));

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { successReturnToOrRedirect: '/dashboard', failureRedirect: '/login' }),
    (req, res) => {

      res.redirect('/');
    });
};
