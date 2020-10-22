const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const newSchema = new Schema({
    title: String,
    subTitle: String,
    articleDate: String,
    imageUrl: String,
    category: String, 
    body: String,
    articleUrl: {
        type: String,
        unique: true
    },
    journal: String,
    scrappingDate: Date,
    sentiment: String
},{
    versionKey: false,
    timestamps: true
})

newSchema.plugin(mongoosePaginate);
const newModel = mongoose.model('New', newSchema);

module.exports = newModel;