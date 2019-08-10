const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {

        name: {
            type: String,
            required: true
        },
        serial: {
            type: String,
            required: false
        },
        model: {
            type: String,
            required: false
        },
        make: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        estValue: {
            type: Number,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        comment: {
            type: String,
            required: false
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);