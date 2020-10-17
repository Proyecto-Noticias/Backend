const crypto = require('crypto');
const tokenStore = require('./store')

const createToken = async (id) => {
    const hash = await crypto.randomBytes(64).toString('hex')
    let token = {
        userId: id,
        token: hash 
    }
    try {
        const finalToken = await tokenStore.createToken(token)
        return finalToken;
    } catch (error) {
        throw new Error(error)
    }
    
}


module.exports = {
    createToken
}