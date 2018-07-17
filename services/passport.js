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
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({
            googleId: profile.id
        }).then(user => {
            if (user) {
                done(null, user);
            } else {
                User.create({
                    googleId: profile.id
                }).then(newUser => {
                    done(null, newUser);
                })
            }
        })
    })
);