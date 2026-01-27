const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // import blog document model

app = express();

const mongoURI = "mongodb+srv://emery:SWtChvnKxXCpal1J@cluster0.lybzmpo.mongodb.net/?appName=Cluster0";
mongoose.connect(mongoURI)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

// middleware
app.use(express.urlencoded({ extended: true })); // passes url encoded data as an object

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html"); // send static content (index.html)
});

app.get("/add-blank-blog", (req, res) => {
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

app.get("/blogs", (req, res) => {
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

// handle post requests
app.post("/blogs", (req, res) => {
    const newBlog = new Blog(req.body); // can just pass object directly into constructor
    newBlog.save()
        .then((result) => {
            res.redirect("/blogs"); // send back to blogs page
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/blogs/:blogid", (req, res) => {
    const id = req.params.blogid;
    Blog.findById(id)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err)
        });
});

app.listen(3000);
