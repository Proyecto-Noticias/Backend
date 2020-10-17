const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    title: String,
    subTitle: String,
    articleDate: Date,
    imageUrl: String,
    category: String, 
    body: String,
    journal: String,
    scrappingDate: Date,
    sentiment: String
})

//  Change "_id to id"
newSchema.method('toJSON', function () {
    // eslint-disable-next-line no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const newModel = mongoose.model('New', newSchema)

module.exports = newModel;