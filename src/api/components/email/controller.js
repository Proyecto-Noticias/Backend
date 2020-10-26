const store = require('./store');
const userStorage = require('../user/store');
const tokenController = require('../token/controller');
const emailHandler = require('../../auth/sendEmailVerify');
const boom = require('@hapi/boom');

const verifyToken = async (token) => {
    const myToken = await store.getToken({token: token});

    if (myToken.length < 1) {
        throw boom.notFound('Were unable to find a valid token. Your token may been expired.');
    }

    const user = await store.getUser({_id: myToken[0].userId})
    if(user < 1){
        throw boom.notFound('We are unable to find a user to that token');
    }
    if(user.isVerified) {
        throw boom.badData('User already verified');
    } else {
        user.isVerified = true;
        const verifiedUser = await userStorage.saveUser(user);
        return verifiedUser;
    }
    
}

const resendEmail = async (email, host) => {
    const user = await userStorage.findOneUser({email:email});
    if(!user) {
        throw boom.badData('User doesnt exists');
    } else if (user.isVerified) {
        throw boom.badData('User already verified');
    } else {
        const finalToken = await tokenController.createToken(user._id);
        emailHandler.sendEmail(user.firstName, user.email, finalToken.token, host)
    }
}

module.exports = {
    verifyToken,
    resendEmail
}