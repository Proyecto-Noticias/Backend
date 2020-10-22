const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    userId: { 
        type: Schema.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    token: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now, 
        expires: 43200 
    }
},{
    versionKey: false,
    timestamps: true
});


const tokenSchema = mongoose.model('Token', newSchema)

module.exports = tokenSchema;