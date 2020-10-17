const Model = require('../../../db/models/user');

const saveUser = async (newUser) => {
    const myUser = new Model(newUser)
        return await myUser.save();
}

const getUserByFilter = async (filter) => {
    const data = await Model.find(filter)
    return data
}

const getById = async (id) => {
    const user = await Model.findById(id);
    return user
}

const findOneUser = async (filter) => {
    const data = await Model.findOne(filter)
    return data
}

module.exports = {
    saveUser,
    getUserByFilter,
    getUserById: getById,
    findOneUser
}