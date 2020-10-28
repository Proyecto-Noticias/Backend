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
    country: String,
    scrappingDate: Date,
    sentiment: String
},{
    versionKey: false,
})

newSchema.index({title: 'text', subTitle: 'text'},{
    name: 'Title and Sub title index',
    weights: {
        title: 10,
        subTitle: 5
    }
});

newSchema.plugin(mongoosePaginate);
const newModel = mongoose.model('New', newSchema);

module.exports = newModel;