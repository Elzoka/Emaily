const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send({hi: 'There'});
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server is up on port ${PORT}`);
});