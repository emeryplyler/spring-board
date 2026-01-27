const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // import blog document model

app = express();

const mongoURI = "mongodb+srv://emery:SWtChvnKxXCpal1J@cluster0.lybzmpo.mongodb.net/?appName=Cluster0";
mongoose.connect(mongoURI)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.status(200).send("<p>Homepage</p>");
});

app.get("/add-blog", (req, res) => {
    // make a new instance of Blog document
    const newBlog = new Blog({
        // add properties; mongo will handle the timestamps
        title: "New Blog!",
        snippet: "about my new blog",
        body: "more about my new blog blah blah blah blah"
    });

    // call the save() method of the model
    // this will save it to the collection (async)
    newBlog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    // it worked!
})

app.get("/all-blogs", (req, res) => {
    // use blog model to get all documents in the collection
    Blog.find() // since Blog is attached to the 'blogs' collection, it will find all blogs
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    // it worked
});

app.get("/single-blog", (req, res) => {
    // mongo will handle converting the string into the objectId
    Blog.findById('6978030a51b49b18095f8751')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
    // it worked
})

app.listen(3000);
