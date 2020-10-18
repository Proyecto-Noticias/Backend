const Model = require("../../../db/models/new");

const getAllNews = async () => {
    const news = await Model.find({});
    return news;
}

const createNews = async (newToAdd) => {
    const myNew = new Model(newToAdd);
    return await myNew.save();
}

const deleteNew = async (id) => {
    const removed = await Model.findByIdAndDelete({_id:id});
    return removed;
}

module.exports = {
    getAllNews,
    createNews,
    deleteNew
};