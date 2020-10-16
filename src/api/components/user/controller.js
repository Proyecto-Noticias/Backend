const bcrypt = require('bcrypt');
const userStorage = require('./store');
const tokenEmail = require('../token/controller');
const emailHandler = require('../../auth/sendEmailVerify');


const addUser = async (firstName, lastName, email, password, host) => {
    if(!firstName || !lastName || !email || !password) {
        throw new Error('Missing Data');
    }
    const emailExists = await userStorage.getUserByFilter({ email });
    if(emailExists.length >= 1) {
        throw new Error('Email in use');
    } else {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, async(err, hashed) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(hashed);
                }
            })
        })
        const user = {
            firstName,
            lastName, 
            email,
            password: hashedPassword
        }
        try {
            const newUser =  await userStorage.saveUser(user);
            const finalToken = await tokenEmail.createToken(newUser._id);
            emailHandler.sendEmail(user.firstName, user.email, finalToken.token, host);
        } catch (error) {
            throw new Error('Error');
        }
    }
}


module.exports = {
    addUser
}