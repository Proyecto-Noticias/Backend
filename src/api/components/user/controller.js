const bcrypt = require('bcrypt');
const userStorage = require('./store');
const tokenEmail = require('../token/controller');
const emailHandler = require('../../auth/sendEmailVerify');
const jwt = require('../../auth/jwt');


const addUser = async (firstName, lastName, email, password, host) => {
    if(!firstName || !lastName || !email || !password) {
        const myError = new Error('Missing Data 🐭');
        myError.status = 400;
        throw myError
    }
    const emailExists = await userStorage.getUserByFilter({ email });
    if(emailExists.length >= 1) {
        const myError = new Error('Email already in use 😵');
        myError.status = 409;
        throw myError
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
            const myError = new Error('Error sending email with token');
            myError.status = 500;
            throw myError
        }
    }
}

const login = async (email, password) => {
    if(!email || !password) {
        const error = new Error('Missing Data 👿');
        error.status = 400;
    }
    const user = await userStorage.findOneUser({email});
    if(!user) {
        const myError = new Error('Login failed');
        myError.status = 400;
        throw myError;
    }
    if(user.isVerified) {
        const result = await bcrypt.compare(password, user.password);

        if (result) {
            const authToken = jwt.createToken(user);
            return authToken;
        }
    } else {
        const error = new Error('You must verify your account first! 🚦');
        error.status = 401;
        throw error;
    }
}

const deleteUser = async (id, jwtUser) => {
    if(id !== jwtUser.id && !jwtUser.isAdmin){
        let error = new Error('you dont have permissions😔🙏');
        error.status = 401;
        throw error;
    }

    await userStorage.deleteOneUser({_id: id});
}

const editUser = async (id, name, last, email, password, isAdmin, jwtUser) => {

    if(id !== jwtUser.id && jwtUser.isAdmin === false){
        let error = new Error('you dont have permissions😔🙏');
        error.status = 401;
        throw error;
    }
    if(!id) {
        const err = new Error("User id needed");
        err.status = 401;
        throw err;
    }

    const userSaved = await userStorage.findOneUser({_id: id})

    let userUpdate = {
        firstName: name || userSaved.firstName,
        lastName: last || userSaved.lastName,
        email: email || userSaved.email,
        password: userSaved.password,
        isAdmin: isAdmin || userSaved.isAdmin
    }

    if (password) {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, async(err, hashed) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(hashed);
                }
            })
        })
        userUpdate.password = hashedPassword
    }    

    const updated = await userStorage.updateUser({_id:id}, userUpdate);
    return updated
}

module.exports = {
    signUp: addUser,
    login,
    deleteUser,
    editUser
}