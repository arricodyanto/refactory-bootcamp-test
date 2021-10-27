const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    // done(null, user.id);
    done(null, user);
});

// passport.deserializeUser(function(id, done) {
passport.deserializeUser(function(user, done) {

    done(null, user);

    // using db
    // User.findById(id, function(err, user) {
    //     done(err, user);
    // });
});

passport.use(new GoogleStrategy({
        clientID: "1070678802060-4mpghitb9cvns0duanp4jp2g69a9mqgk.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {

        return done(null, user);

        // using db
        // User.findOrCreate({ googleId: profile.id }, function(err, user) {
        //     return done(err, user);
        // });
    }
));