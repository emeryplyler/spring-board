const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// make a new schema, then create a model using that schema

// creating a new schema:
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

// creating a new model using a schema:
// the name is important; when you name it 'Blog', it will look for a collection called 'blogs' automatically
// this is basically assigning this model to an existing collection
const Blog = mongoose.model('Blog', blogSchema);

// export the model:
module.exports = Blog;
