const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define properties that blog documents should have
const blogSchema = new Schema({
    title: {
        type: String, // can set multiple properties by setting key equal to an object
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });
