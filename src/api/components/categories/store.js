const Model = require('../../../db/models/category');
const boom = require('@hapi/boom');


const getCatStats = async () => {
    const data = await Model.find().select('category times -_id');
    return data;
}

const addCatStat = async (filter) => {
    return await Model.find(filter);
}

const saveCategory = async (cat) => {
    try {
        const newCat = new Model(cat);
        return await newCat.save();
    } catch (error) {
        if (error) {
            const code = error.message.split(" ")[0];
            if(code === "E11000") throw boom.badData(`${cat.category} already exists`);
        } else {
            throw error
        }
    }
}

const updateStat = async (filter, update) => {
    const updated = await Model.updateOne(filter, update);
    return updated;
}

module.exports = {
    saveCategory,
    addCatStat,
    updateStat,
    getCatStats
}