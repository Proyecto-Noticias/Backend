const Model = require("../../../db/models/new");

const getAllNews = async () => {
    const news = await Model.find({});
    return news;
}
module.exports = {
    getAllNews
};