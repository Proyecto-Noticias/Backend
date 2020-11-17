const Model = require("../../../db/models/new");
const boom = require('@hapi/boom');

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const getOneById = async (id) => {
    const mNew = await Model.findOne({ _id: id });
    return mNew;
}

const getAllNews = async (page, mdate) => {
    let filter = {
        "createdAt": {
            $gte: mdate
        }
    }
    const number = await Model.countDocuments(filter)
    const random = Math.floor((Math.random() * ((number - 50) - 0)) + 0);
    const news = await Model.paginate(filter, { page, limit: 50, offset:random });
    return news;
}

const createNews = async (newToAdd) => {
    const myNew = new Model(newToAdd);
    return await myNew.save();
}

const deleteNew = async (id) => {
    const removed = await Model.findByIdAndDelete({ _id: id });
    return removed;
}

const multipleInserts = async (news) => {
    // eslint-disable-next-line no-unused-vars
    Model.insertMany(news, { ordered: false }, (err, docs) => {
        if (err) {
            const code = err.message.split(" ")[0];
            if (code !== "E11000") console.error(err.message);
        } else {
            console.log("Every new added success! 🥰🥰🥰");
        }
    })
}

const findByFilter = async (filter, page) => {
    try {
        const docs = await Model.paginate(filter, { page, limit: 20 });
        return docs;
    } catch (error) {
        throw boom.badData(`${error.message}`);
    }

}

const searchNews = async (searchString, page) => {
    let regex = new RegExp(escapeRegex(searchString), 'gi');
    let docs = await Model.paginate({
        $or: [
            { 'title': regex },
            { 'subTitle': regex },
        ]
    },{ page, limit: 20 })

    return docs
}

module.exports = {
    getAllNews,
    createNews,
    deleteNew,
    multipleInserts,
    getOneById,
    findByFilter,
    searchNews
};