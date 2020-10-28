const bcrypt = require('bcrypt');
const userStorage = require('./store');
const tokenEmail = require('../token/controller');
const emailHandler = require('../../auth/sendEmailVerify');
const jwt = require('../../auth/jwt');
const boom = require('@hapi/boom');


const getEveryUser = async () => {
    return userStorage.getUserByFilter({});
}

const getOneUser = async (id) => {
    return userStorage.getUserById(id);
}

const addUser = async (_id, firstName, lastName, country, email, password, host, isVerified) => {
    if (!firstName || !lastName || !email || !password || !country) {
        throw boom.badData('Missing data');
    }
    const emailExists = await userStorage.getUserByFilter({ email });
    if (emailExists.length >= 1) {
        throw boom.conflict('Email already in use 😪😪😪');
    } else {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, async (err, hashed) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hashed);
                }
            })
        })
        const user = {
            _id,
            firstName,
            lastName,
            country,
            email,
            password: hashedPassword,
            isVerified
        }
        try {
            const newUser = await userStorage.saveUser(user);
            const finalToken = await tokenEmail.createToken(newUser._id);
            emailHandler.sendEmail(user.firstName, user.email, finalToken.token, host);
        } catch (error) {
            console.log(error.message)
            throw boom.internal('Error creating user 💔🙏🏾🙏🏾🙏🏾');
        }
    }
}

const login = async (email, password) => {
    if (!email || !password) {
        throw boom.badRequest('Email & password needed');
    }
    const user = await userStorage.findOneUser({ email });
    if (!user) {
        throw boom.notFound("that user doesnt exists!");
    }
    if (user.isVerified) {
        const result = await bcrypt.compare(password, user.password);

        if (result) {
            const authToken = jwt.createToken(user);
            const finalResponse = {
                id: user._id,
                name: user.firstName,
                isAdmin: user.isAdmin,
                country: user.country,
                token: authToken
            }
            return finalResponse;
        } else {
            throw boom.unauthorized("Email or password wrong");
        }
    } else {
        throw boom.unauthorized('You must verify your account first.');
    }
}

const deleteUser = async (id, jwtUser) => {
    if (id !== jwtUser.id && !jwtUser.isAdmin) {
        throw boom.unauthorized('you dont have permissions to do that action 😔🙏');
    }

    await userStorage.deleteOneUser({ _id: id });
}

const editUser = async (id, name, last, email, password, isAdmin, jwtUser) => {

    if (id !== jwtUser.id && !jwtUser.isAdmin) {
        throw boom.unauthorized('you dont have permissions to do that action');
    }
    if (!id) {
        throw boom.badRequest('Id is needed!');
    }

    const userSaved = await userStorage.findOneUser({ _id: id })

    let userUpdate = {
        firstName: name || userSaved.firstName,
        lastName: last || userSaved.lastName,
        email: email || userSaved.email,
        password: userSaved.password,
        isAdmin: isAdmin || userSaved.isAdmin
    }

    if (password) {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, async (err, hashed) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hashed);
                }
            })
        })
        userUpdate.password = hashedPassword
    }

    const updated = await userStorage.updateUser({ _id: id }, userUpdate);
    return updated
}

const changeAdmin = async (id, role, authUser) => {
    if (authUser.isAdmin) {
        const user = await userStorage.findOneUser({ _id: id });
        user.isAdmin = role;
        return await userStorage.saveUser(user);
    } else {
        throw boom.unauthorized('You dont have permissions to exec that action!');
    }
}

module.exports = {
    getEveryUser,
    getOneUser,
    signUp: addUser,
    login,
    deleteUser,
    editUser,
    changeAdmin
}