const express = require('express');
const app = express();
const morgan = require('morgan');
require("./db");
const { logErrors, errorHandler, wrapError } = require('./utils/middlewares/errorHandlers');
const router = require('./api/routes/routes.js');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

//  Server config
const { config } = require('./config/config');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

//  routes  
router(app);
//  Catch 404
app.use(notFoundHandler);

//  Error handlers
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);



app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});