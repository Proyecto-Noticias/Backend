const express = require('express');
const app = express();
const morgan = require('morgan')

const router = require('./api/routes/routes.js')

//  Server config
const { config } = require('./config/config');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

//  routes  
router(app);


app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});