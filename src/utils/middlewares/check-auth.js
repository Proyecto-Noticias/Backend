require('dotenv').config();
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');


module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        let finalToken;
        if(token){
            finalToken = token.split(" ")[1]
        }else {
            throw boom.proxyAuthRequired('Bearer token required 🐻🐻🐻');
        }
        const decoded = jwt.verify(finalToken, process.env.TOKEN_PHRS_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        if(error)throw error;
    }
}