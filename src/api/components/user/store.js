const Model = require('../../../db/models/user');

const saveUser = async (newUser) => {
    const myUser = new Model(newUser)
    try {
        return await myUser.save();
    } catch (error) {
        throw new Error(error)
    }
}

const getUserByFilter = async (filter) => {
    const data = await Model.find(filter)
    return data
}


module.exports = {
    saveUser,
    getUserByFilter
}