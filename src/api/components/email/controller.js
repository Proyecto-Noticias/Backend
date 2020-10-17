const store = require('./store');
const userStorage = require('../user/store');
const tokenController = require('../token/controller');
const emailHandler = require('../../auth/sendEmailVerify');

const verifyToken = async (token) => {
    const myToken = await store.getToken({token: token});

    if (myToken.length < 1) {
        throw new Error(`Were unable to find a valid token. Your token may been expired.`);
    }

    const user = await store.getUser({_id: myToken[0].userId})
    if(user < 1){
        throw new Error('Were unable to find a user for this token.');
    }
    if(user.isVerified) {
        throw new Error('User already verified');
    } else {
        user.isVerified = true;
        const verifiedUser = await userStorage.saveUser(user)
        return verifiedUser;
    }
    
}

const resendEmail = async (email, host) => {
    const user = await userStorage.findOneUser({email:email});
    if(!user) {
        throw new Error('User doesnt exists');
    } else if (user.isVerified) {
        throw new Error('User already verified');
    } else {
        const finalToken = await tokenController.createToken(user._id);
        emailHandler.sendEmail(user.firstName, user.email, finalToken.token, host)
    }
}

module.exports = {
    verifyToken,
    resendEmail
}