const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

app.get('/', (req, res) => {
    res.send({hi: 'There'});
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server is up on port ${PORT}`);
});