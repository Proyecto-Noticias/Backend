const Model = require('../../../db/models/token')

const createToken = async (newToken) => {
    const myToken = new Model(newToken);
    try {
        return await myToken.save()
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createToken
}