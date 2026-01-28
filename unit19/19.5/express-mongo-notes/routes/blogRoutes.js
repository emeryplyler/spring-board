const express = require("express");
const Blog = require('../models/blog'); // import blog document model

// create router, attach handlers to router, then export router for app to use

// make new router object
const router = express.Router();

router.get("/", (req, res) => {
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
router.get("/create", (req, res) => {
    res.render("create", { title: "New Blog" });
});

// handle post requests
// note: the url here is / and not /create because in the create.ejs file we specify that action=/blogs
router.post("/", (req, res) => {
    // make a new instance of Blog document
    const newBlog = new Blog(req.body); // can just pass object directly into constructor
    // call the save() method of the model
    // this will save it to the collection (async)
    newBlog.save()
        .then((result) => {
            // note: the path here needs to be the absolute path, not the relative one like the router "/create" string that actually means "/blogs/create"
            res.redirect("/blogs"); // send back to blogs page
        })
        .catch((err) => {
            console.log(err);
        });
});

// note: any routes with /blogs/* need to be above this point
// otherwise, the * will be interpreted as a blog id

// handle get requests for a specific blog
router.get("/:blogid", (req, res) => {
    const id = req.params.blogid;
    Blog.findById(id)
        .then((result) => {
            res.render("details", { blog: result, title: "Blog Details" });
        })
        .catch((err) => {
            console.log(err)
        });
});

// handle delete requests for a specific blog
router.delete("/:blogid", (req, res) => {
    const id = req.params.blogid;
    Blog.findByIdAndDelete(id)
        .then(result => {
            // when doing ajax requests you can't redirect the same way
            res.json({ redirect: '/blogs' }); // we pass a json with a redirect property
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
