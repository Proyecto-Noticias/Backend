const Model = require("../../../db/models/new");
const boom = require('@hapi/boom');

const getOneById = async (id) => {
    const mNew = await Model.findOne({_id: id});
    return mNew;
}

const getAllNews = async (page) => {
    const news = await Model.paginate({}, {page, limit:20});
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

const multipleInserts = async (news) => {
    // eslint-disable-next-line no-unused-vars
    Model.insertMany(news, { ordered: false }, (err, docs) =>{
        if (err) {
            const code = err.message.split(" ")[0];
            if(code !== "E11000") console.error(err.message);
        } else {
            console.log("Every new added success! 🥰🥰🥰");
        }
    })
}

const findByFilter = async (filter, page) => {
    try {
        const docs = await Model.paginate(filter, {page, limit: 20});
        return docs;
    } catch (error) {
        throw boom.badData(`${error.message}`);
    }
    
}

module.exports = {
    getAllNews,
    createNews,
    deleteNew,
    multipleInserts,
    getOneById,
    findByFilter
};