const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

newSchema.plugin(mongoosePaginate);
const newModel = mongoose.model('New', newSchema);

module.exports = newModel;