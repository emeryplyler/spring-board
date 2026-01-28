const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // import blog document model

app = express();

// register view engine
app.set('view engine', 'ejs'); // by default, looks for /views

// connect to db using .env variable
mongoose.connect(process.env.MONGO_URI)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

// middleware
app.use(express.urlencoded({ extended: true })); // passes url encoded data as an object

app.get("/", (req, res) => {
    // use ejs to render a view
    // express will look for 'index' in the views folder

    Blog.find() // since Blog is attached to the 'blogs' collection, it will find all blogs
        .then((result) => {
            // instead of res.send, render a view instead
            // render index.ejs and pass in an object holding data
            // because the property name and value name are the same, you can just write 'blogs'
            res.render('index', { title: "Blogs", blogs: result }); // second parameter is the data object that will be sent to the ejs file
        })
        .catch((err) => {
            console.log(err);
        });
});

// show form to make new blog
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "New Blog" });
});

// handle post requests
// note: the url here is /blogs and not /blogs/create because in the create.ejs file we specify that action=/blogs
app.post("/blogs", (req, res) => {
    // make a new instance of Blog document
    const newBlog = new Blog(req.body); // can just pass object directly into constructor
    // call the save() method of the model
    // this will save it to the collection (async)
    newBlog.save()
        .then((result) => {
            res.redirect("/"); // send back to blogs page
        })
        .catch((err) => {
            console.log(err);
        });
});

// handle get requests for a specific blog
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
