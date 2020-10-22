const newStore = require("./store");
const boom = require('@hapi/boom');
const Axios = require('axios');
const { URL_SCRAPPER } = process.env;


const getAllNews = async (page) => {
    const news = await newStore.getAllNews(page);
    return news;
}

const getOneNew = async (id) => {
    const mNew = await newStore.getOneById(id);
    if (!mNew) throw boom.badRequest('That new doesnt exists! 👽');
    return mNew;
}

const addNew = async (title, subtitle, articleDate, imageUrl, category, body, articleUrl, journal, scrappingDate, sentiment, userData) => {
    if (!userData.isAdmin) throw boom.unauthorized("Sorry! but only admins can create news 😞😔😔😔😞");
    const newspaperArticle = {
        title,
        subtitle,
        articleDate,
        imageUrl,
        category,
        body,
        articleUrl,
        journal,
        scrappingDate,
        sentiment
    }
    const newsPaperAdded = await newStore.createNews(newspaperArticle);
    return newsPaperAdded;
}

const deleteNew = async (id, userData) => {
    if (userData.isAdmin) {
        const deleted = await newStore.deleteNew(id);
        if (!deleted) boom.notFound("New not found");
        return deleted;
    } else {
        throw boom.unauthorized("Sorry! you cant made that action! 🔬");
    }
}

const specialRoute = async () => {
    let parsedNews = [];
    try {
        const response = await Axios.get(URL_SCRAPPER);
        const myArray = response.data;
        myArray.forEach(element => {
            const myNew = {
                title: element.title.replace(/(\n){1,}/g, ""),
                subTitle: element.subtitle.replace(/(\n){1,}/g, ""),
                articleDate: element.article_date,
                imageUrl: element.image_url,
                category: element.category,
                body: element.body.replace(/(\n){1,}/g, ""),
                articleUrl: element.article_url,
                journal: element.journal,
                scrappingDate: element.scraping_date,
                sentiment: element.sentiment_classification
            }
            parsedNews.push(myNew);
        });

        await newStore.multipleInserts(parsedNews);
       
    } catch (error) {
        if (error) throw error
    }    
}

module.exports = {
    getAllNews,
    addNew,
    deleteNew,
    specialRoute,
    getOneNew
}