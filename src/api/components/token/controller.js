const crypto = require('crypto');
const tokenStore = require('./store');
const jwt = require('../../auth/jwt');
const boom = require('@hapi/boom');


const createToken = async (id) => {
    const hash = await crypto.randomBytes(64).toString('hex');
    let token = {
        userId: id,
        token: hash 
    }
    try {
        const finalToken = await tokenStore.createToken(token);
        return finalToken;
    } catch (error) {
        throw new Error(error);
    }
}

const renewJwt = async (auth) => {
    try {
        const token = await jwt.createToken(auth);
        return token;
    } catch (error) {
        throw boom.conflict('Error refreshing your JWT.', error);
    }
    
}


module.exports = {
    createToken,
    renewJwt
}