const newStore = require("./store");
const boom = require('@hapi/boom');

const getAllNews = async () => {
    const news = await newStore.getAllNews();
    return news;
}

const addNew = async (title, subtitle, articleDate, imageUrl, category, body, journal, scrappingDate, sentiment, userData) => {
    if(!userData.isAdmin) throw boom.unauthorized("Sorry! but only admins can create news 😞😔😔😔😞");
    const newspaperArticle = {
        title, 
        subtitle, 
        articleDate, 
        imageUrl, 
        category, 
        body, 
        journal, 
        scrappingDate, 
        sentiment
    }
    const newsPaperAdded = await newStore.createNews(newspaperArticle);
    return newsPaperAdded;
}

const deleteNew = async (id, userData) => {
    if(userData.isAdmin) {
        const deleted = await newStore.deleteNew(id);
        if(!deleted) boom.notFound("New not found");
        return deleted;
    } else {
        throw boom.unauthorized("Sorry! you cant made that action! 🔬");
    }
}

module.exports = {
    getAllNews,
    addNew,
    deleteNew
}