const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const {
    cookieKey
} = require('./config/keys');
const {
    mongoURI
} = require('./config/keys');

mongoose.connect(mongoURI, {
    useNewUrlParser: true
});
const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

// Services
require('./services');

app.use(express.json());

// Routes
require('./routes')(app);

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server is up on port ${PORT}`);
});