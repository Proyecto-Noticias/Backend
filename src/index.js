const express = require('express');
const app = express();
const morgan = require('morgan');
require("./db");
const { logErrors, errorHandler } = require('./utils/middlewares/errorHandlers');
const router = require('./api/routes/routes.js')

//  Server config
const { config } = require('./config/config');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

//  routes  
router(app);


//  Error handlers
    //  404
app.use((req, res, next) => { //eslint-disable-line
    let error = new Error('Page not found');
    res.status(404);
    res.json({
        error: {
            Message: error.message
        }
    })
});
app.use(logErrors);
app.use(errorHandler);



app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});