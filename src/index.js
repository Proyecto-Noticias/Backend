///// START CODE REVIEW COMMENT

// Excellent code!

///// END CODE REVIEW COMMENT

const express = require('express');
const app = express();
var cors = require('cors');
const helmet = require("helmet");
require("./db");
const { logErrors, errorHandler, wrapError } = require('./utils/middlewares/errorHandlers');
const router = require('./api/routes/routes.js');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

//  Server config
const { config } = require('./config/config');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Middlewares
app.use(cors());
app.use(helmet());



if (config.dev) {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}


//  routes  
router(app);
//  Catch 404
app.use(notFoundHandler);

//  Error handlers
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);


if(!module.parent){
    app.listen(config.port, () => {
        console.log(`Listening http://localhost:${config.port}`);
    });
}

module.exports = app;
