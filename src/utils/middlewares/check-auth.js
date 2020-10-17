require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.TOKEN_PHRS_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        if(!error.status) error.status = 401;
        throw error
    }
}