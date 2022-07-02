const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date(Date.now())
    }
});

var todoModel = mongoose.model('user', todoSchema );
module.exports = todoModel;