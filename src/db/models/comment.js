const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    comment: String,
    idUser: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    idNew: {
        type: Schema.ObjectId,
        ref: 'New'
    }

})

const commentModel = mongoose.model('New', newSchema)

module.exports = commentModel;