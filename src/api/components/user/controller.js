const bcrypt = require('bcrypt');
const userStorage = require('./store');
const verifyEmail = require('../token/controller')


const addUser = async (firstName, lastName, email, password) => {
    if(!firstName || !lastName || !email || !password) {
        throw new Error('Missing Data');
    }

    const emailExists = await userStorage.getUserByFilter({ email })
    
    if(emailExists.length >= 1) {
        throw new Error('Email in use')
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
        const newUser =  await userStorage.saveUser(user)
        const tokenEmail = await verifyEmail.createToken(newUser._id)
        console.log(tokenEmail)
    }
    
}


module.exports = {
    addUser
}