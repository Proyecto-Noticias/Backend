const store = require('./store');
const boom = require('@hapi/boom');
const Axios = require('axios');
const { URL_SCRAPPER } = process.env;


const updateCats = async () => {
    const response = await Axios.get(URL_SCRAPPER + "categories/");
    const array = response.data;
    let final = array.map(el => {
        return {category: el.name}
    });
    const data = await store.updateCats(final);
    return data;
}

const addCatConsumed = async (category) => {
    let filter = {
        category
    };
    try {
        const catStat = await store.addCatStat(filter);
        catStat[0].times++;
        const updated = await store.updateStat({_id: catStat[0]._id}, catStat[0]);
        if(!updated) {
            throw boom.badData("Not Updated");
        }
    } catch (error) {
        return error
    }
}

const addCategory = async (category, userAuth) => {
    if(!userAuth.isAdmin) throw boom.unauthorized("Must be an admin to add a new category!");

    const newCategory = {
        category
    }
    const catAdded = await store.saveCategory(newCategory);
    return catAdded;
}

const getCatStats = async () => {
    const data = await store.getCatStats();
    return data;
}

module.exports = {
    addCatConsumed,
    addCategory,
    getCatStats,
    updateCats
}