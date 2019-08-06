const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    insName: {
        type: String,
        required: false
    },
    insPolicy: {
        type: String,
        required: false
    },
    insContact: {
        type: String,
        required: false
    },
    createdItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

module.exports = mongoose.model('User', userSchema)