const Model = require('../../../db/models/user');

const saveUser = async (newUser) => {
    const myUser = new Model(newUser)
        return await myUser.save();
}

const getUsersByFilter = async (filter) => {
    const data = await Model.find(filter)
    return data
}

const getById = async (id) => {
    const user = await Model.findById(id);
    return user
}

const findOneUser = async (filter) => {
    const data = await Model.findOne(filter)
    return data;
}

const deleteOneUser = async (filter) => {
    const deleted = await Model.deleteOne(filter);
    return deleted;
}

const updateUser = async (filter, update) => {
    const updated = await Model.findOneAndUpdate(filter, update, {new: true});
    return updated
}

module.exports = {
    saveUser,
    getUserByFilter: getUsersByFilter,
    getUserById: getById,
    findOneUser,
    deleteOneUser,
    updateUser
}