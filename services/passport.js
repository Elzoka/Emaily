const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

const {
    googleClientID,
    googleClientSecret
} = require("../config/keys");

passport.use(
    new GoogleStrategy({
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({
            googleId: profile.id
        });

        if (user) {
            return done(null, user);
        }
        const newUser = await User.create({
            googleId: profile.id
        })
        done(null, newUser);
    })
);