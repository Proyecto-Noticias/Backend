const newStore = require("./store");
//  const boom = require('@hapi/boom');

const getAllNews = async () => {
    const news = await newStore.getAllNews();
    return news;
}

module.exports = {
    getAllNews
}