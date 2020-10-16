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


//  Change "_id to id"
newSchema.method('toJSON', function () {
    // eslint-disable-next-line no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const commentModel = mongoose.model('New', newSchema)

module.exports = commentModel;