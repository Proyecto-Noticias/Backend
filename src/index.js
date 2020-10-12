const express = require('express');
const app = express();


const { config } = require('../config/config');

app.get('/', (req, res) => {
    res.json({message: 'Hello world'});
});

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});