const Model = require('../../../db/models/token');
const ModelUser = require('../../../db/models/user');

const getToken = async (filter) => {
    const data = await Model.find(filter)
    return data
}

const getUser = async (filter) => {
    const user = await ModelUser.findOne(filter)
    return user
}

module.exports = {
    getToken,
    getUser
}