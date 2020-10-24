const { config } = require('../../config/config');
const boom = require('@hapi/boom');

function withErrorStack(err, stack){
    if (config.dev) {
        return {...err, stack}
    }
    return err
}

function logErrors (err, req, res, next) {
    console.error(err.message);
    next(err);
}

function wrapError (err, req, res, next){
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }

    next(err);
}

function errorHandler (err, req, res, next) {   //eslint-disable-line
    const { output: { statusCode, payload } } = err

    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    errorHandler,
    wrapError
}