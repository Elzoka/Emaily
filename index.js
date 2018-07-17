const express = require('express');

const app = express();

// Services
require('./services');

// Routes
require('./routes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server is up on port ${PORT}`);
});