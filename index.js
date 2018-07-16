const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const {googleClientID, googleClientSecret} = require("./config/keys");

const app = express();

passport.use(
    new GoogleStrategy({
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: "/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        console.log("access token", accessToken);
        console.log("refresh token", refreshToken);
        console.log("profile", profile);
    })
);

app.get('/', (req, res) => {
    res.send({hi: 'There'});
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server is up on port ${PORT}`);
});