const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    category: {
        type: String,
        unique: true,
        required: true,
    },
    times: {
        type: Number,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{ value } is not a integer value'
        }
    }
},{
        versionKey: false,
        timestamps: true
})


const CategoriesStatsModel = mongoose.model('Categories', newSchema)

module.exports = CategoriesStatsModel;